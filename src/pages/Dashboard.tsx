import React from 'react'
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Calendar,
  Sparkles,
  ArrowUpRight,
  Clock,
  Target,
  Zap
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const Dashboard = () => {
  const engagementData = [
    { name: 'Mon', engagement: 4000, reach: 2400 },
    { name: 'Tue', engagement: 3000, reach: 1398 },
    { name: 'Wed', engagement: 2000, reach: 9800 },
    { name: 'Thu', engagement: 2780, reach: 3908 },
    { name: 'Fri', engagement: 1890, reach: 4800 },
    { name: 'Sat', engagement: 2390, reach: 3800 },
    { name: 'Sun', engagement: 3490, reach: 4300 },
  ]

  const platformData = [
    { platform: 'Instagram', posts: 12, engagement: 8.5 },
    { platform: 'LinkedIn', posts: 8, engagement: 12.3 },
    { platform: 'Twitter', posts: 15, engagement: 6.2 },
    { platform: 'TikTok', posts: 6, engagement: 15.8 },
  ]

  const upcomingPosts = [
    {
      id: 1,
      title: "5 Tips for Better Content Creation",
      platform: "Instagram",
      scheduledFor: "Today, 2:00 PM",
      status: "scheduled"
    },
    {
      id: 2,
      title: "Weekly Industry Insights",
      platform: "LinkedIn",
      scheduledFor: "Tomorrow, 9:00 AM",
      status: "scheduled"
    },
    {
      id: 3,
      title: "Behind the Scenes Video",
      platform: "TikTok",
      scheduledFor: "Wed, 6:00 PM",
      status: "draft"
    }
  ]

  const aiSuggestions = [
    {
      type: "content",
      title: "Trending Topic Alert",
      description: "AI tools for content creation is trending. Create a post about your experience.",
      priority: "high"
    },
    {
      type: "timing",
      title: "Optimal Posting Time",
      description: "Your audience is most active on Instagram at 7 PM today.",
      priority: "medium"
    },
    {
      type: "engagement",
      title: "Engagement Opportunity",
      description: "Reply to 3 new comments on your latest LinkedIn post.",
      priority: "low"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Sarah!</h1>
          <p className="mt-2 text-gray-600">Here's what's happening with your content today.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="btn btn-secondary">
            <Calendar className="w-4 h-4" />
            Schedule Post
          </button>
          <button className="btn btn-primary">
            <Sparkles className="w-4 h-4" />
            AI Content Ideas
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Followers</p>
              <p className="text-2xl font-bold text-gray-900">24.5K</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +12% from last week
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
              <p className="text-2xl font-bold text-gray-900">8.7%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +2.3% from last week
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Posts This Week</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <Target className="w-4 h-4 mr-1" />
                Goal: 20 posts
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Credits Used</p>
              <p className="text-2xl font-bold text-gray-900">250</p>
              <p className="text-sm text-orange-600 flex items-center mt-1">
                <Zap className="w-4 h-4 mr-1" />
                750 remaining
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Engagement Overview</h3>
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="#667eea" 
                strokeWidth={3}
                dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="reach" 
                stroke="#f093fb" 
                strokeWidth={3}
                dot={{ fill: '#f093fb', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Platform Performance</h3>
            <span className="text-sm text-gray-500">This week</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="engagement" fill="#667eea" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Posts */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Posts</h3>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {upcomingPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{post.title}</h4>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-sm text-gray-500">{post.platform}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.scheduledFor}
                    </span>
                  </div>
                </div>
                <span className={`badge ${post.status === 'scheduled' ? 'badge-success' : 'badge-warning'}`}>
                  {post.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
              AI Suggestions
            </h3>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              Refresh
            </button>
          </div>
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                  </div>
                  <span className={`badge ml-3 ${
                    suggestion.priority === 'high' ? 'badge-warning' : 
                    suggestion.priority === 'medium' ? 'badge-info' : 'badge-primary'
                  }`}>
                    {suggestion.priority}
                  </span>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    Apply
                  </button>
                  <button className="text-sm text-gray-500 hover:text-gray-700">
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
