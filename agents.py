from fastapi import APIRouter
from typing import Dict, Any, List
import time

router = APIRouter(prefix="/agents", tags=["agents"])

# ======================================================
# AGENT REGISTRY (STATEFUL, IN-MEMORY)
# ======================================================

AGENTS: Dict[str, Dict[str, Any]] = {
    "finance": {
        "id": 2,
        "name": "Finance Master",
        "authority": 9,
        "status": "active",
        "memory": [],
        "created_at": time.time(),
    },
    "sales": {
        "id": 3,
        "name": "Sales Commander",
        "authority": 9,
        "status": "active",
        "memory": [],
        "created_at": time.time(),
    },
}

# ======================================================
# INTERNAL UTILITIES
# ======================================================

def log_memory(agent: Dict[str, Any], role: str, message: str):
    agent["memory"].append(
        {
            "role": role,
            "message": message,
            "timestamp": time.time(),
        }
    )

def agent_response(agent: Dict[str, Any], user_input: str) -> str:
    # Placeholder logic — later this is where AI plugs in
    return f"{agent['name']} processed your request."

# ======================================================
# PUBLIC API
# ======================================================

@router.get("")
def list_agents():
    return [
        {
            "id": agent["id"],
            "key": key,
            "name": agent["name"],
            "authority": agent["authority"],
            "status": agent["status"],
        }
        for key, agent in AGENTS.items()
    ]

@router.get("/{agent_key}")
def get_agent(agent_key: str):
    agent = AGENTS.get(agent_key)
    if not agent:
        return {"status": "error", "message": "Agent not found"}

    return {
        "id": agent["id"],
        "name": agent["name"],
        "authority": agent["authority"],
        "status": agent["status"],
        "memory_depth": len(agent["memory"]),
        "uptime_seconds": int(time.time() - agent["created_at"]),
    }

@router.post("/{agent_key}/interact")
def interact(agent_key: str, payload: Dict[str, Any]):
    agent = AGENTS.get(agent_key)
    if not agent:
        return {"status": "error", "message": "Agent not found"}

    user_message = payload.get("message", "")

    log_memory(agent, "user", user_message)

    response = agent_response(agent, user_message)

    log_memory(agent, "agent", response)

    return {
        "status": "success",
        "agent": agent["name"],
        "response": response,
        "memory_depth": len(agent["memory"]),
    }

@router.get("/{agent_key}/memory")
def get_memory(agent_key: str):
    agent = AGENTS.get(agent_key)
    if not agent:
        return {"status": "error", "message": "Agent not found"}

    return {
        "agent": agent["name"],
        "memory": agent["memory"],
        "memory_depth": len(agent["memory"]),
    }

@router.post("/{agent_key}/reset")
def reset_agent(agent_key: str):
    agent = AGENTS.get(agent_key)
    if not agent:
        return {"status": "error", "message": "Agent not found"}

    agent["memory"] = []

    return {
        "status": "success",
        "agent": agent["name"],
        "message": "Memory reset",
    }

# ======================================================
# SYSTEM ENDPOINT
# ======================================================

@router.get("/_system/health")
def system_health():
    return {
        "agents_online": len(AGENTS),
        "status": "operational",
        "timestamp": time.time(),
  }
