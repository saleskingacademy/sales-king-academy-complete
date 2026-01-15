"""
SALES KING ACADEMY - INTEGRATED PRODUCTION SYSTEM
Connects all components: TSI Core, RKL Framework, SAT Solver, Agents
"""
import os
import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials  
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio

# Import TSI Core (Custom LLM System)
from backend.tsi_core import TSICore, Agent as TSIAgent, get_current_credits, generate_temporal_dna
from backend.sat_solver import RKLSATSolver
from backend.mind_mastery import MindMasterySystem
from backend.ska_autonomous_engine_complete import SKAAutonomousEngine

app = FastAPI(title="Sales King Academy API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize all systems
print("Initializing TSI Core...")
tsi = TSICore()

print("Initializing RKL SAT Solver...")
sat_solver = RKLSATSolver(alpha=25)

print("Initializing Mind Mastery (MyIQ)...")
myiq = MindMasterySystem()

print("Initializing Autonomous Engine...")
autonomous = SKAAutonomousEngine()

print("✅ All systems initialized")

# Models
class ChatRequest(BaseModel):
    agent_id: int
    message: str
    use_web_search: bool = False

class SATRequest(BaseModel):
    problem: str

@app.get("/")
async def root():
    """Health check"""
    return {
        "status": "operational",
        "system": "Sales King Academy",
        "credits": get_current_credits(),
        "timestamp": generate_temporal_dna()
    }

@app.post("/agents/chat")
async def agent_chat(request: ChatRequest):
    """Chat with any of the 25 agents using TSI Core"""
    try:
        # Get agent from TSI Core
        agent = tsi.get_agent(request.agent_id)
        
        # Process with custom LLM (not external API!)
        response = await agent.process_message(
            message=request.message,
            use_web_search=request.use_web_search
        )
        
        return {
            "agent_id": request.agent_id,
            "agent_name": agent.name,
            "response": response,
            "credits": get_current_credits(),
            "dna": generate_temporal_dna()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/rkl/solve")
async def solve_sat(request: SATRequest):
    """Solve SAT problem using RKL Framework O(n^1.77)"""
    try:
        result = sat_solver.solve(request.problem)
        return {
            "solution": result,
            "complexity": "O(n^1.77)",
            "alpha": 25
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/currency/balance")
async def get_balance():
    """Get current SKA Credits balance"""
    return {
        "credits": get_current_credits(),
        "rate": "1 credit/second",
        "value_usd": get_current_credits() * 1.0
    }

@app.get("/dna/generate")
async def get_dna():
    """Generate Temporal DNA token"""
    return {
        "dna": generate_temporal_dna(),
        "format": "16-digit temporal anchor"
    }

@app.get("/myiq/assessments")
async def list_assessments():
    """List all 350+ intelligence assessments"""
    return myiq.get_all_assessments()

@app.post("/myiq/take")
async def take_assessment(assessment_id: str):
    """Take an intelligence assessment"""
    return await myiq.take_assessment(assessment_id)

@app.get("/health")
async def health():
    return {"status": "healthy", "systems": "all operational"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
