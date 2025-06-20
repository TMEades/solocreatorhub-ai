import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePostStore, Post } from '../stores/postStore'
import { RecurrenceSettings } from '../components/posts/RecurrenceSelector'
import { toast } from 'react-toastify'

const RecurringPosts = () => {
  const { posts, fetchPosts, deletePost, isLoading } = usePostStore()
  const [recurringPosts, setRecurringPosts] = useState<Post[]>([])
  const [filter, setFilter] = useState<string>('all')
  
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
  
  useEffect(() => {
    // Filter posts with recurrence settings
    const recurring = posts
      .filter(post => post.recurrence && post.recurrence.enabled)
      .sort((a, b) => {
        const dateA = a.nextOccurrence ? new Date(a.nextOccurrence).getTime() : Infinity
        const dateB = b.nextOccurrence ? new Date(b.nextOccurrence).getTime() : Infinity
        return dateA - dateB
      })
    
    setRecurringPosts(recurring)
  }, [posts])
  
  const handlePauseToggle = async (post: Post) => {
    try {
      // In a real app, this would call an API to pause/resume the recurring post
      toast.success(`${post.recurrence?.enabled ? 'Paused' : 'Resumed'} recurring post`)
      
      // For now, we'll just update the UI
      setRecurringPosts(prevPosts => 
        prevPosts.map(p => {
          if (p._id === post._id) {
            return {
              ...p,
              recurrence: {
                ...p.recurrence!,
                enabled: !p.recurrence!.enabled
              }
            }
          }
          return p
        })
      )
    } catch (error) {
      toast.error('Failed to update recurring post')
    }
  }
  
  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this recurring post? All future occurrences will be canceled.')) {
      try {
        await deletePost(postId)
        toast.success('Recurring post deleted successfully')
      } catch (error) {
        toast.error('Failed to delete recurring post')
      }
    }
  }
  
  const filteredPosts = filter === 'all' 
    ? recurringPosts 
    : filter === 'active' 
    ? recurringPosts.filter(post => post.recurrence?.enabled) 
    : recurringPosts.filter(post => !post.recurrence?.enabled)
  
  return (
    <div className="container page">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Recurring Posts</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="btn-group">
            <button 
              className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`btn btn-sm ${filter === 'active' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`btn btn-sm ${filter === 'paused' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('paused')}
            >
              Paused
            </button>
          </div>
          
          <Link to="/create-post" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Recurring Post
          </Link>
        </div>
      </div>
      
      {isLoading ? (
        <div className="card text-center p-8">
          <div className="spinner mx-auto"></div>
          <p className="mt-4">Loading recurring posts...</p>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <div key={post._id} className="card p-4">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${post.recurrence?.enabled ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    <h3 className="text-lg font-medium">
                      {post.content.length > 50 ? post.content.substring(0, 50) + '...' : post.content}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap mb-3">
                    {post.platforms.map((platform, i) => (
                      <div key={i} className="mr-2 mb-2">
                        {platform === 'instagram' || platform === 'instagram_reels' ? (
                          <span className="badge bg-pink-100 text-pink-800">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                            {platform === 'instagram' ? 'Instagram' : 'Reels'}
                          </span>
                        ) : platform === 'facebook' ? (
                          <span className="badge bg-blue-100 text-blue-800">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                            Facebook
                          </span>
                        ) : platform === 'tiktok' ? (
                          <span className="badge bg-gray-100 text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                              <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                              <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                              <path d="M15 8v8a4 4 0 0 1-4 4"></path>
                              <line x1="15" y1="4" x2="21" y2="4"></line>
                              <line x1="21" y1="4" x2="21" y2="8"></line>
                            </svg>
                            TikTok
                          </span>
                        ) : platform === 'youtube' || platform === 'youtube_shorts' ? (
                          <span className="badge bg-red-100 text-red-800">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                            </svg>
                            {platform === 'youtube' ? 'YouTube' : 'Shorts'}
                          </span>
                        ) : (
                          <span className="badge bg-blue-100 text-blue-800">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect x="2" y="9" width="4" height="12"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                            LinkedIn
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-secondary">Schedule</div>
                      <div>
                        {post.recurrence?.frequency === 'daily' && (
                          <>Every {post.recurrence.interval > 1 ? `${post.recurrence.interval} days` : 'day'}</>
                        )}
                        {post.recurrence?.frequency === 'weekly' && (
                          <>
                            Every {post.recurrence.interval > 1 ? `${post.recurrence.interval} weeks` : 'week'} on{' '}
                            {formatWeekdays(post.recurrence.weekdays || [])}
                          </>
                        )}
                        {post.recurrence?.frequency === 'monthly' && (
                          <>
                            Every {post.recurrence.interval > 1 ? `${post.recurrence.interval} months` : 'month'} on day{' '}
                            {post.recurrence.monthDay}
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-secondary">Next Post</div>
                      <div>
                        {post.recurrence?.enabled && post.nextOccurrence
                          ? formatDate(post.nextOccurrence)
                          : 'Paused'}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-secondary">End</div>
                      <div>
                        {post.recurrence?.endType === 'never' && 'Never'}
                        {post.recurrence?.endType === 'after' && `After ${post.recurrence.endAfterOccurrences} occurrences`}
                        {post.recurrence?.endType === 'on' && post.recurrence.endDate && `On ${formatDate(post.recurrence.endDate)}`}
                      </div>
                    </div>
                  </div>
                  
                  {post.mediaUrls.length > 0 && (
                    <div className="flex space-x-2 mb-3">
                      {post.mediaUrls.slice(0, 3).map((url, i) => (
                        <img 
                          key={i}
                          src={url} 
                          alt={`Post media ${i + 1}`} 
                          className="w-16 h-16 rounded object-cover"
                        />
                      ))}
                      {post.mediaUrls.length > 3 && (
                        <div className="w-16 h-16 rounded bg-background flex items-center justify-center text-xs">
                          +{post.mediaUrls.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-row md:flex-col justify-end space-y-0 space-x-2 md:space-y-2 md:space-x-0 mt-4 md:mt-0">
                  <button 
                    className={`btn btn-sm ${post.recurrence?.enabled ? 'btn-outline' : 'btn-primary'}`}
                    onClick={() => handlePauseToggle(post)}
                  >
                    {post.recurrence?.enabled ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <rect x="6" y="4" width="4" height="16"></rect>
                          <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                        Pause
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Resume
                      </>
                    )}
                  </button>
                  
                  <Link to={`/edit-post/${post._id}`} className="btn btn-sm btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit
                  </Link>
                  
                  <button 
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleDelete(post._id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Delete
                  </button>
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
          <h3 className="text-lg font-medium mb-2">No recurring posts found</h3>
          <p className="text-secondary mb-4">
            {filter === 'all' 
              ? 'You haven\'t created any recurring posts yet.' 
              : filter === 'active' 
              ? 'You don\'t have any active recurring posts.' 
              : 'You don\'t have any paused recurring posts.'}
          </p>
          <Link to="/create-post" className="btn btn-primary">Create Recurring Post</Link>
        </div>
      )}
    </div>
  )
}

function formatWeekdays(days: number[]): string {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const sortedDays = [...days].sort((a, b) => a - b)
  
  if (sortedDays.length === 0) return ''
  if (sortedDays.length === 1) return dayNames[sortedDays[0]]
  if (sortedDays.length === 7) return 'every day'
  
  if (sortedDays.length === 2) {
    return `${dayNames[sortedDays[0]]} and ${dayNames[sortedDays[1]]}`
  }
  
  const lastDay = sortedDays.pop()
  return `${sortedDays.map(d => dayNames[d]).join(', ')} and ${dayNames[lastDay!]}`
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

export default RecurringPosts
