import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Trend {
  id: string
  name: string
  platform: string
  category: string
  volume: number
  growth: number
  sentiment: 'positive' | 'neutral' | 'negative'
  duration: string
  isTracked: boolean
  relatedTags: string[]
  description: string
}

interface Alert {
  id: string
  type: 'trend' | 'keyword' | 'competitor'
  name: string
  message: string
  timestamp: string
  isRead: boolean
}

const TrendTracker = () => {
  const [trends, setTrends] = useState<Trend[]>([])
  const [filteredTrends, setFilteredTrends] = useState<Trend[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'volume' | 'growth'>('volume')
  const [showAlerts, setShowAlerts] = useState(false)
  const [keywordInput, setKeywordInput] = useState('')
  const [trackedKeywords, setTrackedKeywords] = useState<string[]>([])
  
  useEffect(() => {
    // Simulate loading trend data
    setIsLoading(true)
    
    setTimeout(() => {
      const mockTrends: Trend[] = [
        {
          id: '1',
          name: '#SustainableFashion',
          platform: 'instagram',
          category: 'fashion',
          volume: 45000,
          growth: 28,
          sentiment: 'positive',
          duration: '3 days',
          isTracked: true,
          relatedTags: ['ecofriendly', 'slowfashion', 'ethicalclothing'],
          description: 'Growing trend around sustainable and ethical fashion choices, particularly popular among millennials and Gen Z.'
        },
        {
          id: '2',
          name: 'AI Tools for Creators',
          platform: 'twitter',
          category: 'technology',
          volume: 78000,
          growth: 42,
          sentiment: 'positive',
          duration: '5 days',
          isTracked: false,
          relatedTags: ['artificialintelligence', 'creatoreconomy', 'productivity'],
          description: 'Discussions about AI tools that help content creators with writing, image generation, and video editing.'
        },
        {
          id: '3',
          name: '#MondayMotivation',
          platform: 'twitter',
          category: 'lifestyle',
          volume: 125000,
          growth: 5,
          sentiment: 'positive',
          duration: 'recurring',
          isTracked: false,
          relatedTags: ['motivation', 'inspiration', 'success'],
          description: 'Weekly trending hashtag for sharing motivational quotes and success stories at the beginning of the work week.'
        },
        {
          id: '4',
          name: 'Plant-Based Recipes',
          platform: 'tiktok',
          category: 'food',
          volume: 92000,
          growth: 35,
          sentiment: 'positive',
          duration: '7 days',
          isTracked: true,
          relatedTags: ['vegan', 'plantbased', 'healthyeating'],
          description: 'Quick and easy plant-based recipe videos gaining popularity, especially 30-second recipe formats.'
        },
        {
          id: '5',
          name: 'Remote Work Culture',
          platform: 'linkedin',
          category: 'business',
          volume: 56000,
          growth: 18,
          sentiment: 'neutral',
          duration: '14 days',
          isTracked: false,
          relatedTags: ['remotework', 'worklifebalance', 'futureofwork'],
          description: 'Discussions about building company culture in remote and hybrid work environments.'
        },
        {
          id: '6',
          name: '#BookTok',
          platform: 'tiktok',
          category: 'entertainment',
          volume: 180000,
          growth: 65,
          sentiment: 'positive',
          duration: '30 days',
          isTracked: false,
          relatedTags: ['reading', 'bookrecommendations', 'literature'],
          description: 'Book recommendations and reviews, particularly focused on young adult and fantasy genres.'
        },
        {
          id: '7',
          name: 'Crypto Market Updates',
          platform: 'twitter',
          category: 'finance',
          volume: 210000,
          growth: -12,
          sentiment: 'negative',
          duration: '2 days',
          isTracked: true,
          relatedTags: ['bitcoin', 'ethereum', 'investing'],
          description: 'Discussions about recent cryptocurrency market volatility and regulatory news.'
        },
        {
          id: '8',
          name: 'Mental Health Awareness',
          platform: 'instagram',
          category: 'health',
          volume: 89000,
          growth: 22,
          sentiment: 'positive',
          duration: '10 days',
          isTracked: false,
          relatedTags: ['selfcare', 'mentalwellness', 'therapy'],
          description: 'Content focused on mental health tips, resources, and personal stories.'
        },
        {
          id: '9',
          name: 'Home Office Setup',
          platform: 'pinterest',
          category: 'home',
          volume: 67000,
          growth: 8,
          sentiment: 'positive',
          duration: '20 days',
          isTracked: false,
          relatedTags: ['workspace', 'productivity', 'interiordesign'],
          description: 'Ideas and inspiration for creating functional and aesthetic home office spaces.'
        },
        {
          id: '10',
          name: 'Sustainable Travel',
          platform: 'instagram',
          category: 'travel',
          volume: 52000,
          growth: 31,
          sentiment: 'positive',
          duration: '12 days',
          isTracked: false,
          relatedTags: ['ecotourism', 'responsibletravel', 'localexperiences'],
          description: 'Content about environmentally conscious travel options and supporting local communities.'
        }
      ]
      
      const mockAlerts: Alert[] = [
        {
          id: '1',
          type: 'trend',
          name: '#BookTok',
          message: '#BookTok is trending with 65% growth in the last 24 hours on TikTok.',
          timestamp: '2 hours ago',
          isRead: false
        },
        {
          id: '2',
          type: 'keyword',
          name: 'Sustainable Fashion',
          message: 'Your tracked keyword "Sustainable Fashion" is gaining traction on Instagram with 28% increase in mentions.',
          timestamp: '5 hours ago',
          isRead: true
        },
        {
          id: '3',
          type: 'competitor',
          name: 'Competitor Activity',
          message: 'A competitor in your industry has launched a new campaign around "Plant-Based Recipes".',
          timestamp: '1 day ago',
          isRead: false
        },
        {
          id: '4',
          type: 'trend',
          name: 'Crypto Market',
          message: 'Negative sentiment detected around "Crypto Market" conversations. Consider adjusting your scheduled content.',
          timestamp: '1 day ago',
          isRead: true
        },
        {
          id: '5',
          type: 'keyword',
          name: 'Remote Work',
          message: 'Your tracked keyword "Remote Work" is trending on LinkedIn with high engagement rates.',
          timestamp: '2 days ago',
          isRead: true
        }
      ]
      
      setTrends(mockTrends)
      setFilteredTrends(mockTrends)
      setAlerts(mockAlerts)
      setTrackedKeywords(['Sustainable Fashion', 'Plant-Based', 'Crypto', 'Remote Work'])
      setIsLoading(false)
    }, 1500)
  }, [])
  
  useEffect(() => {
    // Filter and sort trends based on search query, platform, category, and sort option
    let filtered = [...trends]
    
    if (searchQuery) {
      filtered = filtered.filter(trend => 
        trend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trend.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trend.relatedTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }
    
    if (selectedPlatform) {
      filtered = filtered.filter(trend => trend.platform === selectedPlatform)
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(trend => trend.category === selectedCategory)
    }
    
    // Sort trends
    filtered.sort((a, b) => {
      if (sortBy === 'volume') {
        return b.volume - a.volume
      } else {
        return b.growth - a.growth
      }
    })
    
    setFilteredTrends(filtered)
  }, [trends, searchQuery, selectedPlatform, selectedCategory, sortBy])
  
  const toggleTrendTracking = (trendId: string) => {
    setTrends(trends.map(trend => 
      trend.id === trendId ? { ...trend, isTracked: !trend.isTracked } : trend
    ))
  }
  
  const markAlertAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ))
  }
  
  const markAllAlertsAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, isRead: true })))
  }
  
  const addKeywordToTrack = () => {
    if (keywordInput.trim() && !trackedKeywords.includes(keywordInput.trim())) {
      setTrackedKeywords([...trackedKeywords, keywordInput.trim()])
      setKeywordInput('')
    }
  }
  
  const removeKeyword = (keyword: string) => {
    setTrackedKeywords(trackedKeywords.filter(k => k !== keyword))
  }
  
  const unreadAlertsCount = alerts.filter(alert => !alert.isRead).length
  
  // Get unique platforms and categories for filters
  const platforms = Array.from(new Set(trends.map(trend => trend.platform)))
  const categories = Array.from(new Set(trends.map(trend => trend.category)))
  
  return (
    <div className="container page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trend Tracker</h1>
        <div className="flex space-x-2">
          <button 
            className="btn btn-outline relative"
            onClick={() => setShowAlerts(!showAlerts)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            Alerts
            {unreadAlertsCount > 0 && (
              <span className="alert-badge">{unreadAlertsCount}</span>
            )}
          </button>
          <Link to="/create-post" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create Post
          </Link>
        </div>
      </div>
      
      {showAlerts && (
        <div className="card mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Trend Alerts</h2>
            {unreadAlertsCount > 0 && (
              <button 
                className="btn btn-sm btn-outline"
                onClick={markAllAlertsAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>
          
          {alerts.length > 0 ? (
            <div className="space-y-3">
              {alerts.map(alert => (
                <div 
                  key={alert.id}
                  className={`alert-item ${!alert.isRead ? 'unread' : ''}`}
                  onClick={() => markAlertAsRead(alert.id)}
                >
                  <div className="flex items-start">
                    <div className={`alert-icon ${alert.type}`}>
                      {alert.type === 'trend' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                      ) : alert.type === 'keyword' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                          <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 ml-3">
                      <div className="alert-header">
                        <h3 className="font-medium">{alert.name}</h3>
                        <span className="alert-time">{alert.timestamp}</span>
                      </div>
                      <p className="alert-message">{alert.message}</p>
                    </div>
                    {!alert.isRead && (
                      <div className="unread-indicator"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-secondary">No alerts at this time</p>
            </div>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="card">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            
            <div className="mb-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search trends..." 
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
              <h3 className="font-medium mb-2">Sort By</h3>
              <div className="btn-group w-full">
                <button 
                  className={`btn btn-sm flex-1 ${sortBy === 'volume' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setSortBy('volume')}
                >
                  Volume
                </button>
                <button 
                  className={`btn btn-sm flex-1 ${sortBy === 'growth' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setSortBy('growth')}
                >
                  Growth
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Platform</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="platform" 
                    checked={selectedPlatform === null}
                    onChange={() => setSelectedPlatform(null)}
                    className="mr-2"
                  />
                  All Platforms
                </label>
                {platforms.map(platform => (
                  <label key={platform} className="flex items-center">
                    <input 
                      type="radio" 
                      name="platform" 
                      checked={selectedPlatform === platform}
                      onChange={() => setSelectedPlatform(platform)}
                      className="mr-2"
                    />
                    {getPlatformName(platform)}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={selectedCategory === null}
                    onChange={() => setSelectedCategory(null)}
                    className="mr-2"
                  />
                  All Categories
                </label>
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="mr-2"
                    />
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Track Keywords</h3>
              <div className="flex mb-2">
                <input 
                  type="text" 
                  className="input flex-1 mr-2" 
                  placeholder="Add keyword..."
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addKeywordToTrack()
                    }
                  }}
                />
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={addKeywordToTrack}
                  disabled={!keywordInput.trim()}
                >
                  Add
                </button>
              </div>
              
              <div className="tracked-keywords">
                {trackedKeywords.map(keyword => (
                  <div key={keyword} className="tracked-keyword">
                    <span>{keyword}</span>
                    <button 
                      className="keyword-remove"
                      onClick={() => removeKeyword(keyword)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}
                
                {trackedKeywords.length === 0 && (
                  <p className="text-sm text-secondary">No keywords tracked yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="card text-center p-8">
              <div className="spinner mx-auto"></div>
              <p className="mt-4">Loading trends...</p>
            </div>
          ) : filteredTrends.length > 0 ? (
            <div className="space-y-4">
              {filteredTrends.map(trend => (
                <div key={trend.id} className="trend-card">
                  <div className="trend-header">
                    <div className="trend-platform">
                      {trend.platform === 'instagram' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      ) : trend.platform === 'twitter' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      ) : trend.platform === 'tiktok' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                          <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                          <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                          <path d="M15 8v8a4 4 0 0 1-4 4"></path>
                          <line x1="15" y1="4" x2="21" y2="4"></line>
                          <line x1="21" y1="4" x2="21" y2="8"></line>
                        </svg>
                      ) : trend.platform === 'linkedin' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      )}
                      <span>{getPlatformName(trend.platform)}</span>
                    </div>
                    
                    <div className="trend-actions">
                      <button 
                        className={`track-button ${trend.isTracked ? 'active' : ''}`}
                        onClick={() => toggleTrendTracking(trend.id)}
                      >
                        {trend.isTracked ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                              <polyline points="17 21 17 13 7 13 7 21"></polyline>
                              <polyline points="7 3 7 8 15 8"></polyline>
                            </svg>
                            Tracking
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                              <polyline points="17 21 17 13 7 13 7 21"></polyline>
                              <polyline points="7 3 7 8 15 8"></polyline>
                            </svg>
                            Track
                          </>
                        )}
                      </button>
                      
                      <Link to="/create-post" className="btn btn-sm btn-primary">
                        Create Post
                      </Link>
                    </div>
                  </div>
                  
                  <div className="trend-content">
                    <h3 className="trend-name">{trend.name}</h3>
                    <p className="trend-description">{trend.description}</p>
                    
                    <div className="trend-stats">
                      <div className="stat">
                        <div className="stat-label">Volume</div>
                        <div className="stat-value">{formatNumber(trend.volume)}</div>
                      </div>
                      <div className="stat">
                        <div className="stat-label">Growth</div>
                        <div className={`stat-value ${trend.growth >= 0 ? 'positive' : 'negative'}`}>
                          {trend.growth >= 0 ? '+' : ''}{trend.growth}%
                        </div>
                      </div>
                      <div className="stat">
                        <div className="stat-label">Sentiment</div>
                        <div className={`stat-value sentiment-${trend.sentiment}`}>
                          {trend.sentiment.charAt(0).toUpperCase() + trend.sentiment.slice(1)}
                        </div>
                      </div>
                      <div className="stat">
                        <div className="stat-label">Duration</div>
                        <div className="stat-value">{trend.duration}</div>
                      </div>
                    </div>
                    
                    <div className="trend-tags">
                      {trend.relatedTags.map((tag, index) => (
                        <span key={index} className="trend-tag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center p-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-tertiary">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3 className="text-lg font-medium mb-2">No trends found</h3>
              <p className="text-secondary mb-4">Try adjusting your filters or check back later</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedPlatform(null)
                  setSelectedCategory(null)
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function getPlatformName(platformId: string): string {
  const platforms: Record<string, string> = {
    instagram: 'Instagram',
    twitter: 'Twitter',
    tiktok: 'TikTok',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
    pinterest: 'Pinterest'
  }
  
  return platforms[platformId] || platformId
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  } else {
    return num.toString()
  }
}

export default TrendTracker
