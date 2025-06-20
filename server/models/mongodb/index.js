import mongoose from 'mongoose';

// Post Schema - for flexible content storage
const postSchema = new mongoose.Schema({
  content: {
    text: String,
    media: [{
      type: String,
      url: String,
      alt: String
    }],
    hashtags: [String]
  },
  platforms: [{
    name: String,
    postId: String,
    status: String,
    scheduledFor: Date,
    postedAt: Date
  }],
  analytics: {
    likes: Number,
    comments: Number,
    shares: Number,
    impressions: Number,
    engagement: Number
  },
  metadata: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: String,
    isTemplate: Boolean,
    category: String,
    tags: [String]
  }
}, { timestamps: true });

// Content Library Schema - for storing reusable content
const contentLibrarySchema = new mongoose.Schema({
  name: String,
  description: String,
  content: {
    text: String,
    media: [{
      type: String,
      url: String,
      alt: String
    }]
  },
  tags: [String],
  userId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hashtag Schema - for trending hashtags
const hashtagSchema = new mongoose.Schema({
  tag: { type: String, unique: true },
  platforms: [{
    name: String,
    popularity: Number,
    trend: String // up, down, stable
  }],
  categories: [String],
  updatedAt: { type: Date, default: Date.now }
});

// Create and export models
export const Post = mongoose.model('Post', postSchema);
export const ContentLibrary = mongoose.model('ContentLibrary', contentLibrarySchema);
export const Hashtag = mongoose.model('Hashtag', hashtagSchema);

export default {
  Post,
  ContentLibrary,
  Hashtag
};
