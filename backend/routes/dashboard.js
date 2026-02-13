const express = require('express');
const router = express.Router();
const StudySession = require('../models/StudySession');
const Goal = require('../models/Goal');
const Assignment = require('../models/Assignment');
const Subject = require('../models/Subject');
const authenticate = require('../middleware/auth');
const { calculateMomentumScore } = require('../services/momentumCalculator');
const { calculateStreak } = require('../services/streakCalculator');

// Get dashboard data
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Calculate momentum score
    const momentum = await calculateMomentumScore(userId);
    
    // Calculate streak
    const streak = await calculateStreak(userId);
    
    // Total study hours
    const sessions = await StudySession.find({ userId });
    const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalHours = Math.round(totalMinutes / 60 * 10) / 10;
    
    // Subject-wise breakdown
    const subjects = await Subject.find({ userId });
    const subjectBreakdown = subjects.map(s => ({
      name: s.name,
      hours: Math.round(s.totalHoursStudied * 10) / 10,
      color: s.color
    }));
    
    // Weekly trend (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentSessions = await StudySession.find({
      userId,
      date: { $gte: sevenDaysAgo }
    });
    
    const weeklyTrend = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const dayMinutes = recentSessions
        .filter(s => {
          const sessionDate = new Date(s.date);
          return sessionDate >= date && sessionDate < nextDate;
        })
        .reduce((sum, s) => sum + s.duration, 0);
      
      weeklyTrend.push({
        date: date.toISOString().split('T')[0],
        minutes: dayMinutes
      });
    }
    
    // Active goals
    const activeGoals = await Goal.find({
      userId,
      isCompleted: false,
      deadline: { $gte: new Date() }
    }).limit(5);
    
    // Upcoming deadlines
    const upcomingAssignments = await Assignment.find({
      userId,
      isCompleted: false,
      deadline: { $gte: new Date() }
    })
      .populate('subjectId', 'name color')
      .sort({ deadline: 1 })
      .limit(5);
    
    res.json({
      momentum,
      streak,
      totalHours,
      subjectBreakdown,
      weeklyTrend,
      activeGoals,
      upcomingAssignments
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard data', error: error.message });
  }
});

// Get detailed analytics
router.get('/analytics', authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    const { period = '30' } = req.query; // days
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));
    
    const sessions = await StudySession.find({
      userId,
      date: { $gte: startDate }
    }).populate('subjectId', 'name color');
    
    // Daily study time
    const dailyStats = {};
    sessions.forEach(s => {
      const date = new Date(s.date).toISOString().split('T')[0];
      if (!dailyStats[date]) dailyStats[date] = 0;
      dailyStats[date] += s.duration;
    });
    
    // Subject distribution
    const subjectStats = {};
    sessions.forEach(s => {
      const subject = s.subjectId.name;
      if (!subjectStats[subject]) {
        subjectStats[subject] = {
          minutes: 0,
          sessions: 0,
          color: s.subjectId.color
        };
      }
      subjectStats[subject].minutes += s.duration;
      subjectStats[subject].sessions += 1;
    });
    
    // Study quality trend
    const qualityTrend = sessions.map(s => ({
      date: new Date(s.date).toISOString().split('T')[0],
      quality: s.quality
    }));
    
    res.json({
      dailyStats,
      subjectStats,
      qualityTrend,
      totalSessions: sessions.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: error.message });
  }
});

module.exports = router;
