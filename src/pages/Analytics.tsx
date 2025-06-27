import React, { useState } from 'react'
import { 
  TrendingUp, 
  Users, 
  Heart, 
  MessageSquare, 
  Share2, 
  Eye,
  Calendar,
  Download,
  Filter
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  const timeRanges = [
    { id: '7d', name: '7 Days' },
    { id: '30d', name: '30 Days' },
    { id: '90d', name: '90 Days' },
    { id: '1y', name: '1 Year' },
  ]

  const platforms = [
    { id: 'all', name: 'All Platforms' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'twitter', name: 'Twitter' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'tiktok', name: 'TikTok' },
  ]

  const overviewStats = [
    { label: 'Total Reach', value: '45.2K', change: '+12.5%', icon: Eye, color: 'text-blue-400' },
    { label: 'Engagement', value: '3.8K', change: '+8.2%', icon: Heart, color: 'text-pink-400' },
    { label: 'New Followers', value: '892', change: '+15.3%', icon: Users, color: 'text-green-400' },
    { label: 'Comments', value: '234', change: '+5.7%', icon: MessageSquare, color: 'text-purple-400' },
  ]

  const engagementData = [
    { date: 'Jan 1', reach: 2400, engagement: 400, followers: 240 },
    { date: 'Jan 2', reach: 1398, engagement: 300, followers: 221 },
    { date: 'Jan 3', reach: 9800, engagement: 200, followers: 229 },
    { date: 'Jan 4', reach: 3908, engagement: 278, followers: 200 },
    { date: 'Jan 5', reach: 4800, engagement: 189, followers: 218 },
    { date: 'Jan 6', reach: 3800, engagement: 239, followers: 250 },
    { date: 'Jan 7', reach: 4300, engagement: 349, followers: 210 },
  ]

  const platformData = [
    { platform: 'Instagram', followers: 12500, engagement: 8.2, posts: 24 },
    { platform: 'Twitter', followers: 8900, engagement: 6.1, posts: 18 },
    { platform: 'LinkedIn', followers: 3400, engagement: 4.8, posts: 12 },
    { platform: 'TikTok', followers: 15600, engagement: 12.3, posts: 16 },
  ]

  const audienceData = [
    { name: '18-24', value: 30, color: '#667eea' },
    { name: '25-34', value: 45, color: '#764ba2' },
    { name: '35-44', value: 20, color: '#f093fb' },
    { name: '45+', value: 5, color: '#f5576c' },
  ]

  const topPosts = [
    {
      id: 1,
      title: 'Summer Marketing Tips',
      platform: 'Instagram',
      reach: 12500,
      engagement: 1240,
      likes: 890,
      comments: 45,
      shares: 23,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
    },
    {
      id: 2,
      title: 'Behind the Scenes Video',
      platform: 'TikTok',
      reach: 8900,
      engagement: 2100,
      likes: 1800,
      comments: 120,
      shares: 89,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
    },
    {
      id: 3,
      title: 'Product Launch',
      platform: 'Twitter',
      reach: 6700,
      engagement: 890,
      likes: 650,
      comments: 78,
      shares: 156,
      image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-white/70">Track your social media performance and insights</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="input-field w-auto"
          >
            {platforms.map(platform => (
              <option key={platform.id} value={platform.id}>{platform.name}</option>
            ))}
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field w-auto"
          >
            {timeRanges.map(range => (
              <option key={range.id} value={range.id}>{range.name}</option>
            ))}
          </select>
          <button className="btn-primary flex items-center gap-2">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`${stat.color}`} size={24} />
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Engagement Over Time */}
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp size={20} />
            Engagement Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="engagement" 
                stroke="#667eea" 
                fill="url(#colorEngagement)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#667eea" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Performance */}
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-6">Platform Performance</h3>
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

      {/* Audience Demographics & Reach */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Audience Age Distribution */}
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-6">Audience Demographics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={audienceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {audienceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {audienceData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-white/70 text-sm">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reach vs Engagement */}
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-6">Reach vs Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" />
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
                dataKey="reach" 
                stroke="#667eea" 
                strokeWidth={2}
                dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="#764ba2" 
                strokeWidth={2}
                dot={{ fill: '#764ba2', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="card">
        <h3 className="text-xl font-semibold text-white mb-6">Top Performing Posts</h3>
        <div className="space-y-4">
          {topPosts.map((post) => (
            <div key={post.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium mb-1">{post.title}</h4>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span>{post.platform}</span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {post.reach.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-white font-medium">{post.likes}</div>
                  <div className="text-white/60 flex items-center gap-1">
                    <Heart size={12} />
                    Likes
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-white font-medium">{post.comments}</div>
                  <div className="text-white/60 flex items-center gap-1">
                    <MessageSquare size={12} />
                    Comments
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-white font-medium">{post.shares}</div>
                  <div className="text-white/60 flex items-center gap-1">
                    <Share2 size={12} />
                    Shares
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">+24.5%</div>
          <div className="text-white/70 mb-1">Follower Growth</div>
          <div className="text-white/50 text-sm">vs last period</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">8.2%</div>
          <div className="text-white/70 mb-1">Avg Engagement Rate</div>
          <div className="text-white/50 text-sm">across all platforms</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">156K</div>
          <div className="text-white/70 mb-1">Total Impressions</div>
          <div className="text-white/50 text-sm">this period</div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
