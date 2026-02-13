const StudySession = require('../models/StudySession');

const calculateStreak = async (userId) => {
  const sessions = await StudySession.find({ userId })
    .sort({ date: -1 })
    .select('date');
  
  if (sessions.length === 0) return 0;
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  const uniqueDates = [...new Set(sessions.map(s => {
    const d = new Date(s.date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }))].sort((a, b) => b - a);
  
  // Check if studied today or yesterday
  const today = currentDate.getTime();
  const yesterday = today - 86400000;
  
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
    return 0;
  }
  
  let checkDate = uniqueDates[0] === today ? today : yesterday;
  
  for (let date of uniqueDates) {
    if (date === checkDate) {
      streak++;
      checkDate -= 86400000; // Go back one day
    } else if (date < checkDate) {
      break;
    }
  }
  
  return streak;
};

module.exports = { calculateStreak };
