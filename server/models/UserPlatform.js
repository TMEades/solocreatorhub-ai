import mongoose from 'mongoose';

const userPlatformSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    ref: 'Platform',
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String
  },
  tokenExpiresAt: {
    type: Date
  },
  connected: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index to ensure a user can only connect to a platform once
userPlatformSchema.index({ user: 1, platform: 1 }, { unique: true });

const UserPlatform = mongoose.model('UserPlatform', userPlatformSchema);

export default UserPlatform;
