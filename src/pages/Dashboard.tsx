import React from 'react'
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Heart,
  Calendar,
  PenTool,
  BarChart3,
  Clock
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Followers', value: '12.5K', change: '+12%', icon: Users },
    { label: 'Engagement Rate', value: '8.2%', change: '+3.1%', icon: Heart },
    { label: 'Posts This Month', value: '24', change: '+8', icon: PenTool },
    { label: 'Scheduled Posts', value: '12', change: '+4', icon: Calendar },
  ]

  const engagementData = [
    { name: 'Mon', engagement: 4.2 },
    { name: 'Tue', engagement: 5.1 },
    { name: 'Wed', engagement: 3.8 },
    { name: 'Thu', engagement: 6.3 },
    { name: 'Fri', engagement: 8.1 },
    { name: 'Sat', engagement: 7.2 },
    { name: 'Sun', engagement: 5.9 },
  ]

  const platformData = [
    { platform: 'Instagram', posts: 12, engagement: 8.2 },
    { platform: 'Twitter', posts: 8, engagement: 6.1 },
    { platform: 'LinkedIn', posts: 4, engagement: 4.8 },
    { platform: 'TikTok', posts: 6, engagement: 12.3 },
  ]

  const recentPosts = [
    {
      id: 1,
      title: 'Summer Marketing Tips',
      platform: 'Instagram',
      status: 'Published',
      engagement: '1.2K likes',
      time: '2 hours ago'
    },
    {
      id: 2,
      title: 'Product Launch Announcement',
      platform: 'Twitter',
      status: 'Scheduled',
      engagement: 'Scheduled for 3 PM',
      time: 'Today'
    },
    {
      id: 3,
      title: 'Behind the Scenes Video',
      platform: 'TikTok',
      status: 'Draft',
      engagement: 'In progress',
      time: 'Yesterday'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Your Creator Dashboard
        </h1>
        <p className="text-white/70 text-lg">
          Track your social media performance and manage your content strategy
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <Icon className="text-white/60" size={24} />
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Engagement Chart */}
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp size={20} />
            Weekly Engagement
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="#667eea" 
                strokeWidth={3}
                dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Performance */}
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <BarChart3 size={20} />
            Platform Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="platform" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Bar dataKey="engagement" fill="#764ba2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="card">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Clock size={20} />
          Recent Posts
        </h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex-1">
                <h4 className="text-white font-medium">{post.title}</h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-white/60">
                  <span>{post.platform}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    post.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                    post.status === 'Scheduled' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {post.status}
                  </span>
                </div>
              </div>
              <div className="text-right text-sm text-white/60">
                <div>{post.engagement}</div>
                <div>{post.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center cursor-pointer hover:scale-105 transition-transform">
          <PenTool className="mx-auto mb-4 text-blue-400" size={32} />
          <h3 className="text-white font-semibold mb-2">Create Content</h3>
          <p className="text-white/60 text-sm">Start creating your next post</p>
        </div>
        <div className="card text-center cursor-pointer hover:scale-105 transition-transform">
          <Calendar className="mx-auto mb-4 text-green-400" size={32} />
          <h3 className="text-white font-semibold mb-2">Schedule Posts</h3>
          <p className="text-white/60 text-sm">Plan your content calendar</p>
        </div>
        <div className="card text-center cursor-pointer hover:scale-105 transition-transform">
          <BarChart3 className="mx-auto mb-4 text-purple-400" size={32} />
          <h3 className="text-white font-semibold mb-2">View Analytics</h3>
          <p className="text-white/60 text-sm">Analyze your performance</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
