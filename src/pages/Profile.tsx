import React, { useState } from 'react'
import { 
  User, 
  MapPin, 
  Calendar, 
  Link as LinkIcon, 
  Edit,
  Camera,
  Instagram,
  Twitter,
  Linkedin,
  Globe,
  TrendingUp,
  Users,
  Heart,
  MessageSquare
} from 'lucide-react'

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)

  const profileStats = [
    { label: 'Total Followers', value: '45.2K', icon: Users, color: 'text-blue-400' },
    { label: 'Total Posts', value: '1,234', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Engagement Rate', value: '8.2%', icon: Heart, color: 'text-pink-400' },
    { label: 'Comments', value: '5.6K', icon: MessageSquare, color: 'text-purple-400' },
  ]

  const socialAccounts = [
    { platform: 'Instagram', username: '@johndoe', followers: '25.4K', icon: Instagram, color: 'text-pink-400' },
    { platform: 'Twitter', username: '@johndoe', followers: '12.8K', icon: Twitter, color: 'text-blue-400' },
    { platform: 'LinkedIn', username: 'John Doe', followers: '7.2K', icon: Linkedin, color: 'text-blue-600' },
  ]

  const recentActivity = [
    {
      id: 1,
      action: 'Published a new post',
      platform: 'Instagram',
      time: '2 hours ago',
      engagement: '1.2K likes, 45 comments'
    },
    {
      id: 2,
      action: 'Scheduled 3 posts',
      platform: 'Multiple',
      time: '5 hours ago',
      engagement: 'For next week'
    },
    {
      id: 3,
      action: 'Updated profile bio',
      platform: 'Profile',
      time: '1 day ago',
      engagement: 'Profile optimization'
    },
    {
      id: 4,
      action: 'Connected Twitter account',
      platform: 'Twitter',
      time: '2 days ago',
      engagement: 'Account integration'
    },
  ]

  const achievements = [
    { title: 'First Post', description: 'Published your first social media post', earned: true },
    { title: 'Engagement Master', description: 'Achieved 10% engagement rate', earned: true },
    { title: 'Consistent Creator', description: 'Posted for 30 consecutive days', earned: true },
    { title: 'Viral Content', description: 'Created a post with 10K+ engagements', earned: false },
    { title: 'Multi-Platform', description: 'Connected 5+ social platforms', earned: false },
    { title: 'Analytics Pro', description: 'Used analytics for 90 days', earned: false },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <User size={48} className="text-white" />
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Camera size={16} className="text-white" />
              </button>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary mt-4 flex items-center gap-2"
            >
              <Edit size={16} />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                  <input type="text" defaultValue="John Doe" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Bio</label>
                  <textarea 
                    className="input-field h-24 resize-none" 
                    defaultValue="Content creator and social media enthusiast. Helping brands tell their stories through engaging content. 🚀"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Location</label>
                    <input type="text" defaultValue="San Francisco, CA" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Website</label>
                    <input type="url" defaultValue="https://johndoe.com" className="input-field" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="btn-primary">Save Changes</button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">John Doe</h1>
                <p className="text-white/80 text-lg mb-4">
                  Content creator and social media enthusiast. Helping brands tell their stories through engaging content. 🚀
                </p>
                
                <div className="flex flex-wrap gap-4 text-white/60 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Joined January 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LinkIcon size={16} />
                    <a href="https://johndoe.com" className="text-blue-400 hover:text-blue-300">
                      johndoe.com
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                  <button className="p-2 bg-pink-500/20 text-pink-400 rounded-lg hover:bg-pink-500/30 transition-colors">
                    <Instagram size={20} />
                  </button>
                  <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                    <Twitter size={20} />
                  </button>
                  <button className="p-2 bg-blue-600/20 text-blue-600 rounded-lg hover:bg-blue-600/30 transition-colors">
                    <Linkedin size={20} />
                  </button>
                  <button className="p-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors">
                    <Globe size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {profileStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card text-center">
              <Icon className={`mx-auto mb-3 ${stat.color}`} size={32} />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Social Accounts */}
      <div className="card">
        <h2 className="text-xl font-semibold text-white mb-6">Connected Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialAccounts.map((account, index) => {
            const Icon = account.icon
            return (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={account.color} size={24} />
                  <div>
                    <h3 className="text-white font-medium">{account.platform}</h3>
                    <p className="text-white/60 text-sm">{account.username}</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{account.followers}</div>
                <div className="text-white/60 text-sm">Followers</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Activity & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium">{activity.action}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-white/60">
                    <span>{activity.platform}</span>
                    <span>•</span>
                    <span>{activity.time}</span>
                  </div>
                  <p className="text-white/50 text-sm mt-1">{activity.engagement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-6">Achievements</h2>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  achievement.earned ? 'bg-green-500/10 border border-green-500/20' : 'bg-white/5'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  achievement.earned ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'
                }`}>
                  {achievement.earned ? '🏆' : '🔒'}
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${achievement.earned ? 'text-white' : 'text-white/60'}`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${achievement.earned ? 'text-white/70' : 'text-white/40'}`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.earned && (
                  <div className="text-green-400 text-sm font-medium">Earned</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
