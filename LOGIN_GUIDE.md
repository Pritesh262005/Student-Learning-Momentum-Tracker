# 🔐 Quick Login Guide

## Create Test Accounts (Easiest Method)

### Step 1: Make sure MongoDB is running
```bash
# Windows
net start MongoDB

# Or use MongoDB Atlas (cloud)
```

### Step 2: Run the seed script
```bash
cd backend
node seed-users.js
```

This creates 3 test accounts instantly!

## Login Credentials

### 👨‍💼 Admin Account
```
Email: admin@test.com
Password: admin123
Access: Full system access + Admin Panel
```

### 👨‍🏫 Teacher Account
```
Email: teacher@test.com
Password: teacher123
Access: All student features
```

### 👨‍🎓 Student Account
```
Email: student@test.com
Password: student123
Access: Dashboard, Study Sessions, Goals, Assignments
```

## What Each Role Can Do

### Admin
- ✅ View all users
- ✅ Block/unblock users
- ✅ Delete users
- ✅ Change user roles
- ✅ View system analytics
- ✅ All student features

### Teacher
- ✅ Dashboard
- ✅ Study sessions
- ✅ Goals
- ✅ Assignments
- ✅ Notifications
- ✅ Analytics

### Student
- ✅ Dashboard
- ✅ Study sessions
- ✅ Goals
- ✅ Assignments
- ✅ Notifications

## Manual Method

If you prefer to create accounts manually:

1. **Register** at http://localhost:5173/register
2. **Open MongoDB shell**: `mongosh`
3. **Run**:
```javascript
use student-momentum-tracker

// Make admin
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)

// Make teacher
db.users.updateOne(
  { email: "teacher-email@example.com" },
  { $set: { role: "teacher" } }
)
```

## Quick Start

1. Run: `cd backend && node seed-users.js`
2. Open: http://localhost:5173
3. Login with any account above
4. Start using the app!

---

**For more details, see `ACCOUNT_SETUP.md`**
