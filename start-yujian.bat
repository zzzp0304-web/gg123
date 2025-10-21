@echo off
echo Starting 预见市场 (Yujian Markets) Development Environment...
echo.

cd /d "C:\Users\peter\OneDrive\Desktop\zz\Solana-Prediction-Market"

echo Installing dependencies if needed...
cd prediction-market-frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    npm install
)
cd ..

cd prediction-market-backend
if not exist node_modules (
    echo Installing backend dependencies...
    npm install
)
cd ..

echo.
echo Starting services with PM2...
pm2 start ecosystem.config.js

echo.
echo Services started successfully!
echo.
echo Frontend: http://localhost:3000
echo Backend: http://localhost:9000
echo.
echo To view logs: pm2 logs
echo To stop services: pm2 stop all
echo To restart services: pm2 restart all
echo.
pause
