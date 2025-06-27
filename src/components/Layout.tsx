import React, { ReactNode, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  Home,
  PenTool,
  Image,
  Calendar,
  BarChart3,
  Settings,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { signOut, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Content Creator', href: '/content', icon: PenTool },
    { name: 'Media Library', href: '/media', icon: Image },
    { name: 'Scheduler', href: '/scheduler', icon: Calendar },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Profile', href: '/profile', icon: User },
  ]

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar fixed lg:static inset-y-0 left-0 z-50 w-64 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6">
            <h1 className="text-xl font-bold text-white">SoloCreator AI</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User info and sign out */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white font-medium">{user?.user_metadata?.full_name || 'User'}</p>
                <p className="text-white/60 text-sm">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 w-full p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top bar */}
        <header className="bg-white/5 backdrop-blur-sm border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white hover:text-gray-300"
            >
              <Menu size={24} />
            </button>
            <div className="flex-1 lg:flex-none">
              <h2 className="text-xl font-semibold text-white">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h2>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
