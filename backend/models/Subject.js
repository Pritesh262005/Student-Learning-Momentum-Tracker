const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Subject name is required'],
    trim: true
  },
  color: {
    type: String,
    default: '#3B82F6'
  },
  targetHours: {
    type: Number,
    default: 0
  },
  totalHoursStudied: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Compound index for user and subject
subjectSchema.index({ userId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Subject', subjectSchema);
