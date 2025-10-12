# ⚡ Quick Start Guide

Get the Starbucks website running in **5 minutes**!

## 🚀 Super Quick Setup (For Demo/Testing)

### 1. Install Dependencies (1 minute)

```bash
# Clone the repository
git clone <your-repo-url>
cd starbucks-website

# Install packages
npm install
```

### 2. Basic Environment Setup (1 minute)

Create `.env` file:

```env
# You can use demo mode without these initially
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### 3. Run Development Server (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🎯 Full Setup (With Database)

### Prerequisites Checklist
- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Supabase account created
- [ ] Git installed

### Step 1: Supabase Setup (5 minutes)

1. **Create Project:**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose a name (e.g., `starbucks-coffee`)
   - Save your database password!

2. **Get API Keys:**
   - Go to Settings → API
   - Copy `Project URL`
   - Copy `anon/public` key

3. **Create Tables:**
   - Open SQL Editor in Supabase
   - Copy SQL from `SUPABASE_SETUP.md`
   - Run the queries

### Step 2: Environment Variables (2 minutes)

Create `.env` file in root:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your-key
```

### Step 3: Run the Project (1 minute)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📦 Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Check for issues

# Deployment
npm run build            # Build first
vercel                   # Deploy to Vercel
```

---

## 🎨 Customization Quick Tips

### Change Colors (Tailwind Config)

Edit `tailwind.config.js`:

```javascript
starbucks: {
  green: '#00704A',        // Main brand color
  'green-light': '#1E3932',
  'green-dark': '#006241',
  cream: '#F1F1F0',
  gold: '#CBA258',
}
```

### Add New Component

```jsx
// src/components/NewComponent.jsx
import React from 'react';

const NewComponent = () => {
  return (
    <div className="p-10">
      <h1>New Component</h1>
    </div>
  );
};

export default NewComponent;
```

Add to `App.jsx`:
```jsx
import NewComponent from './components/NewComponent';

// Inside App component:
<NewComponent />
```

---

## 🐛 Common Issues & Fixes

### Issue 1: Port 3000 already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- --port 3001
```

### Issue 2: Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: Supabase connection error
```bash
# Check environment variables are loaded
console.log(import.meta.env.VITE_SUPABASE_URL)

# Make sure .env file is in root directory
# Restart dev server after changing .env
```

### Issue 4: Build fails
```bash
# Clear build cache
rm -rf dist
npm run build
```

---

## 🚀 Deploy to Vercel (5 minutes)

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2: Using Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Add environment variables
6. Click "Deploy"

**Don't forget to add environment variables in Vercel!**

---

## 📱 Test on Mobile

### Using Local Network

1. Start dev server:
   ```bash
   npm run dev -- --host
   ```

2. Find your local IP:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

3. Access from mobile:
   ```
   http://YOUR_IP:3000
   ```

### Using ngrok (Public URL)

```bash
# Install ngrok
npm i -g ngrok

# Start dev server
npm run dev

# In another terminal
ngrok http 3000
```

Access via ngrok URL from anywhere!

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Website loads at localhost:3000
- [ ] All sections visible (Hero, Products, About, etc.)
- [ ] Images load correctly
- [ ] Navigation works
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Tailwind styles applied

---

## 🎓 Next Steps

1. **Customize Content:**
   - Edit component files in `src/components/`
   - Update text and images
   - Modify colors in Tailwind config

2. **Add Features:**
   - Implement authentication UI
   - Create product detail pages
   - Add shopping cart
   - Build user profile page

3. **Deploy:**
   - Push to GitHub
   - Deploy to Vercel
   - Configure custom domain (optional)

4. **Optimize:**
   - Compress images
   - Enable CloudFront CDN
   - Set up monitoring

---

## 📚 Learning Resources

- **React:** [react.dev/learn](https://react.dev/learn)
- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Supabase:** [supabase.com/docs/guides](https://supabase.com/docs/guides)
- **Vercel:** [vercel.com/docs](https://vercel.com/docs)

---

## 🆘 Need Help?

1. Check `README.md` for detailed information
2. Review `SUPABASE_SETUP.md` for database issues
3. See `AWS_SETUP.md` for cloud services
4. Check console for error messages
5. Search issues on GitHub

---

## 🎉 You're All Set!

Your Starbucks website is ready to rock! 🚀☕

**Happy Coding!**

---

<div align="center">

Made with ☕ and ❤️ by Aadi

⭐ Don't forget to star the repo!

</div>

