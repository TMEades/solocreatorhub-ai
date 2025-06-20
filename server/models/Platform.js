import mongoose from 'mongoose';

const platformSchema = new mongoose.Schema({
  platformId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Platform = mongoose.model('Platform', platformSchema);

export default Platform;
