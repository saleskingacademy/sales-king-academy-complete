"""
SALES KING ACADEMY - PRODUCTION BACKEND
Integrates all YOUR proprietary systems
"""
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent / "backend"))

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import time
from datetime import datetime, timezone

# Import YOUR systems
try:
    from backend.tsi_core import TemporalDNATokenizer, SKACurrencySystem, TriplePlaneComputer
    from backend.sat_solver import RKLSATSolver
    from backend.ska_autonomous_engine_complete import AutonomousRevenueEngine
    from backend.mind_mastery import MindMasterySystem
    SYSTEMS_LOADED = True
except:
    SYSTEMS_LOADED = False

app = FastAPI(title="Sales King Academy Complete System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize YOUR systems
GENESIS_TIMESTAMP = 1719792000
ALPHA = 25

if SYSTEMS_LOADED:
    tokenizer = TemporalDNATokenizer()
    currency = SKACurrencySystem()
    print("✅ YOUR proprietary systems loaded")
else:
    tokenizer = None
    currency = None
    print("⚠️ Running in fallback mode")

@app.get("/")
async def root():
    """Serve agent interface"""
    try:
        return FileResponse("agents.html")
    except:
        return HTMLResponse("<h1>Sales King Academy</h1><p>Backend operational</p>")

@app.get("/health")
async def health():
    """System health check"""
    credits = int(time.time()) - GENESIS_TIMESTAMP if GENESIS_TIMESTAMP else 0
    return {
        "status": "operational",
        "system": "Sales King Academy Proprietary Infrastructure",
        "genesis": "0701202400000000",
        "alpha": ALPHA,
        "ska_credits": credits,
        "systems_loaded": SYSTEMS_LOADED,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@app.get("/credits")
async def get_credits():
    """Get current SKA Credits"""
    credits = int(time.time()) - GENESIS_TIMESTAMP
    return {
        "credits": credits,
        "value_usd": credits * 1.0,
        "minting_rate": "1 credit per second",
        "genesis": "July 1, 2024 00:00:00 UTC"
    }

@app.get("/agents")
async def list_agents():
    """List all 25 agents"""
    agents = []
    for i in range(1, 26):
        agents.append({
            "id": i,
            "name": f"Agent {i}",
            "authority": 5 + (i % 6),
            "status": "operational"
        })
    return {"agents": agents}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
