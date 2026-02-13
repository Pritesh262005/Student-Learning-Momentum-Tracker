# Testing Checklist

## Pre-Testing Setup

- [ ] Backend server running on `http://localhost:5000`
- [ ] Frontend server running on `http://localhost:5173`
- [ ] MongoDB connected and accessible
- [ ] Google OAuth credentials configured
- [ ] Environment variables properly set

---

## 1. Authentication Testing

### Registration
- [ ] Register with valid email and password
- [ ] Verify password hashing (check database)
- [ ] Test duplicate email registration (should fail)
- [ ] Test weak password (< 6 characters, should fail)
- [ ] Test invalid email format (should fail)
- [ ] Verify JWT token received
- [ ] Verify refresh token cookie set
- [ ] Check user created in database with correct role

### Login
- [ ] Login with correct credentials
- [ ] Login with incorrect password (should fail)
- [ ] Login with non-existent email (should fail)
- [ ] Verify JWT token received
- [ ] Verify refresh token cookie set
- [ ] Check lastLogin timestamp updated
- [ ] Verify login history recorded

### Google OAuth
- [ ] Click "Continue with Google" button
- [ ] Complete Google authentication
- [ ] Verify redirect to dashboard
- [ ] Check user created/linked in database
- [ ] Verify Google profile data saved (name, email, avatar)
- [ ] Test login with existing Google account
- [ ] Test account linking (same email)

### Token Management
- [ ] Access protected route with valid token
- [ ] Access protected route with expired token (should auto-refresh)
- [ ] Access protected route with invalid token (should redirect to login)
- [ ] Test token refresh endpoint
- [ ] Verify refresh token rotation

### Logout
- [ ] Logout successfully
- [ ] Verify refresh token cleared from database
- [ ] Verify cookie cleared
- [ ] Verify redirect to login page
- [ ] Try accessing protected route after logout (should fail)

---

## 2. Dashboard Testing

### Initial Load
- [ ] Dashboard loads without errors
- [ ] All stat cards display correctly
- [ ] Momentum score displays
- [ ] Charts render properly
- [ ] Active goals section loads
- [ ] Upcoming deadlines section loads

### Data Display
- [ ] Total study hours accurate
- [ ] Current streak calculated correctly
- [ ] Active goals count correct
- [ ] Upcoming deadlines count correct
- [ ] Subject breakdown chart shows data
- [ ] Weekly trend chart shows data

### Momentum Score
- [ ] Score displays (0-100)
- [ ] Trend indicator shows (improving/declining/stable)
- [ ] Breakdown shows all four components
- [ ] Suggestions display when score < 60
- [ ] Color coding based on score

---

## 3. Study Session Testing

### View Sessions
- [ ] All sessions display in list
- [ ] Sessions sorted by date (newest first)
- [ ] Subject name and color display
- [ ] Duration formatted correctly
- [ ] Date formatted correctly
- [ ] Notes display when present

### Create Session
- [ ] Open "Add Session" modal
- [ ] Select subject from dropdown
- [ ] Enter duration (minutes)
- [ ] Enter date
- [ ] Add optional notes
- [ ] Submit successfully
- [ ] Session appears in list
- [ ] Subject total hours updated
- [ ] Streak recalculated
- [ ] Momentum score updated

### Edit Session
- [ ] Click edit button
- [ ] Modal pre-fills with session data
- [ ] Modify duration
- [ ] Modify notes
- [ ] Save changes
- [ ] Changes reflected in list
- [ ] Subject hours updated correctly

### Delete Session
- [ ] Click delete button
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] Session removed from list
- [ ] Subject hours updated
- [ ] Streak recalculated

### Subject Management
- [ ] View all subjects
- [ ] Create new subject
- [ ] Subject name required
- [ ] Color picker works
- [ ] Duplicate subject name prevented
- [ ] Subject appears in dropdown

---

## 4. Goals Testing

### View Goals
- [ ] All goals display
- [ ] Filter by type (short-term/long-term)
- [ ] Filter by status (active/completed)
- [ ] Progress bar displays correctly
- [ ] Progress percentage accurate
- [ ] Deadline displays

### Create Goal
- [ ] Open "Add Goal" modal
- [ ] Enter title (required)
- [ ] Enter description (optional)
- [ ] Select type
- [ ] Enter target value
- [ ] Enter unit
- [ ] Select deadline
- [ ] Submit successfully
- [ ] Goal appears in list

### Update Goal
- [ ] Update current value
- [ ] Progress bar updates
- [ ] Progress percentage recalculates

### Complete Goal
- [ ] Click complete button
- [ ] Goal marked as completed
- [ ] Completion timestamp set
- [ ] Achievement notification created
- [ ] Momentum score updated

### Delete Goal
- [ ] Click delete button
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] Goal removed from list

---

## 5. Assignment Testing

### View Assignments
- [ ] All assignments display
- [ ] Subject name shows
- [ ] Deadline displays
- [ ] Time until deadline calculated
- [ ] Completed status shows
- [ ] Score displays when entered

### Create Assignment
- [ ] Open "Add Assignment" modal
- [ ] Select subject
- [ ] Enter title (required)
- [ ] Enter description (optional)
- [ ] Select deadline
- [ ] Enter max score
- [ ] Submit successfully
- [ ] Assignment appears in list

### Submit Assignment
- [ ] Edit assignment
- [ ] Enter obtained score
- [ ] Mark as completed
- [ ] Save changes
- [ ] Percentage calculated correctly
- [ ] Performance analytics updated

### Delete Assignment
- [ ] Click delete button
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] Assignment removed from list

### Performance Analytics
- [ ] View analytics page
- [ ] Subject-wise averages display
- [ ] Score distribution shows
- [ ] Charts render correctly

---

## 6. Notification Testing

### View Notifications
- [ ] All notifications display
- [ ] Unread count shows in navbar
- [ ] Notifications sorted by date
- [ ] Notification types display correctly
- [ ] Icons display for each type

### Mark as Read
- [ ] Click mark as read
- [ ] Notification marked as read
- [ ] Visual indicator changes
- [ ] Unread count decreases

### Mark All as Read
- [ ] Click "Mark All as Read"
- [ ] All notifications marked
- [ ] Unread count becomes 0

### Delete Notification
- [ ] Click delete button
- [ ] Notification removed
- [ ] List updates

### Automated Notifications
- [ ] Daily study reminder (9 AM)
- [ ] Deadline reminder (6 PM, day before)
- [ ] Goal deadline reminder
- [ ] Achievement notification on goal completion

---

## 7. Admin Panel Testing (Admin Role Required)

### View Analytics
- [ ] Total users count displays
- [ ] Active/blocked users count
- [ ] User distribution by role
- [ ] Total study sessions count
- [ ] Total study hours
- [ ] Goals statistics
- [ ] Assignment statistics

### User Management
- [ ] View all users
- [ ] Search users by name/email
- [ ] Filter by role
- [ ] Filter by status

### Block/Unblock User
- [ ] Click block button
- [ ] User blocked successfully
- [ ] User cannot login when blocked
- [ ] Click unblock button
- [ ] User can login again

### Delete User
- [ ] Click delete button
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] User and all data deleted
- [ ] Cannot delete admin users

### Change User Role
- [ ] Select new role
- [ ] Role updated successfully
- [ ] User permissions change accordingly

---

## 8. Security Testing

### Authentication Security
- [ ] Passwords hashed in database
- [ ] JWT tokens expire correctly
- [ ] Refresh tokens stored securely
- [ ] HTTP-only cookies used
- [ ] CSRF protection enabled

### Authorization
- [ ] Non-authenticated users redirected to login
- [ ] Students cannot access admin panel
- [ ] Users can only access their own data
- [ ] Admin can access all data

### Rate Limiting
- [ ] Auth endpoints limited (5 requests/15 min)
- [ ] API endpoints limited (100 requests/15 min)
- [ ] Rate limit error returned when exceeded

### Input Validation
- [ ] SQL injection prevented
- [ ] XSS attacks prevented
- [ ] Invalid data rejected
- [ ] Error messages don't leak sensitive info

---

## 9. Performance Testing

### Load Time
- [ ] Dashboard loads in < 2 seconds
- [ ] Study sessions list loads in < 1 second
- [ ] Charts render smoothly
- [ ] No console errors

### Data Volume
- [ ] Test with 100+ study sessions
- [ ] Test with 50+ goals
- [ ] Test with 100+ assignments
- [ ] Pagination works if implemented

### Concurrent Users
- [ ] Multiple users can login simultaneously
- [ ] No data conflicts between users
- [ ] Database handles concurrent writes

---

## 10. UI/UX Testing

### Responsive Design
- [ ] Mobile view (< 768px)
- [ ] Tablet view (768px - 1024px)
- [ ] Desktop view (> 1024px)
- [ ] All components responsive
- [ ] Navigation works on mobile

### Accessibility
- [ ] Keyboard navigation works
- [ ] Form labels present
- [ ] Error messages clear
- [ ] Color contrast sufficient
- [ ] Alt text for images

### User Experience
- [ ] Loading states display
- [ ] Error messages helpful
- [ ] Success messages show
- [ ] Confirmation dialogs for destructive actions
- [ ] Forms validate before submission

---

## 11. Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 12. Error Handling

### Network Errors
- [ ] Handle offline state
- [ ] Retry failed requests
- [ ] Display error messages
- [ ] Graceful degradation

### Server Errors
- [ ] 400 Bad Request handled
- [ ] 401 Unauthorized handled
- [ ] 403 Forbidden handled
- [ ] 404 Not Found handled
- [ ] 500 Server Error handled

### Client Errors
- [ ] Invalid form data caught
- [ ] Missing required fields highlighted
- [ ] Date validation works
- [ ] Number validation works

---

## 13. Data Integrity

### Calculations
- [ ] Study hours sum correctly
- [ ] Streak calculation accurate
- [ ] Momentum score formula correct
- [ ] Progress percentages accurate
- [ ] Assignment percentages correct

### Relationships
- [ ] Deleting subject doesn't break sessions
- [ ] Deleting user cascades properly
- [ ] Subject hours update on session changes
- [ ] Goal progress updates correctly

---

## 14. Edge Cases

### Empty States
- [ ] No study sessions message
- [ ] No goals message
- [ ] No assignments message
- [ ] No notifications message

### Boundary Values
- [ ] Study session duration = 1 minute
- [ ] Study session duration = 1440 minutes (24 hours)
- [ ] Goal progress = 0%
- [ ] Goal progress = 100%
- [ ] Assignment score = 0
- [ ] Assignment score = max score

### Date Handling
- [ ] Past dates accepted for study sessions
- [ ] Future dates rejected for study sessions
- [ ] Deadline in past shows "Overdue"
- [ ] Timezone handling correct

---

## 15. Integration Testing

### End-to-End Flows

**New User Journey**
- [ ] Register account
- [ ] Create first subject
- [ ] Add first study session
- [ ] Set first goal
- [ ] Add first assignment
- [ ] View dashboard with data
- [ ] Receive notifications

**Daily Usage Flow**
- [ ] Login
- [ ] Add today's study session
- [ ] Check momentum score
- [ ] Update goal progress
- [ ] Submit assignment
- [ ] Check notifications
- [ ] Logout

**Admin Flow**
- [ ] Login as admin
- [ ] View system analytics
- [ ] Manage users
- [ ] Block problematic user
- [ ] View user activity
- [ ] Logout

---

## Test Results Template

```
Test Date: _______________
Tester: _______________
Environment: [ ] Development [ ] Staging [ ] Production

Total Tests: ___
Passed: ___
Failed: ___
Blocked: ___

Critical Issues:
1. 
2. 

Minor Issues:
1. 
2. 

Notes:


Signature: _______________
```

---

## Automated Testing (Future Implementation)

### Unit Tests
- [ ] Model validation tests
- [ ] Service function tests
- [ ] Utility function tests
- [ ] Middleware tests

### Integration Tests
- [ ] API endpoint tests
- [ ] Database operation tests
- [ ] Authentication flow tests

### E2E Tests
- [ ] User registration flow
- [ ] Study session CRUD
- [ ] Goal management
- [ ] Assignment management

### Tools to Consider
- Jest (Unit/Integration)
- Supertest (API testing)
- Cypress (E2E testing)
- React Testing Library (Component testing)
