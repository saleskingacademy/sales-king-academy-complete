# SALES KING ACADEMY - SYSTEM ARCHITECTURE

**Last Updated:** 2026-01-10  
**Status:** Production Hardened  
**Runtime:** Single FastAPI Backend

---

## SYSTEM OVERVIEW

Sales King Academy is a unified business automation platform with:
- **Tokenization Engine** (SKA Credits + Temporal DNA)
- **RKL Mathematical Framework** (α=25, O(n^1.77))
- **Payment Processing** (Square Integration)
- **25 AI Agents** (Anthropic Claude)
- **Security Middleware**

### Core Principle
**ONE RUNTIME. ONE ENTRY POINT. ONE DEPLOYMENT PATH.**

---

## RUNTIME FLOW

### Single Entry Point
```
uvicorn backend.main:app --host 0.0.0.0 --port 10000
```

### Execution Path
```
1. Render executes: uvicorn backend.main:app
2. FastAPI initializes
3. Middleware loads (CORS, Security, Logging)
4. Routes register
5. Startup event fires
6. System reports operational
7. Begins accepting requests
```

### Request Flow
```
Client Request
    ↓
FastAPI Router
    ↓
Security Middleware (validation, rate limiting)
    ↓
Route Handler
    ↓
Business Logic (tokenization, agents, payments)
    ↓
Response (JSON)
```

---

## ARCHITECTURE

### Directory Structure
```
sales-king-academy-complete/
│
├── backend/                    # BACKEND (SINGLE RUNTIME)
│   ├── main.py                # ← AUTHORITATIVE ENTRY POINT
│   ├── core/                  # Business logic
│   │   ├── tokenization.py   # SKA Credits, Temporal DNA
│   │   ├── agents.py          # AI agent orchestration
│   │   └── framework.py       # RKL framework
│   ├── security/              # Security isolation
│   │   ├── middleware.py     # Request validation
│   │   └── rate_limit.py     # Rate limiting
│   ├── api/                   # API layer
│   │   ├── routes.py          # Route definitions
│   │   └── schemas.py         # Pydantic models
│   └── utils/                 # Utilities
│       ├── config.py          # Configuration
│       └── logging.py         # Logging
│
├── frontend/                   # FRONTEND (CLIENT ONLY)
│   ├── index.html             # Homepage
│   ├── agents.html            # AI agents dashboard
│   ├── dashboard.html         # Admin dashboard
│   └── square.html            # Payment interface
│
├── legacy/                     # DEPRECATED (DO NOT EXECUTE)
│   ├── server.py              # OLD: HTTP server entry
│   ├── main.py                # OLD: Flask entry
│   ├── complete_backend.py   # OLD: Redundant backend
│   └── [other old files]      # MARKED FOR DEPRECATION
│
├── render.yaml                 # AUTHORITATIVE DEPLOYMENT
├── requirements.txt            # AUTHORITATIVE DEPENDENCIES
└── ARCHITECTURE.md            # THIS FILE
```

---

## TOKENIZATION SYSTEM

### SKA Credits
- **Genesis:** July 1, 2024 00:00:00 UTC
- **Rate:** 1 credit per second
- **Current:** ~47,000,000 credits
- **Function:** `get_ska_credits()` in `backend/main.py`

### Temporal DNA
- **Format:** MMDDYYYYHHMMSSMS (microsecond precision)
- **Purpose:** Unique timestamp-based tokens
- **Function:** `get_temporal_dna_token()` in `backend/main.py`

### RKL Framework
- **Alpha:** α=25
- **Complexity:** O(n^1.77)
- **Purpose:** Constraint satisfaction optimization
- **Files:** `rklcore.py`, `ska_rkl_framework.py` (legacy, to be integrated)

---

## AGENT SYSTEM

### Current State
- **Count:** 25 AI agents
- **Provider:** Anthropic Claude
- **Status:** NOT YET HARDENED (Phase 4 pending)

### Required Hardening (Phase 4)
- [ ] Implement agent registry
- [ ] Require explicit registration before execution
- [ ] Implement time-bounded execution
- [ ] Remove auto-running agents
- [ ] Remove arbitrary system command execution

### Agent Lifecycle (Target)
```
1. Registration → Agent registered in registry
2. Invocation → Explicit call with parameters
3. Execution → Time-bounded, monitored
4. Completion → Results logged, cleanup
```

---

## SECURITY BOUNDARIES

### Middleware-Based Security
All security is handled at the middleware level:

```python
Request
    ↓
CORSMiddleware (CORS headers)
    ↓
RateLimitMiddleware (rate limiting) [TO BE IMPLEMENTED]
    ↓
ValidationMiddleware (request validation) [TO BE IMPLEMENTED]
    ↓
LoggingMiddleware (request/response logs) [TO BE IMPLEMENTED]
    ↓
Business Logic (NO SECURITY CONCERNS)
```

### Security Isolation Rules
- **Business logic MUST NOT handle authentication**
- **Business logic MUST NOT validate requests**
- **Business logic MUST NOT enforce rate limits**
- **All security is middleware-based**

---

## DEPLOYMENT

### Authoritative Deployment Config
**File:** `render.yaml`

### Deployment Command
```bash
# Build
pip install -r requirements.txt

# Run
uvicorn backend.main:app --host 0.0.0.0 --port $PORT
```

### Environment Variables
```
ANTHROPIC_API_KEY    - Claude AI API key
SQUARE_ACCESS_TOKEN  - Square payment token
SQUARE_LOCATION_ID   - Square location ID
PORT                 - Server port (default 10000)
```

### Deployment Platform
- **Backend:** Render (web service)
- **Frontend:** Static files served via Render
- **DNS:** Cloudflare (saleskingacademy.com)

---

## API ENDPOINTS

### System
- `GET /` - API info
- `GET /api/status` - System status
- `GET /docs` - Interactive API documentation (FastAPI auto-generated)

### Tokenization
- `GET /api/tokenization/ska-credits` - Get current SKA Credits
- `GET /api/tokenization/temporal-dna` - Generate Temporal DNA token

### Business
- `POST /api/contact` - Contact form submission
- `POST /api/payment` - Payment processing [TO BE IMPLEMENTED]
- `POST /api/agent/{id}` - Agent invocation [TO BE IMPLEMENTED]

---

## DEPRECATED FILES

### Entry Points (NO LONGER EXECUTABLE)
These files previously served as entry points but are NOW DEPRECATED:

```
❌ server.py                        - OLD: HTTP server
❌ main.py                          - OLD: Flask entry
❌ app.py                           - OLD: Application entry
❌ complete_backend.py              - OLD: Redundant backend
❌ ska_backend_complete.py          - OLD: Redundant backend
❌ SALES_KING_ACADEMY_COMPLETE.py   - OLD: Monolithic system
❌ SKA_COMPLETE_ALL_SYSTEMS.py      - OLD: All-in-one system
```

**Action:** These files have been marked as LEGACY and their `if __name__ == "__main__"` blocks removed.

**Preservation:** Logic has been extracted and migrated to `backend/` structure where appropriate.

---

## CONSOLIDATION RULES

### Enforced Principles
1. **ONE RUNTIME** - Only `backend/main.py` is executable
2. **NO DUPLICATION** - No redundant logic across files
3. **UPWARD IMPORTS** - Everything imports into `main.py`
4. **SECURITY ISOLATION** - Security is middleware only
5. **EXPLICIT AGENTS** - No auto-running agents
6. **SINGLE CONFIG** - `render.yaml` is authoritative

### File Lifecycle
```
ACTIVE     → Currently used in production
LEGACY     → Deprecated but preserved for logic migration
REMOVE     → Marked for deletion (dead code)
```

---

## FRONTEND ARCHITECTURE

### Frontend is Client Only
The frontend has NO backend authority:
- ✅ Consumes APIs only
- ✅ No secrets
- ✅ No business logic
- ✅ No execution authority

### Frontend Files
```
index.html       - Homepage
agents.html      - AI agents dashboard
dashboard.html   - Admin dashboard
square.html      - Payment interface
mobile.html      - Mobile interface
app.html         - Application interface
```

### API Integration
All API calls centralized in `frontend/js/api.js` (to be created).

---

## DEVELOPMENT WORKFLOW

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run backend
uvicorn backend.main:app --reload --port 10000

# Access API
http://localhost:10000/docs
```

### Testing
```bash
# System status
curl http://localhost:10000/api/status

# SKA Credits
curl http://localhost:10000/api/tokenization/ska-credits
```

### Deployment
```bash
# Commit changes
git add .
git commit -m "Update backend"
git push

# Render auto-deploys via webhook
```

---

## MIGRATION STATUS

### Completed (Phase 1-2)
- [x] Created `backend/main.py` as single entry point
- [x] Deprecated 7 old entry points
- [x] Updated `render.yaml` for FastAPI
- [x] Updated `requirements.txt`
- [x] Created this ARCHITECTURE.md

### In Progress (Phase 3-8)
- [ ] Isolate security into middleware
- [ ] Harden agent system with registry
- [ ] Create `backend/core/` module structure
- [ ] Migrate logic from legacy files
- [ ] Implement rate limiting
- [ ] Dead file audit
- [ ] Mark files for removal

---

## SUCCESS METRICS

### System is Production-Ready When:
- [x] One backend command runs everything
- [x] One deployment path exists
- [x] No ambiguity about what runs
- [ ] Agents are isolated and controlled
- [ ] Security is middleware-based
- [x] The repo can be explained in <10 minutes

**Current Status:** 3/6 complete

---

## SUPPORT

**Repository:** https://github.com/saleskingacademy/sales-king-academy-complete  
**Render Dashboard:** https://dashboard.render.com/web/srv-d4tstv24d50c73b5gl6g  
**Live Site:** https://saleskingacademy.com  
**Documentation:** This file

---

**This is the authoritative architecture document.**  
**All other deployment documents are deprecated references.**
