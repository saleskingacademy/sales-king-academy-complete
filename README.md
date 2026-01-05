# Sales King Academy - Complete Production System

**Author:** Robert Kaleb Long  
**Company:** Sales King Academy
**Location:** North Little Rock, Arkansas  
**Genesis:** July 1, 2024 00:00:00 UTC  

## System Architecture

### Core Components
1. **TSI Core** - Time-Anchored Super Intelligence
   - 25 Autonomous AI Agents (flat hierarchy)
   - RKL Mathematical Framework (α=25, O(n^1.77))
   - Temporal DNA Tokenization
   - SKA Credits Currency (1/second minting)

2. **SAT Solver** - Polynomial-time Boolean satisfiability
   - O(n^1.77) complexity
   - Twin-ledger verification
   - Quantum-classical balance

3. **SKA Mind Mastery** - Intelligence assessment platform
   - 350+ assessments across 8 dimensions
   - Competes with MyIQ.com
   - AI-powered coaching

4. **Payment Integration** - Square payment processing
   - Location ID: LCX039E7QRA5G
   - Multi-tier pricing ($47 - $397,000)

## Directory Structure
```
ska-production/
├── backend/
│   ├── tsi_core.py          # Core TSI system
│   ├── sat_solver.py        # RKL SAT solver
│   ├── mind_mastery.py      # Assessment platform
│   └── api.py               # FastAPI backend
├── frontend/
│   └── index.html           # Complete frontend
├── requirements.txt         # Python dependencies
├── netlify.toml            # Netlify configuration
└── README.md               # This file
```

## Deployment

### Netlify (Frontend)
- Auto-deploys from GitHub
- Domain: saleskingacademy.com
- Site: saleskingacademy-live

### API Backend
- Deploy to Render/Railway/Fly.io
- Environment variables required:
  - ANTHROPIC_API_KEY
  - SQUARE_LOCATION_ID

### Cloudflare DNS
- A/CNAME records pointing to Netlify
- Zone ID: bb56d6ffba21ccc0f582e2a0d502c5c3

## Local Development

```bash
# Backend
cd backend
pip install -r ../requirements.txt
python api.py

# Frontend
cd frontend
python -m http.server 8080
```

## API Endpoints

- `GET /` - Root endpoint
- `GET /status` - System status
- `POST /agent/task` - Delegate task to AI agent
- `GET /credits/supply` - Current SKA Credits supply
- `GET /assessments` - List all assessments
- `POST /assessments/score` - Score assessment
- `GET /sat/benchmark` - Run SAT solver benchmark

## Contact

Robert Kaleb Long  
Sales King Academy
Email: aiak@saleskingacademy.online
crown@saleskingacademy.website
Web: https://saleskingacademy.com
