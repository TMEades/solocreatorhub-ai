import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { toast } from 'react-toastify'

const Login = () => {
  const { login, isLoading, error } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }
    
    try {
      await login(email, password)
      toast.success('Login successful!')
    } catch (err) {
      // Error is handled by the store
    }
  }
  
  return (
    <div className="container page">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome back to SocialSync</h1>
          <p className="text-secondary">Sign in to your account to continue</p>
        </div>
        
        <div className="card">
          {error && (
            <div className="bg-red-50 text-error p-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div className="form-group">
              <div className="flex justify-between">
                <label htmlFor="password" className="form-label">Password</label>
                <a href="#" className="text-sm text-primary">Forgot password?</a>
              </div>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <span className="text-secondary">Don't have an account?</span>{' '}
            <Link to="/register" className="text-primary font-medium">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
