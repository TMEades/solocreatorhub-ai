import React, { useState } from 'react'
import { Calendar, Clock, Plus, Edit, Trash2, Send, Eye } from 'lucide-react'
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday } from 'date-fns'

const Scheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar')

  const scheduledPosts = [
    {
      id: 1,
      title: 'Monday Motivation Post',
      content: 'Start your week with positive energy! 💪 #MondayMotivation #Success',
      platform: 'Instagram',
      scheduledTime: new Date(2024, 0, 15, 9, 0),
      status: 'scheduled',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
    },
    {
      id: 2,
      title: 'Product Launch Announcement',
      content: 'Exciting news! Our new product is launching tomorrow. Get ready! 🚀',
      platform: 'Twitter',
      scheduledTime: new Date(2024, 0, 16, 14, 30),
      status: 'scheduled',
      image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg'
    },
    {
      id: 3,
      title: 'Behind the Scenes Video',
      content: 'Take a look behind the scenes of our creative process 🎬',
      platform: 'TikTok',
      scheduledTime: new Date(2024, 0, 17, 16, 0),
      status: 'draft',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
    },
    {
      id: 4,
      title: 'Customer Testimonial',
      content: 'Amazing feedback from our customers! Thank you for your trust 🙏',
      platform: 'LinkedIn',
      scheduledTime: new Date(2024, 0, 18, 11, 15),
      status: 'scheduled',
      image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg'
    },
    {
      id: 5,
      title: 'Weekend Vibes',
      content: 'Weekend is here! Time to relax and recharge ✨ #WeekendVibes',
      platform: 'Instagram',
      scheduledTime: new Date(2024, 0, 19, 18, 0),
      status: 'published',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg'
    }
  ]

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter(post => 
      isSameDay(post.scheduledTime, date)
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-400 bg-blue-400/20'
      case 'published': return 'text-green-400 bg-green-400/20'
      case 'draft': return 'text-yellow-400 bg-yellow-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return 'text-pink-400'
      case 'twitter': return 'text-blue-400'
      case 'linkedin': return 'text-blue-600'
      case 'tiktok': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Content Scheduler</h1>
          <p className="text-white/70">Plan and schedule your social media posts</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'calendar' ? 'list' : 'calendar')}
            className="btn-secondary flex items-center gap-2"
          >
            <Calendar size={20} />
            {viewMode === 'calendar' ? 'List View' : 'Calendar View'}
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={20} />
            Schedule Post
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-400 mb-2">
            {scheduledPosts.filter(p => p.status === 'scheduled').length}
          </div>
          <div className="text-white/70 text-sm">Scheduled</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-2">
            {scheduledPosts.filter(p => p.status === 'draft').length}
          </div>
          <div className="text-white/70 text-sm">Drafts</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-400 mb-2">
            {scheduledPosts.filter(p => p.status === 'published').length}
          </div>
          <div className="text-white/70 text-sm">Published</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-400 mb-2">
            {scheduledPosts.length}
          </div>
          <div className="text-white/70 text-sm">Total Posts</div>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        /* Calendar View */
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {format(selectedDate, 'MMMM yyyy')}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedDate(addDays(selectedDate, -7))}
                className="btn-secondary px-3 py-2"
              >
                ←
              </button>
              <button
                onClick={() => setSelectedDate(new Date())}
                className="btn-secondary px-3 py-2"
              >
                Today
              </button>
              <button
                onClick={() => setSelectedDate(addDays(selectedDate, 7))}
                className="btn-secondary px-3 py-2"
              >
                →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4">
            {/* Day Headers */}
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="text-center text-white/60 font-medium py-2">
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {weekDays.map(day => {
              const posts = getPostsForDate(day)
              const isCurrentDay = isToday(day)
              
              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-[120px] p-2 rounded-lg border transition-colors ${
                    isCurrentDay 
                      ? 'border-blue-400 bg-blue-400/10' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    isCurrentDay ? 'text-blue-400' : 'text-white/80'
                  }`}>
                    {format(day, 'd')}
                  </div>
                  
                  <div className="space-y-1">
                    {posts.map(post => (
                      <div
                        key={post.id}
                        className="p-2 bg-white/5 rounded text-xs cursor-pointer hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(post.status).split(' ')[1]}`} />
                          <span className="text-white/80 truncate">{post.title}</span>
                        </div>
                        <div className="text-white/60">
                          {format(post.scheduledTime, 'HH:mm')} • {post.platform}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-6">All Scheduled Posts</h2>
          <div className="space-y-4">
            {scheduledPosts.map(post => (
              <div key={post.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium mb-1">{post.title}</h3>
                  <p className="text-white/70 text-sm mb-2 line-clamp-2">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                    <span className={`${getPlatformColor(post.platform)}`}>
                      {post.platform}
                    </span>
                    <span className="text-white/60 flex items-center gap-1">
                      <Clock size={14} />
                      {format(post.scheduledTime, 'MMM d, HH:mm')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Edit size={16} />
                  </button>
                  {post.status === 'scheduled' && (
                    <button className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-colors">
                      <Send size={16} />
                    </button>
                  )}
                  <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Posts */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Next 24 Hours</h3>
        <div className="space-y-3">
          {scheduledPosts
            .filter(post => {
              const now = new Date()
              const tomorrow = addDays(now, 1)
              return post.scheduledTime >= now && post.scheduledTime <= tomorrow && post.status === 'scheduled'
            })
            .sort((a, b) => a.scheduledTime.getTime() - b.scheduledTime.getTime())
            .map(post => (
              <div key={post.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{post.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <span>{post.platform}</span>
                      <span>•</span>
                      <span>{format(post.scheduledTime, 'HH:mm')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-secondary px-3 py-1 text-sm">
                    Edit
                  </button>
                  <button className="btn-primary px-3 py-1 text-sm">
                    Publish Now
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Scheduler
