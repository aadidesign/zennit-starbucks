# 🚀 Deployment Guide

Complete guide to deploy your Starbucks website to production.

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All features working locally
- [ ] No console errors or warnings
- [ ] Environment variables documented
- [ ] README.md is complete
- [ ] Code is committed to Git
- [ ] Supabase project is set up
- [ ] Images are optimized
- [ ] Build succeeds (`npm run build`)

---

## 🌐 Option 1: Vercel (Recommended)

### Why Vercel?
- ✅ Automatic SSL certificates
- ✅ Global CDN included
- ✅ GitHub integration
- ✅ Preview deployments
- ✅ Zero configuration for Vite
- ✅ Free tier available

### Step-by-Step Deployment

#### A. Using Vercel Dashboard (Easiest)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub
   - Click "Import Project"
   - Select your repository
   - Vercel auto-detects Vite ✨

3. **Configure Environment Variables:**
   ```
   Settings → Environment Variables → Add
   
   VITE_SUPABASE_URL = https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGc...
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your site is live! 🎉

5. **Get Your URL:**
   ```
   https://starbucks-coffee.vercel.app
   ```

#### B. Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (preview)
vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

### Custom Domain Setup

1. **Add Domain in Vercel:**
   - Project Settings → Domains
   - Add your domain (e.g., mystarbucks.com)

2. **Configure DNS:**
   ```
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate:**
   - Automatic! Vercel handles it ✅

### Environment Variables

Add these in Vercel Dashboard:

```env
# Required
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Optional (for AWS features)
VITE_AWS_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=AKIA...
VITE_AWS_SECRET_ACCESS_KEY=...
VITE_AWS_S3_BUCKET=starbucks-assets
```

---

## ☁️ Option 2: AWS Amplify

### Setup

1. **Install Amplify CLI:**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialize Amplify:**
   ```bash
   amplify init
   # Choose: React, build command: npm run build
   # Distribution directory: dist
   ```

3. **Add Hosting:**
   ```bash
   amplify add hosting
   # Select: Manual deployment
   ```

4. **Deploy:**
   ```bash
   amplify publish
   ```

### Configure Environment

In AWS Amplify Console:
- App Settings → Environment variables
- Add all VITE_* variables

---

## 🔥 Option 3: Firebase Hosting

### Setup

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Firebase:**
   ```bash
   firebase init hosting
   # Public directory: dist
   # Single-page app: Yes
   # Automatic builds: No
   ```

3. **Build and Deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

---

## 🌩️ Option 4: AWS S3 + CloudFront

### Complete AWS Setup

#### 1. Create S3 Bucket

```bash
# AWS Console → S3 → Create bucket
Name: starbucks-website-prod
Region: us-east-1
Public access: Enabled (for website hosting)
```

**Bucket Policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::starbucks-website-prod/*"
    }
  ]
}
```

**Enable Static Website Hosting:**
- Properties → Static website hosting → Enable
- Index document: `index.html`
- Error document: `index.html`

#### 2. Create CloudFront Distribution

```bash
# AWS Console → CloudFront → Create Distribution

Origin Settings:
- Origin Domain: starbucks-website-prod.s3.amazonaws.com
- Origin Path: (leave empty)
- Name: S3-starbucks

Default Cache Behavior:
- Viewer Protocol Policy: Redirect HTTP to HTTPS
- Allowed HTTP Methods: GET, HEAD, OPTIONS
- Compress Objects: Yes

Distribution Settings:
- Price Class: Use All Edge Locations
- Alternate Domain Names: yourdomain.com (optional)
- SSL Certificate: Request Certificate via ACM
```

#### 3. Deploy Script

Create `deploy.sh`:

```bash
#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Upload to S3
echo "Uploading to S3..."
aws s3 sync dist/ s3://starbucks-website-prod --delete

# Invalidate CloudFront cache
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"

echo "Deployment complete! 🚀"
```

Make executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

#### 4. Route 53 Setup (Custom Domain)

```bash
# AWS Console → Route 53 → Hosted Zones
# Create A record → Alias to CloudFront distribution
```

---

## 🔄 CI/CD Setup (Automated Deployment)

### GitHub Actions + Vercel

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: npm ci
        
      - name: Build project
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### GitHub Actions + AWS S3

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Build
        run: |
          npm ci
          npm run build
      
      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://starbucks-website-prod --delete
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_ID }} --paths "/*"
```

---

## 🎯 Performance Optimization

### Before Deployment

1. **Optimize Images:**
   ```bash
   # Use online tools or CLI
   npm install -g imagemin-cli
   imagemin public/images/* --out-dir=public/images
   ```

2. **Analyze Bundle Size:**
   ```bash
   npm run build
   # Check dist/ folder size
   npx vite-bundle-visualizer
   ```

3. **Enable Compression:**
   - Vercel: Automatic ✅
   - CloudFront: Enable in settings
   - nginx: Add gzip configuration

### After Deployment

1. **Test Performance:**
   - [PageSpeed Insights](https://pagespeed.web.dev/)
   - [GTmetrix](https://gtmetrix.com/)
   - [WebPageTest](https://www.webpagetest.org/)

2. **Monitor:**
   - Vercel Analytics
   - Google Analytics
   - Sentry for error tracking

---

## 🔒 Security Checklist

- [ ] Environment variables not in code
- [ ] HTTPS enabled (SSL certificate)
- [ ] Supabase RLS enabled
- [ ] AWS security groups configured
- [ ] CORS configured properly
- [ ] No sensitive data in client code
- [ ] API keys rotated if exposed
- [ ] Content Security Policy headers set

---

## 🌍 Multi-Region Setup (Advanced)

For global users, deploy to multiple regions:

### Vercel Edge Network
- Automatic worldwide deployment ✅
- No configuration needed

### AWS Multi-Region

```bash
# Deploy to multiple S3 buckets
US-EAST-1 (Virginia)
EU-WEST-1 (Ireland)
AP-SOUTHEAST-1 (Singapore)

# Use Route 53 geo-routing
- Latency-based routing
- Geolocation routing
```

---

## 📊 Post-Deployment Monitoring

### Setup Monitoring

1. **Vercel Analytics:**
   - Enable in dashboard (free)
   - View real-time visitors
   - Performance metrics

2. **AWS CloudWatch:**
   ```bash
   # Monitor S3 requests
   # Monitor CloudFront hits
   # Set up alarms for errors
   ```

3. **Uptime Monitoring:**
   - [UptimeRobot](https://uptimerobot.com/) (free)
   - [Pingdom](https://www.pingdom.com/)

### Key Metrics to Track

- Response time (< 200ms)
- Time to First Byte (< 600ms)
- Error rate (< 0.1%)
- Uptime (> 99.9%)

---

## 🐛 Troubleshooting Deployment Issues

### Build Fails

```bash
# Check for errors
npm run build

# Common fixes:
- Update dependencies
- Clear node_modules and reinstall
- Check for TypeScript errors
- Verify environment variables
```

### 404 Errors on Refresh

**Vercel:** Add to `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**CloudFront:** Set Error Pages:
- 404 → /index.html (200 status)
- 403 → /index.html (200 status)

### Environment Variables Not Working

1. Check variable names start with `VITE_`
2. Restart build after adding variables
3. Verify in Vercel dashboard
4. Clear cache and redeploy

---

## 💰 Cost Optimization

### Free Tier Usage

**Vercel:**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic SSL

**AWS Free Tier:**
- 5 GB S3 storage
- 50 GB data transfer/month
- 2 million CloudFront requests

### Cost Estimates (After Free Tier)

**Low Traffic (< 10k visitors/month):**
- Vercel: $0 (free tier sufficient)
- AWS: ~$1-5/month

**Medium Traffic (100k visitors/month):**
- Vercel: $20/month (Pro plan)
- AWS: ~$10-20/month

**High Traffic (1M visitors/month):**
- Vercel: $20/month (Pro) or custom
- AWS: ~$50-100/month

---

## ✅ Deployment Success Checklist

- [ ] Website accessible via public URL
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Forms work (if applicable)
- [ ] Database connection successful
- [ ] Authentication works
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Performance score > 90
- [ ] No console errors
- [ ] Analytics tracking active
- [ ] Monitoring set up

---

## 🎉 You're Live!

Congratulations! Your Starbucks website is now live! 🚀

### Share Your Work

- Add to portfolio
- Share on LinkedIn
- Tweet about it
- Submit to hackathon
- Show to potential employers

### Next Steps

1. Monitor performance
2. Gather user feedback
3. Iterate and improve
4. Add new features
5. Scale as needed

---

<div align="center">

**Deployed with ☕ and ❤️**

Made by Aadi | Frontend Hackathon Winner 🏆

</div>

