import { useState, useEffect } from 'react'
import { Platform, usePostStore } from '../../stores/postStore'

interface PlatformSelectorProps {
  selectedPlatforms: string[]
  onChange: (platforms: string[]) => void
}

const PlatformSelector = ({ selectedPlatforms, onChange }: PlatformSelectorProps) => {
  const { platforms, fetchPlatforms, isLoading } = usePostStore()
  
  useEffect(() => {
    fetchPlatforms()
  }, [fetchPlatforms])
  
  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      onChange(selectedPlatforms.filter(id => id !== platformId))
    } else {
      onChange([...selectedPlatforms, platformId])
    }
  }
  
  if (isLoading) {
    return <div>Loading platforms...</div>
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {platforms.map(platform => (
        <div 
          key={platform.id}
          className={`p-4 border rounded flex items-center cursor-pointer ${
            selectedPlatforms.includes(platform.id) 
              ? 'border-primary bg-primary bg-opacity-5' 
              : 'border-border'
          }`}
          onClick={() => platform.connected && togglePlatform(platform.id)}
        >
          <div className="w-10 h-10 flex items-center justify-center mr-3">
            {platform.id === 'instagram' || platform.id === 'instagram_reels' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            ) : platform.id === 'facebook' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            ) : platform.id === 'tiktok' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                <path d="M15 8v8a4 4 0 0 1-4 4"></path>
                <line x1="15" y1="4" x2="21" y2="4"></line>
                <line x1="21" y1="4" x2="21" y2="8"></line>
              </svg>
            ) : platform.id === 'youtube' || platform.id === 'youtube_shorts' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            )}
          </div>
          <div>
            <div className="font-medium">{platform.name}</div>
            {platform.connected ? (
              <div className="text-sm text-green-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Connected
              </div>
            ) : (
              <div className="text-sm text-error flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Not connected
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PlatformSelector
