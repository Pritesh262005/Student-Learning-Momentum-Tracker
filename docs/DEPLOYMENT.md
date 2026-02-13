# Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Database Setup](#database-setup)
5. [Environment Configuration](#environment-configuration)
6. [Post-Deployment](#post-deployment)

---

## Prerequisites

- Node.js v16+ installed
- MongoDB Atlas account (or self-hosted MongoDB)
- Google Cloud Console account
- Domain name (optional but recommended)
- SSL certificate (Let's Encrypt recommended)

---

## Backend Deployment

### Option 1: Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Initialize project
   cd backend
   railway init
   ```

3. **Configure Environment Variables**
   - Go to Railway dashboard
   - Add all variables from `.env.example`
   - Set `NODE_ENV=production`

4. **Deploy**
   ```bash
   railway up
   ```

### Option 2: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_ACCESS_SECRET=your_secret
   # ... set all other variables
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 3: DigitalOcean App Platform

1. **Create Account** at [digitalocean.com](https://digitalocean.com)

2. **Create New App**
   - Connect GitHub repository
   - Select backend folder
   - Choose Node.js environment

3. **Configure**
   - Set build command: `npm install`
   - Set run command: `npm start`
   - Add environment variables

4. **Deploy** - Automatic on git push

### Option 4: VPS (Ubuntu Server)

1. **Setup Server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install nginx -y
   ```

2. **Clone Repository**
   ```bash
   cd /var/www
   git clone your-repo-url
   cd your-repo/backend
   npm install --production
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   nano .env
   # Edit with production values
   ```

4. **Start with PM2**
   ```bash
   pm2 start server.js --name "momentum-backend"
   pm2 startup
   pm2 save
   ```

5. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/momentum-api
   server {
       listen 80;
       server_name api.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/momentum-api /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d api.yourdomain.com
   ```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure Environment Variables**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add `VITE_API_URL` and `VITE_GOOGLE_CLIENT_ID`

4. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build Project**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Configure**
   - Add environment variables in Netlify dashboard
   - Set build command: `npm run build`
   - Set publish directory: `dist`

### Option 3: AWS S3 + CloudFront

1. **Build Project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://your-bucket-name
   aws s3 website s3://your-bucket-name --index-document index.html
   ```

3. **Upload Files**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name
   ```

4. **Setup CloudFront**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure SSL certificate

### Option 4: Same VPS as Backend

1. **Build Project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Copy to Server**
   ```bash
   scp -r dist/* user@server:/var/www/momentum-frontend
   ```

3. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/momentum-frontend
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/momentum-frontend;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

---

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create Account** at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your backend
   - Create cluster

3. **Configure Access**
   - Database Access → Add user
   - Network Access → Add IP (0.0.0.0/0 for all, or specific IPs)

4. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

5. **Update Backend Environment**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/momentum?retryWrites=true&w=majority
   ```

### Self-Hosted MongoDB

1. **Install MongoDB**
   ```bash
   # Ubuntu
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   sudo apt update
   sudo apt install -y mongodb-org
   ```

2. **Start MongoDB**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

3. **Create Database and User**
   ```bash
   mongosh
   ```
   ```javascript
   use momentum
   db.createUser({
     user: "momentum_user",
     pwd: "strong_password",
     roles: [{ role: "readWrite", db: "momentum" }]
   })
   ```

4. **Update Connection String**
   ```
   MONGODB_URI=mongodb://momentum_user:strong_password@localhost:27017/momentum
   ```

---

## Environment Configuration

### Production Backend .env
```env
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/momentum

# JWT Secrets (Generate strong random strings)
JWT_ACCESS_SECRET=<64-char-random-string>
JWT_REFRESH_SECRET=<64-char-random-string>
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_production_client_id
GOOGLE_CLIENT_SECRET=your_production_client_secret
GOOGLE_CALLBACK_URL=https://api.yourdomain.com/api/auth/google/callback

# Frontend URL
FRONTEND_URL=https://yourdomain.com

# Session Secret
SESSION_SECRET=<64-char-random-string>

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Production Frontend .env
```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_GOOGLE_CLIENT_ID=your_production_client_id
```

### Generate Secure Secrets
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# OpenSSL
openssl rand -hex 64
```

---

## Google OAuth Production Setup

1. **Go to Google Cloud Console**
   - [console.cloud.google.com](https://console.cloud.google.com)

2. **Update OAuth Credentials**
   - APIs & Services → Credentials
   - Edit OAuth 2.0 Client
   - Add authorized redirect URIs:
     - `https://api.yourdomain.com/api/auth/google/callback`
   - Add authorized JavaScript origins:
     - `https://yourdomain.com`

3. **Update Environment Variables**
   - Use production Client ID and Secret
   - Update callback URL

---

## Post-Deployment

### 1. Health Check
```bash
# Backend
curl https://api.yourdomain.com/health

# Expected response
{"status":"OK","timestamp":"2024-01-15T10:00:00.000Z"}
```

### 2. Create Admin Account
```bash
# Register through frontend, then update in MongoDB
mongosh "mongodb+srv://cluster.mongodb.net/momentum"
db.users.updateOne(
  { email: "admin@yourdomain.com" },
  { $set: { role: "admin" } }
)
```

### 3. Setup Monitoring

**Backend Monitoring (PM2)**
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

**Uptime Monitoring**
- Use [UptimeRobot](https://uptimerobot.com) or similar
- Monitor both frontend and backend endpoints

### 4. Setup Backups

**MongoDB Atlas**
- Automatic backups enabled by default
- Configure backup schedule in Atlas dashboard

**Self-Hosted MongoDB**
```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="mongodb://localhost:27017/momentum" --out="/backups/momentum_$DATE"
find /backups -type d -mtime +30 -exec rm -rf {} +

# Add to crontab
crontab -e
0 2 * * * /path/to/backup-script.sh
```

### 5. SSL Certificate Auto-Renewal
```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot automatically sets up cron job
# Verify with:
sudo systemctl status certbot.timer
```

### 6. Performance Optimization

**Enable Gzip Compression (Nginx)**
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;
```

**Enable Caching**
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 7. Security Checklist

- [ ] HTTPS enabled on all endpoints
- [ ] Strong JWT secrets configured
- [ ] MongoDB authentication enabled
- [ ] Firewall configured (only necessary ports open)
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Environment variables secured
- [ ] Regular security updates scheduled
- [ ] Backup system tested
- [ ] Monitoring alerts configured

---

## Troubleshooting

### Backend Not Starting
```bash
# Check logs
pm2 logs momentum-backend

# Check environment variables
pm2 env 0

# Restart
pm2 restart momentum-backend
```

### Database Connection Issues
```bash
# Test connection
mongosh "your_connection_string"

# Check network access in MongoDB Atlas
# Verify IP whitelist includes your server IP
```

### Frontend Not Loading
```bash
# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### CORS Errors
- Verify `FRONTEND_URL` in backend .env
- Check CORS configuration in `server.js`
- Ensure protocol (http/https) matches

---

## Rollback Procedure

### Backend Rollback
```bash
# PM2
pm2 stop momentum-backend
git checkout previous-commit
npm install
pm2 restart momentum-backend

# Heroku
heroku rollback
```

### Frontend Rollback
```bash
# Vercel
vercel rollback

# Manual
git checkout previous-commit
npm run build
# Re-deploy
```

### Database Rollback
```bash
# Restore from backup
mongorestore --uri="mongodb://..." /path/to/backup
```

---

## Maintenance

### Regular Tasks
- Weekly: Review logs and error reports
- Monthly: Update dependencies
- Quarterly: Security audit
- Annually: Review and update SSL certificates

### Update Procedure
```bash
# Backend
cd backend
git pull
npm install
pm2 restart momentum-backend

# Frontend
cd frontend
git pull
npm install
npm run build
# Deploy new build
```
