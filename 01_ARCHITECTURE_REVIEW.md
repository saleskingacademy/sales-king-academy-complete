# 1. Architecture Review – `sales-king-academy-complete`

Goals:
- Make the repo production‑grade.
- Keep the “25 agents, SKA Credits, RKL, revenue engine” narrative but implement them cleanly.
- Align backend services, autonomous engines, and frontend dashboard into ONE coherent system.

Observed (from repo top level):
- Multiple overlapping backend files: `app.py`, `ska_backend_complete.py`, `ska_autonomous_complete.py`, `ska_complete_backend.py`, `autonomous_revenue_service.py`, `revenue_engine_live.py`, etc.
- Several deployment meta‑files: `netlify.toml`, `render.yaml`, `START_REVENUE_NOW.sh`, multiple `DEPLOYMENT_*.md` summaries.
- Frontend assets: `index.html`, `dashboard.html` but not a clearly defined SPA or framework folder.
- Business‑logic files for agents and RKL: `agent_training_system.py`, `agent_training_package.json`, `agents_config.json`, `rklcore.py`, `security_fortress.py`, `SQUARE_PAYMENT_INTEGRATION.py`.

Problems:
1. **Overlapping backends / duplicated responsibility**
   - There is no single “source of truth” backend. Different files define similar routes, credits logic, agents, and revenue logic.
   - This makes deployment brittle and confusing: which file should Render actually run in production?

2. **In‑memory state only**
   - Revenue, leads, deals, cycles, and agent tasks are stored in local Python variables.
   - If the process restarts, all stats vanish.
   - No database or persistent store (SQLite/Postgres/Redis) is configured.

3. **Mixed concerns**
   - App bootstrapping, configuration, business logic, and HTTP endpoints live in single files.
   - Hard‑coded values (e.g., Square location ID, genesis timestamp, alpha) are repeated in multiple files.

4. **Deployment fragmentation**
   - Netlify handles frontend; Render (or similar) handles backend, but configs are not clearly unified under “prod” vs “dev” environments.
   - No single `backend/` package with `__init__.py` and a clear app factory.

5. **Security gaps**
   - Sensitive constants (Square location, alpha, etc.) are embedded directly in code.
   - No rate limiting, no auth on sensitive endpoints, no API key mechanism for calling the backend.

6. **Testing & observability missing**
   - No tests folder.
   - No structured logging and no log aggregation strategy.

High‑Level Target State:
- One backend application package, e.g. `ska_backend/` with:
  - `__init__.py` + `config.py`
  - `routes/` (agents, credits, revenue, status, training)
  - `services/` (rkl, agents, revenue, payments, security)
  - `models/` (DB models) if SQL/ORM is used
- A clean separation between:
  - API (Flask or FastAPI)
  - Business logic (services)
  - Persistence (database)
  - External integrations (Claude, Square, SMTP/SMS/VoIP)
