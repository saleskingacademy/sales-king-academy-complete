# SALES KING ACADEMY - PRODUCTION ARCHITECTURE

**Version:** 2.0.0  
**Last Updated:** January 10, 2026  
**Status:** Refactored for Production

---

## SYSTEM OVERVIEW

Sales King Academy is a business automation platform with:
- Time-based tokenization (SKA Credits)
- Payment processing integration (Square)
- AI agent orchestration
- Web-based management interface

**Key Principle:** Separation of concerns, testability, maintainability

---

## ARCHITECTURE LAYERS

```
┌─────────────────────────────────────────────────────────────┐
│                       API Layer (FastAPI)                    │
│  • Request validation (Pydantic)                            │
│  • Route handling                                           │
│  • Response formatting                                      │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      Service Layer                           │
│  • TokenizationService (pure business logic)                │
│  • PaymentService (pure business logic)                    │
│  • No API concerns, no infrastructure                       │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      Agent Layer                             │
│  • Agent interface (ABC)                                    │
│  • AgentRegistry (orchestration)                           │
│  • Individual agents (TokenizationAgent, etc.)             │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                   Infrastructure Layer                       │
│  • Configuration management                                  │
│  • Logging                                                  │
│  • Authentication scaffold                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## COMPONENT RESPONSIBILITIES

### API Layer (`backend/main_production.py`)
**Responsibility:** HTTP request/response handling ONLY

**Does:**
- Route HTTP requests
- Validate input with Pydantic
- Call service layer
- Format responses
- Handle HTTP errors

**Does NOT:**
- Contain business logic
- Access databases directly
- Perform calculations
- Orchestrate agents

### Service Layer (`backend/services/`)
**Responsibility:** Pure business logic

**Components:**
- `TokenizationService`: SKA Credits and Temporal DNA logic
- `PaymentService`: Payment processing logic

**Does:**
- Implement business rules
- Perform calculations
- Return structured data

**Does NOT:**
- Handle HTTP requests
- Know about FastAPI
- Access global state
- Perform I/O directly

### Agent Layer (`backend/core/`)
**Responsibility:** Orchestrated task execution

**Components:**
- `Agent` (ABC): Interface contract for all agents
- `AgentRegistry`: Central orchestration
- Concrete agents: `TokenizationAgent`, `PaymentProcessingAgent`, etc.

**Does:**
- Execute specific tasks
- Validate inputs
- Log execution
- Return standardized results

**Does NOT:**
- Auto-execute
- Share state implicitly
- Bypass registry

### Infrastructure Layer
**Components:**
- `Settings` (`backend/config/settings.py`): Configuration
- `AuthService` (`backend/security/auth.py`): Authentication
- Logging configuration

**Does:**
- Manage configuration
- Provide cross-cutting concerns
- Handle environment variables

---

## DATA FLOW

### Example: Process Payment

```
1. HTTP POST /api/payment/process
   ↓
2. FastAPI validates PaymentRequest (Pydantic)
   ↓
3. Route handler calls payment_service.process_payment()
   ↓
4. PaymentService executes business logic
   ↓
5. Result returned as PaymentResponse
   ↓
6. FastAPI serializes to JSON
   ↓
7. HTTP 200 response
```

### Example: Execute Agent

```
1. HTTP POST /api/agents/execute
   ↓
2. FastAPI validates AgentExecutionRequest
   ↓
3. Route handler calls registry.execute_agent()
   ↓
4. AgentRegistry retrieves registered agent
   ↓
5. Agent.safe_execute() wraps execution with:
   - Input validation
   - Logging
   - Error handling
   - Timing
   ↓
6. Agent.execute() performs actual work
   ↓
7. AgentResult returned to registry
   ↓
8. Registry records execution history
   ↓
9. FastAPI returns AgentExecutionResponse
```

---

## FILE STRUCTURE

```
backend/
├── main_production.py           # FastAPI app (API layer)
│
├── services/                     # Business logic (pure functions/classes)
│   ├── tokenization_service.py
│   └── payment_service.py
│
├── core/                         # Agent system
│   ├── agent_interface.py       # Agent ABC and registry
│   └── agents_refactored.py     # Concrete agent implementations
│
├── api/                          # API utilities (future)
│   └── ...
│
├── models/                       # Pydantic schemas
│   └── schemas.py
│
├── config/                       # Configuration
│   └── settings.py
│
├── security/                     # Auth scaffold
│   └── auth.py
│
└── middleware/                   # Future middleware
    └── ...
```

---

## AGENT SYSTEM DESIGN

### Agent Interface Contract

Every agent MUST:
1. Inherit from `Agent` ABC
2. Implement `execute(context, inputs) -> AgentResult`
3. Implement `validate_inputs(inputs) -> (bool, str)`
4. Be registered with `AgentRegistry` before execution

### Agent Execution Flow

```python
# Registration (startup)
agent = TokenizationAgent("tokenization", {})
registry.register(agent)

# Execution (runtime)
result = registry.execute_agent(
    agent_id="tokenization",
    inputs={},
    execution_id="optional-id"
)

# Result
AgentResult(
    success=True,
    data={...},
    error=None,
    execution_time_ms=12.34,
    logs=[...]
)
```

### Why This Design?

**Before:**
- Agents auto-executed
- No input validation
- No logging
- Implicit state
- Hard to test

**After:**
- Explicit registration required
- Input validation enforced
- Every execution logged
- No shared state
- Easy to test

---

## CONFIGURATION MANAGEMENT

### Environment Variables

**Required:**
```
ANTHROPIC_API_KEY        # Claude API key
```

**Optional:**
```
SQUARE_ACCESS_TOKEN      # Square payment token
SQUARE_LOCATION_ID       # Square location ID
PORT                     # Server port (default: 10000)
HOST                     # Server host (default: 0.0.0.0)
DEBUG                    # Debug mode (default: false)
```

### Settings Class

```python
from backend.config.settings import get_settings

settings = get_settings()  # Loads and validates env vars

# Usage
port = settings.port
api_key = settings.anthropic_api_key
```

Validation happens at startup. Missing required variables = hard fail.

---

## SECURITY MODEL

### Current State: Demo-Grade

**What We Have:**
- Token-based auth scaffold
- Role separation (admin/internal/external)
- Token creation/validation/revocation

**What We DON'T Have:**
- OAuth2/JWT
- Password hashing
- Session management
- Rate limiting
- HTTPS enforcement
- CSRF protection

### Using Auth

```python
# Protected endpoint
@app.get("/api/admin/data")
async def admin_data(user: dict = Depends(verify_token)):
    # user contains: {user_id, role, created_at}
    if user['role'] != Role.ADMIN:
        raise HTTPException(403)
    ...
```

### Production Roadmap
1. Implement OAuth2 with JWT
2. Add bcrypt password hashing
3. Add refresh tokens
4. Add rate limiting
5. Enforce HTTPS
6. Add CSRF tokens

---

## TESTING STRATEGY (NOT YET IMPLEMENTED)

### Recommended Structure

```
tests/
├── unit/
│   ├── test_services.py        # Service layer tests
│   ├── test_agents.py          # Agent tests
│   └── test_config.py          # Config tests
│
├── integration/
│   ├── test_api.py             # API integration tests
│   └── test_agents.py          # Agent orchestration tests
│
└── e2e/
    └── test_workflows.py        # End-to-end workflows
```

### Example Unit Test

```python
def test_tokenization_service():
    result = TokenizationService.get_ska_credits()
    
    assert result['total_credits'] > 0
    assert 'genesis' in result
    assert result['genesis'] == '2024-07-01T00:00:00+00:00'
```

---

## DEPLOYMENT

### Production Command

```bash
uvicorn backend.main_production:app \
    --host 0.0.0.0 \
    --port $PORT \
    --workers 2 \
    --log-level info
```

### Render.com Configuration

```yaml
# render.yaml
services:
  - type: web
    name: sales-king-academy
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn backend.main_production:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: ANTHROPIC_API_KEY
      - key: SQUARE_ACCESS_TOKEN
      - key: SQUARE_LOCATION_ID
      - key: PORT
```

---

## OBSERVABILITY

### Logging

All components use Python `logging` module:

```python
import logging
logger = logging.getLogger(__name__)

logger.info("Processing payment")
logger.error("Payment failed", exc_info=True)
```

Logs include:
- Timestamp
- Log level
- Module name
- Message
- Exception trace (if applicable)

### Agent Execution History

```python
# Get last 100 agent executions
history = registry.get_execution_history(limit=100)

# Each entry contains:
{
  'context': {
    'agent_id': '...',
    'execution_id': '...',
    'timestamp': '...'
  },
  'result': {
    'success': True,
    'data': {...},
    'execution_time_ms': 12.34
  }
}
```

---

## KNOWN LIMITATIONS

See `TECHNICAL_DEBT.md` for complete list.

**Top 5:**
1. No database (all state in-memory)
2. No real authentication (demo scaffold only)
3. No test coverage
4. No horizontal scaling
5. Multiple deprecated entry points still present

---

## MIGRATION FROM OLD ARCHITECTURE

### Old Files → New Files

| Old | New | Status |
|-----|-----|--------|
| `server.py` | `backend/main_production.py` | Replaced |
| `complete_backend.py` | `backend/services/*` | Refactored |
| `agents.py` | `backend/core/agents_refactored.py` | Refactored |
| N/A | `backend/core/agent_interface.py` | New |
| N/A | `backend/config/settings.py` | New |
| N/A | `backend/security/auth.py` | New |
| N/A | `backend/models/schemas.py` | New |

---

## FUTURE IMPROVEMENTS

### Short Term (1-2 months)
- Add comprehensive test suite
- Remove deprecated files
- Add database layer (PostgreSQL + SQLAlchemy)
- Implement proper OAuth2

### Medium Term (3-6 months)
- Separate frontend repository
- Add CI/CD pipeline
- Add monitoring (Prometheus/Grafana)
- Add caching layer (Redis)

### Long Term (6-12 months)
- Microservices architecture
- Event-driven architecture
- Kubernetes deployment
- Multi-region support

---

**End of Architecture Documentation**
