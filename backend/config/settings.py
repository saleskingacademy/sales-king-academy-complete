"""
Configuration Management
Environment variables with validation
"""

import os
from typing import Optional
from dataclasses import dataclass


@dataclass
class Settings:
    """Application settings with validation"""
    
    # API Keys (must be set)
    anthropic_api_key: str
    square_access_token: Optional[str]
    square_location_id: Optional[str]
    
    # Server config
    port: int = 10000
    host: str = "0.0.0.0"
    debug: bool = False
    
    # Security
    allowed_origins: list[str] = None
    
    def __post_init__(self):
        if not self.anthropic_api_key:
            raise ValueError("ANTHROPIC_API_KEY must be set")
        
        if self.allowed_origins is None:
            self.allowed_origins = ["*"]
    
    @classmethod
    def from_env(cls) -> "Settings":
        """Load settings from environment variables"""
        return cls(
            anthropic_api_key=os.getenv("ANTHROPIC_API_KEY", ""),
            square_access_token=os.getenv("SQUARE_ACCESS_TOKEN"),
            square_location_id=os.getenv("SQUARE_LOCATION_ID"),
            port=int(os.getenv("PORT", "10000")),
            host=os.getenv("HOST", "0.0.0.0"),
            debug=os.getenv("DEBUG", "false").lower() == "true"
        )
    
    def validate(self) -> tuple[bool, Optional[str]]:
        """Validate configuration"""
        if not self.anthropic_api_key:
            return False, "ANTHROPIC_API_KEY is required"
        
        if self.port < 1 or self.port > 65535:
            return False, "PORT must be between 1 and 65535"
        
        return True, None


# Global settings instance (lazy loaded)
_settings: Optional[Settings] = None


def get_settings() -> Settings:
    """Get or create settings instance"""
    global _settings
    if _settings is None:
        _settings = Settings.from_env()
        is_valid, error = _settings.validate()
        if not is_valid:
            raise ValueError(f"Invalid configuration: {error}")
    return _settings
