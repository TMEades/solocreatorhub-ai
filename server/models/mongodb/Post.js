import mongoose from 'mongoose';

const platformPostSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true
  },
  platformPostId: String,
  status: {
    type: String,
    enum: ['pending', 'published', 'failed'],
    default: 'pending'
  },
  publishedAt: Date
}, { _id: false });

const postSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  platforms: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'At least one platform is required'
    }
  },
  hashtags: {
    type: [String],
    default: []
  },
  mediaUrls: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'published', 'failed'],
    default: 'draft'
  },
  platformPosts: [platformPostSchema],
  // The MySQL ScheduledPost will handle scheduling details
  // This is just a reference to the MySQL record
  scheduledPostId: {
    type: Number
  }
}, {
  timestamps: true
});

// Index for efficient queries
postSchema.index({ userId: 1 });
postSchema.index({ status: 1 });
postSchema.index({ 'platformPosts.platform': 1 });

const Post = mongoose.model('Post', postSchema);

export default Post;
