# Entity Relationship Diagram

## Database Schema Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Student Momentum Tracker                     │
│                         Database Schema                          │
└─────────────────────────────────────────────────────────────────┘
```

## Entities and Relationships

### 1. User
```
┌──────────────────────────────────────┐
│              User                     │
├──────────────────────────────────────┤
│ _id: ObjectId (PK)                   │
│ name: String (required)              │
│ email: String (unique, required)     │
│ password: String (hashed)            │
│ googleId: String (unique, sparse)    │
│ avatar: String                       │
│ role: Enum (student/teacher/admin)   │
│ isVerified: Boolean                  │
│ isBlocked: Boolean                   │
│ refreshToken: String                 │
│ lastLogin: Date                      │
│ loginHistory: Array                  │
│ createdAt: Date                      │
│ updatedAt: Date                      │
└──────────────────────────────────────┘
         │
         │ 1:N
         ├──────────────────────────────┐
         │                              │
         ▼                              ▼
```

### 2. Subject
```
┌──────────────────────────────────────┐
│            Subject                    │
├──────────────────────────────────────┤
│ _id: ObjectId (PK)                   │
│ userId: ObjectId (FK → User)         │
│ name: String (required)              │
│ color: String                        │
│ targetHours: Number                  │
│ totalHoursStudied: Number            │
│ createdAt: Date                      │
│ updatedAt: Date                      │
└──────────────────────────────────────┘
         │
         │ 1:N
         ├──────────────────────────────┐
         │                              │
         ▼                              ▼
```

### 3. StudySession
```
┌──────────────────────────────────────┐
│          StudySession                 │
├──────────────────────────────────────┤
│ _id: ObjectId (PK)                   │
│ userId: ObjectId (FK → User)         │
│ subjectId: ObjectId (FK → Subject)   │
│ duration: Number (minutes, required) │
│ notes: String                        │
│ date: Date (required)                │
│ quality: Number (1-5)                │
│ createdAt: Date                      │
│ updatedAt: Date                      │
└──────────────────────────────────────┘
```

### 4. Goal
```
┌──────────────────────────────────────┐
│              Goal                     │
├──────────────────────────────────────┤
│ _id: ObjectId (PK)                   │
│ userId: ObjectId (FK → User)         │
│ title: String (required)             │
│ description: String                  │
│ type: Enum (short-term/long-term)    │
│ targetValue: Number (required)       │
│ currentValue: Number                 │
│ unit: String                         │
│ deadline: Date (required)            │
│ isCompleted: Boolean                 │
│ completedAt: Date                    │
│ createdAt: Date                      │
│ updatedAt: Date                      │
└──────────────────────────────────────┘
```

### 5. Assignment
```
┌──────────────────────────────────────┐
│           Assignment                  │
├──────────────────────────────────────┤
│ _id: ObjectId (PK)                   │
│ userId: ObjectId (FK → User)         │
│ subjectId: ObjectId (FK → Subject)   │
│ title: String (required)             │
│ description: String                  │
│ deadline: Date (required)            │
│ maxScore: Number (required)          │
│ obtainedScore: Number                │
│ isCompleted: Boolean                 │
│ submittedAt: Date                    │
│ createdAt: Date                      │
│ updatedAt: Date                      │
└──────────────────────────────────────┘
```

### 6. Notification
```
┌──────────────────────────────────────┐
│          Notification                 │
├──────────────────────────────────────┤
│ _id: ObjectId (PK)                   │
│ userId: ObjectId (FK → User)         │
│ type: Enum (study_reminder, etc.)    │
│ title: String (required)             │
│ message: String (required)           │
│ isRead: Boolean                      │
│ link: String                         │
│ createdAt: Date                      │
│ updatedAt: Date                      │
└──────────────────────────────────────┘
```

## Relationships

### User → Subject (One-to-Many)
- One user can have multiple subjects
- Each subject belongs to one user
- Cascade delete: When user is deleted, all subjects are deleted

### User → StudySession (One-to-Many)
- One user can have multiple study sessions
- Each study session belongs to one user
- Cascade delete: When user is deleted, all sessions are deleted

### Subject → StudySession (One-to-Many)
- One subject can have multiple study sessions
- Each study session belongs to one subject
- On delete: Update subject's totalHoursStudied

### User → Goal (One-to-Many)
- One user can have multiple goals
- Each goal belongs to one user
- Cascade delete: When user is deleted, all goals are deleted

### User → Assignment (One-to-Many)
- One user can have multiple assignments
- Each assignment belongs to one user
- Cascade delete: When user is deleted, all assignments are deleted

### Subject → Assignment (One-to-Many)
- One subject can have multiple assignments
- Each assignment belongs to one subject

### User → Notification (One-to-Many)
- One user can have multiple notifications
- Each notification belongs to one user
- Cascade delete: When user is deleted, all notifications are deleted

## Indexes

### User Collection
```javascript
{ email: 1 } // Unique index
{ googleId: 1 } // Sparse unique index
```

### Subject Collection
```javascript
{ userId: 1, name: 1 } // Compound unique index
```

### StudySession Collection
```javascript
{ userId: 1, date: -1 } // Compound index for queries
{ subjectId: 1 } // Index for subject lookups
```

### Goal Collection
```javascript
{ userId: 1, deadline: 1 } // Compound index
```

### Assignment Collection
```javascript
{ userId: 1, deadline: 1 } // Compound index
{ subjectId: 1 } // Index for subject lookups
```

### Notification Collection
```javascript
{ userId: 1, createdAt: -1 } // Compound index
{ userId: 1, isRead: 1 } // Compound index for filtering
```

## Data Flow

### Study Session Creation Flow
```
1. User creates study session
2. StudySession document created
3. Subject.totalHoursStudied updated
4. Streak recalculated
5. Momentum score recalculated
```

### Goal Completion Flow
```
1. User marks goal as completed
2. Goal.isCompleted = true
3. Goal.completedAt = current timestamp
4. Achievement notification created
5. Momentum score recalculated
```

### Assignment Submission Flow
```
1. User submits assignment with score
2. Assignment.obtainedScore updated
3. Assignment.isCompleted = true
4. Assignment.submittedAt = current timestamp
5. Performance analytics updated
6. Momentum score recalculated
```

## Momentum Score Calculation Dependencies

The momentum score depends on data from multiple collections:

```
Momentum Score
├── Consistency (30%)
│   └── StudySession (date distribution)
├── Study Trend (30%)
│   └── StudySession (duration over time)
├── Goal Completion (20%)
│   └── Goal (completion rate)
└── Assignment Performance (20%)
    └── Assignment (scores)
```

## Virtual Fields

### Goal
- `progress`: Calculated as `(currentValue / targetValue) * 100`

### Assignment
- `percentage`: Calculated as `(obtainedScore / maxScore) * 100`

## Validation Rules

### User
- Email must be valid and unique
- Password minimum 6 characters (if not using OAuth)
- Role must be one of: student, teacher, admin

### StudySession
- Duration must be at least 1 minute
- Quality must be between 1-5
- Date cannot be in the future

### Goal
- Target value must be positive
- Deadline must be in the future
- Type must be short-term or long-term

### Assignment
- Max score must be positive
- Obtained score cannot exceed max score
- Deadline must be specified

### Subject
- Name must be unique per user
- Target hours must be non-negative

## Security Considerations

1. **Password Storage**: Passwords are hashed using bcrypt with 12 rounds
2. **Token Storage**: Refresh tokens stored in User collection (hashed in production)
3. **Sensitive Data**: Password and refresh token excluded from JSON responses
4. **Login History**: Limited to last 10 entries per user
5. **Cascade Deletes**: Implemented at application level for data integrity

## Performance Optimizations

1. **Compound Indexes**: Used for common query patterns
2. **Sparse Indexes**: Used for optional unique fields (googleId)
3. **Projection**: Only necessary fields fetched in queries
4. **Aggregation**: Used for analytics calculations
5. **Caching**: Momentum score can be cached with TTL

## Backup Strategy

1. Daily automated backups of entire database
2. Point-in-time recovery enabled
3. Backup retention: 30 days
4. Test restore procedures monthly
