import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface MediaItem {
  id: string
  type: 'image' | 'video'
  url: string
  name: string
  size: string
  createdAt: string
  tags: string[]
}

interface MediaFolder {
  id: string
  name: string
  itemCount: number
}

const ContentLibrary = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [selectedType, setSelectedType] = useState<'all' | 'images' | 'videos'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [folders, setFolders] = useState<MediaFolder[]>([])
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  
  useEffect(() => {
    // Simulate loading media data
    setIsLoading(true)
    
    setTimeout(() => {
      // Mock folders
      const mockFolders: MediaFolder[] = [
        { id: 'folder1', name: 'Product Photos', itemCount: 12 },
        { id: 'folder2', name: 'Team Photos', itemCount: 8 },
        { id: 'folder3', name: 'Promotional Videos', itemCount: 5 },
        { id: 'folder4', name: 'Social Media Assets', itemCount: 20 }
      ]
      
      // Mock media items
      const mockMediaItems: MediaItem[] = [
        {
          id: 'img1',
          type: 'image',
          url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          name: 'Product Launch.jpg',
          size: '2.4 MB',
          createdAt: '2023-06-15',
          tags: ['product', 'marketing']
        },
        {
          id: 'img2',
          type: 'image',
          url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          name: 'Team Meeting.jpg',
          size: '1.8 MB',
          createdAt: '2023-06-10',
          tags: ['team', 'office']
        },
        {
          id: 'vid1',
          type: 'video',
          url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          name: 'Product Demo.mp4',
          size: '8.2 MB',
          createdAt: '2023-06-05',
          tags: ['product', 'demo', 'video']
        },
        {
          id: 'img3',
          type: 'image',
          url: 'https://images.pexels.com/photos/935756/pexels-photo-935756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          name: 'Office Space.jpg',
          size: '3.1 MB',
          createdAt: '2023-05-28',
          tags: ['office', 'workspace']
        },
        {
          id: 'img4',
          type: 'image',
          url: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          name: 'Team Collaboration.jpg',
          size: '2.7 MB',
          createdAt: '2023-05-20',
          tags: ['team', 'collaboration']
        },
        {
          id: 'vid2',
          type: 'video',
          url: 'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          name: 'Marketing Campaign.mp4',
          size: '12.5 MB',
          createdAt: '2023-05-15',
          tags: ['marketing', 'campaign', 'video']
        },
        {
          id: 'img5',
          type: 'image',
          url: 'https://images.pexels.com/photos/3182774/pexels-photo-3182774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          name: 'Product Showcase.jpg',
          size: '1.9 MB',
          createdAt: '2023-05-10',
          tags: ['product', 'showcase']
        },
        {
          id: 'img6',
          type: 'image',
          url: 'https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          name: 'Customer Testimonial.jpg',
          size: '2.2 MB',
          createdAt: '2023-05-05',
          tags: ['customer', 'testimonial']
        }
      ]
      
      setFolders(mockFolders)
      setMediaItems(mockMediaItems)
      setIsLoading(false)
    }, 1500)
  }, [])
  
  // Filter media items based on selected type, search query, and tags
  const filteredMediaItems = mediaItems.filter(item => {
    // Filter by type
    if (selectedType === 'images' && item.type !== 'image') return false
    if (selectedType === 'videos' && item.type !== 'video') return false
    
    // Filter by search query
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    
    // Filter by selected tags
    if (selectedTags.length > 0 && !selectedTags.some(tag => item.tags.includes(tag))) return false
    
    return true
  })
  
  // Get all unique tags from media items
  const allTags = Array.from(new Set(mediaItems.flatMap(item => item.tags)))
  
  const toggleItemSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }
  
  const toggleTagSelection = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }
  
  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId)
  }
  
  const navigateBack = () => {
    setCurrentFolder(null)
  }
  
  return (
    <div className="container page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Content Library</h1>
        <div className="flex space-x-2">
          <button className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Upload
          </button>
          <button className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Folder
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="card">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Media Type</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="mediaType" 
                    checked={selectedType === 'all'} 
                    onChange={() => setSelectedType('all')}
                    className="mr-2"
                  />
                  All Media
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="mediaType" 
                    checked={selectedType === 'images'} 
                    onChange={() => setSelectedType('images')}
                    className="mr-2"
                  />
                  Images
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="mediaType" 
                    checked={selectedType === 'videos'} 
                    onChange={() => setSelectedType('videos')}
                    className="mr-2"
                  />
                  Videos
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    className={`tag ${selectedTags.includes(tag) ? 'tag-selected' : ''}`}
                    onClick={() => toggleTagSelection(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Storage</h3>
              <div className="w-full bg-background rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>70% used</span>
                <span>7GB / 10GB</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="card">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div className="flex items-center mb-4 sm:mb-0">
                {currentFolder && (
                  <button 
                    className="btn btn-sm btn-outline mr-2"
                    onClick={navigateBack}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </button>
                )}
                <h2 className="text-lg font-bold">
                  {currentFolder 
                    ? folders.find(f => f.id === currentFolder)?.name || 'Folder' 
                    : 'All Files'}
                </h2>
              </div>
              
              <div className="flex w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none mr-2">
                  <input 
                    type="text" 
                    placeholder="Search files..." 
                    className="input w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                
                <div className="btn-group">
                  <button 
                    className={`btn btn-sm ${view === 'grid' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setView('grid')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </button>
                  <button 
                    className={`btn btn-sm ${view === 'list' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setView('list')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="text-center p-8">
                <div className="spinner mx-auto"></div>
                <p className="mt-4">Loading content library...</p>
              </div>
            ) : (
              <>
                {!currentFolder && folders.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Folders</h3>
                    <div className={view === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4' : 'space-y-2'}>
                      {folders.map(folder => (
                        <div 
                          key={folder.id}
                          className={`cursor-pointer ${view === 'grid' ? 'folder-card' : 'folder-list-item'}`}
                          onClick={() => handleFolderClick(folder.id)}
                        >
                          {view === 'grid' ? (
                            <>
                              <div className="folder-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                                </svg>
                              </div>
                              <div className="folder-name truncate">{folder.name}</div>
                              <div className="folder-count">{folder.itemCount} items</div>
                            </>
                          ) : (
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-primary">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                              </svg>
                              <div className="flex-1">
                                <div className="font-medium">{folder.name}</div>
                                <div className="text-sm text-secondary">{folder.itemCount} items</div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="font-medium mb-2">Files</h3>
                  
                  {filteredMediaItems.length > 0 ? (
                    view === 'grid' ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {filteredMediaItems.map(item => (
                          <div 
                            key={item.id}
                            className={`media-card ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                            onClick={() => toggleItemSelection(item.id)}
                          >
                            <div className="media-preview">
                              {item.type === 'image' ? (
                                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="video-thumbnail">
                                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                  <div className="video-play-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polygon points="10 8 16 12 10 16 10 8"></polygon>
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="media-info">
                              <div className="media-name truncate">{item.name}</div>
                              <div className="media-details">
                                <span>{item.size}</span>
                                <span>{item.createdAt}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filteredMediaItems.map(item => (
                          <div 
                            key={item.id}
                            className={`media-list-item ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                            onClick={() => toggleItemSelection(item.id)}
                          >
                            <div className="flex items-center">
                              <div className="media-thumbnail mr-3">
                                {item.type === 'image' ? (
                                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="video-thumbnail">
                                    <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                    <div className="video-play-icon-sm">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                                      </svg>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{item.name}</div>
                                <div className="flex text-sm text-secondary">
                                  <span className="mr-3">{item.type}</span>
                                  <span className="mr-3">{item.size}</span>
                                  <span>{item.createdAt}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                {item.tags.slice(0, 2).map((tag, i) => (
                                  <span key={i} className="tag tag-sm">{tag}</span>
                                ))}
                                {item.tags.length > 2 && (
                                  <span className="tag tag-sm">+{item.tags.length - 2}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  ) : (
                    <div className="text-center py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-tertiary">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                        <polyline points="13 2 13 9 20 9"></polyline>
                      </svg>
                      <h3 className="text-lg font-medium mb-2">No files found</h3>
                      <p className="text-secondary mb-4">Try adjusting your filters or upload new content</p>
                      <button className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        Upload Files
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentLibrary
