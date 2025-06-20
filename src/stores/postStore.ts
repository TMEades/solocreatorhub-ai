import { create } from 'zustand'
import { postAPI, platformAPI } from '../services/api'
import { RecurrenceSettings } from '../components/posts/RecurrenceSelector'

export interface Platform {
  id: string
  name: string
  icon: string
  connected: boolean
}

export interface Hashtag {
  _id: string
  platform: string
  hashtag: string
  popularity: number
}

export interface MediaFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video'
}

export interface PlatformPost {
  platform: string
  platformPostId?: string
  status: 'pending' | 'published' | 'failed'
  publishedAt?: string
}

export interface Post {
  _id: string
  content: string
  platforms: string[]
  hashtags: string[]
  mediaUrls: string[]
  createdAt: string
  updatedAt: string
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  scheduledFor?: string
  recurrence?: RecurrenceSettings
  platformPosts?: PlatformPost[]
  nextOccurrence?: string
  scheduledPostId?: number
}

interface PostState {
  posts: Post[]
  platforms: Platform[]
  trendingHashtags: Record<string, Hashtag[]>
  isLoading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  fetchPosts: (params?: { status?: string; platform?: string; page?: number; limit?: number }) => Promise<void>
  fetchPlatforms: () => Promise<void>
  fetchTrendingHashtags: (platform: string) => Promise<void>
  createPost: (post: Partial<Post>, media: MediaFile[]) => Promise<void>
  deletePost: (id: string) => Promise<void>
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  platforms: [],
  trendingHashtags: {},
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  },
  
  fetchPosts: async (params = {}) => {
    set({ isLoading: true, error: null })
    try {
      const response = await postAPI.getPosts(params)
      set({ 
        posts: response.data.posts, 
        pagination: {
          page: response.data.page,
          limit: response.data.limit,
          total: response.data.total,
          totalPages: response.data.totalPages
        },
        isLoading: false 
      })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch posts', 
        isLoading: false 
      })
    }
  },
  
  fetchPlatforms: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await platformAPI.getPlatforms()
      set({ platforms: response.data, isLoading: false })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch platforms', 
        isLoading: false 
      })
    }
  },
  
  fetchTrendingHashtags: async (platform) => {
    set({ isLoading: true, error: null })
    try {
      const response = await postAPI.getTrendingHashtags(platform)
      
      const currentHashtags = get().trendingHashtags
      set({ 
        trendingHashtags: { ...currentHashtags, [platform]: response.data }, 
        isLoading: false 
      })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch trending hashtags', 
        isLoading: false 
      })
    }
  },
  
  createPost: async (post, media) => {
    set({ isLoading: true, error: null })
    try {
      // In a real app, this would upload media files and create the post
      const formData = new FormData()
      formData.append('content', post.content || '')
      
      if (post.platforms) {
        post.platforms.forEach(platform => formData.append('platforms[]', platform))
      }
      
      if (post.hashtags) {
        post.hashtags.forEach(hashtag => formData.append('hashtags[]', hashtag))
      }
      
      // Handle media uploads
      const mediaUrls: string[] = []
      
      // In a real app, we would upload the files here
      // For now, we'll just use the preview URLs
      media.forEach(m => {
        mediaUrls.push(m.preview)
      })
      
      // Add media URLs to form data
      mediaUrls.forEach(url => formData.append('mediaUrls[]', url))
      
      // Add scheduled time if provided
      if (post.scheduledFor) {
        formData.append('scheduledFor', post.scheduledFor)
      }
      
      // Add recurrence settings if provided
      if (post.recurrence) {
        formData.append('recurrence', JSON.stringify(post.recurrence))
      }
      
      const response = await postAPI.createPost(formData)
      
      set(state => ({ 
        posts: [response.data, ...state.posts],
        isLoading: false 
      }))
      
      return response.data
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to create post', 
        isLoading: false 
      })
      throw error
    }
  },
  
  deletePost: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await postAPI.deletePost(id)
      
      set(state => ({ 
        posts: state.posts.filter(post => post._id !== id),
        isLoading: false 
      }))
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to delete post', 
        isLoading: false 
      })
    }
  }
}))
