import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../config';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (name: string, email: string, password: string) => 
    api.post('/auth/register', { name, email, password }),
  
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  getProfile: () => 
    api.get('/auth/me'),
  
  updateProfile: (data: { name?: string; email?: string; password?: string }) => 
    api.put('/auth/profile', data)
};

// Platform API
export const platformAPI = {
  getPlatforms: () => 
    api.get('/platforms'),
  
  connectPlatform: (platformId: string, accessToken: string, refreshToken?: string, tokenExpiresAt?: Date) => 
    api.post('/platforms/connect', { platformId, accessToken, refreshToken, tokenExpiresAt }),
  
  disconnectPlatform: (platformId: string) => 
    api.post('/platforms/disconnect', { platformId })
};

// Post API
export const postAPI = {
  getPosts: (params?: { status?: string; platform?: string; page?: number; limit?: number }) => 
    api.get('/posts', { params }),
  
  getPost: (id: string) => 
    api.get(`/posts/${id}`),
  
  createPost: (data: any) => 
    api.post('/posts', data),
  
  updatePost: (id: string, data: any) => 
    api.put(`/posts/${id}`, data),
  
  deletePost: (id: string) => 
    api.delete(`/posts/${id}`),
  
  getTrendingHashtags: (platform: string) => 
    api.get('/posts/hashtags/trending', { params: { platform } })
};

// Analytics API
export const analyticsAPI = {
  getAnalytics: (params?: { platform?: string; startDate?: string; endDate?: string }) => 
    api.get('/analytics', { params }),
  
  getOptimalTimes: (platforms: string[]) => 
    api.get('/analytics/optimal-times', { params: { platforms: platforms.join(',') } })
};

export default api;
