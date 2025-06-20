import { create } from 'zustand'
import { authAPI } from '../services/api'
import { TOKEN_KEY } from '../config'

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  
  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authAPI.login(email, password)
      const { user, token } = response.data
      
      localStorage.setItem(TOKEN_KEY, token)
      set({ user, isLoading: false })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to login', 
        isLoading: false 
      })
    }
  },
  
  register: async (name, email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authAPI.register(name, email, password)
      const { user, token } = response.data
      
      localStorage.setItem(TOKEN_KEY, token)
      set({ user, isLoading: false })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to register', 
        isLoading: false 
      })
    }
  },
  
  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    set({ user: null })
  },
  
  checkAuth: async () => {
    set({ isLoading: true })
    try {
      const token = localStorage.getItem(TOKEN_KEY)
      if (!token) {
        set({ user: null, isLoading: false })
        return
      }
      
      const response = await authAPI.getProfile()
      set({ user: response.data, isLoading: false })
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY)
      set({ user: null, isLoading: false })
    }
  }
}))
