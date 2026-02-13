const cron = require('node-cron');
const Notification = require('../models/Notification');
const Goal = require('../models/Goal');
const Assignment = require('../models/Assignment');
const User = require('../models/User');

const createNotification = async (userId, type, title, message, link = null) => {
  try {
    await Notification.create({
      userId,
      type,
      title,
      message,
      link
    });
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

const sendDailyStudyReminders = async () => {
  try {
    const users = await User.find({ role: 'student', isBlocked: false });
    
    for (const user of users) {
      await createNotification(
        user._id,
        'study_reminder',
        'Daily Study Reminder',
        'Don\'t forget to log your study session today! Keep your momentum going.'
      );
    }
    
    console.log('Daily study reminders sent');
  } catch (error) {
    console.error('Error sending daily reminders:', error);
  }
};

const sendDeadlineReminders = async () => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 59, 999);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Assignment deadlines
    const upcomingAssignments = await Assignment.find({
      deadline: { $gte: today, $lte: tomorrow },
      isCompleted: false
    }).populate('subjectId');
    
    for (const assignment of upcomingAssignments) {
      await createNotification(
        assignment.userId,
        'deadline_reminder',
        'Assignment Deadline Tomorrow',
        `${assignment.title} for ${assignment.subjectId.name} is due tomorrow!`,
        '/assignments'
      );
    }
    
    // Goal deadlines
    const upcomingGoals = await Goal.find({
      deadline: { $gte: today, $lte: tomorrow },
      isCompleted: false
    });
    
    for (const goal of upcomingGoals) {
      await createNotification(
        goal.userId,
        'goal_reminder',
        'Goal Deadline Tomorrow',
        `Your goal "${goal.title}" deadline is tomorrow!`,
        '/goals'
      );
    }
    
    console.log('Deadline reminders sent');
  } catch (error) {
    console.error('Error sending deadline reminders:', error);
  }
};

const initializeNotificationScheduler = () => {
  // Daily study reminder at 9 AM
  cron.schedule('0 9 * * *', sendDailyStudyReminders);
  
  // Deadline reminders at 6 PM
  cron.schedule('0 18 * * *', sendDeadlineReminders);
  
  console.log('Notification scheduler initialized');
};

module.exports = {
  createNotification,
  initializeNotificationScheduler
};
