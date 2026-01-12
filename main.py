"""
SALES KING ACADEMY - WORKING VERSION
"""
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import jwt
import bcrypt
import sqlite3
import time
import os
from datetime import datetime, timedelta

SECRET_KEY = os.getenv("JWT_SECRET", "ska-secret")
ALGORITHM = "HS256"
DATABASE = "ska.db"

app = FastAPI(title="Sales King Academy")
security = HTTPBearer()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password_hash TEXT, created_at INTEGER)")
    c.execute("CREATE TABLE IF NOT EXISTS credits (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL DEFAULT 0)")
    c.execute("CREATE TABLE IF NOT EXISTS conversations (id INTEGER PRIMARY KEY, user_id INTEGER, agent_id INTEGER, message TEXT, response TEXT, created_at INTEGER)")
    c.execute("CREATE TABLE IF NOT EXISTS ai_modules (id INTEGER PRIMARY KEY, name TEXT, status TEXT)")
    c.execute("SELECT COUNT(*) FROM ai_modules")
    if c.fetchone()[0] == 0:
        for i in range(1, 26):
            c.execute("INSERT INTO ai_modules VALUES (?, ?, ?)", (i, f"Agent {i}", "active"))
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
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Sales King Academy</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white">
<div id="app"></div>
<script>
const API='';let TOKEN=localStorage.getItem('ska_token');
async function call(e,o={}){const h={'Content-Type':'application/json'};TOKEN&&(h.Authorization='Bearer '+TOKEN);const r=await fetch(API+e,{...o,headers:h});if(!r.ok)throw new Error(await r.text());return r.json()}
async function login(e,p){const d=await call('/auth/login',{method:'POST',body:JSON.stringify({email:e,password:p})});TOKEN=d.token;localStorage.setItem('ska_token',TOKEN);return d}
async function register(e,p){const d=await call('/auth/register',{method:'POST',body:JSON.stringify({email:e,password:p})});TOKEN=d.token;localStorage.setItem('ska_token',TOKEN);return d}
function LoginPage(){return`<div class="min-h-screen flex items-center justify-center p-4"><div class="max-w-md w-full bg-gray-800 p-8 rounded-xl border border-gray-700"><div class="text-center mb-8"><h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Sales King Academy</h1><p class="text-gray-400 text-sm">Complete Business Automation</p><p class="text-xs text-gray-500 mt-2">25 AI Agents • Full Control</p></div><input type="email" id="email" placeholder="Email" class="w-full p-4 mb-4 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500"><input type="password" id="password" placeholder="Password" class="w-full p-4 mb-6 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500"><button onclick="doLogin()" class="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-bold mb-3">Login</button><button onclick="doRegister()" class="w-full p-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg font-bold">Register</button><div id="error" class="mt-4 text-red-400 text-center text-sm"></div></div></div>`}
function Dashboard(){return`<div class="min-h-screen p-6"><div class="max-w-7xl mx-auto"><div class="flex justify-between items-center mb-8"><div><h1 class="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Sales King Academy</h1><p class="text-gray-400 mt-2">Complete Business Automation Platform</p></div><div class="flex gap-4"><div class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl"><div class="text-sm text-gray-200">Credits</div><div id="balance" class="text-3xl font-bold">0</div></div><button onclick="logout()" class="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold">Logout</button></div></div><div class="grid grid-cols-4 gap-4 mb-8"><button onclick="showAgents()" class="p-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl font-bold text-xl shadow-xl">🤖 AI Agents<br><span class="text-sm font-normal mt-1 block">25 Active</span></button><button class="p-8 bg-gradient-to-br from-green-600 to-green-800 rounded-xl font-bold text-xl shadow-xl">💰 Revenue<br><span class="text-sm font-normal mt-1 block">Automation</span></button><button class="p-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl font-bold text-xl shadow-xl">📊 Analytics<br><span class="text-sm font-normal mt-1 block">Live</span></button><button class="p-8 bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl font-bold text-xl shadow-xl">🔒 Security<br><span class="text-sm font-normal mt-1 block">RBAC</span></button></div><div id="content" class="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-2xl min-h-[500px]"></div></div></div>`}
function AgentsView(){return`<h2 class="text-4xl font-bold mb-6 flex items-center gap-3">🤖 25 AI Agents<span class="text-sm font-normal text-green-400 bg-green-900/30 px-4 py-2 rounded-full">All Active</span></h2><div class="grid grid-cols-5 gap-4">${Array.from({length:25},(_,i)=>i+1).map(id=>`<div onclick="openChat(${id})" class="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 p-6 rounded-xl cursor-pointer text-center transition transform hover:scale-110 border border-gray-600"><div class="text-5xl mb-3">🤖</div><div class="font-bold text-lg">Agent ${id}</div><div class="text-xs text-green-400 mt-2 flex items-center justify-center gap-1"><span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>Online</div></div>`).join('')}</div>`}
function ChatView(id){return`<div class="flex flex-col h-[600px]"><div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-700"><div><h2 class="text-3xl font-bold flex items-center gap-2">🤖 Agent ${id}<span class="text-sm font-normal text-green-400 bg-green-900/30 px-3 py-1 rounded-full">Active</span></h2></div><button onclick="showAgents()" class="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg">← Back</button></div><div id="messages" class="flex-1 bg-gray-900 rounded-xl p-6 overflow-y-auto mb-4 border border-gray-700"></div><div class="flex gap-3"><input type="text" id="msg" placeholder="Message Agent ${id}..." class="flex-1 p-4 bg-gray-700 rounded-xl border border-gray-600 focus:border-blue-500 text-lg" onkeypress="if(event.key==='Enter')send(${id})"><button onclick="send(${id})" class="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-bold text-lg shadow-lg">Send</button></div></div>`}
window.doLogin=async()=>{try{await login(document.getElementById('email').value,document.getElementById('password').value);render()}catch(e){document.getElementById('error').textContent=e.message}};
window.doRegister=async()=>{try{await register(document.getElementById('email').value,document.getElementById('password').value);render()}catch(e){document.getElementById('error').textContent=e.message}};
window.logout=()=>{localStorage.removeItem('ska_token');TOKEN=null;render()};
window.showAgents=()=>{document.getElementById('content').innerHTML=AgentsView()};
window.openChat=id=>{document.getElementById('content').innerHTML=ChatView(id)};
window.send=async id=>{const input=document.getElementById('msg');const msg=input.value.trim();if(!msg)return;const msgs=document.getElementById('messages');msgs.innerHTML+=`<div class="mb-4 bg-blue-900/30 p-4 rounded-lg"><b class="text-blue-400">You:</b> ${msg}</div>`;input.value='';try{const data=await call('/agents/chat',{method:'POST',body:JSON.stringify({agent_id:id,message:msg})});msgs.innerHTML+=`<div class="mb-4 bg-gray-700 p-4 rounded-lg"><b class="text-green-400">Agent ${id}:</b> ${data.response}</div>`;msgs.scrollTop=msgs.scrollHeight}catch(e){msgs.innerHTML+=`<div class="mb-4 bg-red-900/30 p-4 rounded-lg text-red-400">Error: ${e.message}</div>`}};
async function render(){const app=document.getElementById('app');if(!TOKEN){app.innerHTML=LoginPage()}else{app.innerHTML=Dashboard();try{const balance=await call('/currency/balance');document.getElementById('balance').textContent=balance.balance.toLocaleString()}catch(e){}showAgents()}}
render()
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
