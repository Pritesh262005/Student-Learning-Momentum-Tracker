# API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <access_token>
```

---

## Auth Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "message": "Registration successful",
  "user": { ... },
  "accessToken": "jwt_token"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "message": "Login successful",
  "user": { ... },
  "accessToken": "jwt_token"
}
```

### Google OAuth
```http
GET /auth/google
Redirects to Google OAuth consent screen

GET /auth/google/callback
Handles OAuth callback and redirects to frontend
```

### Refresh Token
```http
POST /auth/refresh
Cookie: refreshToken=<token>

Response: 200 OK
{
  "accessToken": "new_jwt_token"
}
```

### Logout
```http
POST /auth/logout
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Logout successful"
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

---

## Study Session Endpoints

### Get All Sessions
```http
GET /study-sessions?startDate=2024-01-01&endDate=2024-12-31&subjectId=xxx
Authorization: Bearer <token>

Response: 200 OK
{
  "sessions": [
    {
      "_id": "...",
      "subjectId": { "name": "Math", "color": "#3B82F6" },
      "duration": 60,
      "notes": "Studied calculus",
      "date": "2024-01-15T10:00:00Z",
      "quality": 4
    }
  ]
}
```

### Create Session
```http
POST /study-sessions
Authorization: Bearer <token>
Content-Type: application/json

{
  "subjectId": "subject_id",
  "duration": 60,
  "notes": "Optional notes",
  "date": "2024-01-15",
  "quality": 4
}

Response: 201 Created
{
  "message": "Study session created",
  "session": { ... }
}
```

### Update Session
```http
PUT /study-sessions/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "duration": 90,
  "notes": "Updated notes"
}

Response: 200 OK
{
  "message": "Session updated",
  "session": { ... }
}
```

### Delete Session
```http
DELETE /study-sessions/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Session deleted"
}
```

### Get Subjects
```http
GET /study-sessions/subjects
Authorization: Bearer <token>

Response: 200 OK
{
  "subjects": [
    {
      "_id": "...",
      "name": "Mathematics",
      "color": "#3B82F6",
      "totalHoursStudied": 45.5
    }
  ]
}
```

### Create Subject
```http
POST /study-sessions/subjects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Physics",
  "color": "#10B981",
  "targetHours": 100
}

Response: 201 Created
{
  "message": "Subject created",
  "subject": { ... }
}
```

---

## Goal Endpoints

### Get All Goals
```http
GET /goals?type=short-term&status=active
Authorization: Bearer <token>

Response: 200 OK
{
  "goals": [
    {
      "_id": "...",
      "title": "Complete 50 hours of study",
      "type": "short-term",
      "targetValue": 50,
      "currentValue": 30,
      "progress": 60,
      "deadline": "2024-02-01T00:00:00Z",
      "isCompleted": false
    }
  ]
}
```

### Create Goal
```http
POST /goals
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Master Calculus",
  "description": "Complete all calculus topics",
  "type": "long-term",
  "targetValue": 100,
  "unit": "hours",
  "deadline": "2024-12-31"
}

Response: 201 Created
{
  "message": "Goal created",
  "goal": { ... }
}
```

### Update Goal
```http
PUT /goals/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentValue": 40,
  "isCompleted": false
}

Response: 200 OK
{
  "message": "Goal updated",
  "goal": { ... }
}
```

### Delete Goal
```http
DELETE /goals/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Goal deleted"
}
```

---

## Assignment Endpoints

### Get All Assignments
```http
GET /assignments?subjectId=xxx&status=pending
Authorization: Bearer <token>

Response: 200 OK
{
  "assignments": [
    {
      "_id": "...",
      "title": "Calculus Assignment 1",
      "subjectId": { "name": "Math", "color": "#3B82F6" },
      "deadline": "2024-01-20T23:59:59Z",
      "maxScore": 100,
      "obtainedScore": 85,
      "percentage": 85,
      "isCompleted": true
    }
  ]
}
```

### Create Assignment
```http
POST /assignments
Authorization: Bearer <token>
Content-Type: application/json

{
  "subjectId": "subject_id",
  "title": "Physics Lab Report",
  "description": "Complete lab report on motion",
  "deadline": "2024-01-25",
  "maxScore": 100
}

Response: 201 Created
{
  "message": "Assignment created",
  "assignment": { ... }
}
```

### Update Assignment
```http
PUT /assignments/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "obtainedScore": 92,
  "isCompleted": true
}

Response: 200 OK
{
  "message": "Assignment updated",
  "assignment": { ... }
}
```

### Get Performance Analytics
```http
GET /assignments/analytics
Authorization: Bearer <token>

Response: 200 OK
{
  "analytics": [
    {
      "subject": "Mathematics",
      "average": 87,
      "count": 5,
      "scores": [85, 90, 88, 82, 90]
    }
  ]
}
```

---

## Dashboard Endpoints

### Get Dashboard Data
```http
GET /dashboard
Authorization: Bearer <token>

Response: 200 OK
{
  "momentum": {
    "score": 78,
    "trend": "improving",
    "suggestions": ["Keep up the great work!"],
    "breakdown": {
      "consistency": 80,
      "studyTrend": 75,
      "goalCompletion": 70,
      "assignmentPerformance": 85
    }
  },
  "streak": 7,
  "totalHours": 45.5,
  "subjectBreakdown": [...],
  "weeklyTrend": [...],
  "activeGoals": [...],
  "upcomingAssignments": [...]
}
```

### Get Detailed Analytics
```http
GET /dashboard/analytics?period=30
Authorization: Bearer <token>

Response: 200 OK
{
  "dailyStats": { ... },
  "subjectStats": { ... },
  "qualityTrend": [...],
  "totalSessions": 45
}
```

---

## Notification Endpoints

### Get Notifications
```http
GET /notifications?isRead=false
Authorization: Bearer <token>

Response: 200 OK
{
  "notifications": [
    {
      "_id": "...",
      "type": "deadline_reminder",
      "title": "Assignment Due Tomorrow",
      "message": "Physics Lab Report is due tomorrow!",
      "isRead": false,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "unreadCount": 3
}
```

### Mark as Read
```http
PUT /notifications/:id/read
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Notification marked as read"
}
```

### Mark All as Read
```http
PUT /notifications/read-all
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "All notifications marked as read"
}
```

---

## Admin Endpoints (Admin Role Required)

### Get All Users
```http
GET /admin/users?role=student&status=active&search=john
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "users": [...]
}
```

### Block/Unblock User
```http
PUT /admin/users/:id/block
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "isBlocked": true
}

Response: 200 OK
{
  "message": "User blocked successfully",
  "user": { ... }
}
```

### Delete User
```http
DELETE /admin/users/:id
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "message": "User and all associated data deleted"
}
```

### Get System Analytics
```http
GET /admin/analytics
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "users": {
    "total": 150,
    "active": 145,
    "blocked": 5,
    "byRole": [...]
  },
  "activity": {
    "totalSessions": 5000,
    "totalStudyHours": 3500,
    "totalGoals": 300,
    "completedGoals": 180
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "message": "Too many requests, please try again later"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Rate Limiting

- Authentication endpoints: 5 requests per 15 minutes
- General API endpoints: 100 requests per 15 minutes

## Notes

- All dates are in ISO 8601 format
- Timestamps are in UTC
- Refresh token is sent as HTTP-only cookie
- Access token expires in 15 minutes
- Refresh token expires in 7 days
