import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image, Video, File, Check } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

interface MediaFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video' | 'other'
  uploading: boolean
  uploaded: boolean
  url?: string
}

interface MediaUploadProps {
  onFilesUploaded?: (files: { url: string; type: string; name: string }[]) => void
  maxFiles?: number
  acceptedTypes?: string[]
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  onFilesUploaded,
  maxFiles = 10,
  acceptedTypes = ['image/*', 'video/*']
}) => {
  const { user } = useAuth()
  const [files, setFiles] = useState<MediaFile[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: MediaFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 
            file.type.startsWith('video/') ? 'video' : 'other',
      uploading: false,
      uploaded: false,
    }))

    setFiles(prev => [...prev, ...newFiles].slice(0, maxFiles))
  }, [maxFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles,
    maxSize: 50 * 1024 * 1024, // 50MB
  })

  const uploadFile = async (mediaFile: MediaFile) => {
    if (!user) {
      toast.error('You must be logged in to upload files')
      return
    }

    setFiles(prev => prev.map(f => 
      f.id === mediaFile.id ? { ...f, uploading: true } : f
    ))

    try {
      const fileExt = mediaFile.file.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`
      
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, mediaFile.file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(fileName)

      // Save to database
      const { error: dbError } = await supabase
        .from('media_files')
        .insert({
          user_id: user.id,
          file_name: mediaFile.file.name,
          file_path: fileName,
          file_type: mediaFile.file.type,
          file_size: mediaFile.file.size,
        })

      if (dbError) throw dbError

      setFiles(prev => prev.map(f => 
        f.id === mediaFile.id 
          ? { ...f, uploading: false, uploaded: true, url: publicUrl }
          : f
      ))

      toast.success(`${mediaFile.file.name} uploaded successfully!`)
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(`Failed to upload ${mediaFile.file.name}`)
      
      setFiles(prev => prev.map(f => 
        f.id === mediaFile.id ? { ...f, uploading: false } : f
      ))
    }
  }

  const uploadAllFiles = async () => {
    const unuploadedFiles = files.filter(f => !f.uploaded && !f.uploading)
    
    for (const file of unuploadedFiles) {
      await uploadFile(file)
    }

    // Notify parent component
    const uploadedFiles = files
      .filter(f => f.uploaded && f.url)
      .map(f => ({
        url: f.url!,
        type: f.type,
        name: f.file.name
      }))

    if (onFilesUploaded && uploadedFiles.length > 0) {
      onFilesUploaded(uploadedFiles)
    }
  }

  const removeFile = (id: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id)
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return prev.filter(f => f.id !== id)
    })
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-6 h-6" />
      case 'video':
        return <Video className="w-6 h-6" />
      default:
        return <File className="w-6 h-6" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-purple-500 bg-purple-50'
            : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          or click to browse files
        </p>
        <p className="text-xs text-gray-400">
          Supports images and videos up to 50MB each
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">
              Files ({files.length}/{maxFiles})
            </h3>
            <button
              onClick={uploadAllFiles}
              disabled={files.every(f => f.uploaded || f.uploading)}
              className="btn btn-primary btn-sm"
            >
              Upload All
            </button>
          </div>

          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                {/* File Preview/Icon */}
                <div className="flex-shrink-0">
                  {file.type === 'image' ? (
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                      {getFileIcon(file.type)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.file.size)}
                  </p>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-2">
                  {file.uploading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                  )}
                  {file.uploaded && (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                  {!file.uploaded && !file.uploading && (
                    <button
                      onClick={() => uploadFile(file)}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      Upload
                    </button>
                  )}
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaUpload
