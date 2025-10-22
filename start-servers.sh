#!/bin/bash

# Start the backend server in the background
echo "Starting backend server on port 9000..."
cd prediction-market-backend && npm run dev &
BACKEND_PID=$!

# Start the frontend server
echo "Starting frontend server on port 5000..."
cd prediction-market-frontend && npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
