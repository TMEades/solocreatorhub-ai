// Environment-aware configuration
const isDev = import.meta.env.DEV;

// API URLs
export const API_URL = isDev ? 'http://localhost:3001/api' : import.meta.env.VITE_API_URL || 'https://api.solecreatorhub.com';

// App configuration
export const APP_CONFIG = {
  name: 'SoleCreatorHub AI',
  version: '0.1.0',
  description: 'AI-powered social media management for creators',
  logoUrl: '/logo.svg'
};

// Database configuration
export const DB_CONFIG = {
  // These are used server-side only
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/solecreatorhub',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  mysql: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'solecreatorhub'
  }
};

// Feature flags
export const FEATURES = {
  aiSuggestions: true,
  multiPlatformPosting: true,
  analytics: true,
  teamManagement: true
};
