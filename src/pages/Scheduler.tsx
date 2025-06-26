import React, { useState } from 'react'
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Edit3, 
  Trash2,
  Instagram,
  Linkedin,
  Twitter,
  Play,
  MoreHorizontal,
  Filter,
  Search
} from 'lucide-react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('calendar')
  const [filterPlatform, setFilterPlatform] = useState('all')

  const scheduledPosts = [
    {
      id: 1,
      title: "5 Productivity Tips for Remote Workers",
      platform: "instagram",
      scheduledFor: new Date(2024, 0, 15, 14, 0),
      status: "scheduled",
      content: "Working from home can be challenging, but these 5 tips will help you stay productive and focused...",
      image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400",
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 2,
      title: "Weekly Industry Insights",
      platform: "linkedin",
      scheduledFor: new Date(2024, 0, 16, 9, 0),
      status: "scheduled",
      content: "This week in tech: AI advancements, remote work trends, and startup funding updates...",
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 3,
      title: "Quick Morning Motivation",
      platform: "twitter",
      scheduledFor: new Date(2024, 0, 16, 7, 30),
      status: "published",
      content: "Start your day with intention. What's one thing you're excited to accomplish today? 🌟",
      engagement: { likes: 24, comments: 8, shares: 12 }
    },
    {
      id: 4,
      title: "Behind the Scenes Video",
      platform: "instagram",
      scheduledFor: new Date(2024, 0, 17, 18, 0),
      status: "draft",
      content: "Take a peek behind the scenes of my content creation process...",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 5,
      title: "Weekend Reflection",
      platform: "linkedin",
      scheduledFor: new Date(2024, 0, 19, 10, 0),
      status: "scheduled",
      content: "Reflecting on this week's wins and lessons learned. What was your biggest takeaway?",
      engagement: { likes: 0, comments: 0, shares: 0 }
    }
  ]

  const platforms = [
    { id: 'all', name: 'All Platforms', icon: null, color: 'bg-gray-500' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-600' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-blue-400' },
  ]

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return Instagram
      case 'linkedin': return Linkedin
      case 'twitter': return Twitter
      default: return Play
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'bg-pink-500'
      case 'linkedin': return 'bg-blue-600'
      case 'twitter': return 'bg-blue-400'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'badge-success'
      case 'scheduled': return 'badge-info'
      case 'draft': return 'badge-warning'
      case 'failed': return 'badge-danger'
      default: return 'badge-primary'
    }
  }

  const filteredPosts = filterPlatform === 'all' 
    ? scheduledPosts 
    : scheduledPosts.filter(post => post.platform === filterPlatform)

  const postsForSelectedDate = scheduledPosts.filter(post => 
    post.scheduledFor.toDateString() === selectedDate.toDateString()
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Scheduler</h1>
          <p className="mt-2 text-gray-600">Plan and schedule your content across all platforms</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="btn btn-secondary">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Schedule Post
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'calendar'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CalendarIcon className="w-4 h-4 mr-2 inline" />
            Calendar View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            List View
          </button>
        </div>

        {/* Platform Filter */}
        <div className="flex space-x-2">
          {platforms.map((platform) => {
            const Icon = platform.icon
            return (
              <button
                key={platform.id}
                onClick={() => setFilterPlatform(platform.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                  filterPlatform === platform.id
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{platform.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="calendar-container">
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  className="w-full"
                  tileContent={({ date, view }) => {
                    if (view === 'month') {
                      const postsOnDate = scheduledPosts.filter(post => 
                        post.scheduledFor.toDateString() === date.toDateString()
                      )
                      if (postsOnDate.length > 0) {
                        return (
                          <div className="flex justify-center mt-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          </div>
                        )
                      }
                    }
                    return null
                  }}
                />
              </div>
            </div>
          </div>

          {/* Selected Date Posts */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            
            {postsForSelectedDate.length > 0 ? (
              <div className="space-y-3">
                {postsForSelectedDate.map((post) => {
                  const PlatformIcon = getPlatformIcon(post.platform)
                  return (
                    <div key={post.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className={`w-4 h-4 rounded ${getPlatformColor(post.platform)} flex items-center justify-center`}>
                              <PlatformIcon className="w-2.5 h-2.5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{post.title}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{post.scheduledFor.toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit' 
                            })}</span>
                            <span className={`badge ${getStatusColor(post.status)}`}>
                              {post.status}
                            </span>
                          </div>
                        </div>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No posts scheduled for this date</p>
                <button className="btn btn-primary mt-3">
                  <Plus className="w-4 h-4" />
                  Schedule Post
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Status</option>
                <option>Published</option>
                <option>Scheduled</option>
                <option>Draft</option>
                <option>Failed</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Time</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => {
              const PlatformIcon = getPlatformIcon(post.platform)
              return (
                <div key={post.id} className="card card-hover">
                  <div className="flex items-start space-x-4">
                    {post.image && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className={`w-5 h-5 rounded ${getPlatformColor(post.platform)} flex items-center justify-center`}>
                              <PlatformIcon className="w-3 h-3 text-white" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                            <span className={`badge ${getStatusColor(post.status)}`}>
                              {post.status}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {post.content}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {post.scheduledFor.toLocaleDateString()} at{' '}
                                {post.scheduledFor.toLocaleTimeString('en-US', { 
                                  hour: 'numeric', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            </div>
                            
                            {post.status === 'published' && (
                              <div className="flex items-center space-x-3">
                                <span>❤️ {post.engagement.likes}</span>
                                <span>💬 {post.engagement.comments}</span>
                                <span>🔄 {post.engagement.shares}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6">
        <button className="btn btn-primary rounded-full w-14 h-14 shadow-lg hover:shadow-xl">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default Scheduler
