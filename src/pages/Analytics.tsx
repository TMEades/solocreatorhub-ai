import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePostStore } from '../stores/postStore'
import EngagementChart from '../components/analytics/EngagementChart'
import ReachChart from '../components/analytics/ReachChart'
import GrowthChart from '../components/analytics/GrowthChart'
import BestTimeChart from '../components/analytics/BestTimeChart'
import OptimalTimesChart from '../components/analytics/OptimalTimesChart'
import PlatformComparison from '../components/analytics/PlatformComparison'
import DateRangePicker from '../components/common/DateRangePicker'
import ExportReportButton from '../components/analytics/ExportReportButton'

const Analytics = () => {
  const { posts } = usePostStore()
  const [dateRange, setDateRange] = useState({ start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), end: new Date() })
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'facebook', 'tiktok'])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'optimal-times'>('overview')
  
  useEffect(() => {
    // Simulate loading analytics data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [dateRange, selectedPlatforms])
  
  const handlePlatformToggle = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform))
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform])
    }
  }
  
  const handleDateRangeChange = (start: Date, end: Date) => {
    setDateRange({ start, end })
    setIsLoading(true)
  }
  
  return (
    <div className="container page">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Analytics</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <DateRangePicker 
            startDate={dateRange.start} 
            endDate={dateRange.end} 
            onChange={handleDateRangeChange} 
          />
          
          <ExportReportButton dateRange={dateRange} platforms={selectedPlatforms} />
        </div>
      </div>
      
      <div className="card mb-6 p-4">
        <h2 className="text-lg font-bold mb-4">Platforms</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            className={`btn btn-sm ${selectedPlatforms.includes('instagram') ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handlePlatformToggle('instagram')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            Facebook
          </button>
          
          <button 
            className={`btn btn-sm ${selectedPlatforms.includes('tiktok') ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handlePlatformToggle('tiktok')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
              <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
              <path d="M15 8v8a4 4 0 0 1-4 4"></path>
              <line x1="15" y1="4" x2="21" y2="4"></line>
              <line x1="21" y1="4" x2="21" y2="8"></line>
            </svg>
            TikTok
          </button>
          
          <button 
            className={`btn btn-sm ${selectedPlatforms.includes('youtube') ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handlePlatformToggle('youtube')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
            YouTube
          </button>
          
          <button 
            className={`btn btn-sm ${selectedPlatforms.includes('linkedin') ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handlePlatformToggle('linkedin')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            LinkedIn
          </button>
        </div>
      </div>
      
      <div className="card mb-6">
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-secondary'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'optimal-times'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-secondary'
              }`}
              onClick={() => setActiveTab('optimal-times')}
            >
              Optimal Posting Times
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {isLoading ? (
            <div className="text-center p-8">
              <div className="spinner mx-auto"></div>
              <p className="mt-4">Loading analytics data...</p>
            </div>
          ) : activeTab === 'overview' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-lg font-bold mb-4">Engagement Overview</h2>
                  <EngagementChart platforms={selectedPlatforms} dateRange={dateRange} />
                </div>
                
                <div>
                  <h2 className="text-lg font-bold mb-4">Reach & Impressions</h2>
                  <ReachChart platforms={selectedPlatforms} dateRange={dateRange} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-lg font-bold mb-4">Follower Growth</h2>
                  <GrowthChart platforms={selectedPlatforms} dateRange={dateRange} />
                </div>
                
                <div>
                  <h2 className="text-lg font-bold mb-4">Best Times to Post</h2>
                  <BestTimeChart platforms={selectedPlatforms} dateRange={dateRange} />
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-bold mb-4">Platform Comparison</h2>
                <PlatformComparison platforms={selectedPlatforms} dateRange={dateRange} />
              </div>
            </>
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-4">Optimal Posting Times by Hour</h2>
                <OptimalTimesChart platforms={selectedPlatforms} dateRange={dateRange} />
              </div>
              
              <div className="bg-background p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Auto-Publishing Recommendations</h3>
                <p className="text-sm mb-4">
                  Based on your audience engagement patterns, we recommend scheduling your posts at these optimal times:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedPlatforms.map(platform => {
                    // Generate optimal times based on platform
                    let times: string[] = []
                    
                    if (platform === 'instagram' || platform === 'instagram_reels') {
                      times = ['8:30 AM', '12:15 PM', '5:45 PM', '8:30 PM']
                    } else if (platform === 'facebook') {
                      times = ['9:00 AM', '1:30 PM', '3:45 PM', '7:00 PM']
                    } else if (platform === 'tiktok') {
                      times = ['10:30 AM', '2:00 PM', '6:30 PM', '9:15 PM']
                    } else if (platform === 'youtube' || platform === 'youtube_shorts') {
                      times = ['11:00 AM', '3:30 PM', '7:45 PM', '10:00 PM']
                    } else {
                      times = ['8:00 AM', '11:30 AM', '4:00 PM', '6:30 PM']
                    }
                    
                    return (
                      <div key={platform} className="border rounded p-3">
                        <div className="font-medium mb-2">{getPlatformName(platform)}</div>
                        <div className="space-y-1 text-sm">
                          {times.map((time, i) => (
                            <div key={i} className="flex justify-between">
                              <span>{time}</span>
                              <span className="text-secondary">
                                {i === 0 ? 'Best' : i === 1 ? 'Great' : i === 2 ? 'Good' : 'Decent'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="flex justify-center">
                <Link to="/create-post" className="btn btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Create Post with Optimal Timing
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Competitor Benchmarking</h2>
          <Link to="/competitors" className="text-sm text-primary">Manage competitors</Link>
        </div>
        
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-tertiary">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <h3 className="text-lg font-medium mb-2">No competitors added</h3>
          <p className="text-secondary mb-4">Add competitors to benchmark your performance</p>
          <Link to="/competitors/add" className="btn btn-primary">Add Competitor</Link>
        </div>
      </div>
    </div>
  )
}

function getPlatformName(platformId: string): string {
  const platforms: Record<string, string> = {
    instagram: 'Instagram',
    instagram_reels: 'Instagram Reels',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    youtube_shorts: 'YouTube Shorts',
    linkedin: 'LinkedIn'
  }
  
  return platforms[platformId] || platformId
}

export default Analytics
