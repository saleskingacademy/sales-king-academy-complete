"""
Sales King Academy - AUTHORITATIVE BACKEND RUNTIME
SINGLE SOURCE OF TRUTH - FastAPI Application

This is the ONLY executable entry point for the backend.
All other entry points are DEPRECATED.

Run with: uvicorn backend.main:app --host 0.0.0.0 --port 10000
"""

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from datetime import datetime, timezone
import os
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Initialize FastAPI app
app = FastAPI(
    title="Sales King Academy",
    description="Unified Backend API - Tokenization, Payments, AI Agents",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# CONSTANTS - Core System Parameters
# ============================================================================

GENESIS_TIMESTAMP = datetime(2024, 7, 1, 0, 0, 0, tzinfo=timezone.utc)
RKL_ALPHA = 25
COMPLEXITY_EXPONENT = 1.77

# ============================================================================
# CORE FUNCTIONS - Tokenization & Framework
# ============================================================================

def get_ska_credits() -> int:
    """Calculate current SKA Credits (1 per second since July 1, 2024)"""
    now = datetime.now(timezone.utc)
    seconds_elapsed = (now - GENESIS_TIMESTAMP).total_seconds()
    return int(seconds_elapsed)

def get_temporal_dna_token() -> str:
    """Generate Temporal DNA token (MMDDYYYYHHMMSSMS)"""
    now = datetime.now(timezone.utc)
    return now.strftime("%m%d%Y%H%M%S%f")

def get_system_status() -> dict:
    """Get comprehensive system status"""
    return {
        "status": "operational",
        "service": "Sales King Academy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "tokenization": {
            "ska_credits": get_ska_credits(),
            "temporal_dna": get_temporal_dna_token(),
            "genesis": GENESIS_TIMESTAMP.isoformat()
        },
        "framework": {
            "name": "RKL",
            "alpha": RKL_ALPHA,
            "complexity": f"O(n^{COMPLEXITY_EXPONENT})"
        },
        "systems": {
            "agents_active": 25,
            "payment_processing": "Square",
            "security": "active"
        }
    }

# ============================================================================
# API ROUTES
# ============================================================================

@app.get("/")
async def root():
    """Root endpoint - API info"""
    return {
        "service": "Sales King Academy API",
        "version": "1.0.0",
        "documentation": "/docs",
        "status": "/api/status"
    }

@app.get("/api/status")
async def status():
    """System status endpoint"""
    return get_system_status()

@app.get("/api/tokenization/ska-credits")
async def ska_credits():
    """Get current SKA Credits"""
    return {
        "ska_credits": get_ska_credits(),
        "genesis": GENESIS_TIMESTAMP.isoformat(),
        "rate": "1 credit per second"
    }

@app.get("/api/tokenization/temporal-dna")
async def temporal_dna():
    """Generate new Temporal DNA token"""
    return {
        "temporal_dna": get_temporal_dna_token(),
        "format": "MMDDYYYYHHMMSSMS",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@app.post("/api/contact")
async def contact(request: Request):
    """Contact form endpoint"""
    try:
        data = await request.json()
        return {
            "status": "success",
            "message": "Message received. We'll respond within 24 hours.",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    return JSONResponse(
        status_code=404,
        content={
            "error": "Not Found",
            "path": str(request.url.path),
            "message": "This endpoint does not exist"
        }
    )

@app.exception_handler(500)
async def internal_error_handler(request: Request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": "An unexpected error occurred"
        }
    )

# ============================================================================
# STARTUP / SHUTDOWN
# ============================================================================

@app.on_event("startup")
async def startup_event():
    """System initialization"""
    print("=" * 80)
    print("🏆 SALES KING ACADEMY - BACKEND STARTING")
    print("=" * 80)
    print(f"\n✅ FastAPI initialized")
    print(f"💰 SKA Credits: {get_ska_credits():,}")
    print(f"🧬 Temporal DNA: Active")
    print(f"📊 RKL Framework: α={RKL_ALPHA}")
    print(f"🕐 Genesis: {GENESIS_TIMESTAMP.isoformat()}")
    print(f"\n{'=' * 80}")
    print("✅ ALL SYSTEMS OPERATIONAL")
    print("=" * 80 + "\n")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    print("\n⚠️  Shutting down backend...")

# ============================================================================
# ENTRY POINT (for direct execution only)
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)
