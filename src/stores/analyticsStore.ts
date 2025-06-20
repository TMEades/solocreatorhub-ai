import { create } from 'zustand'
import { analyticsAPI } from '../services/api'

export interface AnalyticsData {
  _id: string
  platform: string
  platformName?: string
  date: string
  engagementRate: number
  impressions: number
  reach: number
  followers: number
  likes: number
  comments: number
  shares: number
  hourlyEngagement: Record<string, number>
}

export interface OptimalTimes {
  [platform: string]: string[]
}

interface AnalyticsState {
  data: AnalyticsData[]
  optimalTimes: OptimalTimes
  isLoading: boolean
  error: string | null
  fetchAnalytics: (params?: { platform?: string; startDate?: string; endDate?: string }) => Promise<void>
  fetchOptimalTimes: (platforms: string[]) => Promise<void>
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  data: [],
  optimalTimes: {},
  isLoading: false,
  error: null,
  
  fetchAnalytics: async (params) => {
    set({ isLoading: true, error: null })
    try {
      const response = await analyticsAPI.getAnalytics(params)
      set({ data: response.data, isLoading: false })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch analytics data', 
        isLoading: false 
      })
    }
  },
  
  fetchOptimalTimes: async (platforms) => {
    set({ isLoading: true, error: null })
    try {
      const response = await analyticsAPI.getOptimalTimes(platforms)
      set({ optimalTimes: response.data, isLoading: false })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch optimal posting times', 
        isLoading: false 
      })
    }
  }
}))
