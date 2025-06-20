import mongoose from 'mongoose';

const trendingHashtagSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true
  },
  hashtag: {
    type: String,
    required: true
  },
  popularity: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Compound index for platform and hashtag
trendingHashtagSchema.index({ platform: 1, hashtag: 1 }, { unique: true });
// Index for efficient queries by platform
trendingHashtagSchema.index({ platform: 1, popularity: -1 });

const TrendingHashtag = mongoose.model('TrendingHashtag', trendingHashtagSchema);

export default TrendingHashtag;
