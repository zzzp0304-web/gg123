@echo off
echo ==========================================
echo  Deploy Yujian Markets to Vercel
echo ==========================================
echo.

echo Step 1: Logging in to Vercel...
vercel login

echo.
echo Step 2: Deploying frontend...
cd prediction-market-frontend
vercel

echo.
echo ==========================================
echo  Deployment Started!
echo ==========================================
echo.
echo Next steps:
echo 1. Go to https://vercel.com/dashboard
echo 2. Find your project
echo 3. Add BACKEND_URL environment variable
echo 4. Run: vercel --prod (for production deployment)
echo.
pause

