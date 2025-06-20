import { useState, useEffect } from 'react'

interface Integration {
  id: string
  name: string
  description: string
  icon: JSX.Element
  status: 'connected' | 'disconnected'
  category: 'storage' | 'design' | 'analytics' | 'other'
  isPopular: boolean
  lastSync?: string
}

const Integrations = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [filteredIntegrations, setFilteredIntegrations] = useState<Integration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showConnectedOnly, setShowConnectedOnly] = useState(false)
  const [connectingId, setConnectingId] = useState<string | null>(null)
  
  useEffect(() => {
    // Simulate loading integrations data
    setIsLoading(true)
    
    setTimeout(() => {
      const mockIntegrations: Integration[] = [
        {
          id: 'canva',
          name: 'Canva',
          description: 'Create and import designs directly from Canva into your content library.',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
            </svg>
          ),
          status: 'disconnected',
          category: 'design',
          isPopular: true
        },
        {
          id: 'google_drive',
          name: 'Google Drive',
          description: 'Access and import files from your Google Drive account.',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2H2v10h10V2z"></path>
              <path d="M12 2h10v10H12V2z"></path>
              <path d="M12 12h10v10H12V12z"></path>
              <path d="M12 12H2v10h10V12z"></path>
            </svg>
          ),
          status: 'connected',
          category: 'storage',
          isPopular: true,
          lastSync: '2 hours ago'
        },
        {
          id: 'dropbox',
          name: 'Dropbox',
          description: 'Access and import files from your Dropbox account.',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 2l10 5-10 5 10 5-10 5"></path>
            </svg>
          ),
          status: 'disconnected',
          category: 'storage',
          isPopular: true
        },
        {
          id: 'google_analytics',
          name: 'Google Analytics',
          description: 'Import analytics data to measure the performance of your social media campaigns.',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 21H3V10H21V21Z"></path>
              <path d="M3 16H21"></path>
              <path d="M8 10V21"></path>
              <path d="M15 10V21"></path>
              <path d="M3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10"></path>
            </svg>
          ),
          status: 'connected',
          category: 'analytics',
          isPopular: false,
          lastSync: '1 day ago'
        },
        {
          id: 'mailchimp',
          name: 'Mailchimp',
          description: 'Sync your email campaigns with your social media content.',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          ),
          status: 'disconnected',
          category: 'other',
          isPopular: false
        },
        {
          id: 'zapier',
          name: 'Zapier',
          description: 'Connect SocialSync with thousands of other apps through Zapier.',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          ),
          status: 'disconnected',
          category: 'other',
          isPopular: true
        },
        {
          id: 'unsplash',
          name: 'Unsplash',
          description: 'Access millions of high-quality stock photos for your social media posts.',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          ),
          status: 'connected',
          category: 'design',
          isPopular: false,
          lastSync: '3 days ago'
        },
        {
          id: 'hubspot',
          name: 'HubSpot',
          description: 'Sync your CRM data with your social media campaigns.',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
          ),
          status: 'disconnected',
          category: 'other',
          isPopular: false
        }
      ]
      
      setIntegrations(mockIntegrations)
      setFilteredIntegrations(mockIntegrations)
      setIsLoading(false)
    }, 1500)
  }, [])
  
  useEffect(() => {
    // Filter integrations based on search query, category, and connection status
    let filtered = [...integrations]
    
    if (searchQuery) {
      filtered = filtered.filter(integration => 
        integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(integration => integration.category === selectedCategory)
    }
    
    if (showConnectedOnly) {
      filtered = filtered.filter(integration => integration.status === 'connected')
    }
    
    setFilteredIntegrations(filtered)
  }, [integrations, searchQuery, selectedCategory, showConnectedOnly])
  
  const handleConnect = (integrationId: string) => {
    setConnectingId(integrationId)
    
    // Simulate connection process
    setTimeout(() => {
      setIntegrations(integrations.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              status: 'connected',
              lastSync: 'Just now'
            } 
          : integration
      ))
      setConnectingId(null)
    }, 2000)
  }
  
  const handleDisconnect = (integrationId: string) => {
    setConnectingId(integrationId)
    
    // Simulate disconnection process
    setTimeout(() => {
      setIntegrations(integrations.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              status: 'disconnected',
              lastSync: undefined
            } 
          : integration
      ))
      setConnectingId(null)
    }, 1500)
  }
  
  const getCategoryName = (category: string): string => {
    switch (category) {
      case 'storage': return 'Storage & File Management'
      case 'design': return 'Design & Creative'
      case 'analytics': return 'Analytics & Reporting'
      case 'other': return 'Other Integrations'
      default: return category
    }
  }
  
  // Get unique categories for filters
  const categories = Array.from(new Set(integrations.map(integration => integration.category)))
  
  // Count connected integrations
  const connectedCount = integrations.filter(integration => integration.status === 'connected').length
  
  return (
    <div className="container page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Integrations</h1>
        <div className="flex items-center">
          <div className="text-secondary mr-4">
            <span className="font-medium">{connectedCount}</span> of {integrations.length} connected
          </div>
          <button className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            API Settings
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="card">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            
            <div className="mb-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search integrations..." 
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
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={showConnectedOnly}
                  onChange={() => setShowConnectedOnly(!showConnectedOnly)}
                  className="mr-2"
                />
                Show connected only
              </label>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Categories</h3>
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
                    {getCategoryName(category)}
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-secondary text-sm mb-3">
                Having trouble with integrations? Check our documentation or contact support.
              </p>
              <div className="space-y-2">
                <button className="btn btn-sm btn-outline w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  View Documentation
                </button>
                <button className="btn btn-sm btn-outline w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="card text-center p-8">
              <div className="spinner mx-auto"></div>
              <p className="mt-4">Loading integrations...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Popular Integrations Section */}
              {!selectedCategory && !searchQuery && !showConnectedOnly && (
                <div className="card">
                  <h2 className="text-lg font-bold mb-4">Popular Integrations</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {integrations
                      .filter(integration => integration.isPopular)
                      .map(integration => (
                        <div key={integration.id} className="integration-card">
                          <div className="integration-icon">
                            {integration.icon}
                          </div>
                          <div className="integration-content">
                            <h3 className="integration-name">{integration.name}</h3>
                            <div className={`integration-status ${integration.status}`}>
                              {integration.status === 'connected' ? (
                                <>
                                  <span className="status-dot"></span>
                                  Connected
                                </>
                              ) : 'Not Connected'}
                            </div>
                          </div>
                          <div className="integration-action">
                            {integration.status === 'connected' ? (
                              <button 
                                className="btn btn-sm btn-outline"
                                onClick={() => handleDisconnect(integration.id)}
                                disabled={connectingId === integration.id}
                              >
                                {connectingId === integration.id ? (
                                  <div className="spinner-sm"></div>
                                ) : (
                                  'Disconnect'
                                )}
                              </button>
                            ) : (
                              <button 
                                className="btn btn-sm btn-primary"
                                onClick={() => handleConnect(integration.id)}
                                disabled={connectingId === integration.id}
                              >
                                {connectingId === integration.id ? (
                                  <div className="spinner-sm"></div>
                                ) : (
                                  'Connect'
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              {/* All Integrations Section */}
              {categories.map(category => {
                const categoryIntegrations = filteredIntegrations.filter(
                  integration => integration.category === category
                )
                
                if (categoryIntegrations.length === 0) return null
                
                return (
                  <div key={category} className="card">
                    <h2 className="text-lg font-bold mb-4">{getCategoryName(category)}</h2>
                    
                    <div className="space-y-4">
                      {categoryIntegrations.map(integration => (
                        <div key={integration.id} className="integration-item">
                          <div className="integration-item-content">
                            <div className="integration-item-icon">
                              {integration.icon}
                            </div>
                            <div className="integration-item-info">
                              <h3 className="integration-item-name">{integration.name}</h3>
                              <p className="integration-item-description">{integration.description}</p>
                              {integration.status === 'connected' && integration.lastSync && (
                                <div className="integration-item-sync">
                                  Last synced: {integration.lastSync}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="integration-item-action">
                            {integration.status === 'connected' ? (
                              <button 
                                className="btn btn-outline"
                                onClick={() => handleDisconnect(integration.id)}
                                disabled={connectingId === integration.id}
                              >
                                {connectingId === integration.id ? (
                                  <>
                                    <div className="spinner-sm mr-2"></div>
                                    Disconnecting...
                                  </>
                                ) : (
                                  <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                                      <line x1="12" y1="2" x2="12" y2="12"></line>
                                    </svg>
                                    Disconnect
                                  </>
                                )}
                              </button>
                            ) : (
                              <button 
                                className="btn btn-primary"
                                onClick={() => handleConnect(integration.id)}
                                disabled={connectingId === integration.id}
                              >
                                {connectingId === integration.id ? (
                                  <>
                                    <div className="spinner-sm mr-2"></div>
                                    Connecting...
                                  </>
                                ) : (
                                  <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                      <path d="M5 12h14"></path>
                                      <path d="M12 5v14"></path>
                                    </svg>
                                    Connect
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
              
              {filteredIntegrations.length === 0 && (
                <div className="card text-center p-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-tertiary">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <h3 className="text-lg font-medium mb-2">No integrations found</h3>
                  <p className="text-secondary mb-4">Try adjusting your filters or search query</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory(null)
                      setShowConnectedOnly(false)
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
          )}
        </div>
      </div>
    </div>
  )
}

export default Integrations
