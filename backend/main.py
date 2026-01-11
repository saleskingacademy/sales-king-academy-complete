"""
SALES KING ACADEMY - CANONICAL BACKEND ENTRY POINT
FastAPI Application - Single Source of Truth
Runtime: uvicorn backend.main:app --host 0.0.0.0 --port $PORT
"""

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from datetime import datetime, timezone
import logging
import sys
import os
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

# Add backend to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Initialize FastAPI
app = FastAPI(
    title="Sales King Academy",
    version="1.0.0",
    description="Production-grade AI-powered business automation platform"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the project root directory (parent of backend/)
BASE_DIR = Path(__file__).resolve().parent.parent

# Mount static files if they exist
if (BASE_DIR / "public").exists():
    app.mount("/static", StaticFiles(directory=str(BASE_DIR / "public")), name="static")
    logger.info(f"✅ Mounted /public directory")

# ============================================================================
# FRONTEND ROUTES
# ============================================================================

@app.get("/", response_class=HTMLResponse)
async def root():
    """Serve the main frontend page"""
    try:
        index_path = BASE_DIR / "index.html"
        if index_path.exists():
            return FileResponse(index_path)
        else:
            return HTMLResponse(content="""
            <html>
                <head><title>Sales King Academy</title></head>
                <body>
                    <h1>🚀 Sales King Academy API</h1>
                    <p>Service is live and running!</p>
                    <ul>
                        <li><a href="/health">Health Check</a></li>
                        <li><a href="/api/status">System Status</a></li>
                        <li><a href="/api/ska_credits">SKA Credits</a></li>
                        <li><a href="/docs">API Documentation</a></li>
                    </ul>
                </body>
            </html>
            """)
    except Exception as e:
        logger.error(f"Error serving index: {e}")
        return HTMLResponse(content=f"<h1>Sales King Academy</h1><p>Service running. Error: {e}</p>")

@app.get("/app", response_class=HTMLResponse)
async def app_page():
    """Serve the app page"""
    try:
        app_path = BASE_DIR / "app.html"
        if app_path.exists():
            return FileResponse(app_path)
        return HTMLResponse(content="<h1>App page not found</h1>")
    except Exception as e:
        logger.error(f"Error serving app: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/dashboard", response_class=HTMLResponse)
async def dashboard_page():
    """Serve the dashboard page"""
    try:
        dashboard_path = BASE_DIR / "dashboard.html"
        if dashboard_path.exists():
            return FileResponse(dashboard_path)
        return HTMLResponse(content="<h1>Dashboard page not found</h1>")
    except Exception as e:
        logger.error(f"Error serving dashboard: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# API ROUTES
# ============================================================================

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

@app.get("/api/status")
async def system_status():
    """Complete system status"""
    return {
        "status": "operational",
        "service": "Sales King Academy",
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "components": {
            "backend": "online",
            "framework": "FastAPI",
            "ai_agents": 25,
            "rkl_alpha": 25
        }
    }

@app.get("/api/ska_credits")
async def get_ska_credits():
    """Get current SKA Credits"""
    try:
        # Genesis: July 1, 2024 00:00:00 UTC
        genesis = datetime(2024, 7, 1, 0, 0, 0, tzinfo=timezone.utc)
        now = datetime.now(timezone.utc)
        
        # Calculate credits (1 per second since genesis)
        elapsed_seconds = int((now - genesis).total_seconds())
        
        return {
            "current_credits": elapsed_seconds,
            "genesis_timestamp": genesis.isoformat(),
            "current_timestamp": now.isoformat(),
            "mint_rate": "1 credit per second",
            "total_minted": elapsed_seconds
        }
    except Exception as e:
        logger.error(f"Error calculating SKA credits: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/temporal_dna")
async def get_temporal_dna():
    """Generate current Temporal DNA block"""
    try:
        now = datetime.now(timezone.utc)
        
        # 16-digit temporal DNA format: MMDDHHMMSSUUUUUU
        temporal_dna = now.strftime("%m%d%H%M%S") + f"{now.microsecond:06d}"
        
        return {
            "temporal_dna": temporal_dna,
            "timestamp": now.isoformat(),
            "format": "MMDDHHMMSSUUUUUU",
            "description": "16-digit cryptographic temporal identifier"
        }
    except Exception as e:
        logger.error(f"Error generating temporal DNA: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/agents")
async def get_agents():
    """Get AI agents status"""
    return {
        "total_agents": 25,
        "architecture": "Triple-Plane Computing",
        "agents": {
            "pre_compute": 11,
            "operational": 1,
            "post_compute": 11,
            "failsafe": 2
        },
        "status": "operational"
    }

# ============================================================================
# STARTUP
# ============================================================================

@app.on_event("startup")
async def startup_event():
    logger.info("=" * 80)
    logger.info("🚀 SALES KING ACADEMY - STARTING UP")
    logger.info("=" * 80)
    logger.info(f"📂 Base directory: {BASE_DIR}")
    logger.info(f"📄 Index file exists: {(BASE_DIR / 'index.html').exists()}")
    logger.info(f"📁 Public directory exists: {(BASE_DIR / 'public').exists()}")
    logger.info("✅ Service ready to accept requests")
    logger.info("=" * 80)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=10000)
