"""
DEPRECATED - DO NOT EXECUTE DIRECTLY
Logic migrated to /core/main.py per Master Directive Section 2.2
This file exists only for backwards compatibility
"""

import sys
import os

# Redirect to canonical entrypoint
sys.path.insert(0, os.path.dirname(__file__))

from core.main import app

if __name__ == "__main__":
    print("⚠️  WARNING: Executing deprecated entrypoint")
    print("✅ Use: python core/main.py")
    print("="*60)
    from core.main import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
