const express = require('express');
const router = express.Router();
const User = require('../models/User');
const StudySession = require('../models/StudySession');
const Goal = require('../models/Goal');
const Assignment = require('../models/Assignment');
const authenticate = require('../middleware/auth');
const checkRole = require('../middleware/roleCheck');

// Get all users (Admin only)
router.get('/users', authenticate, checkRole('admin'), async (req, res) => {
  try {
    const { role, status, search } = req.query;
    
    const filter = {};
    if (role) filter.role = role;
    if (status === 'blocked') filter.isBlocked = true;
    if (status === 'active') filter.isBlocked = false;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(filter)
      .select('-password -refreshToken')
      .sort({ createdAt: -1 });
    
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

// Block/Unblock user
router.put('/users/:id/block', authenticate, checkRole('admin'), async (req, res) => {
  try {
    const { isBlocked } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot block admin users' });
    }
    
    user.isBlocked = isBlocked;
    await user.save();
    
    res.json({
      message: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
});

// Delete user
router.delete('/users/:id', authenticate, checkRole('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete admin users' });
    }
    
    // Delete all user data
    await StudySession.deleteMany({ userId: user._id });
    await Goal.deleteMany({ userId: user._id });
    await Assignment.deleteMany({ userId: user._id });
    await user.deleteOne();
    
    res.json({ message: 'User and all associated data deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});

// Get system analytics
router.get('/analytics', authenticate, checkRole('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isBlocked: false });
    const blockedUsers = await User.countDocuments({ isBlocked: true });
    
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    
    const totalSessions = await StudySession.countDocuments();
    const totalGoals = await Goal.countDocuments();
    const completedGoals = await Goal.countDocuments({ isCompleted: true });
    const totalAssignments = await Assignment.countDocuments();
    
    // Recent registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentRegistrations = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    // Total study hours
    const sessions = await StudySession.find();
    const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalStudyHours = Math.round(totalMinutes / 60);
    
    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        blocked: blockedUsers,
        byRole: usersByRole,
        recentRegistrations
      },
      activity: {
        totalSessions,
        totalStudyHours,
        totalGoals,
        completedGoals,
        goalCompletionRate: totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0,
        totalAssignments
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: error.message });
  }
});

// Change user role
router.put('/users/:id/role', authenticate, checkRole('admin'), async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['student', 'teacher', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.role = role;
    await user.save();
    
    res.json({
      message: 'User role updated',
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update role', error: error.message });
  }
});

module.exports = router;
