const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Assignment title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  deadline: {
    type: Date,
    required: true
  },
  maxScore: {
    type: Number,
    required: true,
    min: 0
  },
  obtainedScore: {
    type: Number,
    min: 0,
    default: null
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  submittedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
assignmentSchema.index({ userId: 1, deadline: 1 });
assignmentSchema.index({ subjectId: 1 });

// Virtual for percentage
assignmentSchema.virtual('percentage').get(function() {
  if (this.obtainedScore === null) return null;
  return Math.round((this.obtainedScore / this.maxScore) * 100);
});

assignmentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
