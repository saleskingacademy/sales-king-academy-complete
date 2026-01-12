"""
SALES KING ACADEMY - MASTER INTEGRATION
Connects ALL systems and makes them work together
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import sys
sys.path.append('backend')

# Import ALL your systems
from tsi_core import (
    TemporalDNATokenizer, SKACurrencySystem, TriplePlaneComputer,
    GENESIS_TIMESTAMP, ALPHA, FAILSAFE_INTERVALS
)
from sat_solver import RKLSATSolver
from ska_autonomous_engine_complete import AutonomousRevenueEngine
from mind_mastery import MindMasterySystem
from diy_email_server import DIYEmailServer
from diy_sms_system import DIYSMSGateway  
from diy_voip_system import DIYVoIPSystem

app = FastAPI(title="Sales King Academy Complete System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ALL systems
tokenizer = TemporalDNATokenizer()
currency = SKACurrencySystem()
triple_plane = TriplePlaneComputer()
sat_solver = RKLSATSolver()
revenue_engine = AutonomousRevenueEngine({})
mind_mastery = MindMasterySystem()

@app.get("/")
async def root():
    return FileResponse("agents.html")

@app.get("/health")
async def health():
    credits = int(time.time()) - GENESIS_TIMESTAMP
    return {
        "status": "operational",
        "ska_credits": credits,
        "alpha": ALPHA,
        "systems": {
            "tokenizer": "operational",
            "currency": "operational", 
            "sat_solver": "operational",
            "revenue_engine": "operational",
            "mind_mastery": "operational"
        }
    }

@app.get("/credits")
async def get_credits():
    return {"credits": currency.get_current_supply()}

@app.get("/agents")
async def list_agents():
    from backend.tsi_core import AGENTS
    return {"agents": list(AGENTS.values())}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
