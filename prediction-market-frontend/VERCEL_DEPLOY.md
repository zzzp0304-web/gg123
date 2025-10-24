# 🚀 Deploy to Vercel

## Quick Deploy Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
cd prediction-market-frontend
vercel
```

## Environment Variables

After deployment, you need to set the following environment variable in Vercel:

- `BACKEND_URL` - Your backend API URL (e.g., `https://your-backend.com` or `http://localhost:9000` for testing)

### Setting Environment Variables in Vercel:

1. Go to your project on Vercel dashboard
2. Click on "Settings"
3. Click on "Environment Variables"
4. Add `BACKEND_URL` with your backend URL value
5. Click "Save"
6. Redeploy your project

## Alternative: Deploy via Vercel Dashboard

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your Git repository
4. Set the root directory to `prediction-market-frontend`
5. Add environment variables (see above)
6. Click "Deploy"

## Important Notes

- The frontend is configured to run on Next.js
- Make sure your backend is deployed and accessible before setting the `BACKEND_URL`
- For local development, the backend defaults to `http://localhost:9000`

