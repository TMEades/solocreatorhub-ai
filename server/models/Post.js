import mongoose from 'mongoose';

const recurrenceSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: false
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'custom'],
    required: function() { return this.enabled; }
  },
  interval: {
    type: Number,
    default: 1,
    min: 1
  },
  weekdays: {
    type: [Number],
    validate: {
      validator: function(v) {
        return !this.enabled || this.frequency !== 'weekly' || (v && v.length > 0);
      },
      message: 'Weekdays are required for weekly recurrence'
    }
  },
  monthDay: {
    type: Number,
    min: 1,
    max: 31,
    validate: {
      validator: function(v) {
        return !this.enabled || this.frequency !== 'monthly' || v;
      },
      message: 'Month day is required for monthly recurrence'
    }
  },
  endDate: Date,
  endAfterOccurrences: Number,
  endType: {
    type: String,
    enum: ['never', 'after', 'on'],
    default: 'never'
  }
}, { _id: false });

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  scheduledFor: {
    type: Date
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'published', 'failed'],
    default: 'draft'
  },
  recurrence: {
    type: recurrenceSchema,
    default: () => ({})
  },
  platformPosts: [{
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
  }],
  nextOccurrence: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for efficient queries
postSchema.index({ user: 1, status: 1 });
postSchema.index({ scheduledFor: 1 }, { sparse: true });
postSchema.index({ nextOccurrence: 1 }, { sparse: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
