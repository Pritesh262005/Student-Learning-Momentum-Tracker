# Student Learning Momentum Tracker

A production-ready full-stack web application for tracking student learning progress, calculating momentum scores, and managing academic goals.

## 🚀 Features

### Authentication & Security
- Email/Password registration and login
- Google OAuth 2.0 integration
- JWT-based authentication (Access + Refresh tokens)
- Secure HTTP-only cookies
- Password hashing with bcrypt
- Role-based access control (Student, Teacher, Admin)
- Rate limiting and security headers

### Core Features
- **Dashboard**: Real-time overview of study metrics, momentum score, and analytics
- **Study Sessions**: Track daily study sessions with subject, duration, and notes
- **Momentum Score**: Custom algorithm calculating learning momentum (0-100)
- **Goals Management**: Set and track short-term and long-term goals
- **Assignments**: Manage assignments with deadlines and performance tracking
- **Notifications**: Automated reminders for study, deadlines, and goals
- **Analytics**: Visual charts and performance insights
- **Admin Panel**: User management and system analytics

### Momentum Score Formula
```
Momentum Score = 
  (Consistency Factor × 30%) +
  (Study Time Trend × 30%) +
  (Goal Completion Rate × 20%) +
  (Assignment Performance × 20%)
```

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Passport.js (Google OAuth)
- bcrypt, Helmet, CORS
- express-rate-limit
- node-cron (scheduled notifications)

### Frontend
- React 18 with Vite
- React Router v6
- Tailwind CSS
- Recharts (data visualization)
- Axios
- Lucide React (icons)

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- Google Cloud Console account (for OAuth)

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/Pritesh262005/Student-Learning-Momentum-Tracker.git
cd Student-Learning-Momentum-Tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/student-momentum-tracker
JWT_ACCESS_SECRET=your_access_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
SESSION_SECRET=your_session_secret
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Copy Client ID and Client Secret to `.env` files

## 🚀 Running the Application

### Development Mode

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

Access the application at `http://localhost:5173`

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
student-momentum-tracker/
├── backend/
│   ├── config/          # Database, Passport, Constants
│   ├── models/          # Mongoose schemas
│   ├── middleware/      # Auth, Rate limiting, Role checks
│   ├── routes/          # API endpoints
│   ├── services/        # Business logic (momentum, notifications)
│   ├── utils/           # Helpers and validators
│   └── server.js        # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Auth context
│   │   ├── services/    # API services
│   │   └── utils/       # Helper functions
│   └── public/
└── docs/                # Documentation
```

## 🔐 Default Admin Account

To create an admin account, register normally and then update the user role in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/google` - Google OAuth
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Study Sessions
- `GET /api/study-sessions` - Get all sessions
- `POST /api/study-sessions` - Create session
- `PUT /api/study-sessions/:id` - Update session
- `DELETE /api/study-sessions/:id` - Delete session
- `GET /api/study-sessions/subjects` - Get subjects

### Goals
- `GET /api/goals` - Get all goals
- `POST /api/goals` - Create goal
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal

### Assignments
- `GET /api/assignments` - Get all assignments
- `POST /api/assignments` - Create assignment
- `PUT /api/assignments/:id` - Update assignment
- `DELETE /api/assignments/:id` - Delete assignment
- `GET /api/assignments/analytics` - Get performance analytics

### Dashboard
- `GET /api/dashboard` - Get dashboard data
- `GET /api/dashboard/analytics` - Get detailed analytics

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

### Admin (Admin only)
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/block` - Block/unblock user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/analytics` - System analytics

## 🔒 Security Features

- JWT with short-lived access tokens (15 min)
- HTTP-only refresh tokens (7 days)
- Password hashing with bcrypt (12 rounds)
- Helmet.js for security headers
- CORS configuration
- Rate limiting (100 requests per 15 min)
- Input validation with express-validator
- XSS protection
- MongoDB injection prevention

## 📈 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables
2. Ensure MongoDB connection string is set
3. Deploy with:
```bash
npm start
```

### Frontend Deployment (Vercel/Netlify)

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder

3. Set environment variables in hosting platform

### Environment Variables for Production

**Backend:**
- Set `NODE_ENV=production`
- Use strong secrets for JWT
- Use production MongoDB URI
- Set proper CORS origins

**Frontend:**
- Update `VITE_API_URL` to production backend URL

## 🧪 Testing

See `docs/TESTING_CHECKLIST.md` for comprehensive testing guide.

## 📝 License

MIT License

## 👥 Support

For issues and questions, please create an issue in the repository.

## 🎯 Future Enhancements

- Email verification
- Password reset functionality
- Mobile app (React Native)
- Real-time notifications (WebSocket)
- Study group collaboration
- AI-powered study recommendations
- Export data to PDF
- Integration with calendar apps
