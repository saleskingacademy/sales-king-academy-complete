"""
Production-Grade Agent Interface
Enforces contracts, observability, and deterministic behavior
"""

from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from datetime import datetime, timezone
from dataclasses import dataclass
import logging
import json

logger = logging.getLogger(__name__)


@dataclass
class AgentContext:
    """Immutable context passed to agents"""
    agent_id: str
    execution_id: str
    timestamp: datetime
    config: Dict[str, Any]
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            'agent_id': self.agent_id,
            'execution_id': self.execution_id,
            'timestamp': self.timestamp.isoformat(),
            'config': self.config
        }


@dataclass
class AgentResult:
    """Standardized agent execution result"""
    success: bool
    data: Optional[Dict[str, Any]]
    error: Optional[str]
    execution_time_ms: float
    logs: list[str]
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            'success': self.success,
            'data': self.data,
            'error': self.error,
            'execution_time_ms': self.execution_time_ms,
            'logs': self.logs
        }


class Agent(ABC):
    """
    Base class for all agents. Enforces:
    - Explicit interface
    - No implicit shared state
    - Deterministic execution
    - Observability
    """
    
    def __init__(self, agent_id: str, config: Dict[str, Any]):
        self.agent_id = agent_id
        self.config = config
        self._execution_count = 0
        
    @abstractmethod
    def execute(self, context: AgentContext, inputs: Dict[str, Any]) -> AgentResult:
        """
        Execute agent logic. Must be deterministic given same inputs.
        
        Args:
            context: Immutable execution context
            inputs: Input data for this execution
            
        Returns:
            AgentResult with outcome
        """
        pass
    
    @abstractmethod
    def validate_inputs(self, inputs: Dict[str, Any]) -> tuple[bool, Optional[str]]:
        """
        Validate inputs before execution.
        
        Returns:
            (is_valid, error_message)
        """
        pass
    
    def safe_execute(self, context: AgentContext, inputs: Dict[str, Any]) -> AgentResult:
        """
        Wrapper that adds logging, validation, and error handling.
        This method should be called instead of execute() directly.
        """
        start_time = datetime.now(timezone.utc)
        logs = []
        
        # Log execution start
        log_msg = f"[{self.agent_id}] Execution started: {context.execution_id}"
        logger.info(log_msg)
        logs.append(log_msg)
        
        try:
            # Validate inputs
            is_valid, error = self.validate_inputs(inputs)
            if not is_valid:
                logger.error(f"[{self.agent_id}] Input validation failed: {error}")
                return AgentResult(
                    success=False,
                    data=None,
                    error=f"Input validation failed: {error}",
                    execution_time_ms=0,
                    logs=logs
                )
            
            # Execute
            result = self.execute(context, inputs)
            
            # Calculate execution time
            end_time = datetime.now(timezone.utc)
            execution_time_ms = (end_time - start_time).total_seconds() * 1000
            result.execution_time_ms = execution_time_ms
            
            # Increment counter
            self._execution_count += 1
            
            # Log success
            log_msg = f"[{self.agent_id}] Execution completed in {execution_time_ms:.2f}ms"
            logger.info(log_msg)
            logs.extend(result.logs)
            logs.append(log_msg)
            result.logs = logs
            
            return result
            
        except Exception as e:
            # Log error
            log_msg = f"[{self.agent_id}] Execution failed: {str(e)}"
            logger.error(log_msg, exc_info=True)
            logs.append(log_msg)
            
            return AgentResult(
                success=False,
                data=None,
                error=str(e),
                execution_time_ms=(datetime.now(timezone.utc) - start_time).total_seconds() * 1000,
                logs=logs
            )
    
    def get_metadata(self) -> Dict[str, Any]:
        """Get agent metadata for observability"""
        return {
            'agent_id': self.agent_id,
            'agent_type': self.__class__.__name__,
            'execution_count': self._execution_count,
            'config': self.config
        }


class AgentRegistry:
    """
    Centralized agent registry with lifecycle management.
    Prevents free-floating agent execution.
    """
    
    def __init__(self):
        self._agents: Dict[str, Agent] = {}
        self._execution_history: list[Dict[str, Any]] = []
        
    def register(self, agent: Agent) -> None:
        """Register an agent for orchestrated execution"""
        if agent.agent_id in self._agents:
            raise ValueError(f"Agent {agent.agent_id} already registered")
        
        self._agents[agent.agent_id] = agent
        logger.info(f"Agent registered: {agent.agent_id}")
    
    def unregister(self, agent_id: str) -> None:
        """Unregister an agent"""
        if agent_id in self._agents:
            del self._agents[agent_id]
            logger.info(f"Agent unregistered: {agent_id}")
    
    def get_agent(self, agent_id: str) -> Optional[Agent]:
        """Get registered agent by ID"""
        return self._agents.get(agent_id)
    
    def list_agents(self) -> list[str]:
        """List all registered agent IDs"""
        return list(self._agents.keys())
    
    def execute_agent(
        self,
        agent_id: str,
        inputs: Dict[str, Any],
        execution_id: Optional[str] = None
    ) -> AgentResult:
        """
        Execute a registered agent with full observability.
        This is the ONLY way agents should be executed.
        """
        agent = self.get_agent(agent_id)
        if not agent:
            return AgentResult(
                success=False,
                data=None,
                error=f"Agent {agent_id} not registered",
                execution_time_ms=0,
                logs=[]
            )
        
        # Create execution context
        context = AgentContext(
            agent_id=agent_id,
            execution_id=execution_id or f"{agent_id}_{datetime.now(timezone.utc).timestamp()}",
            timestamp=datetime.now(timezone.utc),
            config=agent.config
        )
        
        # Execute
        result = agent.safe_execute(context, inputs)
        
        # Record execution
        self._execution_history.append({
            'context': context.to_dict(),
            'result': result.to_dict(),
            'timestamp': datetime.now(timezone.utc).isoformat()
        })
        
        return result
    
    def get_execution_history(self, limit: int = 100) -> list[Dict[str, Any]]:
        """Get recent execution history for observability"""
        return self._execution_history[-limit:]


# Global registry instance
registry = AgentRegistry()
