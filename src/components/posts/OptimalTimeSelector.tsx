import { useState, useEffect } from 'react'
import { useAnalyticsStore } from '../../stores/analyticsStore'

interface OptimalTimeSelectorProps {
  selectedPlatforms: string[]
  onTimeSelected: (time: string) => void
}

const OptimalTimeSelector = ({ selectedPlatforms, onTimeSelected }: OptimalTimeSelectorProps) => {
  const { optimalTimes, fetchOptimalTimes, isLoading } = useAnalyticsStore()
  const [selectedTime, setSelectedTime] = useState<string>('')
  
  // Get the first platform from the selected platforms
  const primaryPlatform = selectedPlatforms.length > 0 ? selectedPlatforms[0] : ''
  
  useEffect(() => {
    if (selectedPlatforms.length === 0) return
    
    fetchOptimalTimes(selectedPlatforms)
  }, [selectedPlatforms, fetchOptimalTimes])
  
  useEffect(() => {
    // Select the first optimal time from the primary platform by default
    if (primaryPlatform && 
        optimalTimes[primaryPlatform] && 
        optimalTimes[primaryPlatform].length > 0) {
      const bestTime = optimalTimes[primaryPlatform][0]
      setSelectedTime(bestTime)
      onTimeSelected(bestTime)
    }
  }, [optimalTimes, primaryPlatform, onTimeSelected])
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    onTimeSelected(time)
  }
  
  const getPlatformName = (platformId: string): string => {
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
  
  if (selectedPlatforms.length === 0) {
    return (
      <div className="text-secondary text-sm">
        Select at least one platform to see optimal posting times
      </div>
    )
  }
  
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center">
          <div className="spinner spinner-sm mr-2"></div>
          <span>Analyzing best times...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.keys(optimalTimes).length > 0 ? (
            <>
              <div className="text-sm text-secondary mb-2">
                Based on your audience engagement patterns, these are the best times to post:
              </div>
              
              {Object.entries(optimalTimes).map(([platform, times]) => (
                <div key={platform} className="mb-4">
                  <div className="font-medium mb-2">{getPlatformName(platform)}</div>
                  <div className="flex flex-wrap gap-2">
                    {times.map((time, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`btn btn-sm ${
                          selectedTime === time ? 'btn-primary' : 'btn-outline'
                        }`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {formatTime(time)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="text-sm mt-2">
                <p>
                  <strong>Pro tip:</strong> Posting at {formatTime(selectedTime)} typically results in 
                  {primaryPlatform === 'instagram' && ' 37% higher engagement for photo content.'}
                  {primaryPlatform === 'facebook' && ' 28% more reach and comments.'}
                  {primaryPlatform === 'tiktok' && ' 42% more views in the first hour.'}
                  {primaryPlatform === 'youtube' && ' 23% more initial views and better retention.'}
                  {primaryPlatform === 'linkedin' && ' 31% more professional engagement and shares.'}
                </p>
              </div>
            </>
          ) : (
            <div className="text-secondary">
              Not enough engagement data to determine optimal posting times.
              Continue posting to build your analytics profile.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  
  return `${hour12}:${minutes} ${ampm}`
}

export default OptimalTimeSelector
