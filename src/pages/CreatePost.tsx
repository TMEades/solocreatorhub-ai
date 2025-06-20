import { useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePostStore, MediaFile } from '../stores/postStore'
import PlatformSelector from '../components/posts/PlatformSelector'
import HashtagSuggestions from '../components/posts/HashtagSuggestions'
import MediaUploader from '../components/posts/MediaUploader'
import RecurrenceSelector, { RecurrenceSettings } from '../components/posts/RecurrenceSelector'
import OptimalTimeSelector from '../components/posts/OptimalTimeSelector'
import { toast } from 'react-toastify'

const CreatePost = () => {
  const navigate = useNavigate()
  const { createPost, isLoading } = usePostStore()
  
  const [content, setContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [media, setMedia] = useState<MediaFile[]>([])
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [activePlatformTab, setActivePlatformTab] = useState('')
  const [useOptimalTime, setUseOptimalTime] = useState(false)
  const [recurrenceSettings, setRecurrenceSettings] = useState<RecurrenceSettings>({
    enabled: false,
    frequency: 'weekly',
    interval: 1,
    weekdays: [new Date().getDay()],
    endType: 'never'
  })
  
  useEffect(() => {
    if (selectedPlatforms.length > 0 && !activePlatformTab) {
      setActivePlatformTab(selectedPlatforms[0])
    }
  }, [selectedPlatforms, activePlatformTab])
  
  const handleHashtagSelect = (hashtag: string) => {
    if (selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(selectedHashtags.filter(h => h !== hashtag))
    } else {
      setSelectedHashtags([...selectedHashtags, hashtag])
    }
  }
  
  const handleOptimalTimeSelected = (time: string) => {
    setScheduledTime(time)
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) {
      toast.error('Please enter some content for your post')
      return
    }
    
    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform')
      return
    }
    
    let scheduledFor: string | undefined
    if (isScheduled) {
      if (!scheduledDate || !scheduledTime) {
        toast.error('Please select both date and time for scheduling')
        return
      }
      scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
    }
    
    try {
      await createPost(
        {
          content,
          platforms: selectedPlatforms,
          hashtags: selectedHashtags,
          scheduledFor,
          recurrence: recurrenceSettings.enabled ? recurrenceSettings : undefined
        },
        media
      )
      
      const successMessage = recurrenceSettings.enabled
        ? 'Recurring post created successfully!'
        : isScheduled
        ? 'Post scheduled successfully!'
        : 'Post published successfully!'
      
      toast.success(successMessage)
      navigate('/dashboard')
    } catch (error) {
      toast.error('Failed to create post. Please try again.')
    }
  }
  
  return (
    <div className="container page">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="card mb-6">
            <div className="form-group">
              <label htmlFor="content" className="form-label">Post Content</label>
              <textarea
                id="content"
                className="form-input"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What would you like to share?"
              ></textarea>
              <div className="flex justify-end mt-1">
                <span className="text-sm text-secondary">
                  {content.length} characters
                </span>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Media</label>
              <MediaUploader media={media} onChange={setMedia} />
            </div>
          </div>
          
          <div className="card mb-6">
            <div className="form-group">
              <label className="form-label">Select Platforms</label>
              <PlatformSelector 
                selectedPlatforms={selectedPlatforms} 
                onChange={setSelectedPlatforms} 
              />
            </div>
          </div>
          
          {selectedPlatforms.length > 0 && (
            <div className="card mb-6">
              <div className="form-group">
                <label className="form-label">Trending Hashtags</label>
                
                <div className="border-b mb-4">
                  <div className="flex overflow-x-auto">
                    {selectedPlatforms.map(platform => (
                      <button
                        key={platform}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                          activePlatformTab === platform
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-secondary'
                        }`}
                        onClick={() => setActivePlatformTab(platform)}
                      >
                        {getPlatformName(platform)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <HashtagSuggestions
                  platform={activePlatformTab}
                  selectedHashtags={selectedHashtags}
                  onSelect={handleHashtagSelect}
                />
                
                {selectedHashtags.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-medium mb-2">Selected Hashtags</div>
                    <div className="flex flex-wrap">
                      {selectedHashtags.map((hashtag, index) => (
                        <div
                          key={index}
                          className="hashtag selected"
                          onClick={() => handleHashtagSelect(hashtag)}
                        >
                          {hashtag}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="card mb-6">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="schedule"
                checked={isScheduled}
                onChange={(e) => setIsScheduled(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="schedule" className="form-label mb-0">Schedule for later</label>
            </div>
            
            {isScheduled && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="form-group mb-0">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                      type="date"
                      id="date"
                      className="form-input"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  {useOptimalTime ? (
                    <div className="form-group mb-0">
                      <label className="form-label">Optimal Time</label>
                      <OptimalTimeSelector 
                        selectedPlatforms={selectedPlatforms}
                        onTimeSelected={handleOptimalTimeSelected}
                      />
                    </div>
                  ) : (
                    <div className="form-group mb-0">
                      <label htmlFor="time" className="form-label">Time</label>
                      <input
                        type="time"
                        id="time"
                        className="form-input"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="optimal-time"
                    checked={useOptimalTime}
                    onChange={(e) => setUseOptimalTime(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="optimal-time" className="text-sm">
                    Use AI-recommended optimal time for maximum engagement
                  </label>
                </div>
                
                <RecurrenceSelector 
                  value={recurrenceSettings}
                  onChange={setRecurrenceSettings}
                />
              </>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn-outline mr-3"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading
                ? 'Creating...'
                : recurrenceSettings.enabled
                ? 'Create Recurring Post'
                : isScheduled
                ? 'Schedule Post'
                : 'Publish Now'}
            </button>
          </div>
        </form>
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

export default CreatePost
