"""
SALES KING ACADEMY - COMPLETE AUTH SYSTEM
User registration, login, session management
"""
import sqlite3
import bcrypt
import jwt
import secrets
from datetime import datetime, timedelta
from typing import Optional, Dict

SECRET_KEY = secrets.token_hex(32)

class AuthSystem:
    def __init__(self, db_path="ska_users.db"):
        self.db_path = db_path
        self.init_database()
    
    def init_database(self):
        """Initialize users and sessions database"""
        conn = sqlite3.connect(self.db_path)
        c = conn.cursor()
        
        # Users table
        c.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                name TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                subscription_tier TEXT DEFAULT 'free',
                ska_credits INTEGER DEFAULT 0,
                is_active BOOLEAN DEFAULT 1
            )
        """)
        
        # Sessions table  
        c.execute("""
            CREATE TABLE IF NOT EXISTS sessions (
                token TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at TIMESTAMP NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        """)
        
        # Purchases table
        c.execute("""
            CREATE TABLE IF NOT EXISTS purchases (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                product_type TEXT NOT NULL,
                product_id TEXT NOT NULL,
                amount_usd REAL NOT NULL,
                payment_method TEXT,
                status TEXT DEFAULT 'completed',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        """)
        
        conn.commit()
        conn.close()
    
    def register(self, email: str, password: str, name: str = "") -> Dict:
        """Register new user"""
        conn = sqlite3.connect(self.db_path)
        c = conn.cursor()
        
        # Check if user exists
        c.execute("SELECT id FROM users WHERE email = ?", (email,))
        if c.fetchone():
            conn.close()
            return {"success": False, "error": "Email already registered"}
        
        # Hash password
        password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        
        # Insert user
        c.execute(
            "INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)",
            (email, password_hash, name)
        )
        user_id = c.lastrowid
        
        conn.commit()
        conn.close()
        
        # Create session
        token = self.create_session(user_id)
        
        return {
            "success": True,
            "user_id": user_id,
            "email": email,
            "token": token
        }
    
    def login(self, email: str, password: str) -> Dict:
        """Login user"""
        conn = sqlite3.connect(self.db_path)
        c = conn.cursor()
        
        c.execute(
            "SELECT id, password_hash, name, subscription_tier FROM users WHERE email = ? AND is_active = 1",
            (email,)
        )
        result = c.fetchone()
        conn.close()
        
        if not result:
            return {"success": False, "error": "Invalid email or password"}
        
        user_id, password_hash, name, tier = result
        
        # Verify password
        if not bcrypt.checkpw(password.encode(), password_hash.encode()):
            return {"success": False, "error": "Invalid email or password"}
        
        # Create session
        token = self.create_session(user_id)
        
        return {
            "success": True,
            "user_id": user_id,
            "email": email,
            "name": name,
            "subscription_tier": tier,
            "token": token
        }
    
    def create_session(self, user_id: int) -> str:
        """Create session token"""
        token = secrets.token_urlsafe(32)
        expires_at = datetime.utcnow() + timedelta(days=30)
        
        conn = sqlite3.connect(self.db_path)
        c = conn.cursor()
        c.execute(
            "INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)",
            (token, user_id, expires_at.isoformat())
        )
        conn.commit()
        conn.close()
        
        return token
    
    def verify_session(self, token: str) -> Optional[int]:
        """Verify session token and return user_id"""
        conn = sqlite3.connect(self.db_path)
        c = conn.cursor()
        c.execute(
            "SELECT user_id FROM sessions WHERE token = ? AND expires_at > ?",
            (token, datetime.utcnow().isoformat())
        )
        result = c.fetchone()
        conn.close()
        
        return result[0] if result else None
    
    def record_purchase(self, user_id: int, product_type: str, product_id: str, amount: float) -> int:
        """Record a purchase"""
        conn = sqlite3.connect(self.db_path)
        c = conn.cursor()
        c.execute(
            "INSERT INTO purchases (user_id, product_type, product_id, amount_usd) VALUES (?, ?, ?, ?)",
            (user_id, product_type, product_id, amount)
        )
        purchase_id = c.lastrowid
        
        # Update user's subscription if applicable
        if product_type == 'subscription':
            c.execute(
                "UPDATE users SET subscription_tier = ? WHERE id = ?",
                (product_id, user_id)
            )
        
        conn.commit()
        conn.close()
        
        return purchase_id
    
    def get_user_purchases(self, user_id: int):
        """Get all purchases for a user"""
        conn = sqlite3.connect(self.db_path)
        c = conn.cursor()
        c.execute(
            "SELECT product_type, product_id, amount_usd, created_at FROM purchases WHERE user_id = ? ORDER BY created_at DESC",
            (user_id,)
        )
        purchases = c.fetchall()
        conn.close()
        
        return [
            {
                "type": p[0],
                "id": p[1],
                "amount": p[2],
                "date": p[3]
            }
            for p in purchases
        ]
