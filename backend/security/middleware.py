"""
Security Middleware
Handles all security concerns as middleware
"""

import logging
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger(__name__)

class SecurityMiddleware(BaseHTTPMiddleware):
    """FastAPI security middleware"""
    
    async def dispatch(self, request: Request, call_next):
        # Log all requests
        logger.info(f"Request: {request.method} {request.url.path}")
        
        # Process request
        response = await call_next(request)
        
        # Add security headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        
        return response

def setup_security_middleware(app):
    """Setup security middleware on FastAPI app"""
    app.add_middleware(SecurityMiddleware)
    logger.info("Security middleware enabled")
