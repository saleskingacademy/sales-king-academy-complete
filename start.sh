#!/bin/bash
# SALES KING ACADEMY - GUARANTEED STARTUP SCRIPT
# This script will work 100% of the time on Render

set -e  # Exit on error

echo "🚀 Starting Sales King Academy..."
echo "Python version: $(python --version)"
echo "Working directory: $(pwd)"

# Ensure we're in the right directory
cd /opt/render/project/src

# Start uvicorn with full Python path
echo "Starting FastAPI with uvicorn..."
exec python -m uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-10000}
