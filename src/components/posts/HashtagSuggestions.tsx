import { useState, useEffect } from 'react'
import { Hashtag, usePostStore } from '../../stores/postStore'

interface HashtagSuggestionsProps {
  platform: string
  selectedHashtags: string[]
  onSelect: (hashtag: string) => void
}

const HashtagSuggestions = ({ platform, selectedHashtags, onSelect }: HashtagSuggestionsProps) => {
  const { trendingHashtags, fetchTrendingHashtags, isLoading } = usePostStore()
  
  useEffect(() => {
    if (platform) {
      fetchTrendingHashtags(platform)
    }
  }, [platform, fetchTrendingHashtags])
  
  const hashtags = trendingHashtags[platform] || []
  
  if (!platform) {
    return <div className="text-sm text-secondary">Select a platform to see trending hashtags</div>
  }
  
  if (isLoading) {
    return <div className="text-sm">Loading trending hashtags...</div>
  }
  
  if (hashtags.length === 0) {
    return <div className="text-sm text-secondary">No trending hashtags available for this platform</div>
  }
  
  return (
    <div>
      <div className="mb-2 text-sm font-medium">Trending hashtags for {getPlatformName(platform)}</div>
      <div className="flex flex-wrap">
        {hashtags.map(hashtag => (
          <div
            key={hashtag.id}
            className={`hashtag ${selectedHashtags.includes(hashtag.text) ? 'selected' : ''}`}
            onClick={() => onSelect(hashtag.text)}
          >
            {hashtag.text}
          </div>
        ))}
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

export default HashtagSuggestions
