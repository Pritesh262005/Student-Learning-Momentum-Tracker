const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const authenticate = require('../middleware/auth');
const { validateGoal, handleValidationErrors } = require('../utils/validators');
const { createNotification } = require('../services/notificationService');

// Get all goals
router.get('/', authenticate, async (req, res) => {
  try {
    const { type, status } = req.query;
    
    const filter = { userId: req.user._id };
    
    if (type) filter.type = type;
    if (status === 'completed') filter.isCompleted = true;
    if (status === 'active') filter.isCompleted = false;
    
    const goals = await Goal.find(filter).sort({ deadline: 1 });
    
    res.json({ goals });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch goals', error: error.message });
  }
});

// Create goal
router.post('/', authenticate, validateGoal, handleValidationErrors, async (req, res) => {
  try {
    const { title, description, type, targetValue, unit, deadline } = req.body;
    
    const goal = await Goal.create({
      userId: req.user._id,
      title,
      description,
      type,
      targetValue,
      unit: unit || 'hours',
      deadline
    });
    
    res.status(201).json({ message: 'Goal created', goal });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create goal', error: error.message });
  }
});

// Update goal
router.put('/:id', authenticate, async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    
    const { title, description, targetValue, currentValue, deadline, isCompleted } = req.body;
    
    if (title) goal.title = title;
    if (description !== undefined) goal.description = description;
    if (targetValue) goal.targetValue = targetValue;
    if (currentValue !== undefined) goal.currentValue = currentValue;
    if (deadline) goal.deadline = deadline;
    
    if (isCompleted !== undefined && isCompleted && !goal.isCompleted) {
      goal.isCompleted = true;
      goal.completedAt = new Date();
      
      // Send achievement notification
      await createNotification(
        req.user._id,
        'achievement',
        'Goal Completed! 🎉',
        `Congratulations! You've completed your goal: ${goal.title}`,
        '/goals'
      );
    }
    
    await goal.save();
    
    res.json({ message: 'Goal updated', goal });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update goal', error: error.message });
  }
});

// Delete goal
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    
    await goal.deleteOne();
    
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete goal', error: error.message });
  }
});

module.exports = router;
