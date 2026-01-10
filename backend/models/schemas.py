"""
Pydantic Models for Request/Response Validation
Type safety and automatic validation
"""

from pydantic import BaseModel, Field, validator
from typing import Optional, Dict, Any, List
from datetime import datetime


class PaymentRequest(BaseModel):
    """Payment processing request"""
    amount: float = Field(..., gt=0, description="Payment amount (must be positive)")
    currency: str = Field(default="USD", description="Currency code")
    metadata: Optional[Dict[str, Any]] = None
    
    @validator('currency')
    def validate_currency(cls, v):
        allowed = ['USD', 'EUR', 'GBP']
        if v not in allowed:
            raise ValueError(f"Currency must be one of {allowed}")
        return v


class PaymentResponse(BaseModel):
    """Payment processing response"""
    success: bool
    payment_id: Optional[str]
    amount: float
    currency: str
    status: str
    error: Optional[str] = None


class TokenizationResponse(BaseModel):
    """Tokenization service response"""
    total_credits: int
    temporal_dna: str
    timestamp: str


class HealthCheckResponse(BaseModel):
    """Health check response"""
    status: str
    timestamp: str
    version: str


class AgentExecutionRequest(BaseModel):
    """Request to execute an agent"""
    agent_id: str
    inputs: Dict[str, Any]
    execution_id: Optional[str] = None


class AgentExecutionResponse(BaseModel):
    """Agent execution result"""
    success: bool
    agent_id: str
    execution_id: str
    data: Optional[Dict[str, Any]]
    error: Optional[str]
    execution_time_ms: float
    logs: List[str]


class ErrorResponse(BaseModel):
    """Standard error response"""
    error: str
    detail: Optional[str]
    timestamp: str
