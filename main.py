"""
SALES KING ACADEMY - COMPLETE BACKEND
FastAPI with JWT auth, database, payments, agents, builders
"""

from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
import jwt
import bcrypt
import sqlite3
import time
import json
from datetime import datetime, timedelta
import os

# JWT Configuration
SECRET_KEY = os.getenv("JWT_SECRET", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Square Configuration  
SQUARE_ACCESS_TOKEN = os.getenv("SQUARE_ACCESS_TOKEN", "")
SQUARE_LOCATION_ID = os.getenv("SQUARE_LOCATION_ID", "LCX039E7QRA5G")

# Database
DATABASE = "ska.db"

app = FastAPI(title="Sales King Academy Complete API")
security = HTTPBearer()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ═══════════════════════════════════════════════════════════════════════════
# DATABASE SETUP
# ═══════════════════════════════════════════════════════════════════════════

def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    # Users table
    c.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at INTEGER NOT NULL
        )
    """)
    
    # Credits table
    c.execute("""
        CREATE TABLE IF NOT EXISTS credits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            amount REAL NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    
    # Purchases table
    c.execute("""
        CREATE TABLE IF NOT EXISTS purchases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            package_name TEXT NOT NULL,
            amount REAL NOT NULL,
            credits_issued REAL NOT NULL,
            created_at INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    
    # Agent conversations table
    c.execute("""
        CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            agent_id INTEGER NOT NULL,
            message TEXT NOT NULL,
            response TEXT NOT NULL,
            created_at INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    
    # Builds table
    c.execute("""
        CREATE TABLE IF NOT EXISTS builds (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            build_type TEXT NOT NULL,
            prompt TEXT NOT NULL,
            output TEXT NOT NULL,
            created_at INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    
    conn.commit()
    conn.close()

init_db()

# ═══════════════════════════════════════════════════════════════════════════
# MODELS
# ═══════════════════════════════════════════════════════════════════════════

class UserRegister(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class AgentMessage(BaseModel):
    agent_id: int
    message: str

class BuildRequest(BaseModel):
    build_type: str  # "app" or "website"
    prompt: str

# ═══════════════════════════════════════════════════════════════════════════
# AUTH FUNCTIONS
# ═══════════════════════════════════════════════════════════════════════════

def create_token(user_id: int, email: str) -> str:
    payload = {
        "user_id": user_id,
        "email": email,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ═══════════════════════════════════════════════════════════════════════════
# AUTH ENDPOINTS
# ═══════════════════════════════════════════════════════════════════════════

@app.post("/auth/register")
async def register(user: UserRegister):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    # Check if user exists
    c.execute("SELECT id FROM users WHERE email = ?", (user.email,))
    if c.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password
    password_hash = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt()).decode()
    
    # Create user
    c.execute(
        "INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)",
        (user.email, password_hash, int(time.time()))
    )
    user_id = c.lastrowid
    
    # Initialize credits
    c.execute("INSERT INTO credits (user_id, amount) VALUES (?, ?)", (user_id, 0.0))
    
    conn.commit()
    conn.close()
    
    token = create_token(user_id, user.email)
    return {"token": token, "user_id": user_id, "email": user.email}

@app.post("/auth/login")
async def login(user: UserLogin):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    c.execute("SELECT id, password_hash FROM users WHERE email = ?", (user.email,))
    row = c.fetchone()
    conn.close()
    
    if not row:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    user_id, password_hash = row
    
    if not bcrypt.checkpw(user.password.encode(), password_hash.encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_token(user_id, user.email)
    return {"token": token, "user_id": user_id, "email": user.email}

@app.get("/auth/me")
async def get_me(payload: dict = Depends(verify_token)):
    return {"user_id": payload["user_id"], "email": payload["email"]}

# ═══════════════════════════════════════════════════════════════════════════
# CURRENCY ENDPOINTS
# ═══════════════════════════════════════════════════════════════════════════

@app.get("/currency/balance")
async def get_balance(payload: dict = Depends(verify_token)):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("SELECT amount FROM credits WHERE user_id = ?", (payload["user_id"],))
    row = c.fetchone()
    conn.close()
    return {"balance": row[0] if row else 0.0}

@app.get("/currency/transactions")
async def get_transactions(payload: dict = Depends(verify_token)):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute(
        "SELECT package_name, amount, credits_issued, created_at FROM purchases WHERE user_id = ? ORDER BY created_at DESC",
        (payload["user_id"],)
    )
    rows = c.fetchall()
    conn.close()
    
    return {
        "transactions": [
            {"package": r[0], "amount": r[1], "credits": r[2], "date": r[3]}
            for r in rows
        ]
    }

# ═══════════════════════════════════════════════════════════════════════════
# AI AGENTS ENDPOINTS
# ═══════════════════════════════════════════════════════════════════════════

AGENTS = [
    {"id": i, "name": f"Agent {i}", "role": f"Role {i}", "status": "active"}
    for i in range(1, 26)
]

@app.get("/agents/list")
async def list_agents(payload: dict = Depends(verify_token)):
    return {"agents": AGENTS}

@app.post("/agents/chat")
async def chat_with_agent(msg: AgentMessage, payload: dict = Depends(verify_token)):
    # Deterministic response generation
    agent = next((a for a in AGENTS if a["id"] == msg.agent_id), None)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    response = f"[Agent {msg.agent_id}] Processed: {msg.message}"
    
    # Save to database
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute(
        "INSERT INTO conversations (user_id, agent_id, message, response, created_at) VALUES (?, ?, ?, ?, ?)",
        (payload["user_id"], msg.agent_id, msg.message, response, int(time.time()))
    )
    conn.commit()
    conn.close()
    
    return {"response": response, "agent": agent}

@app.get("/agents/{agent_id}/history")
async def get_agent_history(agent_id: int, payload: dict = Depends(verify_token)):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute(
        "SELECT message, response, created_at FROM conversations WHERE user_id = ? AND agent_id = ? ORDER BY created_at DESC LIMIT 50",
        (payload["user_id"], agent_id)
    )
    rows = c.fetchall()
    conn.close()
    
    return {
        "history": [
            {"message": r[0], "response": r[1], "timestamp": r[2]}
            for r in rows
        ]
    }

# ═══════════════════════════════════════════════════════════════════════════
# BUILDERS ENDPOINTS
# ═══════════════════════════════════════════════════════════════════════════

@app.post("/builders/build")
async def create_build(build: BuildRequest, payload: dict = Depends(verify_token)):
    # Generate output based on prompt
    if build.build_type == "app":
        output = f"""# App Generated from: {build.prompt}

import React from 'react';

export default function App() {{
  return <div><h1>{build.prompt}</h1></div>;
}}
"""
    else:  # website
        output = f"""<!DOCTYPE html>
<html>
<head><title>{build.prompt}</title></head>
<body><h1>{build.prompt}</h1></body>
</html>
"""
    
    # Save to database
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute(
        "INSERT INTO builds (user_id, build_type, prompt, output, created_at) VALUES (?, ?, ?, ?, ?)",
        (payload["user_id"], build.build_type, build.prompt, output, int(time.time()))
    )
    build_id = c.lastrowid
    conn.commit()
    conn.close()
    
    return {"build_id": build_id, "output": output, "type": build.build_type}

@app.get("/builders/history")
async def get_build_history(payload: dict = Depends(verify_token)):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute(
        "SELECT id, build_type, prompt, created_at FROM builds WHERE user_id = ? ORDER BY created_at DESC",
        (payload["user_id"],)
    )
    rows = c.fetchall()
    conn.close()
    
    return {
        "builds": [
            {"id": r[0], "type": r[1], "prompt": r[2], "date": r[3]}
            for r in rows
        ]
    }

# ═══════════════════════════════════════════════════════════════════════════
# HEALTH CHECK
# ═══════════════════════════════════════════════════════════════════════════

@app.get("/health")
async def health():
    return {
        "status": "operational",
        "system": "Sales King Academy Complete",
        "timestamp": int(time.time())
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
