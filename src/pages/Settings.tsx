import React, { useState } from 'react'
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Key,
  Trash2,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    analytics: true,
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'integrations', name: 'Integrations', icon: Globe },
  ]

  const socialPlatforms = [
    { 
      id: 'instagram', 
      name: 'Instagram', 
      connected: true, 
      username: '@johndoe',
      color: 'text-pink-400'
    },
    { 
      id: 'twitter', 
      name: 'Twitter', 
      connected: true, 
      username: '@johndoe',
      color: 'text-blue-400'
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      connected: false, 
      username: null,
      color: 'text-blue-600'
    },
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      connected: false, 
      username: null,
      color: 'text-red-400'
    },
  ]

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }))
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                    <User size={32} className="text-white" />
                  </div>
                  <div>
                    <button className="btn-secondary text-sm">Change Avatar</button>
                    <p className="text-white/60 text-sm mt-1">JPG, PNG or GIF (max 2MB)</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">First Name</label>
                    <input type="text" defaultValue="John" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Last Name</label>
                    <input type="text" defaultValue="Doe" className="input-field" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input type="email" defaultValue="john@example.com" className="input-field" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Bio</label>
                  <textarea 
                    className="input-field h-24 resize-none" 
                    placeholder="Tell us about yourself..."
                    defaultValue="Content creator and social media enthusiast. Helping brands tell their stories through engaging content."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Website</label>
                  <input type="url" placeholder="https://yourwebsite.com" className="input-field" />
                </div>
              </div>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium capitalize">
                        {key === 'push' ? 'Push Notifications' : 
                         key === 'marketing' ? 'Marketing Emails' :
                         key === 'analytics' ? 'Analytics Reports' : 'Email Notifications'}
                      </h4>
                      <p className="text-white/60 text-sm">
                        {key === 'email' ? 'Receive email notifications for important updates' :
                         key === 'push' ? 'Get push notifications on your device' :
                         key === 'marketing' ? 'Receive promotional emails and offers' :
                         'Weekly analytics and performance reports'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Current Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? 'text' : 'password'} 
                          className="input-field pr-12" 
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">New Password</label>
                      <input type="password" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Confirm New Password</label>
                      <input type="password" className="input-field" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-white font-medium mb-3">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white">Enable 2FA</p>
                      <p className="text-white/60 text-sm">Add an extra layer of security to your account</p>
                    </div>
                    <button className="btn-primary">Enable</button>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-white font-medium mb-3">API Keys</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Production API Key</p>
                        <p className="text-white/60 text-sm font-mono">sk_prod_••••••••••••••••</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="btn-secondary text-sm">Regenerate</button>
                        <button className="btn-secondary text-sm">Copy</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Appearance Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Theme</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Dark', 'Light', 'Auto'].map((theme) => (
                      <div
                        key={theme}
                        className="p-4 border border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition-colors"
                      >
                        <div className={`w-full h-20 rounded mb-3 ${
                          theme === 'Dark' ? 'bg-gray-900' :
                          theme === 'Light' ? 'bg-white' :
                          'bg-gradient-to-r from-gray-900 to-white'
                        }`} />
                        <p className="text-white text-center">{theme}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Accent Color</h4>
                  <div className="flex gap-3">
                    {['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'].map((color) => (
                      <button
                        key={color}
                        className="w-10 h-10 rounded-full border-2 border-white/20 hover:border-white/40 transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Font Size</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-white/60">Small</span>
                    <input type="range" min="12" max="18" defaultValue="14" className="flex-1" />
                    <span className="text-white/60">Large</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'integrations':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Social Media Integrations</h3>
              <div className="space-y-4">
                {socialPlatforms.map((platform) => (
                  <div key={platform.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center ${platform.color}`}>
                        <Globe size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{platform.name}</h4>
                        <p className="text-white/60 text-sm">
                          {platform.connected ? `Connected as ${platform.username}` : 'Not connected'}
                        </p>
                      </div>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        platform.connected
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                          : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                      }`}
                    >
                      {platform.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Third-party Integrations</h3>
              <div className="space-y-4">
                {['Zapier', 'Google Analytics', 'Canva', 'Buffer'].map((service) => (
                  <div key={service} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Key size={20} className="text-white/60" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{service}</h4>
                        <p className="text-white/60 text-sm">Not connected</p>
                      </div>
                    </div>
                    <button className="btn-secondary text-sm">Connect</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/70">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="card">
            {renderTabContent()}
            
            {/* Save Button */}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/10">
              <button className="btn-secondary">Cancel</button>
              <button className="btn-primary flex items-center gap-2">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          {activeTab === 'security' && (
            <div className="card mt-6 border border-red-500/20">
              <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                  <div>
                    <h4 className="text-white font-medium">Delete Account</h4>
                    <p className="text-white/60 text-sm">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2">
                    <Trash2 size={16} />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
