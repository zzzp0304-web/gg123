# 🚀 Deploy Your Prediction Market to Vercel

## Step-by-Step Deployment Guide

### Step 1: Login to Vercel
Open a terminal and run:
```bash
vercel login
```
This will open your browser where you can login with:
- GitHub
- GitLab
- Bitbucket
- Email

### Step 2: Deploy the Frontend
```bash
cd prediction-market-frontend
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **What's your project's name?** → `yujian-markets` (or your preferred name)
- **In which directory is your code located?** → `./` (press Enter)
- **Override settings?** → No

### Step 3: Set Environment Variables

After deployment, you need to configure the backend URL:

1. Go to https://vercel.com/dashboard
2. Select your project (yujian-markets)
3. Click **Settings** → **Environment Variables**
4. Add the following:
   - **Key**: `BACKEND_URL`
   - **Value**: Your backend URL (for now, you can use `http://localhost:9000` or deploy backend separately)
   - **Environment**: Production, Preview, Development (check all)
5. Click **Save**

### Step 4: Redeploy
```bash
vercel --prod
```

## 🎉 That's it!

Your site will be live at: `https://your-project-name.vercel.app`

---

## Optional: Deploy Backend to Railway/Render

Since the backend is Node.js/Express, you can deploy it to:
- **Railway** (https://railway.app) - Easy and free tier available
- **Render** (https://render.com) - Free tier available
- **Heroku** (https://heroku.com) - Paid options

After deploying the backend, update the `BACKEND_URL` environment variable on Vercel with the deployed backend URL.

---

## Quick Command Reference

```bash
# Login to Vercel
vercel login

# Deploy to preview
cd prediction-market-frontend
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```

---

## Troubleshooting

**Issue**: Build fails
- Check that all dependencies are in `package.json`
- Run `npm run build` locally first to test

**Issue**: Site loads but API calls fail
- Make sure `BACKEND_URL` is set correctly in Vercel environment variables
- Check that your backend is accessible from the internet

**Issue**: 404 errors on routes
- This is fixed (we removed the duplicate slug route)
- Make sure to deploy the latest code

