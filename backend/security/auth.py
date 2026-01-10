"""
Authentication and Authorization
Credible scaffold - not production OAuth but better than nothing
"""

from typing import Optional, Dict, Any
from datetime import datetime, timezone
import secrets
import hashlib


class Role:
    """User roles"""
    ADMIN = "admin"
    INTERNAL = "internal"
    EXTERNAL = "external"


class AuthService:
    """
    Simple token-based auth service.
    NOT production OAuth, but a credible scaffold.
    """
    
    def __init__(self):
        # In production, use database
        self._tokens: Dict[str, Dict[str, Any]] = {}
    
    def create_token(self, user_id: str, role: str) -> str:
        """Create an auth token"""
        token = secrets.token_urlsafe(32)
        self._tokens[token] = {
            'user_id': user_id,
            'role': role,
            'created_at': datetime.now(timezone.utc).isoformat()
        }
        return token
    
    def validate_token(self, token: str) -> Optional[Dict[str, Any]]:
        """Validate token and return user info"""
        return self._tokens.get(token)
    
    def revoke_token(self, token: str) -> bool:
        """Revoke a token"""
        if token in self._tokens:
            del self._tokens[token]
            return True
        return False
    
    def check_permission(self, token: str, required_role: str) -> bool:
        """Check if token has required role"""
        user_info = self.validate_token(token)
        if not user_info:
            return False
        
        user_role = user_info.get('role')
        
        # Admin can do everything
        if user_role == Role.ADMIN:
            return True
        
        # Exact role match
        if user_role == required_role:
            return True
        
        return False


# Global auth service
auth_service = AuthService()
