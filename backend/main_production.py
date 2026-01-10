"""
Production-Grade FastAPI Application
Clean separation of concerns, proper error handling, observability
"""

from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from datetime import datetime, timezone
from typing import Optional
import logging
import sys

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s [%(name)s] %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

# Import our refactored components
from .config.settings import get_settings
from .services.tokenization_service import TokenizationService
from .services.payment_service import PaymentService
from .security.auth import auth_service, Role
from .models.schemas import (
    PaymentRequest, PaymentResponse,
    TokenizationResponse, HealthCheckResponse,
    AgentExecutionRequest, AgentExecutionResponse,
    ErrorResponse
)
from .core.agent_interface import registry
from .core.agents_refactored import TokenizationAgent, PaymentProcessingAgent, RKLComputationAgent

# Initialize app
app = FastAPI(
    title="Sales King Academy",
    version="2.0.0",
    description="Production-grade business automation platform"
)

# Load settings
settings = get_settings()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
tokenization_service = TokenizationService()
payment_service = PaymentService(
    square_token=settings.square_access_token,
    location_id=settings.square_location_id
)


# Dependency: Verify auth token
async def verify_token(authorization: Optional[str] = Header(None)) -> dict:
    """Verify authorization token (optional for now)"""
    if not authorization:
        return {'role': 'external'}  # Allow unauthenticated access for now
    
    token = authorization.replace('Bearer ', '')
    user_info = auth_service.validate_token(token)
    
    if not user_info:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    return user_info


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            error="Internal server error",
            detail=str(exc),
            timestamp=datetime.now(timezone.utc).isoformat()
        ).dict()
    )


# Startup
@app.on_event("startup")
async def startup():
    logger.info("="*80)
    logger.info("Sales King Academy - Production Backend Starting")
    logger.info("="*80)
    logger.info(f"Port: {settings.port}")
    logger.info(f"Debug: {settings.debug}")
    
    # Register agents
    tokenization_agent = TokenizationAgent("tokenization", {})
    payment_agent = PaymentProcessingAgent("payment", {})
    rkl_agent = RKLComputationAgent("rkl", {'alpha': 25})
    
    registry.register(tokenization_agent)
    registry.register(payment_agent)
    registry.register(rkl_agent)
    
    logger.info(f"Registered {len(registry.list_agents())} agents")
    logger.info("="*80)


# Routes
@app.get("/", response_model=HealthCheckResponse)
async def root():
    """Root health check"""
    return HealthCheckResponse(
        status="operational",
        timestamp=datetime.now(timezone.utc).isoformat(),
        version="2.0.0"
    )


@app.get("/health", response_model=HealthCheckResponse)
async def health():
    """Health check endpoint"""
    return HealthCheckResponse(
        status="healthy",
        timestamp=datetime.now(timezone.utc).isoformat(),
        version="2.0.0"
    )


@app.get("/api/status")
async def status(user: dict = Depends(verify_token)):
    """Comprehensive system status"""
    ska_credits = tokenization_service.get_ska_credits()
    temporal_dna = tokenization_service.get_temporal_dna()
    
    return {
        "status": "operational",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "ska_credits": ska_credits['total_credits'],
        "temporal_dna": temporal_dna['current_block'],
        "agents": {
            "registered": len(registry.list_agents()),
            "list": registry.list_agents()
        },
        "services": {
            "tokenization": "active",
            "payment": "active",
            "agents": "active"
        }
    }


@app.get("/api/tokenization/ska_credits")
async def get_ska_credits():
    """Get SKA Credits status"""
    return tokenization_service.get_ska_credits()


@app.get("/api/tokenization/temporal_dna")
async def get_temporal_dna():
    """Get Temporal DNA token"""
    return tokenization_service.get_temporal_dna()


@app.post("/api/payment/process", response_model=PaymentResponse)
async def process_payment(
    request: PaymentRequest,
    user: dict = Depends(verify_token)
):
    """Process a payment"""
    result = payment_service.process_payment(
        amount=request.amount,
        currency=request.currency
    )
    
    return PaymentResponse(**result)


@app.post("/api/agents/execute", response_model=AgentExecutionResponse)
async def execute_agent(
    request: AgentExecutionRequest,
    user: dict = Depends(verify_token)
):
    """Execute a registered agent"""
    result = registry.execute_agent(
        agent_id=request.agent_id,
        inputs=request.inputs,
        execution_id=request.execution_id
    )
    
    return AgentExecutionResponse(
        success=result.success,
        agent_id=request.agent_id,
        execution_id=request.execution_id or "",
        data=result.data,
        error=result.error,
        execution_time_ms=result.execution_time_ms,
        logs=result.logs
    )


@app.get("/api/agents")
async def list_agents():
    """List all registered agents"""
    return {
        "agents": registry.list_agents(),
        "count": len(registry.list_agents())
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.host, port=settings.port)
