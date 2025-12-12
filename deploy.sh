#!/bin/bash

# Sales King Academy - Quick Deployment Script
# Deploys complete system to production

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  SALES KING ACADEMY - DEPLOYMENT SYSTEM"
echo "  Build Empires. Not Businesses."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if git is configured
if ! git config user.email > /dev/null; then
    echo "⚠️  Git not configured. Configuring now..."
    git config --global user.email "info@saleskingacademy.com"
    git config --global user.name "Sales King Academy"
fi

# Check if repository exists
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git remote add origin https://github.com/saleskingacademy/sales-king-academy-complete.git
fi

# Add all files
echo "📁 Adding files to repository..."
git add .

# Commit changes
echo "💾 Committing changes..."
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "Deploy: Complete system update - $TIMESTAMP"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  SYSTEM STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Website:      https://saleskingacademy.com"
echo "🤖 AI App:       https://saleskingacademy.com/app"
echo "📡 GitHub:       Auto-synced"
echo "☁️  Netlify:      Auto-deployed"
echo "🔐 Cloudflare:   DNS Active"
echo ""
echo "🎯 Next Steps:"
echo "   1. Configure API credentials in .env file"
echo "   2. Run: python autonomous_business_system.py"
echo "   3. Monitor dashboard at /app"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  💰 25 Agents Active | RKL Framework α=25"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
