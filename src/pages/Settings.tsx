import { useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { usePostStore } from '../stores/postStore'
import { toast } from 'react-toastify'

const Settings = () => {
  const { user, logout } = useAuthStore()
  const { platforms } = usePostStore()
  
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdatingProfile(true)
    
    // In a real app, this would call an API
    setTimeout(() => {
      setIsUpdatingProfile(false)
      toast.success('Profile updated successfully')
    }, 1000)
  }
  
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    
    setIsUpdatingPassword(true)
    
    // In a real app, this would call an API
    setTimeout(() => {
      setIsUpdatingPassword(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      toast.success('Password updated successfully')
    }, 1000)
  }
  
  const handleConnectPlatform = (platformId: string) => {
    // In a real app, this would open OAuth flow
    toast.info(`Connecting to ${getPlatformName(platformId)}...`)
    
    // Mock successful connection
    setTimeout(() => {
      toast.success(`Connected to ${getPlatformName(platformId)}!`)
    }, 1500)
  }
  
  const handleDisconnectPlatform = (platformId: string) => {
    // In a real app, this would revoke OAuth tokens
    toast.info(`Disconnecting from ${getPlatformName(platformId)}...`)
    
    // Mock successful disconnection
    setTimeout(() => {
      toast.success(`Disconnected from ${getPlatformName(platformId)}!`)
    }, 1500)
  }
  
  return (
    <div className="container page">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="card mb-6">
            <h2 className="text-lg font-bold mb-4">Profile Settings</h2>
            
            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isUpdatingProfile}
              >
                {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
          
          <div className="card mb-6">
            <h2 className="text-lg font-bold mb-4">Change Password</h2>
            
            <form onSubmit={handleUpdatePassword}>
              <div className="form-group">
                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  className="form-input"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  className="form-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={8}
                  required
                />
                <p className="text-xs text-secondary mt-1">Must be at least 8 characters</p>
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isUpdatingPassword}
              >
                {isUpdatingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
          
          <div className="card">
            <h2 className="text-lg font-bold mb-4">Connected Platforms</h2>
            
            <div className="space-y-4">
              {platforms.map(platform => (
                <div key={platform.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center">
                    {platform.id === 'instagram' || platform.id === 'instagram_reels' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500 mr-3">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    ) : platform.id === 'facebook' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mr-3">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    ) : platform.id === 'tiktok' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black mr-3">
                        <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                        <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                        <path d="M15 8v8a4 4 0 0 1-4 4"></path>
                        <line x1="15" y1="4" x2="21" y2="4"></line>
                        <line x1="21" y1="4" x2="21" y2="8"></line>
                      </svg>
                    ) : platform.id === 'youtube' || platform.id === 'youtube_shorts' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 mr-3">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700 mr-3">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    )}
                    <div>
                      <div className="font-medium">{platform.name}</div>
                      {platform.connected ? (
                        <div className="text-sm text-green-600">Connected</div>
                      ) : (
                        <div className="text-sm text-error">Not connected</div>
                      )}
                    </div>
                  </div>
                  
                  {platform.connected ? (
                    <button 
                      className="btn btn-outline text-sm"
                      onClick={() => handleDisconnectPlatform(platform.id)}
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button 
                      className="btn btn-primary text-sm"
                      onClick={() => handleConnectPlatform(platform.id)}
                    >
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="card mb-6">
            <h2 className="text-lg font-bold mb-4">Account</h2>
            
            <div className="mb-4">
              <div className="text-sm text-secondary mb-1">Account Type</div>
              <div className="font-medium">Free Plan</div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-secondary mb-1">Member Since</div>
              <div className="font-medium">July 2023</div>
            </div>
            
            <button className="btn btn-primary w-full mb-2">
              Upgrade to Pro
            </button>
            
            <div className="text-xs text-center text-secondary">
              Get unlimited posts, advanced analytics, and more
            </div>
          </div>
          
          <div className="card mb-6">
            <h2 className="text-lg font-bold mb-4">Preferences</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-secondary">Receive email updates</div>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Post Analytics</div>
                  <div className="text-sm text-secondary">Weekly performance reports</div>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Marketing Updates</div>
                  <div className="text-sm text-secondary">New features and offers</div>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-lg font-bold mb-4 text-error">Danger Zone</h2>
            
            <button 
              className="btn w-full border-error text-error hover:bg-red-50"
              onClick={() => {
                if (window.confirm('Are you sure you want to log out?')) {
                  logout()
                }
              }}
            >
              Log Out
            </button>
            
            <button className="btn w-full border-error text-error hover:bg-red-50 mt-3">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function getPlatformName(platformId: string): string {
  const platforms: Record<string, string> = {
    instagram: 'Instagram',
    instagram_reels: 'Instagram Reels',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    youtube_shorts: 'YouTube Shorts',
    linkedin: 'LinkedIn'
  }
  
  return platforms[platformId] || platformId
}

export default Settings
