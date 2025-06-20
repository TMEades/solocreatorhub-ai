import mongoose from 'mongoose';

const aiGenerationSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['caption', 'hashtags', 'idea', 'response'],
    required: true
  },
  result: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  usedInPostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String
  }
}, {
  timestamps: true
});

// Index for efficient queries
aiGenerationSchema.index({ userId: 1 });
aiGenerationSchema.index({ type: 1 });

const AIGeneration = mongoose.model('AIGeneration', aiGenerationSchema);

export default AIGeneration;
