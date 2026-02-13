const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const Subject = require('../models/Subject');
const authenticate = require('../middleware/auth');
const { validateAssignment, handleValidationErrors } = require('../utils/validators');

// Get all assignments
router.get('/', authenticate, async (req, res) => {
  try {
    const { subjectId, status } = req.query;
    
    const filter = { userId: req.user._id };
    
    if (subjectId) filter.subjectId = subjectId;
    if (status === 'completed') filter.isCompleted = true;
    if (status === 'pending') filter.isCompleted = false;
    
    const assignments = await Assignment.find(filter)
      .populate('subjectId', 'name color')
      .sort({ deadline: 1 });
    
    res.json({ assignments });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch assignments', error: error.message });
  }
});

// Create assignment
router.post('/', authenticate, validateAssignment, handleValidationErrors, async (req, res) => {
  try {
    const { subjectId, title, description, deadline, maxScore } = req.body;
    
    // Verify subject belongs to user
    const subject = await Subject.findOne({ _id: subjectId, userId: req.user._id });
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    
    const assignment = await Assignment.create({
      userId: req.user._id,
      subjectId,
      title,
      description,
      deadline,
      maxScore
    });
    
    const populatedAssignment = await Assignment.findById(assignment._id)
      .populate('subjectId', 'name color');
    
    res.status(201).json({
      message: 'Assignment created',
      assignment: populatedAssignment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create assignment', error: error.message });
  }
});

// Update assignment
router.put('/:id', authenticate, async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    const { title, description, deadline, maxScore, obtainedScore, isCompleted } = req.body;
    
    if (title) assignment.title = title;
    if (description !== undefined) assignment.description = description;
    if (deadline) assignment.deadline = deadline;
    if (maxScore) assignment.maxScore = maxScore;
    if (obtainedScore !== undefined) assignment.obtainedScore = obtainedScore;
    
    if (isCompleted !== undefined) {
      assignment.isCompleted = isCompleted;
      if (isCompleted) assignment.submittedAt = new Date();
    }
    
    await assignment.save();
    
    const updatedAssignment = await Assignment.findById(assignment._id)
      .populate('subjectId', 'name color');
    
    res.json({
      message: 'Assignment updated',
      assignment: updatedAssignment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update assignment', error: error.message });
  }
});

// Delete assignment
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    await assignment.deleteOne();
    
    res.json({ message: 'Assignment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete assignment', error: error.message });
  }
});

// Get performance analytics
router.get('/analytics', authenticate, async (req, res) => {
  try {
    const assignments = await Assignment.find({
      userId: req.user._id,
      isCompleted: true,
      obtainedScore: { $ne: null }
    }).populate('subjectId', 'name');
    
    // Calculate subject-wise average
    const subjectStats = {};
    
    assignments.forEach(a => {
      const subjectName = a.subjectId.name;
      if (!subjectStats[subjectName]) {
        subjectStats[subjectName] = {
          total: 0,
          count: 0,
          scores: []
        };
      }
      
      const percentage = (a.obtainedScore / a.maxScore) * 100;
      subjectStats[subjectName].total += percentage;
      subjectStats[subjectName].count += 1;
      subjectStats[subjectName].scores.push(percentage);
    });
    
    const analytics = Object.keys(subjectStats).map(subject => ({
      subject,
      average: Math.round(subjectStats[subject].total / subjectStats[subject].count),
      count: subjectStats[subject].count,
      scores: subjectStats[subject].scores
    }));
    
    res.json({ analytics });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: error.message });
  }
});

module.exports = router;
