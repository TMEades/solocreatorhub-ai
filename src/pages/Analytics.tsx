import React, { useState } from 'react'
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  Target,
  Award,
  Zap
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

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  const performanceData = [
    { date: '2024-01-01', followers: 23400, engagement: 8.2, reach: 45000, posts: 3 },
    { date: '2024-01-02', followers: 23450, engagement: 7.8, reach: 42000, posts: 2 },
    { date: '2024-01-03', followers: 23520, engagement: 9.1, reach: 48000, posts: 4 },
    { date: '2024-01-04', followers: 23580, engagement: 8.5, reach: 46000, posts: 3 },
    { date: '2024-01-05', followers: 23650, engagement: 9.8, reach: 52000, posts: 5 },
    { date: '2024-01-06', followers: 23720, engagement: 8.9, reach: 49000, posts: 3 },
    { date: '2024-01-07', followers: 23800, engagement: 10.2, reach: 55000, posts: 4 },
  ]

  const platformData = [
    { platform: 'Instagram', followers: 12500, engagement: 8.5, color: '#E1306C' },
    { platform: 'LinkedIn', followers: 8200, engagement: 12.3, color: '#0077B5' },
    { platform: 'Twitter', followers: 3100, engagement: 6.2, color: '#1DA1F2' },
    { platform: 'TikTok', followers: 1500, engagement: 15.8, color: '#000000' },
  ]

  const contentPerformance = [
    {
      id: 1,
      title: "5 Productivity Tips for Remote Workers",
      platform: "Instagram",
      date: "2024-01-05",
      likes: 1250,
      comments: 89,
      shares: 156,
      reach: 8500,
      engagement: 12.8
    },
    {
      id: 2,
      title: "Weekly Industry Insights",
      platform: "LinkedIn",
      date: "2024-01-04",
      likes: 890,
      comments: 67,
      shares: 234,
      reach: 6200,
      engagement: 15.2
    },
    {
      id: 3,
      title: "Quick Morning Motivation",
      platform: "Twitter",
      date: "2024-01-03",
      likes: 456,
      comments: 23,
      shares: 78,
      reach: 3400,
      engagement: 8.9
    },
    {
      id: 4,
      title: "Behind the Scenes Video",
      platform: "TikTok",
      date: "2024-01-02",
      likes: 2100,
      comments: 145,
      shares: 89,
      reach: 12000,
      engagement: 18.5
    }
  ]

  const competitorData = [
    { name: 'Your Account', followers: 25200, engagement: 9.2, posts: 28 },
    { name: 'Competitor A', followers: 28500, engagement: 7.8, posts: 35 },
    { name: 'Competitor B', followers: 22100, engagement: 8.9, posts: 24 },
    { name: 'Industry Average', followers: 24800, engagement: 8.1, posts: 30 },
  ]

  const audienceData = [
    { age: '18-24', percentage: 15, color: '#8B5CF6' },
    { age: '25-34', percentage: 35, color: '#A78BFA' },
    { age: '35-44', percentage: 28, color: '#C4B5FD' },
    { age: '45-54', percentage: 15, color: '#DDD6FE' },
    { age: '55+', percentage: 7, color: '#EDE9FE' },
  ]

  const insights = [
    {
      type: 'growth',
      title: 'Follower Growth Accelerating',
      description: 'Your follower growth rate increased by 23% this week compared to last week.',
      impact: 'positive',
      action: 'Continue posting at current frequency'
    },
    {
      type: 'engagement',
      title: 'Video Content Performing Well',
      description: 'Video posts have 40% higher engagement than image posts this month.',
      impact: 'positive',
      action: 'Increase video content ratio'
    },
    {
      type: 'timing',
      title: 'Optimal Posting Time Shift',
      description: 'Your audience is now most active at 7 PM instead of 2 PM.',
      impact: 'neutral',
      action: 'Adjust posting schedule'
    },
    {
      type: 'competitor',
      title: 'Competitor Analysis',
      description: 'You\'re outperforming 2 out of 3 main competitors in engagement rate.',
      impact: 'positive',
      action: 'Maintain current content strategy'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-2 text-gray-600">Track your performance and get actionable insights</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          <button className="btn btn-secondary">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="btn btn-primary">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Followers</p>
              <p className="text-2xl font-bold text-gray-900">25.2K</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +8.2% vs last month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Engagement Rate</p>
              <p className="text-2xl font-bold text-gray-900">9.2%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +1.4% vs last month
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reach</p>
              <p className="text-2xl font-bold text-gray-900">347K</p>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <ArrowDownRight className="w-4 h-4 mr-1" />
                -2.1% vs last month
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Posts Published</p>
              <p className="text-2xl font-bold text-gray-900">28</p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <Target className="w-4 h-4 mr-1" />
                Goal: 30 posts
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Growth Overview</h3>
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
              <option>Followers</option>
              <option>Engagement</option>
              <option>Reach</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="followers" 
                stroke="#667eea" 
                fill="#667eea"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Platform Distribution</h3>
            <span className="text-sm text-gray-500">Total: 25.2K followers</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="followers"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {platformData.map((platform) => (
              <div key={platform.platform} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: platform.color }}
                ></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{platform.platform}</p>
                  <p className="text-xs text-gray-500">{platform.followers.toLocaleString()} followers</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Performance */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Content</h3>
          <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
            View all posts
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Content</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Platform</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Engagement</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Reach</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contentPerformance.map((post) => (
                <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{post.title}</p>
                      <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="badge badge-primary">{post.platform}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{post.engagement}%</p>
                      <p className="text-sm text-gray-500">
                        {post.likes + post.comments + post.shares} interactions
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{post.reach.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Competitive Analysis & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Competitive Analysis</h3>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              Add Competitor
            </button>
          </div>
          <div className="space-y-4">
            {competitorData.map((competitor, index) => (
              <div key={competitor.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-purple-500' : 'bg-gray-400'
                  }`}>
                    {index === 0 ? (
                      <Award className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-white text-sm font-medium">{index}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{competitor.name}</p>
                    <p className="text-sm text-gray-500">{competitor.followers.toLocaleString()} followers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{competitor.engagement}%</p>
                  <p className="text-sm text-gray-500">engagement</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-purple-500" />
              AI Insights
            </h3>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              Refresh
            </button>
          </div>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  <span className={`badge ${
                    insight.impact === 'positive' ? 'badge-success' : 
                    insight.impact === 'negative' ? 'badge-warning' : 'badge-info'
                  }`}>
                    {insight.impact}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-purple-600">{insight.action}</p>
                  <button className="text-sm text-gray-500 hover:text-gray-700">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audience Demographics */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Audience Demographics</h3>
          <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
            <option>Age Groups</option>
            <option>Gender</option>
            <option>Location</option>
            <option>Interests</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={audienceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#667eea" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {audienceData.map((segment) => (
              <div key={segment.age} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: segment.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">{segment.age}</span>
                </div>
                <span className="text-sm text-gray-900 font-medium">{segment.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
