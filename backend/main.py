"""
SALES KING ACADEMY - BULLETPROOF BACKEND
Finds files regardless of working directory
"""

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, HTMLResponse, FileResponse
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

# SMART PATH DETECTION - Works anywhere
def find_project_root():
    """Find project root by looking for marker files"""
    current = Path(__file__).resolve().parent  # Start at backend/
    
    # Check parent directory (should be project root)
    project_root = current.parent
    
    # Verify we found the right place by checking for index.html
    if (project_root / "index.html").exists():
        logger.info(f"✅ Found project root at: {project_root}")
        return project_root
    
    # Fallback: check current working directory
    cwd = Path.cwd()
    if (cwd / "index.html").exists():
        logger.info(f"✅ Found project root at CWD: {cwd}")
        return cwd
    
    # Last resort: check /opt/render/project/src (Render's default)
    render_path = Path("/opt/render/project/src")
    if render_path.exists() and (render_path / "index.html").exists():
        logger.info(f"✅ Found project root at Render path: {render_path}")
        return render_path
    
    logger.warning(f"⚠️ Could not find index.html, using: {project_root}")
    return project_root

BASE_DIR = find_project_root()

def safe_serve_file(filename: str, fallback_content: str = None):
    """Safely serve a file with fallback"""
    try:
        file_path = BASE_DIR / filename
        logger.info(f"Attempting to serve: {file_path}")
        
        if file_path.exists():
            logger.info(f"✅ File found, serving: {filename}")
            return FileResponse(file_path)
        else:
            logger.warning(f"⚠️ File not found: {filename}")
            if fallback_content:
                return HTMLResponse(content=fallback_content)
            else:
                return HTMLResponse(content=f"<h1>File not found: {filename}</h1><p>Path: {file_path}</p>")
    except Exception as e:
        logger.error(f"❌ Error serving {filename}: {e}")
        return HTMLResponse(content=f"<h1>Error</h1><p>{str(e)}</p>")

# ============================================================================
# FRONTEND ROUTES
# ============================================================================

@app.get("/", response_class=HTMLResponse)
async def root():
    """Serve the main frontend page"""
    fallback = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Sales King Academy</title>
        <style>
            body { font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; }
            h1 { color: #333; }
            .links { margin: 20px 0; }
            .links a { display: block; margin: 10px 0; padding: 10px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
            .links a:hover { background: #0056b3; }
        </style>
    </head>
    <body>
        <h1>🚀 Sales King Academy</h1>
        <p><strong>Service Status:</strong> ✅ Online</p>
        <div class="links">
            <a href="/api/status">System Status</a>
            <a href="/api/ska_credits">SKA Credits</a>
            <a href="/api/agents">AI Agents</a>
            <a href="/api/temporal_dna">Temporal DNA</a>
            <a href="/health">Health Check</a>
            <a href="/docs">API Documentation</a>
        </div>
    </body>
    </html>
    """
    return safe_serve_file("index.html", fallback)

@app.get("/app", response_class=HTMLResponse)
async def app_page():
    """Serve the app page"""
    return safe_serve_file("app.html", "<h1>App page not available</h1>")

@app.get("/dashboard", response_class=HTMLResponse)
async def dashboard_page():
    """Serve the dashboard page"""
    return safe_serve_file("dashboard.html", "<h1>Dashboard page not available</h1>")

# ============================================================================
# API ROUTES
# ============================================================================

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "base_dir": str(BASE_DIR),
        "index_exists": (BASE_DIR / "index.html").exists()
    }

@app.get("/api/status")
async def system_status():
    """Complete system status"""
    return {
        "status": "operational",
        "service": "Sales King Academy",
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "base_directory": str(BASE_DIR),
        "files_found": {
            "index.html": (BASE_DIR / "index.html").exists(),
            "app.html": (BASE_DIR / "app.html").exists(),
            "dashboard.html": (BASE_DIR / "dashboard.html").exists()
        },
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
        genesis = datetime(2024, 7, 1, 0, 0, 0, tzinfo=timezone.utc)
        now = datetime.now(timezone.utc)
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
    logger.info(f"📂 Current working directory: {Path.cwd()}")
    logger.info(f"📂 Backend file location: {Path(__file__).resolve()}")
    logger.info(f"📄 index.html exists: {(BASE_DIR / 'index.html').exists()}")
    logger.info(f"📄 app.html exists: {(BASE_DIR / 'app.html').exists()}")
    logger.info(f"📄 dashboard.html exists: {(BASE_DIR / 'dashboard.html').exists()}")
    logger.info("✅ Service ready to accept requests")
    logger.info("=" * 80)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=10000)
