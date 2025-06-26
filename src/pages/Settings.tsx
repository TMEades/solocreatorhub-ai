import React, { useState } from 'react'
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Palette,
  Globe,
  Smartphone,
  Key,
  Download,
  Trash2,
  Plus,
  Check,
  X,
  Instagram,
  Linkedin,
  Twitter,
  Youtube
} from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'accounts', name: 'Connected Accounts', icon: Globe },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: Palette },
  ]

  const connectedAccounts = [
    {
      platform: 'Instagram',
      username: '@sarahcreator',
      connected: true,
      followers: '12.5K',
      icon: Instagram,
      color: 'bg-pink-500'
    },
    {
      platform: 'LinkedIn',
      username: 'Sarah Johnson',
      connected: true,
      followers: '8.2K',
      icon: Linkedin,
      color: 'bg-blue-600'
    },
    {
      platform: 'Twitter',
      username: '@sarah_creates',
      connected: true,
      followers: '3.1K',
      icon: Twitter,
      color: 'bg-blue-400'
    },
    {
      platform: 'YouTube',
      username: 'Sarah Creates',
      connected: false,
      followers: '0',
      icon: Youtube,
      color: 'bg-red-500'
    }
  ]

  const billingHistory = [
    { date: '2024-01-01', amount: '$29.99', plan: 'Pro Plan', status: 'Paid' },
    { date: '2023-12-01', amount: '$29.99', plan: 'Pro Plan', status: 'Paid' },
    { date: '2023-11-01', amount: '$29.99', plan: 'Pro Plan', status: 'Paid' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
              
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">SC</span>
                </div>
                <div>
                  <button className="btn btn-secondary mr-3">Change Photo</button>
                  <button className="btn btn-secondary">Remove</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-input" defaultValue="Sarah" />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-input" defaultValue="Johnson" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" defaultValue="sarah@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-input" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  defaultValue="Content creator passionate about productivity, entrepreneurship, and helping others achieve their goals."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Website</label>
                <input type="url" className="form-input" defaultValue="https://sarahcreates.com" />
              </div>

              <div className="flex justify-end space-x-3">
                <button className="btn btn-secondary">Cancel</button>
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          )}

          {/* Connected Accounts Tab */}
          {activeTab === 'accounts' && (
            <div className="card space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Connected Accounts</h3>
                <button className="btn btn-primary">
                  <Plus className="w-4 h-4" />
                  Connect Account
                </button>
              </div>

              <div className="space-y-4">
                {connectedAccounts.map((account) => {
                  const Icon = account.icon
                  return (
                    <div key={account.platform} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg ${account.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{account.platform}</h4>
                          <p className="text-sm text-gray-500">
                            {account.connected ? account.username : 'Not connected'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {account.connected && (
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{account.followers}</p>
                            <p className="text-xs text-gray-500">followers</p>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          {account.connected ? (
                            <>
                              <div className="flex items-center space-x-1 text-green-600">
                                <Check className="w-4 h-4" />
                                <span className="text-sm">Connected</span>
                              </div>
                              <button className="text-red-600 hover:text-red-700 p-1">
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <button className="btn btn-primary">Connect</button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">All platforms connected!</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      You can now schedule and manage content across all your social media accounts from one place.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="card space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Content & Scheduling</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Post Published</p>
                        <p className="text-sm text-gray-500">Get notified when your scheduled posts are published</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Scheduling Reminders</p>
                        <p className="text-sm text-gray-500">Remind me to schedule content when queue is low</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Analytics & Performance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Weekly Reports</p>
                        <p className="text-sm text-gray-500">Receive weekly performance summaries</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Milestone Alerts</p>
                        <p className="text-sm text-gray-500">Celebrate follower milestones and achievements</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">AI & Suggestions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Content Suggestions</p>
                        <p className="text-sm text-gray-500">Get AI-powered content ideas and recommendations</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Trending Topics</p>
                        <p className="text-sm text-gray-500">Alert me about trending topics in my niche</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="btn btn-primary">Save Preferences</button>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              {/* Current Plan */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                  <span className="badge badge-success">Active</span>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold">Pro Plan</h4>
                      <p className="text-purple-100">Perfect for growing creators</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">$29.99</p>
                      <p className="text-purple-100">per month</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>✓ Unlimited posts</div>
                    <div>✓ AI content generation</div>
                    <div>✓ Advanced analytics</div>
                    <div>✓ Priority support</div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div>
                    <p className="text-sm text-gray-600">Next billing date: February 1, 2024</p>
                    <p className="text-sm text-gray-600">Payment method: •••• 4242</p>
                  </div>
                  <div className="space-x-3">
                    <button className="btn btn-secondary">Change Plan</button>
                    <button className="btn btn-secondary">Update Payment</button>
                  </div>
                </div>
              </div>

              {/* Billing History */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
                  <button className="btn btn-secondary">
                    <Download className="w-4 h-4" />
                    Download All
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 font-medium text-gray-700">Date</th>
                        <th className="text-left py-3 font-medium text-gray-700">Description</th>
                        <th className="text-left py-3 font-medium text-gray-700">Amount</th>
                        <th className="text-left py-3 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 font-medium text-gray-700">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingHistory.map((bill, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-4">{new Date(bill.date).toLocaleDateString()}</td>
                          <td className="py-4">{bill.plan}</td>
                          <td className="py-4 font-medium">{bill.amount}</td>
                          <td className="py-4">
                            <span className="badge badge-success">{bill.status}</span>
                          </td>
                          <td className="py-4">
                            <button className="text-purple-600 hover:text-purple-700 text-sm">
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="card space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Password</h4>
                  <div className="space-y-4">
                    <div className="form-group">
                      <label className="form-label">Current Password</label>
                      <input type="password" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New Password</label>
                      <input type="password" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Confirm New Password</label>
                      <input type="password" className="form-input" />
                    </div>
                    <button className="btn btn-primary">Update Password</button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">SMS Authentication</p>
                      <p className="text-sm text-gray-500">Receive verification codes via SMS</p>
                    </div>
                    <button className="btn btn-primary">Enable</button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">API Keys</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Production API Key</p>
                        <p className="text-sm text-gray-500 font-mono">sk_live_••••••••••••••••••••••••••••</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="btn btn-secondary">
                          <Key className="w-4 h-4" />
                          Regenerate
                        </button>
                        <button className="text-red-600 hover:text-red-700 p-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button className="btn btn-secondary">
                      <Plus className="w-4 h-4" />
                      Create New API Key
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="card space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Appearance</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="form-label">Theme</label>
                      <select className="form-input">
                        <option>Light</option>
                        <option>Dark</option>
                        <option>System</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Language</label>
                      <select className="form-input">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Content Defaults</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="form-label">Default Posting Time</label>
                      <input type="time" className="form-input" defaultValue="14:00" />
                    </div>
                    <div>
                      <label className="form-label">Default Content Tone</label>
                      <select className="form-input">
                        <option>Professional</option>
                        <option>Casual</option>
                        <option>Friendly</option>
                        <option>Authoritative</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Auto-save Drafts</label>
                      <div className="flex items-center space-x-2 mt-2">
                        <input type="checkbox" id="autosave" defaultChecked />
                        <label htmlFor="autosave" className="text-sm text-gray-700">
                          Automatically save content as drafts every 30 seconds
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Data & Privacy</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Analytics Tracking</p>
                        <p className="text-sm text-gray-500">Help improve our service with usage analytics</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Data Export</p>
                        <p className="text-sm text-gray-500">Download all your data</p>
                      </div>
                      <button className="btn btn-secondary">
                        <Download className="w-4 h-4" />
                        Export Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="btn btn-primary">Save Preferences</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
