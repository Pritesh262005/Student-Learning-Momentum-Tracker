const StudySession = require('../models/StudySession');
const Goal = require('../models/Goal');
const Assignment = require('../models/Assignment');
const { MOMENTUM_WEIGHTS } = require('../config/constants');

const calculateMomentumScore = async (userId) => {
  try {
    // Get data from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // 1. Consistency Factor (30%)
    const consistencyScore = await calculateConsistency(userId, thirtyDaysAgo);
    
    // 2. Study Time Trend (30%)
    const trendScore = await calculateStudyTrend(userId, thirtyDaysAgo);
    
    // 3. Goal Completion Rate (20%)
    const goalScore = await calculateGoalCompletion(userId);
    
    // 4. Assignment Performance (20%)
    const assignmentScore = await calculateAssignmentPerformance(userId);
    
    // Calculate weighted momentum score
    const momentumScore = Math.round(
      (consistencyScore * MOMENTUM_WEIGHTS.CONSISTENCY) +
      (trendScore * MOMENTUM_WEIGHTS.STUDY_TREND) +
      (goalScore * MOMENTUM_WEIGHTS.GOAL_COMPLETION) +
      (assignmentScore * MOMENTUM_WEIGHTS.ASSIGNMENT_PERFORMANCE)
    );
    
    // Determine trend
    const previousScore = await calculatePreviousMomentum(userId);
    const trend = momentumScore > previousScore ? 'improving' : 
                  momentumScore < previousScore ? 'declining' : 'stable';
    
    // Generate suggestions
    const suggestions = generateSuggestions(momentumScore, {
      consistency: consistencyScore,
      trend: trendScore,
      goals: goalScore,
      assignments: assignmentScore
    });
    
    return {
      score: momentumScore,
      trend,
      suggestions,
      breakdown: {
        consistency: Math.round(consistencyScore),
        studyTrend: Math.round(trendScore),
        goalCompletion: Math.round(goalScore),
        assignmentPerformance: Math.round(assignmentScore)
      }
    };
  } catch (error) {
    console.error('Momentum calculation error:', error);
    return { score: 0, trend: 'stable', suggestions: [], breakdown: {} };
  }
};

const calculateConsistency = async (userId, fromDate) => {
  const sessions = await StudySession.find({
    userId,
    date: { $gte: fromDate }
  }).select('date');
  
  if (sessions.length === 0) return 0;
  
  const uniqueDays = new Set(
    sessions.map(s => new Date(s.date).toDateString())
  ).size;
  
  const consistencyRate = (uniqueDays / 30) * 100;
  return Math.min(consistencyRate * 1.5, 100); // Boost for high consistency
};

const calculateStudyTrend = async (userId, fromDate) => {
  const sessions = await StudySession.find({
    userId,
    date: { $gte: fromDate }
  }).select('duration date');
  
  if (sessions.length === 0) return 0;
  
  // Split into two halves
  const midPoint = new Date(fromDate.getTime() + (Date.now() - fromDate.getTime()) / 2);
  
  const firstHalf = sessions.filter(s => s.date < midPoint);
  const secondHalf = sessions.filter(s => s.date >= midPoint);
  
  const firstAvg = firstHalf.reduce((sum, s) => sum + s.duration, 0) / (firstHalf.length || 1);
  const secondAvg = secondHalf.reduce((sum, s) => sum + s.duration, 0) / (secondHalf.length || 1);
  
  if (firstAvg === 0) return secondAvg > 0 ? 100 : 0;
  
  const improvement = ((secondAvg - firstAvg) / firstAvg) * 100;
  return Math.max(0, Math.min(50 + improvement, 100));
};

const calculateGoalCompletion = async (userId) => {
  const goals = await Goal.find({ userId });
  
  if (goals.length === 0) return 50; // Neutral score if no goals
  
  const completedGoals = goals.filter(g => g.isCompleted).length;
  const activeGoals = goals.filter(g => !g.isCompleted && new Date(g.deadline) > new Date());
  
  const completionRate = (completedGoals / goals.length) * 100;
  
  // Calculate progress on active goals
  const avgProgress = activeGoals.length > 0
    ? activeGoals.reduce((sum, g) => sum + (g.currentValue / g.targetValue), 0) / activeGoals.length * 100
    : 0;
  
  return (completionRate * 0.6) + (avgProgress * 0.4);
};

const calculateAssignmentPerformance = async (userId) => {
  const assignments = await Assignment.find({
    userId,
    isCompleted: true,
    obtainedScore: { $ne: null }
  });
  
  if (assignments.length === 0) return 50; // Neutral score if no assignments
  
  const avgPercentage = assignments.reduce((sum, a) => {
    return sum + (a.obtainedScore / a.maxScore) * 100;
  }, 0) / assignments.length;
  
  return avgPercentage;
};

const calculatePreviousMomentum = async (userId) => {
  // Simplified: compare with 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const sessions = await StudySession.find({
    userId,
    date: { $lt: sevenDaysAgo }
  }).limit(10);
  
  return sessions.length > 5 ? 60 : 40; // Simplified previous score
};

const generateSuggestions = (score, breakdown) => {
  const suggestions = [];
  
  if (score < 60) {
    suggestions.push('Your momentum is below optimal. Focus on building consistency.');
  }
  
  if (breakdown.consistency < 50) {
    suggestions.push('Try to study at least 5 days a week to improve consistency.');
  }
  
  if (breakdown.studyTrend < 50) {
    suggestions.push('Gradually increase your daily study time.');
  }
  
  if (breakdown.goalCompletion < 50) {
    suggestions.push('Set realistic goals and track your progress regularly.');
  }
  
  if (breakdown.assignmentPerformance < 60) {
    suggestions.push('Review difficult topics and seek help when needed.');
  }
  
  if (score >= 80) {
    suggestions.push('Excellent momentum! Keep up the great work.');
  }
  
  return suggestions;
};

module.exports = { calculateMomentumScore };
