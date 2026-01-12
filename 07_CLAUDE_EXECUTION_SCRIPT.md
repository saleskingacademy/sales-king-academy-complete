# 7. Script to Give Claude – To Execute All Improvements

Copy‑paste the following message directly into Claude after uploading this ZIP:

---

You are my lead engineer for the GitHub repo `saleskingacademy/sales-king-academy-complete`.

I have uploaded a ZIP file that contains a set of improvement plans and TODOs for you to implement.

**Your job:**
1. Extract the ZIP.
2. Read ALL of the following files carefully IN ORDER:
   - `01_ARCHITECTURE_REVIEW.md`
   - `02_BACKEND_REFACTOR_TODO.md`
   - `03_REVENUE_ENGINE_TODO.md`
   - `04_SECURITY_AND_SECRETS.md`
   - `05_DEVOPS_AND_DEPLOYMENT.md`
   - `06_FRONTEND_AND_DASHBOARD.md`
3. Then, connect to my GitHub repo `saleskingacademy/sales-king-academy-complete` (using the GitHub access you already have in this Claude workspace).
4. Execute the following steps:
   - Create the new `ska_backend/` package and move/merge logic from the old backend files as instructed.
   - Centralize SKA Credits and RKL logic into `services/rkl_service.py`.
   - Centralize agents into `services/agents_service.py` and update all `/api/agents` routes.
   - Extract and improve the revenue engine into `services/revenue_service.py`, with SIMULATION vs LIVE modes.
   - Wire configuration into `config.py` using environment variables.
   - Clean and standardize the API surface so there is ONE canonical backend interface.
   - Add basic tests and ensure GitHub Actions runs them.
   - Tighten security: env vars only, admin key protection, proper CORS, basic rate limiting.
   - Align Render/Netlify deployment config with the new backend entry point.
   - Upgrade the frontend dashboard to use the canonical endpoints and show live stats.
5. Make all code changes directly in the GitHub repo with clear commit messages like:
   - `refactor: create ska_backend package and centralize services`
   - `feat: add revenue service with simulation/live modes`
   - `chore: add tests and GitHub Actions workflow`
6. At the end, summarize:
   - What files were created/removed/modified.
   - How to run the backend locally.
   - How to access the production dashboard and backend endpoints.

Be careful to preserve my branding, naming (Sales King Academy, RKL, SKA Credits, 25 agents, King Infinity, etc.), and narrative, while making the system **production‑grade and maintainable.**

---
