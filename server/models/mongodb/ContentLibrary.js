import mongoose from 'mongoose';

const contentItemSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  content: {
    type: String
  },
  mediaUrls: {
    type: [String],
    default: []
  },
  tags: {
    type: [String],
    default: []
  },
  category: {
    type: String
  },
  isTemplate: {
    type: Boolean,
    default: false
  },
  usageCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient queries
contentItemSchema.index({ userId: 1 });
contentItemSchema.index({ tags: 1 });
contentItemSchema.index({ category: 1 });

const ContentLibrary = mongoose.model('ContentLibrary', contentItemSchema);

export default ContentLibrary;
