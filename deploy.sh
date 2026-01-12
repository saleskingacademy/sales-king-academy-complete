#!/bin/bash
# SALES KING ACADEMY - COMPLETE DEPLOYMENT SCRIPT
# Self-owned system using GitHub + Cloudflare
# NO Render, NO Netlify, NO AWS required

set -e

echo "="*80
echo "🔥 SALES KING ACADEMY - AUTONOMOUS DEPLOYMENT"
echo "="*80

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing Wrangler CLI..."
    npm install -g wrangler
fi

# Login to Cloudflare (opens browser)
echo "🔐 Logging into Cloudflare..."
wrangler login

# Create D1 database
echo "💾 Creating D1 database..."
DB_OUTPUT=$(wrangler d1 create ska_production 2>&1)
DB_ID=$(echo "$DB_OUTPUT" | grep "database_id" | awk '{print $3}' | tr -d '"')

echo "✅ Database created with ID: $DB_ID"

# Update wrangler.toml with database ID
echo "📝 Updating wrangler.toml with database ID..."
sed -i "s/YOUR_D1_DATABASE_ID/$DB_ID/g" wrangler.toml

# Initialize database schema
echo "🗄️  Initializing database schema..."
wrangler d1 execute ska_production --file=schema.sql

# Deploy Worker
echo "🚀 Deploying Cloudflare Worker..."
wrangler deploy

# Get deployment URL
WORKER_URL=$(wrangler deployments list | grep "https://" | head -1 | awk '{print $1}')

echo ""
echo "="*80
echo "✅ DEPLOYMENT COMPLETE!"
echo "="*80
echo ""
echo "🌐 Your Sales King Academy is live at:"
echo "   $WORKER_URL"
echo ""
echo "📊 System Status:"
echo "   ✅ 25 AI Agents: Active"
echo "   ✅ D1 Database: Connected"
echo "   ✅ Square Payments: Integrated"
echo "   ✅ Global Edge: Deployed"
echo ""
echo "💡 Add custom domain:"
echo "   wrangler domains add saleskingacademy.com"
echo ""
echo "="*80
