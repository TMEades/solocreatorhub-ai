import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePostStore, Post } from '../stores/postStore'

type CalendarView = 'month' | 'week' | 'day'

const Calendar = () => {
  const { posts, fetchPosts, isLoading } = usePostStore()
  const [view, setView] = useState<CalendarView>('month')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState<Date[]>([])
  const [scheduledPosts, setScheduledPosts] = useState<Record<string, Post[]>>({})
  
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
  
  useEffect(() => {
    // Generate calendar days based on current view and date
    const days: Date[] = []
    
    if (view === 'month') {
      // Get first day of month
      const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
      // Get last day of month
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
      
      // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
      const firstDayOfWeek = firstDay.getDay()
      
      // Add days from previous month to fill the first week
      for (let i = firstDayOfWeek; i > 0; i--) {
        const prevMonthDay = new Date(firstDay)
        prevMonthDay.setDate(prevMonthDay.getDate() - i)
        days.push(prevMonthDay)
      }
      
      // Add all days of current month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i))
      }
      
      // Add days from next month to complete the grid (6 rows x 7 days = 42 cells)
      const remainingDays = 42 - days.length
      for (let i = 1; i <= remainingDays; i++) {
        const nextMonthDay = new Date(lastDay)
        nextMonthDay.setDate(nextMonthDay.getDate() + i)
        days.push(nextMonthDay)
      }
    } else if (view === 'week') {
      // Get first day of week (Sunday)
      const firstDayOfWeek = new Date(currentDate)
      const day = currentDate.getDay()
      firstDayOfWeek.setDate(currentDate.getDate() - day)
      
      // Add all 7 days of the week
      for (let i = 0; i < 7; i++) {
        const weekDay = new Date(firstDayOfWeek)
        weekDay.setDate(firstDayOfWeek.getDate() + i)
        days.push(weekDay)
      }
    } else if (view === 'day') {
      // Just the current day
      days.push(new Date(currentDate))
    }
    
    setCalendarDays(days)
  }, [view, currentDate])
  
  useEffect(() => {
    // Group scheduled posts by date
    const postsByDate: Record<string, Post[]> = {}
    
    posts.forEach(post => {
      if (post.scheduledFor) {
        const dateKey = new Date(post.scheduledFor).toDateString()
        if (!postsByDate[dateKey]) {
          postsByDate[dateKey] = []
        }
        postsByDate[dateKey].push(post)
      }
    })
    
    setScheduledPosts(postsByDate)
  }, [posts])
  
  const navigatePrevious = () => {
    const newDate = new Date(currentDate)
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7)
    } else if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1)
    }
    setCurrentDate(newDate)
  }
  
  const navigateNext = () => {
    const newDate = new Date(currentDate)
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7)
    } else if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }
  
  const navigateToday = () => {
    setCurrentDate(new Date())
  }
  
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }
  
  const formatWeek = (date: Date) => {
    const firstDayOfWeek = new Date(date)
    const day = date.getDay()
    firstDayOfWeek.setDate(date.getDate() - day)
    
    const lastDayOfWeek = new Date(firstDayOfWeek)
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6)
    
    const formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
    return `${firstDayOfWeek.toLocaleDateString('en-US', formatOptions)} - ${lastDayOfWeek.toLocaleDateString('en-US', formatOptions)}`
  }
  
  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }
  
  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }
  
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }
  
  return (
    <div className="container page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Content Calendar</h1>
        <Link to="/create-post" className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Schedule Post
        </Link>
      </div>
      
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex items-center mb-4 sm:mb-0">
            <button 
              className="btn btn-outline p-2 mr-2"
              onClick={navigatePrevious}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <button 
              className="btn btn-outline p-2 mr-4"
              onClick={navigateNext}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            
            <h2 className="text-lg font-bold">
              {view === 'month' && formatMonthYear(currentDate)}
              {view === 'week' && formatWeek(currentDate)}
              {view === 'day' && formatDay(currentDate)}
            </h2>
          </div>
          
          <div className="flex">
            <button 
              className="btn btn-sm btn-outline mr-2"
              onClick={navigateToday}
            >
              Today
            </button>
            
            <div className="btn-group">
              <button 
                className={`btn btn-sm ${view === 'month' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setView('month')}
              >
                Month
              </button>
              <button 
                className={`btn btn-sm ${view === 'week' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setView('week')}
              >
                Week
              </button>
              <button 
                className={`btn btn-sm ${view === 'day' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setView('day')}
              >
                Day
              </button>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center p-8">
            <div className="spinner mx-auto"></div>
            <p className="mt-4">Loading calendar...</p>
          </div>
        ) : (
          <>
            {view === 'month' && (
              <div className="calendar-month">
                <div className="calendar-header grid grid-cols-7">
                  <div className="calendar-cell font-medium">Sun</div>
                  <div className="calendar-cell font-medium">Mon</div>
                  <div className="calendar-cell font-medium">Tue</div>
                  <div className="calendar-cell font-medium">Wed</div>
                  <div className="calendar-cell font-medium">Thu</div>
                  <div className="calendar-cell font-medium">Fri</div>
                  <div className="calendar-cell font-medium">Sat</div>
                </div>
                
                <div className="calendar-body grid grid-cols-7">
                  {calendarDays.map((day, index) => {
                    const dateKey = day.toDateString()
                    const dayPosts = scheduledPosts[dateKey] || []
                    
                    return (
                      <div 
                        key={index} 
                        className={`calendar-cell ${isToday(day) ? 'today' : ''} ${!isCurrentMonth(day) ? 'other-month' : ''}`}
                      >
                        <div className="calendar-date">{day.getDate()}</div>
                        
                        <div className="calendar-events">
                          {dayPosts.slice(0, 3).map((post, i) => (
                            <div key={i} className="calendar-event">
                              <div className="flex items-center">
                                {post.platforms.slice(0, 2).map((platform, j) => (
                                  <div key={j} className="platform-icon mr-1">
                                    {platform === 'instagram' || platform === 'instagram_reels' ? (
                                      <span className="text-pink-500">●</span>
                                    ) : platform === 'facebook' ? (
                                      <span className="text-blue-600">●</span>
                                    ) : platform === 'tiktok' ? (
                                      <span className="text-black">●</span>
                                    ) : platform === 'youtube' || platform === 'youtube_shorts' ? (
                                      <span className="text-red-600">●</span>
                                    ) : (
                                      <span className="text-blue-700">●</span>
                                    )}
                                  </div>
                                ))}
                                <span className="truncate text-xs">
                                  {post.content.substring(0, 20)}...
                                </span>
                              </div>
                            </div>
                          ))}
                          
                          {dayPosts.length > 3 && (
                            <div className="text-xs text-secondary">
                              +{dayPosts.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            
            {view === 'week' && (
              <div className="calendar-week">
                <div className="calendar-header grid grid-cols-7">
                  {calendarDays.map((day, index) => (
                    <div key={index} className={`calendar-cell font-medium ${isToday(day) ? 'today' : ''}`}>
                      <div>{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                      <div>{day.getDate()}</div>
                    </div>
                  ))}
                </div>
                
                <div className="calendar-body grid grid-cols-7">
                  {calendarDays.map((day, index) => {
                    const dateKey = day.toDateString()
                    const dayPosts = scheduledPosts[dateKey] || []
                    
                    return (
                      <div 
                        key={index} 
                        className={`calendar-cell week-cell ${isToday(day) ? 'today' : ''}`}
                      >
                        {dayPosts.map((post, i) => (
                          <div key={i} className="calendar-event week-event">
                            <div className="event-time">
                              {post.scheduledFor && new Date(post.scheduledFor).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                            </div>
                            <div className="event-platforms flex">
                              {post.platforms.slice(0, 3).map((platform, j) => (
                                <div key={j} className="platform-icon mr-1">
                                  {platform === 'instagram' || platform === 'instagram_reels' ? (
                                    <span className="text-pink-500">●</span>
                                  ) : platform === 'facebook' ? (
                                    <span className="text-blue-600">●</span>
                                  ) : platform === 'tiktok' ? (
                                    <span className="text-black">●</span>
                                  ) : platform === 'youtube' || platform === 'youtube_shorts' ? (
                                    <span className="text-red-600">●</span>
                                  ) : (
                                    <span className="text-blue-700">●</span>
                                  )}
                                </div>
                              ))}
                              {post.platforms.length > 3 && <span>+{post.platforms.length - 3}</span>}
                            </div>
                            <div className="event-content truncate">
                              {post.content.substring(0, 30)}...
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            
            {view === 'day' && (
              <div className="calendar-day">
                <div className="calendar-hours">
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i % 12 || 12
                    const ampm = i < 12 ? 'AM' : 'PM'
                    const hourDate = new Date(currentDate)
                    hourDate.setHours(i, 0, 0, 0)
                    
                    // Find posts scheduled for this hour
                    const hourPosts = posts.filter(post => {
                      if (!post.scheduledFor) return false
                      const postDate = new Date(post.scheduledFor)
                      return postDate.getDate() === currentDate.getDate() &&
                        postDate.getMonth() === currentDate.getMonth() &&
                        postDate.getFullYear() === currentDate.getFullYear() &&
                        postDate.getHours() === i
                    })
                    
                    return (
                      <div key={i} className="calendar-hour">
                        <div className="hour-label">{`${hour} ${ampm}`}</div>
                        <div className="hour-content">
                          {hourPosts.map((post, j) => (
                            <div key={j} className="calendar-event day-event">
                              <div className="event-time">
                                {post.scheduledFor && new Date(post.scheduledFor).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                              </div>
                              <div className="event-platforms flex mb-1">
                                {post.platforms.map((platform, k) => (
                                  <div key={k} className="platform-icon mr-1">
                                    {platform === 'instagram' || platform === 'instagram_reels' ? (
                                      <span className="text-pink-500">●</span>
                                    ) : platform === 'facebook' ? (
                                      <span className="text-blue-600">●</span>
                                    ) : platform === 'tiktok' ? (
                                      <span className="text-black">●</span>
                                    ) : platform === 'youtube' || platform === 'youtube_shorts' ? (
                                      <span className="text-red-600">●</span>
                                    ) : (
                                      <span className="text-blue-700">●</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <div className="event-content">
                                {post.content}
                              </div>
                              {post.mediaUrls.length > 0 && (
                                <div className="event-media mt-2">
                                  <img 
                                    src={post.mediaUrls[0]} 
                                    alt="Post media" 
                                    className="w-12 h-12 rounded object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="card">
        <h2 className="text-lg font-bold mb-4">Upcoming Posts</h2>
        
        {posts.filter(post => post.status === 'scheduled').length > 0 ? (
          <div className="space-y-4">
            {posts
              .filter(post => post.status === 'scheduled')
              .sort((a, b) => {
                if (!a.scheduledFor || !b.scheduledFor) return 0
                return new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime()
              })
              .slice(0, 5)
              .map((post, index) => (
                <div key={index} className="flex items-start p-3 border rounded">
                  <div className="mr-4">
                    {post.scheduledFor && (
                      <div className="text-center">
                        <div className="text-sm font-medium">
                          {new Date(post.scheduledFor).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-xs text-secondary">
                          {new Date(post.scheduledFor).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap mb-1">
                      {post.platforms.map((platform, i) => (
                        <div key={i} className="mr-2">
                          {platform === 'instagram' || platform === 'instagram_reels' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                          ) : platform === 'facebook' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                          ) : platform === 'tiktok' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                              <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                              <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                              <path d="M15 8v8a4 4 0 0 1-4 4"></path>
                              <line x1="15" y1="4" x2="21" y2="4"></line>
                              <line x1="21" y1="4" x2="21" y2="8"></line>
                            </svg>
                          ) : platform === 'youtube' || platform === 'youtube_shorts' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect x="2" y="9" width="4" height="12"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-sm mb-2">{post.content.substring(0, 100)}...</p>
                    
                    {post.mediaUrls.length > 0 && (
                      <div className="flex space-x-2">
                        {post.mediaUrls.slice(0, 3).map((url, i) => (
                          <img 
                            key={i}
                            src={url} 
                            alt={`Post media ${i + 1}`} 
                            className="w-12 h-12 rounded object-cover"
                          />
                        ))}
                        {post.mediaUrls.length > 3 && (
                          <div className="w-12 h-12 rounded bg-background flex items-center justify-center text-xs">
                            +{post.mediaUrls.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-2">
                    <button className="btn btn-sm btn-outline">Edit</button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-secondary mb-4">No scheduled posts</p>
            <Link to="/create-post" className="btn btn-primary">Schedule a Post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Calendar
