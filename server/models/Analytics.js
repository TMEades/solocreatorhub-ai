import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  engagementRate: {
    type: Number,
    default: 0
  },
  impressions: {
    type: Number,
    default: 0
  },
  reach: {
    type: Number,
    default: 0
  },
  followers: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  hourlyEngagement: {
    type: Map,
    of: Number,
    default: () => new Map()
  }
}, {
  timestamps: true
});

// Compound index for user, platform, and date
analyticsSchema.index({ user: 1, platform: 1, date: 1 }, { unique: true });

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;
