#!/bin/bash

echo "════════════════════════════════════════════════════════════════════"
echo "  SALES KING ACADEMY - AUTONOMOUS REVENUE ENGINE"
echo "  Starting 24/7 revenue generation..."
echo "════════════════════════════════════════════════════════════════════"
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Installing..."
    sudo apt-get update && sudo apt-get install -y python3 python3-pip
fi

# Clone/update repository
if [ ! -d "sales-king-academy-complete" ]; then
    echo "📥 Cloning repository..."
    git clone https://github.com/saleskingacademy/sales-king-academy-complete.git
    cd sales-king-academy-complete
else
    echo "📥 Updating repository..."
    cd sales-king-academy-complete
    git pull origin main
fi

# Install dependencies
echo "📦 Installing dependencies..."
pip3 install -r requirements_revenue.txt

# Start service
echo ""
echo "🚀 STARTING AUTONOMOUS REVENUE ENGINE"
echo "════════════════════════════════════════════════════════════════════"
echo ""
echo "Service will run continuously generating revenue every 60 minutes"
echo "Press Ctrl+C to stop"
echo ""

# Run in background with nohup
nohup python3 revenue_engine_live.py > revenue_engine.log 2>&1 &
PID=$!

echo "✅ Revenue Engine STARTED"
echo "   PID: $PID"
echo "   Log: revenue_engine.log"
echo ""
echo "Monitor with: tail -f revenue_engine.log"
echo "Stop with: kill $PID"
echo ""
echo "Service URL (if on server): http://YOUR_SERVER_IP:8080"
echo "Stats endpoint: http://YOUR_SERVER_IP:8080/stats"
echo ""
echo "════════════════════════════════════════════════════════════════════"
echo "💰 AUTONOMOUS REVENUE GENERATION: ACTIVE"
echo "════════════════════════════════════════════════════════════════════"
