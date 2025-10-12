#!/bin/bash

# Starbucks App EC2 Deployment Script
# Run this script on your Ubuntu EC2 instance

echo "🚀 Starting Starbucks App Deployment..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install Git (if not already installed)
echo "📦 Installing Git..."
sudo apt install git -y

# Navigate to home directory
cd ~

# Clone or upload your project (if not already there)
# If you need to clone from Git:
# git clone <your-repo-url> zennit-starbucks
# cd zennit-starbucks

# Navigate to project directory
cd ~/zennit-starbucks

# Install project dependencies
echo "📦 Installing project dependencies..."
npm install

# Install express for production server
npm install express

# Build the application
echo "🔨 Building application..."
npm run build:prod

# Stop any existing PM2 processes
echo "🛑 Stopping existing processes..."
pm2 stop all
pm2 delete all

# Start the application with PM2
echo "🚀 Starting application with PM2..."
pm2 start server.js --name "starbucks-app" --env PORT=3001

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 3001
sudo ufw allow ssh
sudo ufw --force enable

# Check application status
echo "✅ Checking application status..."
pm2 status
pm2 logs starbucks-app --lines 10

# Test local connection
echo "🧪 Testing local connection..."
curl -I http://localhost:3001

echo "🎉 Deployment complete!"
echo "Your app should be accessible at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3001"
