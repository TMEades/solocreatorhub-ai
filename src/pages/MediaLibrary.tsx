import React, { useState } from 'react'
import { 
  Image, 
  Video, 
  Upload, 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Download,
  Trash2,
  Edit,
  Eye
} from 'lucide-react'

const MediaLibrary: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const mediaItems = [
    {
      id: 1,
      name: 'summer-campaign-hero.jpg',
      type: 'image',
      size: '2.4 MB',
      dimensions: '1920x1080',
      uploadDate: '2024-01-15',
      url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      tags: ['campaign', 'summer', 'hero']
    },
    {
      id: 2,
      name: 'product-showcase.mp4',
      type: 'video',
      size: '15.2 MB',
      dimensions: '1080x1920',
      uploadDate: '2024-01-14',
      url: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg',
      tags: ['product', 'showcase', 'vertical']
    },
    {
      id: 3,
      name: 'team-photo.jpg',
      type: 'image',
      size: '3.1 MB',
      dimensions: '1200x800',
      uploadDate: '2024-01-13',
      url: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg',
      tags: ['team', 'office', 'people']
    },
    {
      id: 4,
      name: 'brand-logo.png',
      type: 'image',
      size: '0.8 MB',
      dimensions: '512x512',
      uploadDate: '2024-01-12',
      url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
      tags: ['logo', 'brand', 'identity']
    },
    {
      id: 5,
      name: 'behind-scenes.mp4',
      type: 'video',
      size: '22.5 MB',
      dimensions: '1920x1080',
      uploadDate: '2024-01-11',
      url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      tags: ['behind-scenes', 'process', 'documentary']
    },
    {
      id: 6,
      name: 'social-template.jpg',
      type: 'image',
      size: '1.9 MB',
      dimensions: '1080x1080',
      uploadDate: '2024-01-10',
      url: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
      tags: ['template', 'social', 'square']
    }
  ]

  const filters = [
    { id: 'all', name: 'All Media', count: mediaItems.length },
    { id: 'image', name: 'Images', count: mediaItems.filter(item => item.type === 'image').length },
    { id: 'video', name: 'Videos', count: mediaItems.filter(item => item.type === 'video').length },
  ]

  const filteredItems = mediaItems.filter(item => {
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Media Library</h1>
          <p className="text-white/70">Manage your images, videos, and other media assets</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Upload size={20} />
          Upload Media
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search media files..."
              className="input-field pl-12"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {filter.name} ({filter.count})
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Grid3X3 size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="card">
        <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors cursor-pointer">
          <Upload className="mx-auto mb-4 text-white/40" size={48} />
          <h3 className="text-white font-semibold mb-2">Drop files here to upload</h3>
          <p className="text-white/60 mb-4">or click to browse your computer</p>
          <p className="text-white/40 text-sm">Supports: JPG, PNG, GIF, MP4, MOV (Max 50MB)</p>
        </div>
      </div>

      {/* Media Grid/List */}
      <div className="card">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative">
                <div className="aspect-square bg-white/5 rounded-lg overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="text-white bg-black/50 rounded-full p-2" size={40} />
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                      <Eye size={16} className="text-white" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                      <Download size={16} className="text-white" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                      <Edit size={16} className="text-white" />
                    </button>
                    <button className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors">
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-3">
                  <h4 className="text-white font-medium text-sm truncate">{item.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white/60 text-xs">{item.size}</span>
                    <span className="text-white/60 text-xs">{item.dimensions}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="text-white" size={20} />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">{item.name}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-white/60">
                    <span>{item.type.toUpperCase()}</span>
                    <span>{item.size}</span>
                    <span>{item.dimensions}</span>
                    <span>{item.uploadDate}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Download size={16} />
                  </button>
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-400 mb-2">{mediaItems.length}</div>
          <div className="text-white/70 text-sm">Total Files</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-400 mb-2">
            {mediaItems.filter(item => item.type === 'image').length}
          </div>
          <div className="text-white/70 text-sm">Images</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-400 mb-2">
            {mediaItems.filter(item => item.type === 'video').length}
          </div>
          <div className="text-white/70 text-sm">Videos</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-400 mb-2">
            {Math.round(mediaItems.reduce((acc, item) => acc + parseFloat(item.size), 0) * 10) / 10} MB
          </div>
          <div className="text-white/70 text-sm">Total Size</div>
        </div>
      </div>
    </div>
  )
}

export default MediaLibrary
