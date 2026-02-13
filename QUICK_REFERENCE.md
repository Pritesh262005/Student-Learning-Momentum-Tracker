# Quick Reference Card

## 🚀 Start Application

```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
cd frontend
npm run dev

# Access: http://localhost:5173
```

## 🔑 Default Ports

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`
- MongoDB: `mongodb://localhost:27017`

## 📁 Key Files

### Backend
- `server.js` - Main server file
- `config/db.js` - Database connection
- `config/passport.js` - Google OAuth
- `routes/` - API endpoints
- `models/` - Database schemas
- `services/momentumCalculator.js` - Score logic

### Frontend
- `src/App.jsx` - Main app component
- `src/main.jsx` - Entry point
- `src/context/AuthContext.jsx` - Auth state
- `src/services/api.js` - API client
- `src/components/` - React components

## 🔐 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/momentum
JWT_ACCESS_SECRET=<64-char-random>
JWT_REFRESH_SECRET=<64-char-random>
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-secret>
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=<your-client-id>
```

## 📊 API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/google`
- POST `/api/auth/logout`

### Study Sessions
- GET `/api/study-sessions`
- POST `/api/study-sessions`
- PUT `/api/study-sessions/:id`
- DELETE `/api/study-sessions/:id`

### Goals
- GET `/api/goals`
- POST `/api/goals`
- PUT `/api/goals/:id`
- DELETE `/api/goals/:id`

### Dashboard
- GET `/api/dashboard`

### Admin
- GET `/api/admin/users`
- PUT `/api/admin/users/:id/block`

## 🗄️ Database Models

1. **User** - Authentication & profile
2. **Subject** - Study subjects
3. **StudySession** - Study tracking
4. **Goal** - Goal management
5. **Assignment** - Assignment tracking
6. **Notification** - Notifications

## 🧮 Momentum Formula

```
Score = (Consistency × 30%) + 
        (Study Trend × 30%) + 
        (Goal Completion × 20%) + 
        (Assignment Performance × 20%)
```

## 🎨 Main Routes

- `/login` - Login page
- `/register` - Registration
- `/dashboard` - Main dashboard
- `/study-sessions` - Study sessions
- `/goals` - Goals management
- `/assignments` - Assignments
- `/notifications` - Notifications
- `/admin` - Admin panel (admin only)

## 🔧 Common Commands

### Install Dependencies
```bash
npm install
```

### Start Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Generate Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🐛 Troubleshooting

### Port in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 5173
npx kill-port 5173
```

### MongoDB Not Running
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### Clear Node Modules
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation

- `README.md` - Main documentation
- `docs/API_DOCUMENTATION.md` - API reference
- `docs/DEPLOYMENT.md` - Deployment guide
- `docs/TESTING_CHECKLIST.md` - Testing guide
- `PROJECT_COMPLETE.md` - Completion summary

## 🎯 Quick Tasks

### Create Admin User
```javascript
// In MongoDB
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Test API
```bash
curl http://localhost:5000/health
```

### Check Logs
```bash
# Backend logs in terminal
# Or check MongoDB logs
```

## 🔒 Security Checklist

- [ ] Strong JWT secrets
- [ ] HTTPS in production
- [ ] Environment variables secured
- [ ] MongoDB authentication enabled
- [ ] Rate limiting configured
- [ ] CORS properly set

## 📦 Tech Stack

**Backend**: Node.js, Express, MongoDB, JWT, Passport  
**Frontend**: React, Vite, Tailwind, Recharts  
**Auth**: JWT + Google OAuth 2.0  
**Database**: MongoDB with Mongoose

## 🎓 Key Features

- ✅ Authentication (Email + Google)
- ✅ Study session tracking
- ✅ Momentum score calculation
- ✅ Goal management
- ✅ Assignment tracking
- ✅ Notifications
- ✅ Admin panel
- ✅ Analytics dashboard

## 📞 Need Help?

1. Check `README.md`
2. Review `docs/` folder
3. Check `PROJECT_COMPLETE.md`
4. Review code comments

---

**Version**: 1.0.0  
**Status**: Production Ready  
**License**: MIT
