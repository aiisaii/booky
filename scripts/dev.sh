#!/bin/bash

# Start backend
echo "Starting backend..."
cd backend
npm install
npm run dev &
cd ..

# Start frontend
echo "Starting frontend..."
cd frontend
npm install
npm run dev &
cd ..

# Start extension build in watch mode
echo "Building extension in watch mode..."
cd extension
npm install
npm run dev &
cd ..

wait
