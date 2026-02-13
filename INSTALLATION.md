# Installation Instructions

## Quick Setup (5 Minutes)

### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 2: Setup Environment Files

**Backend:**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and add:
```env
MONGODB_URI=mongodb://localhost:27017/student-momentum-tracker
JWT_ACCESS_SECRET=generate_random_64_char_string
JWT_REFRESH_SECRET=generate_random_64_char_string
SESSION_SECRET=generate_random_string
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
```

The default values should work for local development.

### Step 3: Generate Secure Secrets

```bash
# Run this in terminal to generate secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and use it for JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, and SESSION_SECRET.

### Step 4: Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in backend/.env

### Step 5: Start Servers

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

### Step 6: Access Application

Open browser to: http://localhost:5173

## Google OAuth Setup (Optional)

If you want to enable Google login:

1. Follow instructions in `docs/GOOGLE_OAUTH_SETUP.md`
2. Add credentials to `.env` files
3. Restart servers

## Verify Installation

1. ✅ Backend running on http://localhost:5000
2. ✅ Frontend running on http://localhost:5173
3. ✅ MongoDB connected
4. ✅ Can register new account
5. ✅ Can login
6. ✅ Dashboard loads

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh

# If not installed, install MongoDB:
# Windows: Download from mongodb.com
# macOS: brew install mongodb-community
# Linux: sudo apt install mongodb
```

### Port Already in Use
```bash
# Backend (port 5000)
# Windows: netstat -ano | findstr :5000
# macOS/Linux: lsof -i :5000

# Frontend (port 5173)
# Change port in vite.config.js
```

### Module Not Found
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Create your first subject
2. Add a study session
3. Set a goal
4. Check your momentum score!

## Need Help?

- Check README.md for detailed documentation
- Review docs/ folder for guides
- Check API_DOCUMENTATION.md for API reference
