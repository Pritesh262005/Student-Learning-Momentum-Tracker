# Student Learning Momentum Tracker - Project Summary

## 🎯 Project Overview

A complete, production-ready full-stack web application designed to help students track their learning progress, calculate momentum scores, and achieve academic goals through data-driven insights.

## ✨ Key Features Implemented

### 1. Advanced Authentication System
- ✅ Email/Password registration with bcrypt hashing
- ✅ Secure JWT-based authentication (Access + Refresh tokens)
- ✅ Google OAuth 2.0 integration
- ✅ Automatic account linking for existing emails
- ✅ HTTP-only secure cookies
- ✅ Role-based access control (Student, Teacher, Admin)
- ✅ Login history tracking
- ✅ Token refresh mechanism

### 2. Dashboard & Analytics
- ✅ Real-time statistics (study hours, streak, goals, deadlines)
- ✅ Learning Momentum Score (0-100) with custom algorithm
- ✅ Subject-wise breakdown (Pie chart)
- ✅ Weekly study trend (Line chart)
- ✅ Active goals progress tracking
- ✅ Upcoming deadline alerts

### 3. Study Session Management
- ✅ Create, edit, delete study sessions
- ✅ Track duration, subject, date, notes, quality
- ✅ Subject management with color coding
- ✅ Automatic streak calculation
- ✅ Real-time hour tracking per subject

### 4. Goals System
- ✅ Short-term and long-term goals
- ✅ Progress tracking with visual indicators
- ✅ Deadline management
- ✅ Goal completion notifications
- ✅ Filter by type and status

### 5. Assignment Tracking
- ✅ Create assignments with deadlines
- ✅ Score tracking and percentage calculation
- ✅ Subject-wise performance analytics
- ✅ Deadline reminders
- ✅ Completion status management

### 6. Notification System
- ✅ In-app notification panel
- ✅ Automated daily study reminders (9 AM)
- ✅ Deadline reminders (6 PM, day before)
- ✅ Goal deadline alerts
- ✅ Achievement notifications
- ✅ Mark as read/unread functionality

### 7. Admin Panel
- ✅ User management (view, block, delete)
- ✅ System analytics dashboard
- ✅ User search and filtering
- ✅ Role management
- ✅ Activity monitoring

### 8. Security Features
- ✅ Password hashing (bcrypt, 12 rounds)
- ✅ JWT with short-lived access tokens (15 min)
- ✅ Secure refresh tokens (7 days)
- ✅ Rate limiting (5 req/15min for auth, 100 req/15min for API)
- ✅ Helmet.js security headers
- ✅ CORS configuration
- ✅ Input validation with express-validator
- ✅ XSS protection
- ✅ MongoDB injection prevention

## 🧮 Momentum Score Algorithm

```javascript
Momentum Score = 
  (Consistency Factor × 30%) +
  (Study Time Trend × 30%) +
  (Goal Completion Rate × 20%) +
  (Assignment Performance × 20%)

Where:
- Consistency: Study frequency over last 30 days
- Study Trend: Improvement in study time (first half vs second half)
- Goal Completion: Percentage of goals completed + active goal progress
- Assignment Performance: Average assignment scores
```

## 📊 Technology Stack

### Backend
```
- Node.js v16+
- Express.js v4.18
- MongoDB v5+ with Mongoose v8
- JWT (jsonwebtoken v9)
- Passport.js (Google OAuth)
- bcryptjs v2.4
- Helmet v7 (Security)
- express-rate-limit v7
- express-validator v7
- node-cron v3 (Scheduled tasks)
- cookie-parser v1.4
```

### Frontend
```
- React v18.2
- Vite v5 (Build tool)
- React Router v6.21
- Tailwind CSS v3.4
- Recharts v2.10 (Charts)
- Axios v1.6
- Lucide React v0.303 (Icons)
```

## 📁 Complete File Structure

```
student-momentum-tracker/
├── backend/
│   ├── config/
│   │   ├── db.js                    # MongoDB connection
│   │   ├── passport.js              # Google OAuth config
│   │   └── constants.js             # App constants
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   ├── Subject.js               # Subject schema
│   │   ├── StudySession.js          # Study session schema
│   │   ├── Goal.js                  # Goal schema
│   │   ├── Assignment.js            # Assignment schema
│   │   └── Notification.js          # Notification schema
│   ├── middleware/
│   │   ├── auth.js                  # JWT authentication
│   │   ├── roleCheck.js             # Role-based access
│   │   └── rateLimiter.js           # Rate limiting
│   ├── routes/
│   │   ├── auth.js                  # Auth endpoints
│   │   ├── studySession.js          # Study session CRUD
│   │   ├── goal.js                  # Goal CRUD
│   │   ├── assignment.js            # Assignment CRUD
│   │   ├── notification.js          # Notification endpoints
│   │   ├── dashboard.js             # Dashboard data
│   │   └── admin.js                 # Admin endpoints
│   ├── services/
│   │   ├── momentumCalculator.js    # Momentum score logic
│   │   ├── streakCalculator.js      # Streak calculation
│   │   └── notificationService.js   # Notification scheduler
│   ├── utils/
│   │   ├── tokenUtils.js            # JWT utilities
│   │   └── validators.js            # Input validators
│   ├── .env.example                 # Environment template
│   ├── package.json                 # Dependencies
│   └── server.js                    # Express app
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── GoogleAuthButton.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── StatsCard.jsx
│   │   │   │   ├── MomentumScore.jsx
│   │   │   │   ├── SubjectChart.jsx
│   │   │   │   └── WeeklyTrend.jsx
│   │   │   ├── study/
│   │   │   │   ├── StudySessionList.jsx
│   │   │   │   └── AddStudySession.jsx
│   │   │   ├── goals/
│   │   │   │   ├── GoalList.jsx
│   │   │   │   └── AddGoal.jsx
│   │   │   ├── assignments/
│   │   │   │   ├── AssignmentList.jsx
│   │   │   │   └── AddAssignment.jsx
│   │   │   ├── notifications/
│   │   │   │   └── NotificationPanel.jsx
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   └── UserManagement.jsx
│   │   │   └── common/
│   │   │       ├── Navbar.jsx
│   │   │       ├── Sidebar.jsx
│   │   │       ├── ProtectedRoute.jsx
│   │   │       └── Loader.jsx
│   │   ├── services/
│   │   │   ├── api.js               # Axios config
│   │   │   └── authService.js       # Auth API calls
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Global auth state
│   │   ├── utils/
│   │   │   └── helpers.js           # Utility functions
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── public/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── docs/
│   ├── API_DOCUMENTATION.md         # Complete API docs
│   ├── ER_DIAGRAM.md                # Database schema
│   ├── DEPLOYMENT.md                # Deployment guide
│   ├── TESTING_CHECKLIST.md         # Testing guide
│   └── GOOGLE_OAUTH_SETUP.md        # OAuth setup
└── README.md                        # Main documentation
```

## 🚀 Quick Start Guide

### 1. Prerequisites
```bash
# Check versions
node --version  # Should be v16+
npm --version
mongod --version  # Should be v5+
```

### 2. Clone and Install
```bash
# Clone repository
git clone <repository-url>
cd student-momentum-tracker

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Setup Environment Variables

**Backend (.env):**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/student-momentum-tracker
JWT_ACCESS_SECRET=your_64_char_random_string
JWT_REFRESH_SECRET=your_64_char_random_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
SESSION_SECRET=your_session_secret
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 4. Setup Google OAuth
Follow `docs/GOOGLE_OAUTH_SETUP.md` for detailed instructions.

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

### 6. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/health

### 7. Create Admin Account
```bash
# Register through UI, then in MongoDB:
mongosh
use student-momentum-tracker
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 📚 Documentation

- **README.md** - Main documentation and setup
- **API_DOCUMENTATION.md** - Complete API reference
- **ER_DIAGRAM.md** - Database schema and relationships
- **DEPLOYMENT.md** - Production deployment guide
- **TESTING_CHECKLIST.md** - Comprehensive testing guide
- **GOOGLE_OAUTH_SETUP.md** - OAuth configuration

## 🔐 Security Highlights

1. **Password Security**: bcrypt with 12 salt rounds
2. **Token Management**: Short-lived access tokens, secure refresh tokens
3. **HTTP Security**: Helmet.js, CORS, rate limiting
4. **Input Validation**: express-validator on all inputs
5. **Database Security**: Mongoose schema validation, injection prevention
6. **Cookie Security**: HTTP-only, secure, SameSite attributes

## 📈 Performance Features

1. **Database Indexing**: Optimized queries with compound indexes
2. **Efficient Queries**: Projection and aggregation pipelines
3. **Caching Strategy**: Momentum score can be cached
4. **Lazy Loading**: Components loaded on demand
5. **Code Splitting**: Vite automatic code splitting

## 🎨 UI/UX Features

1. **Responsive Design**: Mobile, tablet, desktop support
2. **Modern UI**: Tailwind CSS with custom components
3. **Interactive Charts**: Recharts for data visualization
4. **Loading States**: Smooth loading indicators
5. **Error Handling**: User-friendly error messages
6. **Accessibility**: Keyboard navigation, ARIA labels

## 🧪 Testing Coverage

- ✅ Authentication flows
- ✅ CRUD operations
- ✅ Momentum calculation
- ✅ Notification system
- ✅ Admin functions
- ✅ Security measures
- ✅ Error handling
- ✅ Edge cases

## 🚢 Deployment Options

### Backend
- Railway (Recommended)
- Heroku
- DigitalOcean App Platform
- AWS EC2/ECS
- VPS (Ubuntu)

### Frontend
- Vercel (Recommended)
- Netlify
- AWS S3 + CloudFront
- Same VPS as backend

### Database
- MongoDB Atlas (Recommended)
- Self-hosted MongoDB

## 📊 API Endpoints Summary

### Authentication (6 endpoints)
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/google
- POST /api/auth/refresh
- POST /api/auth/logout
- GET /api/auth/me

### Study Sessions (6 endpoints)
- GET /api/study-sessions
- POST /api/study-sessions
- PUT /api/study-sessions/:id
- DELETE /api/study-sessions/:id
- GET /api/study-sessions/subjects
- POST /api/study-sessions/subjects

### Goals (4 endpoints)
- GET /api/goals
- POST /api/goals
- PUT /api/goals/:id
- DELETE /api/goals/:id

### Assignments (5 endpoints)
- GET /api/assignments
- POST /api/assignments
- PUT /api/assignments/:id
- DELETE /api/assignments/:id
- GET /api/assignments/analytics

### Dashboard (2 endpoints)
- GET /api/dashboard
- GET /api/dashboard/analytics

### Notifications (4 endpoints)
- GET /api/notifications
- PUT /api/notifications/:id/read
- PUT /api/notifications/read-all
- DELETE /api/notifications/:id

### Admin (5 endpoints)
- GET /api/admin/users
- PUT /api/admin/users/:id/block
- DELETE /api/admin/users/:id
- PUT /api/admin/users/:id/role
- GET /api/admin/analytics

**Total: 32 API endpoints**

## 🎯 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Mobile app (React Native)
- [ ] Real-time notifications (WebSocket)
- [ ] Study group collaboration
- [ ] AI-powered study recommendations
- [ ] Export data to PDF
- [ ] Calendar integration
- [ ] Pomodoro timer
- [ ] Gamification (badges, achievements)

## 📝 License

MIT License - Free to use and modify

## 👥 Support

For issues, questions, or contributions:
1. Check documentation in `/docs` folder
2. Review API documentation
3. Check testing checklist
4. Create an issue in repository

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack JavaScript development
- RESTful API design
- JWT authentication
- OAuth 2.0 integration
- MongoDB database design
- React state management
- Responsive UI design
- Security best practices
- Production deployment
- Documentation writing

---

**Project Status**: ✅ Production Ready

**Last Updated**: January 2024

**Version**: 1.0.0
