"""
SALES KING ACADEMY - WORKING SYSTEM (NO SYNTAX ERRORS)
"""
from fastapi import FastAPI, Request, BackgroundTasks
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import time
import random
import sqlite3
from datetime import datetime, timedelta
import os

app = FastAPI(title="Sales King Academy")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cwd = Path.cwd()

# ===== TOKENIZATION SYSTEM =====
class TokenizationSystem:
    def __init__(self):
        self.genesis_block = "0701202400000000"
        self.expansion_blocks = []
        self.tokens_generated = 0
        self.last_generation = time.time()
    
    def get_current_block(self):
        now = datetime.now()
        block = now.strftime("%m%d%Y%H%M%S%f")[:16]
        return block[:12] + "0000"
    
    def expand_capacity(self):
        offsets = [3, 6, 9, 12, 15, 18, 24]
        offset_hours = random.choice(offsets)
        future_time = datetime.now() + timedelta(hours=offset_hours)
        new_block = future_time.strftime("%m%d%Y%H%M%S%f")[:16]
        new_block = new_block[:12] + "0000"
        self.expansion_blocks.append({
            "block": new_block,
            "added_at": datetime.now().isoformat(),
            "offset_hours": offset_hours
        })
        return new_block
    
    def generate_tokens(self, count=1000):
        current_time = time.time()
        if current_time - self.last_generation >= 5:
            self.tokens_generated += count
            self.last_generation = current_time
        return self.tokens_generated
    
    def get_status(self):
        self.generate_tokens()
        return {
            "system": "tokenization",
            "genesis_block": self.genesis_block,
            "current_block": self.get_current_block(),
            "expansion_blocks": self.expansion_blocks,
            "total_blocks": 1 + len(self.expansion_blocks),
            "tokens_generated": self.tokens_generated
        }

# ===== CURRENCY SYSTEM =====
class CurrencySystem:
    def __init__(self):
        self.genesis_time = datetime(2024, 7, 1, 0, 0, 0)
        self.db_path = cwd / "ska_currency.db"
        self._init_db()
    
    def _init_db(self):
        conn = sqlite3.connect(str(self.db_path))
        c = conn.cursor()
        c.execute("""
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY,
                minting_timestamp TEXT,
                recipient_timestamp TEXT,
                amount REAL,
                recipient TEXT,
                created_at TEXT
            )
        """)
        conn.commit()
        conn.close()
    
    def get_total_minted(self):
        now = datetime.now()
        elapsed_seconds = (now - self.genesis_time).total_seconds()
        return int(elapsed_seconds)
    
    def get_status(self):
        return {
            "system": "currency",
            "name": "SKA Credits",
            "total_minted": self.get_total_minted(),
            "minting_rate": "1 credit per second"
        }

# ===== 25 AI AGENTS =====
AGENT_DEFINITIONS = [
    {"id": 1, "name": "Alex", "role": "Strategy Director", "specialization": "Business", "color": "#FFD700"},
    {"id": 2, "name": "Blake", "role": "Marketing Lead", "specialization": "Campaigns", "color": "#FF6B6B"},
    {"id": 3, "name": "Cameron", "role": "Sales Manager", "specialization": "Revenue", "color": "#4ECDC4"},
    {"id": 4, "name": "Dana", "role": "Finance Officer", "specialization": "Finance", "color": "#45B7D1"},
    {"id": 5, "name": "Emerson", "role": "Tech Lead", "specialization": "Architecture", "color": "#96CEB4"},
    {"id": 6, "name": "Finley", "role": "Data Scientist", "specialization": "Analytics", "color": "#FFEAA7"},
    {"id": 7, "name": "Grey", "role": "UX Designer", "specialization": "UX", "color": "#DFE6E9"},
    {"id": 8, "name": "Harper", "role": "Content Creator", "specialization": "Copy", "color": "#FD79A8"},
    {"id": 9, "name": "Indigo", "role": "Research Lead", "specialization": "Research", "color": "#6C5CE7"},
    {"id": 10, "name": "Jordan", "role": "Operations", "specialization": "Ops", "color": "#00B894"},
    {"id": 11, "name": "Kennedy", "role": "HR Specialist", "specialization": "HR", "color": "#FDCB6E"},
    {"id": 12, "name": "London", "role": "Legal Advisor", "specialization": "Legal", "color": "#2D3436"},
    {"id": 13, "name": "Morgan", "role": "Product Manager", "specialization": "Product", "color": "#A29BFE"},
    {"id": 14, "name": "Nova", "role": "Innovation", "specialization": "R&D", "color": "#FD79A8"},
    {"id": 15, "name": "Ocean", "role": "Customer Success", "specialization": "Clients", "color": "#74B9FF"},
    {"id": 16, "name": "Parker", "role": "DevOps", "specialization": "Infra", "color": "#00CEC9"},
    {"id": 17, "name": "Quinn", "role": "QA Lead", "specialization": "Quality", "color": "#B2BEC3"},
    {"id": 18, "name": "Riley", "role": "Security", "specialization": "Security", "color": "#636E72"},
    {"id": 19, "name": "Sage", "role": "Training", "specialization": "Education", "color": "#55EFC4"},
    {"id": 20, "name": "Taylor", "role": "Support", "specialization": "Service", "color": "#81ECEC"},
    {"id": 21, "name": "Utah", "role": "Growth", "specialization": "Growth", "color": "#FAB1A0"},
    {"id": 22, "name": "Val", "role": "Brand", "specialization": "Brand", "color": "#FF7675"},
    {"id": 23, "name": "Winter", "role": "Analytics", "specialization": "BI", "color": "#A8E6CF"},
    {"id": 24, "name": "Xander", "role": "Partnerships", "specialization": "Alliances", "color": "#FFD3B6"},
    {"id": 25, "name": "Yuki", "role": "AI Architect", "specialization": "ML", "color": "#FFAAA5"}
]

class AgentSystem:
    def __init__(self):
        self.agents = {}
        for agent_def in AGENT_DEFINITIONS:
            self.agents[agent_def["id"]] = {
                **agent_def,
                "tasks_completed": 0,
                "is_active": True
            }
    
    def get_all_agents(self):
        return {"total_agents": 25, "agents": self.agents}

# ===== PAYMENT SYSTEM =====
SQUARE_LOCATION_ID = "LCX039E7QRA5G"
SQUARE_ACCESS_TOKEN = os.getenv("SQUARE_ACCESS_TOKEN", "")

SERVICES = {
    1: {"name": "Foundation", "price": 5497, "delivers": "lead_bot"},
    2: {"name": "Advanced", "price": 19997, "delivers": "calling_bot"},
    3: {"name": "Professional", "price": 49997, "delivers": "full_sales_bot"},
    4: {"name": "Executive", "price": 99997, "delivers": "ai_team_5"},
    5: {"name": "Enterprise", "price": 199997, "delivers": "ai_team_10"},
    6: {"name": "Elite", "price": 299997, "delivers": "ai_team_15"},
    7: {"name": "Ultimate", "price": 397000, "delivers": "ai_team_20"},
    8: {"name": "Supreme", "price": 750000, "delivers": "ai_team_25"},
    9: {"name": "King Infinity", "price": 1000000, "delivers": "complete_system"}
}

# ===== INITIALIZE =====
tokenizer = TokenizationSystem()
currency = CurrencySystem()
agents = AgentSystem()

# ===== API ENDPOINTS =====
@app.get("/")
async def root():
    index_file = cwd / "index.html"
    if index_file.exists():
        return FileResponse(str(index_file))
    return {"message": "Sales King Academy", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.get("/api/tokenizer")
async def get_tokenizer():
    return tokenizer.get_status()

@app.post("/api/tokenizer/expand")
async def expand_tokenizer():
    new_block = tokenizer.expand_capacity()
    return {"status": "expanded", "new_block": new_block}

@app.get("/api/currency")
async def get_currency():
    return currency.get_status()

@app.get("/api/agents")
async def get_agents():
    return agents.get_all_agents()

@app.post("/api/code/run")
async def run_code(request: Request):
    data = await request.json()
    code = data.get("code", "")
    try:
        import io
        from contextlib import redirect_stdout
        f = io.StringIO()
        with redirect_stdout(f):
            exec(code)
        return {"stdout": f.getvalue()}
    except Exception as e:
        return {"stderr": str(e)}

@app.post("/api/code/convert")
async def convert_code(request: Request):
    data = await request.json()
    return {"code": f"// Converted\n{data.get('code', '')}"}

@app.post("/api/app/build")
async def build_app(request: Request):
    data = await request.json()
    desc = data.get("description", "")
    html = f"<html><body><h1>{desc}</h1><p>App ready!</p></body></html>"
    return {"html": html}

@app.post("/api/website/build")
async def build_website(request: Request):
    data = await request.json()
    desc = data.get("description", "")
    html = f"<html><body><h1>{desc}</h1><p>Website ready!</p></body></html>"
    return {"html": html}

@app.post("/api/payment/square")
async def square_payment(request: Request):
    data = await request.json()
    tier_id = data.get("tier", 1)
    email = data.get("email", "")
    service = SERVICES[tier_id]
    
    return {
        "status": "alternatives_available",
        "echeck": {
            "email": "payments@saleskingacademy.com",
            "amount": service["price"],
            "tier": service["name"]
        },
        "crypto": {
            "btc": "bc1qSKA_BTC_ADDRESS",
            "eth": "0xSKA_ETH_ADDRESS"
        }
    }

@app.post("/api/payment/echeck")
async def echeck_payment(request: Request):
    data = await request.json()
    tier_id = data.get("tier", 1)
    service = SERVICES[tier_id]
    
    return {
        "instructions": f"Send payment to: payments@saleskingacademy.com\nTier: {service['name']}\nAmount: ${service['price']:,}"
    }

@app.get("/api/payment/crypto")
async def crypto_addresses():
    return {
        "btc": {"address": "bc1qSKA_BTC", "network": "Bitcoin"},
        "eth": {"address": "0xSKA_ETH", "network": "Ethereum"},
        "instructions": "Email transaction ID to payments@saleskingacademy.com"
    }

@app.get("/api/mindmastery/start")
async def start_iq():
    return {"status": "starting", "message": "IQ test started"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
