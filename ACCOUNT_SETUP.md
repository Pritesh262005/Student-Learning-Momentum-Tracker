# How to Create Admin and Teacher Accounts

## Method 1: Using the Setup Script (Easiest)

### Step 1: Register Accounts Through UI
1. Start the application (run `start.bat`)
2. Open http://localhost:5173
3. Register these accounts:
   - **Admin**: admin@example.com (password: admin123)
   - **Teacher**: teacher@example.com (password: teacher123)
   - **Student**: student@example.com (password: student123)

### Step 2: Run Setup Script
```bash
cd backend
node setup-accounts.js
```

This will automatically upgrade the accounts to admin and teacher roles.

### Step 3: Login
- Admin: admin@example.com / admin123
- Teacher: teacher@example.com / teacher123
- Student: student@example.com / student123

---

## Method 2: Using MongoDB Shell

### Step 1: Register Through UI
Register your accounts first at http://localhost:5173/register

### Step 2: Open MongoDB Shell
```bash
C
```

### Step 3: Switch to Database
```javascript
use student-momentum-tracker
```

### Step 4: Create Admin Account
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Step 5: Create Teacher Account
```javascript
db.users.updateOne(
  { email: "teacher@example.com" },
  { $set: { role: "teacher" } }
)
```

### Step 6: Verify
```javascript
db.users.find({}, { email: 1, role: 1, _id: 0 })
```

---

## Method 3: Using MongoDB Compass (GUI)

### Step 1: Install MongoDB Compass
Download from: https://www.mongodb.com/products/compass

### Step 2: Connect
- Connection String: `mongodb://localhost:27017`
- Click "Connect"

### Step 3: Navigate to Database
- Database: `student-momentum-tracker`
- Collection: `users`

### Step 4: Edit User Documents
1. Find the user by email
2. Click the pencil icon to edit
3. Change `role` field to `"admin"` or `"teacher"`
4. Click "Update"

---

## Quick Test Accounts

For quick testing, use these credentials:

### Admin Account
- **Email**: admin@test.com
- **Password**: admin123
- **Role**: admin
- **Access**: Full system access, user management, analytics

### Teacher Account
- **Email**: teacher@test.com
- **Password**: teacher123
- **Role**: teacher
- **Access**: All student features (no admin panel)

### Student Account
- **Email**: student@test.com
- **Password**: student123
- **Role**: student
- **Access**: Dashboard, study sessions, goals, assignments

---

## Role Permissions

### Student (Default)
- ✅ Dashboard
- ✅ Study Sessions
- ✅ Goals
- ✅ Assignments
- ✅ Notifications
- ❌ Admin Panel

### Teacher
- ✅ All Student features
- ✅ Can view analytics
- ❌ Admin Panel

### Admin
- ✅ All Student features
- ✅ All Teacher features
- ✅ Admin Panel
- ✅ User Management
- ✅ System Analytics
- ✅ Block/Unblock Users
- ✅ Delete Users
- ✅ Change User Roles

---

## Automated Setup (All at Once)

Create a file `backend/seed-users.js`:

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function seedUsers() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const User = require('./models/User');
  
  const users = [
    {
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'admin123',
      role: 'admin'
    },
    {
      name: 'Teacher User',
      email: 'teacher@test.com',
      password: 'teacher123',
      role: 'teacher'
    },
    {
      name: 'Student User',
      email: 'student@test.com',
      password: 'student123',
      role: 'student'
    }
  ];
  
  for (const userData of users) {
    const exists = await User.findOne({ email: userData.email });
    if (!exists) {
      await User.create(userData);
      console.log(`✅ Created: ${userData.email} (${userData.role})`);
    } else {
      console.log(`⚠️  Already exists: ${userData.email}`);
    }
  }
  
  await mongoose.disconnect();
  console.log('\n✅ Seeding complete!');
}

seedUsers();
```

Run it:
```bash
cd backend
node seed-users.js
```

---

## Verify Account Roles

### Using MongoDB Shell
```javascript
use student-momentum-tracker
db.users.find({}, { email: 1, role: 1, name: 1 }).pretty()
```

### Using API (After Login)
```bash
# Login first to get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123"}'

# Use the token to check your profile
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Troubleshooting

### "User not found"
- Make sure you registered the account through the UI first
- Check the email spelling matches exactly

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Check connection string in `.env`

### "Role not updating"
- Make sure you're using the correct email
- Try logging out and logging back in
- Clear browser cache/cookies

---

## Security Notes

⚠️ **Important for Production:**
- Change default passwords immediately
- Use strong passwords (min 12 characters)
- Don't use test emails in production
- Regularly audit admin accounts
- Enable 2FA if implementing in future

---

## Quick Reference

| Role | Email | Password | Access |
|------|-------|----------|--------|
| Admin | admin@test.com | admin123 | Full Access |
| Teacher | teacher@test.com | teacher123 | Student Features |
| Student | student@test.com | student123 | Basic Features |

---

**Need Help?** Check `README.md` or `docs/` folder for more information.
