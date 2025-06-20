import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { MediaFile } from '../../stores/postStore'

interface MediaUploaderProps {
  media: MediaFile[]
  onChange: (media: MediaFile[]) => void
}

const MediaUploader = ({ media, onChange }: MediaUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newMedia = acceptedFiles.map(file => {
      const id = Math.random().toString(36).substring(2, 9)
      const type = file.type.startsWith('image/') ? 'image' : 'video'
      return {
        id,
        file,
        preview: URL.createObjectURL(file),
        type
      }
    })
    
    onChange([...media, ...newMedia])
  }, [media, onChange])
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'video/*': []
    },
    maxSize: 100 * 1024 * 1024 // 100MB
  })
  
  const removeMedia = (id: string) => {
    const updatedMedia = media.filter(item => item.id !== id)
    onChange(updatedMedia)
  }
  
  return (
    <div>
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'border-primary-light' : ''}`}
      >
        <input {...getInputProps()} />
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 text-primary">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <p className="text-sm font-medium">Drag & drop images or videos here, or click to select files</p>
        <p className="text-xs text-secondary mt-1">Supports: JPG, PNG, GIF, MP4, MOV (Max: 100MB)</p>
      </div>
      
      {media.length > 0 && (
        <div className="media-preview">
          {media.map(item => (
            <div key={item.id} className="media-item">
              {item.type === 'image' ? (
                <img src={item.preview} alt="Preview" />
              ) : (
                <video src={item.preview} />
              )}
              <button 
                className="media-remove"
                onClick={() => removeMedia(item.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MediaUploader
