# 5. DevOps, Deployment, and Environments

The repo already contains:
- `netlify.toml` – Netlify frontend config.
- `render.yaml` – Render backend config.
- Multiple deployment status `.md` files.

## 5.1. Single source of truth for deployments

**Task for Claude:**
1. Confirm which backend entry point Render should run (after refactor this should be `ska_backend/__init__.py:create_app()` or a dedicated `wsgi.py`).
2. Update `render.yaml` to point to that entry point.
3. Remove stale or unused deployment instructions that refer to old files.

## 5.2. Environment separation

**Task for Claude:**
1. Make sure we have at least two environments:
   - `development`
   - `production`
2. Use env vars to control:
   - Debug mode
   - Log verbosity
   - CORS policy
   - Fake vs real integrations (simulation/live modes)

## 5.3. GitHub Actions

**Task for Claude:**
1. Inspect `.github/workflows/` and ensure:
   - Linting (flake8/black) and tests run on push/PR.
   - Optional: automatic deploy to Render/Netlify on `main` branch success.
2. If missing, create a simple workflow:
   - Set up Python 3.11
   - Install dependencies
   - Run tests
   - On success, call Render/Netlify deploy hook if configured as env secrets in GitHub.

## 5.4. Health checks

**Task for Claude:**
1. Ensure `/health` is used as the health check endpoint in Render.
2. Add a simple JSON body:
   - `status`, `timestamp`, `uptime_seconds`, `ska_credits`, `engine_running`.
