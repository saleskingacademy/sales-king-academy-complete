# 2. Backend Refactor TODO – for Claude to Implement

## 2.1. Create a proper backend package

**Task for Claude:**
1. Create a new folder `ska_backend/` at the repo root.
2. Inside it, create:
   - `__init__.py`
   - `config.py`
   - `routes/__init__.py`
   - `routes/agents.py`
   - `routes/credits.py`
   - `routes/status.py`
   - `routes/revenue.py`
   - `services/__init__.py`
   - `services/agents_service.py`
   - `services/credits_service.py`
   - `services/revenue_service.py`
   - `services/rkl_service.py`
   - `services/payments_service.py`
3. Move the logic from:
   - `app.py`
   - `ska_backend_complete.py`
   - `revenue_engine_live.py`
   - `autonomous_revenue_service.py`
   - `SQUARE_PAYMENT_INTEGRATION.py`
   - `rklcore.py`
   into the corresponding `services/*` and `routes/*` modules.

**Design rules:**
- `ska_backend/__init__.py` should expose a `create_app()` function that returns a Flask app.
- No business logic is allowed directly in `__init__.py` or in the entrypoint; it must live in `services/*`.


## 2.2. Unify SKA Credits and RKL logic

**Task for Claude:**
1. Create `services/rkl_service.py` and move all SKA credits and RKL math into it.
   - Centralize:
     - `GENESIS` timestamp
     - `ALPHA` / `RKL_ALPHA`
     - `get_ska_credits()`
     - any complexity labels (O(n^1.77), etc.)
2. Replace duplicate implementations in:
   - `app.py`
   - `ska_backend_complete.py`
   - any other backend file
   with imports from `rkl_service.py`.

**Result:** Every API route that needs credits or RKL calls JUST one function: `rkl_service.get_ska_credits()`.


## 2.3. Centralize agent definitions

**Task for Claude:**
1. Create `services/agents_service.py` that:
   - Defines the 25 agents in a single place using `agents_config.json` or a Python list.
   - Provides functions:
     - `list_agents()`
     - `register_task(agent_id, task)`
     - `complete_task(agent_id, result=None)`
2. Update `/api/agents`, `/api/agent/register-task`, `/api/agent/complete-task` to call this service.
3. Ensure the agent list is driven by a config file (`agents_config.json`) so the names and authority levels are not hard‑coded in multiple places.

## 2.4. Extract revenue engine into a service

**Task for Claude:**
1. Move the `RevenueEngine` class from `revenue_engine_live.py` into `services/revenue_service.py`.
2. Keep the async lead generation / outreach / close‑deals logic, but:
   - Make lead data structures reusable.
   - Add an abstraction layer so later email/SMS/voice integrations can be swapped.
3. Provide service functions:
   - `run_revenue_cycle()`
   - `get_stats()`
   - `start_engine()` / `stop_engine()`
4. Update endpoints under `routes/revenue.py` to call these services.


## 2.5. Use environment‑based settings

**Task for Claude:**
1. Create `config.py` in `ska_backend/` with a `Settings` class that pulls from environment variables:
   - `ANTHROPIC_API_KEY`
   - `SQUARE_LOCATION_ID`
   - `LEADS_PER_CYCLE`
   - `CYCLE_INTERVAL_MINUTES`
   - `SMTP_HOST`, `SMTP_USER`, etc.
   - `SMS_API`, `ASTERISK_HOST`, etc.
2. Remove hard‑coded strings like `"LCX039E7QRA5G"` in the Python files and replace them with `settings.SQUARE_LOCATION_ID`.

## 2.6. Clean API surface

**Task for Claude:**
1. Consolidate duplicated routes so that the live backend exposes ONE canonical set of endpoints:
   - `GET /health`
   - `GET /api/credits`
   - `GET /api/agents`
   - `POST /api/agent/register-task`
   - `POST /api/agent/complete-task`
   - `GET /api/system/status`
   - `POST /api/revenue/cycle` or `POST /trigger`
   - `GET /api/revenue/stats`
2. Remove or deprecate duplicate endpoints that do the same thing with slightly different names.

## 2.7. Add basic tests

**Task for Claude:**
1. Add a `tests/` folder.
2. Add tests for:
   - `get_ska_credits()`
   - `/health`
   - `/api/credits`
   - `/api/agents`
   - `/api/revenue/cycle` basic success path.
3. Wire tests into GitHub Actions so that pushes and PRs run the test suite.
