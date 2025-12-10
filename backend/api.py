"""
SALES KING ACADEMY - COMPLETE API
=================================
FastAPI backend exposing all TSI systems
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Any, Optional
import asyncio

from tsi_core import TSICore, AgentRole
from sat_solver import RKLSATSolver, Clause
from mind_mastery import MindMasteryEngine

app = FastAPI(title="Sales King Academy API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize systems
tsi = TSICore()
sat_solver = RKLSATSolver(alpha=25)
mind_mastery = MindMasteryEngine()

# Models
class TaskRequest(BaseModel):
    description: str
    context: Dict[str, Any] = {}
    agent_role: Optional[str] = None

class AssessmentAnswers(BaseModel):
    assessment_id: str
    user_id: str
    answers: Dict[str, int]
    time_taken_seconds: float

@app.on_event("startup")
async def startup():
    """Start TSI system"""
    await tsi.start()

@app.get("/")
async def root():
    return {"message": "Sales King Academy API", "status": "operational"}

@app.get("/status")
async def get_status():
    """Get complete system status"""
    return tsi.get_system_status()

@app.post("/agent/task")
async def delegate_task(task: TaskRequest):
    """Delegate task to AI agent"""
    role = AgentRole[task.agent_role] if task.agent_role else None
    result = await tsi.agents.delegate_task(
        {"description": task.description, "context": task.context},
        role=role
    )
    return result

@app.get("/credits/supply")
async def get_credits_supply():
    """Get current SKA Credits supply"""
    total = tsi.currency.calculate_total_supply()
    return {
        "total_supply": total,
        "value_usd": total * 1.0,
        "minting_rate": 1.0
    }

@app.get("/assessments")
async def list_assessments():
    """List all available assessments"""
    return mind_mastery.get_all_assessments()

@app.post("/assessments/score")
async def score_assessment(data: AssessmentAnswers):
    """Score completed assessment"""
    result = mind_mastery.score_assessment(
        data.assessment_id,
        data.user_id,
        data.answers,
        data.time_taken_seconds
    )
    return result

@app.get("/sat/benchmark")
async def sat_benchmark(variables: int = 15, clauses: int = 60):
    """Run SAT solver benchmark"""
    from sat_solver import generate_random_3sat
    
    problem_clauses = generate_random_3sat(variables, clauses)
    result = sat_solver.solve(problem_clauses, variables)
    
    return {
        "variables": variables,
        "clauses": clauses,
        "satisfiable": result.satisfiable,
        "cycles": result.cycles,
        "time_ms": result.time_ms,
        "complexity": f"O({variables}^1.77)",
        "verification_hash": result.verification_hash
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
