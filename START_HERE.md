# 🚀 HOW TO RUN THE PROJECT

## ✅ Setup Complete!

All dependencies are installed and environment files are configured with secure secrets.

## 🎯 Quick Start

### Option 1: Use the Startup Script (Easiest)
Simply double-click: **`start.bat`**

This will open two terminal windows:
- Backend Server (http://localhost:5000)
- Frontend Server (http://localhost:5173)

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 🌐 Access the Application

Once both servers are running, open your browser to:
**http://localhost:5173**

## 📝 First Steps

1. **Register** a new account
2. **Login** with your credentials
3. **Create** your first subject (e.g., "Mathematics")
4. **Add** a study session
5. **Set** a goal
6. **Check** your momentum score!

## 🔧 Important Notes

### MongoDB
- The app uses MongoDB on `mongodb://localhost:27017`
- If you don't have MongoDB installed locally, you have two options:

**Option A: Install MongoDB locally**
- Download from: https://www.mongodb.com/try/download/community
- Install and start the service

**Option B: Use MongoDB Atlas (Cloud - Free)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string
5. Update `backend/.env` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/momentum
   ```

### Google OAuth (Optional)
- Google login is optional
- To enable it, follow: `docs/GOOGLE_OAUTH_SETUP.md`
- Email/password login works without Google OAuth

## ✅ Verify Everything Works

1. ✅ Backend running on http://localhost:5000
2. ✅ Frontend running on http://localhost:5173
3. ✅ Can register new account
4. ✅ Can login
5. ✅ Dashboard loads with stats

## 🐛 Troubleshooting

### "MongoDB connection error"
- Install MongoDB or use MongoDB Atlas (see above)
- Make sure MongoDB service is running

### "Port already in use"
- Close any applications using ports 5000 or 5173
- Or change ports in configuration files

### "Module not found"
- Run `npm install` in both backend and frontend folders

## 📚 Documentation

- **README.md** - Complete project documentation
- **PROJECT_COMPLETE.md** - What's been built
- **QUICK_REFERENCE.md** - Quick commands
- **docs/** - Detailed guides

## 🎓 Default Features

- ✅ Email/Password Authentication
- ✅ Study Session Tracking
- ✅ Momentum Score Calculation
- ✅ Goal Management
- ✅ Assignment Tracking
- ✅ Notifications
- ✅ Analytics Dashboard
- ✅ Admin Panel

## 🔐 Create Admin Account

After registering, you can make yourself an admin:

1. Open MongoDB shell: `mongosh`
2. Run:
```javascript
use student-momentum-tracker
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## 🎉 You're All Set!

The application is ready to use. Enjoy tracking your learning momentum!

---

**Need Help?** Check the documentation in the `docs/` folder or `README.md`
