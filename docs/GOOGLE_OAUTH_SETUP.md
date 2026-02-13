# Google OAuth 2.0 Setup Guide

## Step-by-Step Configuration

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter project name: "Student Momentum Tracker"
5. Click "Create"

### 2. Enable Google+ API

1. In the left sidebar, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and click "Enable"

### 3. Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" user type
3. Click "Create"

**App Information:**
- App name: `Student Momentum Tracker`
- User support email: Your email
- App logo: (Optional) Upload your app logo

**App Domain:**
- Application home page: `http://localhost:5173` (development) or your production URL
- Application privacy policy link: Your privacy policy URL
- Application terms of service link: Your terms of service URL

**Authorized Domains:**
- Add your production domain (e.g., `yourdomain.com`)

**Developer Contact Information:**
- Email addresses: Your email

4. Click "Save and Continue"

**Scopes:**
1. Click "Add or Remove Scopes"
2. Select:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
3. Click "Update"
4. Click "Save and Continue"

**Test Users (for development):**
1. Click "Add Users"
2. Add your test email addresses
3. Click "Save and Continue"

5. Review and click "Back to Dashboard"

### 4. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Select "Web application"

**Configuration:**

**Name:** `Student Momentum Tracker Web Client`

**Authorized JavaScript origins:**
- Development: `http://localhost:5173`
- Production: `https://yourdomain.com`

**Authorized redirect URIs:**
- Development: `http://localhost:5000/api/auth/google/callback`
- Production: `https://api.yourdomain.com/api/auth/google/callback`

4. Click "Create"
5. Copy the Client ID and Client Secret

### 5. Configure Backend Environment

Edit `backend/.env`:

```env
GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### 6. Configure Frontend Environment

Edit `frontend/.env`:

```env
VITE_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
```

### 7. Test OAuth Flow

1. Start backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start frontend server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open browser to `http://localhost:5173`
4. Click "Continue with Google"
5. Select your Google account
6. Grant permissions
7. You should be redirected back to the dashboard

### 8. Production Setup

When deploying to production:

1. **Update OAuth Credentials:**
   - Go to Google Cloud Console → Credentials
   - Edit your OAuth 2.0 Client ID
   - Add production URLs to authorized origins and redirect URIs

2. **Update Environment Variables:**
   
   Backend `.env`:
   ```env
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_CALLBACK_URL=https://api.yourdomain.com/api/auth/google/callback
   FRONTEND_URL=https://yourdomain.com
   ```
   
   Frontend `.env`:
   ```env
   VITE_API_URL=https://api.yourdomain.com/api
   VITE_GOOGLE_CLIENT_ID=your_client_id
   ```

3. **Verify OAuth Consent Screen:**
   - Change from "Testing" to "In Production"
   - Complete verification process if required

### 9. Security Best Practices

1. **Never commit credentials:**
   - Add `.env` to `.gitignore`
   - Use environment variables in production

2. **Restrict API Key:**
   - Go to Credentials → API Keys
   - Set application restrictions
   - Set API restrictions

3. **Monitor Usage:**
   - Check "APIs & Services" → "Dashboard"
   - Monitor quota usage
   - Set up alerts for unusual activity

4. **Rotate Secrets:**
   - Periodically regenerate client secrets
   - Update in all environments

### 10. Troubleshooting

**Error: redirect_uri_mismatch**
- Verify redirect URI in Google Console matches exactly
- Check for trailing slashes
- Ensure protocol (http/https) matches

**Error: access_denied**
- Check OAuth consent screen configuration
- Verify user is added to test users (in development)
- Check scopes are properly configured

**Error: invalid_client**
- Verify Client ID and Secret are correct
- Check environment variables are loaded
- Ensure no extra spaces in credentials

**User data not saving:**
- Check database connection
- Verify User model schema
- Check backend logs for errors

### 11. Testing Checklist

- [ ] OAuth button appears on login/register pages
- [ ] Clicking button redirects to Google
- [ ] Can select Google account
- [ ] Permissions screen shows correct app name
- [ ] After granting permissions, redirects to dashboard
- [ ] User data saved in database
- [ ] Can login again with same Google account
- [ ] Account linking works (same email)
- [ ] Avatar from Google profile displays
- [ ] Logout works correctly

### 12. Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Passport.js Google Strategy](http://www.passportjs.org/packages/passport-google-oauth20/)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)

### 13. Common Issues and Solutions

**Issue: "This app isn't verified"**
- This appears when app is in testing mode
- Add users to test users list
- Or complete verification process for production

**Issue: Token refresh not working**
- Ensure refresh token is stored in database
- Check cookie settings (httpOnly, secure, sameSite)
- Verify refresh token endpoint is working

**Issue: Multiple accounts created**
- Check account linking logic in passport.js
- Verify email matching is case-insensitive
- Ensure googleId is properly stored

### 14. Rate Limits

Google OAuth has the following limits:
- 10,000 requests per day (default)
- Can request increase if needed
- Monitor usage in Google Cloud Console

### 15. Compliance

Ensure your app complies with:
- Google API Services User Data Policy
- OAuth 2.0 Policies
- Privacy policy requirements
- Terms of service requirements

---

## Quick Reference

### Environment Variables Needed

**Backend:**
```
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

**Frontend:**
```
VITE_GOOGLE_CLIENT_ID=xxx
```

### OAuth Flow

```
User clicks "Continue with Google"
    ↓
Redirect to Google OAuth consent screen
    ↓
User grants permissions
    ↓
Google redirects to callback URL with code
    ↓
Backend exchanges code for tokens
    ↓
Backend creates/updates user in database
    ↓
Backend generates JWT tokens
    ↓
Redirect to frontend with access token
    ↓
User logged in and redirected to dashboard
```

### Files Involved

- `backend/config/passport.js` - Passport strategy configuration
- `backend/routes/auth.js` - OAuth routes
- `frontend/src/components/auth/GoogleAuthButton.jsx` - OAuth button
- `frontend/src/services/authService.js` - Auth service

---

For support, refer to the main README.md or create an issue in the repository.
