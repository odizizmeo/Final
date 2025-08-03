#!/bin/bash

# Final Exam Project - Local Development Setup Script

echo "🚀 Starting Final Exam Project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   - On macOS: brew services start mongodb-community"
    echo "   - On Ubuntu: sudo systemctl start mongod"
    echo "   - On Windows: Start MongoDB service"
    echo ""
    echo "Or install MongoDB if not installed:"
    echo "   - macOS: brew install mongodb-community"
    echo "   - Ubuntu: sudo apt install mongodb"
    echo "   - Windows: Download from https://www.mongodb.com/try/download/community"
    exit 1
fi

echo "✅ MongoDB is running"

# Create uploads directory if it doesn't exist
mkdir -p uploads

# Start the application
echo "🌐 Starting the application..."
echo "📱 The application will be available at: http://localhost:3000"
echo "📚 API endpoints:"
echo "   - GET  /api/references"
echo "   - POST /api/references"
echo "   - PUT  /api/references/:id"
echo "   - DELETE /api/references/:id"
echo ""
echo "Press Ctrl+C to stop the application"
echo ""

npm start 