# Start Backend Server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\peter\OneDrive\Desktop\zzzzzz\bnb\prediction-market-backend'; Write-Host 'Starting Backend on port 9000...' -ForegroundColor Green; npm run dev"

# Start Frontend Server  
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\peter\OneDrive\Desktop\zzzzzz\bnb\prediction-market-frontend'; Write-Host 'Starting Frontend on port 5000...' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "Servers are starting in separate windows..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Frontend: http://localhost:5000" -ForegroundColor Yellow
Write-Host "Backend: http://localhost:9000" -ForegroundColor Yellow
