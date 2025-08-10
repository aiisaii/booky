#!/bin/bash

# Build frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Build extension
echo "Building extension..."
cd extension
npm install
npm run build
cd ..

echo "Build complete."
