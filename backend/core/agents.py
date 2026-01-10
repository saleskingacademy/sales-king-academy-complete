"""
Agent Registry and Management
All agents must be registered and controlled
"""

import logging
from typing import Dict, List

logger = logging.getLogger(__name__)

class AgentRegistry:
    """Centralized agent registry"""
    
    def __init__(self):
        self.registered_agents = {}
        self.active_agents = []
    
    def register_agent(self, agent_id: str, agent_config: Dict):
        """Register an agent"""
        self.registered_agents[agent_id] = agent_config
        logger.info(f"Agent registered: {agent_id}")
    
    def get_active_agents(self) -> List[str]:
        """Get list of active agents"""
        return self.active_agents

# Global registry
registry = AgentRegistry()

def get_agent_status():
    """Get agent system status"""
    return {
        "total_registered": len(registry.registered_agents),
        "total_active": len(registry.active_agents),
        "registry_enabled": True
    }
