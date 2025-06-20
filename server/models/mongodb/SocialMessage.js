import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  externalId: {
    type: String,
    required: true
  },
  sender: {
    id: String,
    name: String,
    profileUrl: String,
    avatarUrl: String
  },
  content: {
    type: String
  },
  mediaUrls: {
    type: [String],
    default: []
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isReplied: {
    type: Boolean,
    default: false
  },
  replyContent: String,
  parentMessageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SocialMessage'
  },
  relatedPostId: {
    type: String
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Index for efficient queries
messageSchema.index({ userId: 1 });
messageSchema.index({ platform: 1 });
messageSchema.index({ isRead: 1 });
messageSchema.index({ externalId: 1 });

const SocialMessage = mongoose.model('SocialMessage', messageSchema);

export default SocialMessage;
