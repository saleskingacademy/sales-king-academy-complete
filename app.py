from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app
app = FastAPI(title="Sales King Academy Backend")

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later you can lock this to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Basic health check
@app.get("/")
def root():
    return {"status": "backend online"}

@app.get("/health")
def health():
    return {"ok": True}

# -----------------------------
# Attach Agent System
# -----------------------------
from agents import router as agents_router
app.include_router(agents_router)
