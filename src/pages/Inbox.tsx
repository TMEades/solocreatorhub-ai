import { useState, useEffect } from 'react'

interface Message {
  id: string
  platform: string
  sender: {
    name: string
    avatar: string
    verified?: boolean
  }
  content: string
  timestamp: string
  isRead: boolean
  attachments?: {
    type: 'image' | 'video' | 'link'
    url: string
    preview?: string
  }[]
}

interface Comment {
  id: string
  platform: string
  postId: string
  postPreview: string
  author: {
    name: string
    avatar: string
    verified?: boolean
  }
  content: string
  timestamp: string
  isRead: boolean
  likes: number
}

interface Mention {
  id: string
  platform: string
  author: {
    name: string
    avatar: string
    verified?: boolean
  }
  content: string
  postPreview?: string
  timestamp: string
  isRead: boolean
  engagement: {
    likes: number
    comments: number
    shares: number
  }
}

type InboxItem = Message | Comment | Mention

const Inbox = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'messages' | 'comments' | 'mentions'>('all')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all'])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [inboxItems, setInboxItems] = useState<InboxItem[]>([])
  const [selectedItem, setSelectedItem] = useState<InboxItem | null>(null)
  const [replyText, setReplyText] = useState('')
  
  useEffect(() => {
    // Simulate loading inbox data
    setIsLoading(true)
    
    setTimeout(() => {
      // Mock inbox items
      const mockInboxItems: InboxItem[] = [
        {
          id: 'msg1',
          platform: 'instagram',
          sender: {
            name: 'John Smith',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
          content: 'Hi there! I'm interested in your products. Do you ship internationally?',
          timestamp: '2023-06-15T14:30:00Z',
          isRead: false
        },
        {
          id: 'msg2',
          platform: 'facebook',
          sender: {
            name: 'Sarah Johnson',
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            verified: true
          },
          content: 'I love your latest collection! When will you restock the blue dress in size M?',
          timestamp: '2023-06-14T10:15:00Z',
          isRead: true
        },
        {
          id: 'cmt1',
          platform: 'instagram',
          postId: 'post123',
          postPreview: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          author: {
            name: 'Mike Wilson',
            avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
          content: 'This looks amazing! Can't wait to try it out.',
          timestamp: '2023-06-15T09:45:00Z',
          isRead: false,
          likes: 5
        },
        {
          id: 'cmt2',
          platform: 'facebook',
          postId: 'post456',
          postPreview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          author: {
            name: 'Emily Davis',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
          content: 'Great post! I have a question about your service. What's the turnaround time?',
          timestamp: '2023-06-14T16:20:00Z',
          isRead: true,
          likes: 3
        },
        {
          id: 'men1',
          platform: 'twitter',
          author: {
            name: 'Tech Review',
            avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            verified: true
          },
          content: 'Just tried @yourcompany's new product and it's a game changer! Highly recommend checking it out. #innovation',
          timestamp: '2023-06-15T11:10:00Z',
          isRead: false,
          engagement: {
            likes: 42,
            comments: 7,
            shares: 12
          }
        },
        {
          id: 'msg3',
          platform: 'instagram',
          sender: {
            name: 'Alex Brown',
            avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
          content: 'Hey! I saw your ad and wanted to know more about your pricing plans.',
          timestamp: '2023-06-13T15:45:00Z',
          isRead: true,
          attachments: [
            {
              type: 'image',
              url: 'https://images.pexels.com/photos/935756/pexels-photo-935756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              preview: 'https://images.pexels.com/photos/935756/pexels-photo-935756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            }
          ]
        },
        {
          id: 'men2',
          platform: 'linkedin',
          author: {
            name: 'Business Network',
            avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            verified: true
          },
          content: 'We're featuring @yourcompany in our upcoming article about innovative startups to watch in 2023!',
          timestamp: '2023-06-12T13:30:00Z',
          isRead: true,
          engagement: {
            likes: 87,
            comments: 15,
            shares: 23
          }
        }
      ]
      
      setInboxItems(mockInboxItems)
      setIsLoading(false)
    }, 1500)
  }, [])
  
  // Filter inbox items based on active tab, selected platforms, and search query
  const filteredItems = inboxItems.filter(item => {
    // Filter by tab
    if (activeTab === 'messages' && !('sender' in item)) return false
    if (activeTab === 'comments' && !('postId' in item)) return false
    if (activeTab === 'mentions' && !('engagement' in item)) return false
    
    // Filter by platform
    if (selectedPlatforms[0] !== 'all' && !selectedPlatforms.includes(item.platform)) return false
    
    // Filter by search query
    if (searchQuery) {
      if ('sender' in item) {
        return item.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               item.content.toLowerCase().includes(searchQuery.toLowerCase())
      } else if ('author' in item) {
        return item.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               item.content.toLowerCase().includes(searchQuery.toLowerCase())
      }
    }
    
    return true
  })
  
  const handlePlatformToggle = (platform: string) => {
    if (platform === 'all') {
      setSelectedPlatforms(['all'])
    } else {
      const newPlatforms = selectedPlatforms.filter(p => p !== 'all')
      if (newPlatforms.includes(platform)) {
        const filtered = newPlatforms.filter(p => p !== platform)
        setSelectedPlatforms(filtered.length === 0 ? ['all'] : filtered)
      } else {
        setSelectedPlatforms([...newPlatforms, platform])
      }
    }
  }
  
  const handleItemClick = (item: InboxItem) => {
    setSelectedItem(item)
    
    // Mark as read if not already
    if (!item.isRead) {
      setInboxItems(inboxItems.map(i => 
        i.id === item.id ? { ...i, isRead: true } : i
      ))
    }
  }
  
  const handleReply = () => {
    if (!replyText.trim() || !selectedItem) return
    
    // In a real app, this would send the reply to the appropriate platform
    alert(`Reply sent: ${replyText}`)
    setReplyText('')
  }
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else if (diffDays < 7) {
      return `${diffDays}d ago`
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }
  
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        )
      case 'facebook':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        )
      case 'twitter':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        )
      case 'linkedin':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        )
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        )
    }
  }
  
  return (
    <div className="container page">
      <h1 className="text-2xl font-bold mb-6">Unified Inbox</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Messages</h2>
              <div className="badge">{inboxItems.filter(item => !item.isRead).length}</div>
            </div>
            
            <div className="mb-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search messages..." 
                  className="input w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="tabs">
                <button 
                  className={`tab ${activeTab === 'all' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  All
                </button>
                <button 
                  className={`tab ${activeTab === 'messages' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('messages')}
                >
                  Messages
                </button>
                <button 
                  className={`tab ${activeTab === 'comments' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('comments')}
                >
                  Comments
                </button>
                <button 
                  className={`tab ${activeTab === 'mentions' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('mentions')}
                >
                  Mentions
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`btn btn-sm ${selectedPlatforms.includes('all') ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handlePlatformToggle('all')}
                >
                  All
                </button>
                <button 
                  className={`btn btn-sm ${selectedPlatforms.includes('instagram') ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handlePlatformToggle('instagram')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  Instagram
                </button>
                <button 
                  className={`btn btn-sm ${selectedPlatforms.includes('facebook') ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handlePlatformToggle('facebook')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  Facebook
                </button>
                <button 
                  className={`btn btn-sm ${selectedPlatforms.includes('twitter') ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handlePlatformToggle('twitter')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                  Twitter
                </button>
                <button 
                  className={`btn btn-sm ${selectedPlatforms.includes('linkedin') ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handlePlatformToggle('linkedin')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  LinkedIn
                </button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="text-center p-4">
                <div className="spinner-sm mx-auto"></div>
                <p className="mt-2 text-sm">Loading messages...</p>
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="space-y-2 inbox-list">
                {filteredItems.map(item => (
                  <div 
                    key={item.id}
                    className={`inbox-item ${!item.isRead ? 'unread' : ''} ${selectedItem?.id === item.id ? 'selected' : ''}`}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="flex items-start">
                      <div className="inbox-avatar">
                        {'sender' in item ? (
                          <img src={item.sender.avatar} alt={item.sender.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <img src={item.author.avatar} alt={item.author.name} className="w-10 h-10 rounded-full object-cover" />
                        )}
                        <div className="platform-indicator">
                          {getPlatformIcon(item.platform)}
                        </div>
                      </div>
                      
                      <div className="inbox-content">
                        <div className="inbox-header">
                          <div className="inbox-name">
                            {'sender' in item ? item.sender.name : item.author.name}
                            {(('sender' in item && item.sender.verified) || ('author' in item && item.author.verified)) && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="verified-icon">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                            )}
                          </div>
                          <div className="inbox-time">{formatTimestamp(item.timestamp)}</div>
                        </div>
                        
                        <div className="inbox-message">
                          {item.content.length > 60 ? `${item.content.substring(0, 60)}...` : item.content}
                        </div>
                        
                        {'postId' in item && (
                          <div className="inbox-post-preview">
                            <img src={item.postPreview} alt="Post" className="w-8 h-8 rounded object-cover" />
                          </div>
                        )}
                        
                        {'attachments' in item && item.attachments && item.attachments.length > 0 && (
                          <div className="inbox-attachment">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                            </svg>
                          </div>
                        )}
                        
                        {'engagement' in item && (
                          <div className="inbox-engagement">
                            <span className="engagement-stat">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                              </svg>
                              {item.engagement.likes}
                            </span>
                            <span className="engagement-stat">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                              </svg>
                              {item.engagement.comments}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 text-tertiary">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <p className="text-secondary">No messages found</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-2">
          {selectedItem ? (
            <div className="card">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  {'sender' in selectedItem ? (
                    <>
                      <img src={selectedItem.sender.avatar} alt={selectedItem.sender.name} className="w-12 h-12 rounded-full object-cover mr-3" />
                      <div>
                        <div className="flex items-center">
                          <h2 className="text-lg font-bold">{selectedItem.sender.name}</h2>
                          {selectedItem.sender.verified && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="verified-icon ml-1">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-secondary">
                          {getPlatformIcon(selectedItem.platform)}
                          <span className="ml-1">{selectedItem.platform.charAt(0).toUpperCase() + selectedItem.platform.slice(1)}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <img src={selectedItem.author.avatar} alt={selectedItem.author.name} className="w-12 h-12 rounded-full object-cover mr-3" />
                      <div>
                        <div className="flex items-center">
                          <h2 className="text-lg font-bold">{selectedItem.author.name}</h2>
                          {selectedItem.author.verified && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="verified-icon ml-1">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-secondary">
                          {getPlatformIcon(selectedItem.platform)}
                          <span className="ml-1">{selectedItem.platform.charAt(0).toUpperCase() + selectedItem.platform.slice(1)}</span>
                          {'postId' in selectedItem && (
                            <span className="ml-2">• Comment on post</span>
                          )}
                          {'engagement' in selectedItem && (
                            <span className="ml-2">• Mention</span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button className="btn btn-sm btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                  <button className="btn btn-sm btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>
                  <button className="btn btn-sm btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
              
              {'postId' in selectedItem && (
                <div className="post-preview mb-6">
                  <div className="text-sm text-secondary mb-2">Original Post</div>
                  <div className="flex items-center">
                    <img src={selectedItem.postPreview} alt="Post" className="w-16 h-16 rounded object-cover mr-3" />
                    <div>
                      <div className="text-sm">Post from {new Date(selectedItem.timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</div>
                      <div className="flex items-center mt-1">
                        <button className="btn btn-xs btn-outline">View Post</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="message-content mb-6">
                <div className="p-4 bg-background rounded-lg">
                  <p>{selectedItem.content}</p>
                  
                  {'attachments' in selectedItem && selectedItem.attachments && selectedItem.attachments.length > 0 && (
                    <div className="mt-4">
                      {selectedItem.attachments.map((attachment, index) => (
                        <div key={index} className="attachment">
                          {attachment.type === 'image' && (
                            <img src={attachment.url} alt="Attachment" className="max-w-full h-auto rounded" />
                          )}
                          {attachment.type === 'video' && (
                            <div className="video-attachment">
                              <img src={attachment.preview || attachment.url} alt="Video preview" className="max-w-full h-auto rounded" />
                              <div className="video-play-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                                </svg>
                              </div>
                            </div>
                          )}
                          {attachment.type === 'link' && (
                            <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="link-attachment">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                              </svg>
                              {attachment.url}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {'engagement' in selectedItem && (
                    <div className="mt-4 flex space-x-4">
                      <div className="engagement-stat">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {selectedItem.engagement.likes} likes
                      </div>
                      <div className="engagement-stat">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        {selectedItem.engagement.comments} comments
                      </div>
                      <div className="engagement-stat">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <circle cx="18" cy="5" r="3"></circle>
                          <circle cx="6" cy="12" r="3"></circle>
                          <circle cx="18" cy="19" r="3"></circle>
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                        {selectedItem.engagement.shares} shares
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="reply-section">
                <h3 className="font-medium mb-2">Reply</h3>
                <div className="flex">
                  <textarea 
                    className="input flex-1 mr-2" 
                    placeholder="Type your reply..." 
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  ></textarea>
                  <button 
                    className="btn btn-primary self-end"
                    onClick={handleReply}
                    disabled={!replyText.trim()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    Send
                  </button>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="flex space-x-2">
                    <button className="btn btn-sm btn-outline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </button>
                    <button className="btn btn-sm btn-outline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                      </svg>
                    </button>
                    <button className="btn btn-sm btn-outline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                      </svg>
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline">
                      Save as Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-tertiary">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <h2 className="text-xl font-bold mb-2">No message selected</h2>
              <p className="text-secondary mb-6">Select a message from the inbox to view and reply</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Inbox