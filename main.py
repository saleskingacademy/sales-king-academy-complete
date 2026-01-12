"""
SALES KING ACADEMY - WORKING VERSION
"""

from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import jwt
import bcrypt
import sqlite3
import time
import os
from datetime import datetime, timedelta

SECRET_KEY = os.getenv("JWT_SECRET", "ska-secret-2025")
ALGORITHM = "HS256"
DATABASE = "ska.db"

app = FastAPI(title="Sales King Academy")
security = HTTPBearer()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password_hash TEXT, created_at INTEGER)")
    c.execute("CREATE TABLE IF NOT EXISTS credits (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL DEFAULT 0)")
    c.execute("CREATE TABLE IF NOT EXISTS conversations (id INTEGER PRIMARY KEY, user_id INTEGER, agent_id INTEGER, message TEXT, response TEXT, created_at INTEGER)")
    c.execute("CREATE TABLE IF NOT EXISTS ai_modules (id INTEGER PRIMARY KEY, name TEXT, module_type TEXT, status TEXT, last_execution_timestamp INTEGER, performance_metrics TEXT)")
    
    # Init 25 agents
    c.execute("SELECT COUNT(*) FROM ai_modules")
    if c.fetchone()[0] == 0:
        for i in range(1, 26):
            c.execute("INSERT INTO ai_modules (id, name, module_type, status, last_execution_timestamp, performance_metrics) VALUES (?, ?, ?, ?, ?, ?)",
                     (i, f"Agent {i}", f"type_{i}", "active", int(time.time()), "{}"))
    
    conn.commit()
    conn.close()

init_db()

class UserRegister(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class AgentMessage(BaseModel):
    agent_id: int
    message: str

def create_token(user_id: int, email: str):
    payload = {"user_id": user_id, "email": email, "exp": datetime.utcnow() + timedelta(hours=24)}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        return jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/", response_class=HTMLResponse)
async def root():
    return """<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales King Academy</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white">
    <div id="app"></div>
    <script>
        const API = '';
        let TOKEN = localStorage.getItem('ska_token');
        
        async function call(endpoint, options = {}) {
            const headers = {'Content-Type': 'application/json'};
            if (TOKEN) headers['Authorization'] = 'Bearer ' + TOKEN;
            const res = await fetch(API + endpoint, {...options, headers});
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        }
        
        async function login(email, password) {
            const data = await call('/auth/login', {method: 'POST', body: JSON.stringify({email, password})});
            TOKEN = data.token;
            localStorage.setItem('ska_token', TOKEN);
            return data;
        }
        
        async function register(email, password) {
            const data = await call('/auth/register', {method: 'POST', body: JSON.stringify({email, password})});
            TOKEN = data.token;
            localStorage.setItem('ska_token', TOKEN);
            return data;
        }
        
        function LoginPage() {
            return `
                <div class="min-h-screen flex items-center justify-center p-4">
                    <div class="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-2xl">
                        <h1 class="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Sales King Academy</h1>
                        <p class="text-center text-gray-400 mb-8">25 AI Agents • Complete Automation</p>
                        <input type="email" id="email" placeholder="Email" class="w-full p-4 mb-4 bg-gray-700 rounded-lg">
                        <input type="password" id="password" placeholder="Password" class="w-full p-4 mb-4 bg-gray-700 rounded-lg">
                        <button onclick="doLogin()" class="w-full p-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold mb-2">Login</button>
                        <button onclick="doRegister()" class="w-full p-4 bg-green-600 hover:bg-green-700 rounded-lg font-bold">Register</button>
                        <div id="error" class="mt-4 text-red-400 text-center"></div>
                    </div>
                </div>
            `;
        }
        
        function Dashboard() {
            return `
                <div class="min-h-screen p-6">
                    <div class="max-w-7xl mx-auto">
                        <div class="flex justify-between items-center mb-8">
                            <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Sales King Academy</h1>
                            <div class="flex gap-4">
                                <div class="bg-gray-800 px-6 py-3 rounded-lg">
                                    <div class="text-sm text-gray-400">Credits</div>
                                    <div id="balance" class="text-2xl font-bold">0</div>
                                </div>
                                <button onclick="logout()" class="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold">Logout</button>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-3 gap-6 mb-8">
                            <button onclick="showAgents()" class="p-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl font-bold text-2xl">🤖 AI Agents</button>
                            <button class="p-8 bg-gradient-to-br from-green-600 to-green-800 rounded-xl font-bold text-2xl">💳 Payments</button>
                            <button class="p-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl font-bold text-2xl">⚙️ Workflows</button>
                        </div>
                        
                        <div id="content" class="bg-gray-800 rounded-xl p-8"></div>
                    </div>
                </div>
            `;
        }
        
        function AgentsView() {
            return `
                <h2 class="text-4xl font-bold mb-6">🤖 25 AI Agents</h2>
                <div class="grid grid-cols-5 gap-4">
                    ${Array.from({length: 25}, (_, i) => i + 1).map(id => `
                        <div onclick="openChat(${id})" class="bg-gray-700 hover:bg-gray-600 p-6 rounded-xl cursor-pointer text-center">
                            <div class="text-4xl mb-2">🤖</div>
                            <div class="font-bold">Agent ${id}</div>
                            <div class="text-xs text-green-400 mt-2">● Online</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        function ChatView(agentId) {
            return `
                <div class="flex flex-col h-96">
                    <div class="flex justify-between mb-4">
                        <h2 class="text-3xl font-bold">🤖 Agent ${agentId}</h2>
                        <button onclick="showAgents()" class="px-6 py-3 bg-gray-700 rounded-lg">Back</button>
                    </div>
                    <div id="messages" class="flex-1 bg-gray-900 rounded-lg p-4 overflow-y-auto mb-4"></div>
                    <div class="flex gap-2">
                        <input type="text" id="msg" placeholder="Type message..." class="flex-1 p-4 bg-gray-700 rounded-lg" onkeypress="if(event.key==='Enter') send(${agentId})">
                        <button onclick="send(${agentId})" class="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold">Send</button>
                    </div>
                </div>
            `;
        }
        
        window.doLogin = async () => {
            try {
                await login(document.getElementById('email').value, document.getElementById('password').value);
                render();
            } catch(e) {
                document.getElementById('error').textContent = e.message;
            }
        };
        
        window.doRegister = async () => {
            try {
                await register(document.getElementById('email').value, document.getElementById('password').value);
                render();
            } catch(e) {
                document.getElementById('error').textContent = e.message;
            }
        };
        
        window.logout = () => {
            localStorage.removeItem('ska_token');
            TOKEN = null;
            render();
        };
        
        window.showAgents = () => {
            document.getElementById('content').innerHTML = AgentsView();
        };
        
        window.openChat = (id) => {
            document.getElementById('content').innerHTML = ChatView(id);
        };
        
        window.send = async (agentId) => {
            const input = document.getElementById('msg');
            const msg = input.value.trim();
            if (!msg) return;
            
            const msgs = document.getElementById('messages');
            msgs.innerHTML += `<div class="mb-3 bg-blue-900/30 p-3 rounded"><b>You:</b> ${msg}</div>`;
            input.value = '';
            
            try {
                const data = await call('/agents/chat', {method: 'POST', body: JSON.stringify({agent_id: agentId, message: msg})});
                msgs.innerHTML += `<div class="mb-3 bg-gray-700 p-3 rounded"><b>Agent ${agentId}:</b> ${data.response}</div>`;
                msgs.scrollTop = msgs.scrollHeight;
            } catch(e) {
                msgs.innerHTML += `<div class="mb-3 bg-red-900/30 p-3 rounded text-red-400">Error: ${e.message}</div>`;
            }
        };
        
        async function render() {
            const app = document.getElementById('app');
            if (!TOKEN) {
                app.innerHTML = LoginPage();
            } else {
                app.innerHTML = Dashboard();
                try {
                    const balance = await call('/currency/balance');
                    document.getElementById('balance').textContent = balance.balance.toLocaleString();
                } catch(e) {}
                showAgents();
            }
        }
        
        render();
    </script>
</body>
</html>"""

@app.post("/auth/register")
async def register(user: UserRegister):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("SELECT id FROM users WHERE email = ?", (user.email,))
    if c.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Email exists")
    
    password_hash = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt()).decode()
    c.execute("INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)", (user.email, password_hash, int(time.time())))
    user_id = c.lastrowid
    c.execute("INSERT INTO credits (user_id, amount) VALUES (?, ?)", (user_id, 0.0))
    conn.commit()
    conn.close()
    
    return {"token": create_token(user_id, user.email), "user_id": user_id, "email": user.email}

@app.post("/auth/login")
async def login_user(user: UserLogin):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("SELECT id, password_hash FROM users WHERE email = ?", (user.email,))
    row = c.fetchone()
    conn.close()
    
    if not row or not bcrypt.checkpw(user.password.encode(), row[1].encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {"token": create_token(row[0], user.email), "user_id": row[0], "email": user.email}

@app.get("/agents/list")
async def list_agents(payload: dict = Depends(verify_token)):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("SELECT id, name, module_type, status FROM ai_modules")
    agents = [{"id": r[0], "name": r[1], "type": r[2], "status": r[3]} for r in c.fetchall()]
    conn.close()
    return {"agents": agents}

@app.post("/agents/chat")
async def chat(msg: AgentMessage, payload: dict = Depends(verify_token)):
    response = f"[Agent {msg.agent_id}] Processed: {msg.message}"
    
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("INSERT INTO conversations (user_id, agent_id, message, response, created_at) VALUES (?, ?, ?, ?, ?)",
              (payload["user_id"], msg.agent_id, msg.message, response, int(time.time())))
    conn.commit()
    conn.close()
    
    return {"response": response}

@app.get("/currency/balance")
async def get_balance(payload: dict = Depends(verify_token)):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("SELECT amount FROM credits WHERE user_id = ?", (payload["user_id"],))
    row = c.fetchone()
    conn.close()
    return {"balance": row[0] if row else 0.0}

@app.get("/health")
async def health():
    return {"status": "LIVE", "agents": 25}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
