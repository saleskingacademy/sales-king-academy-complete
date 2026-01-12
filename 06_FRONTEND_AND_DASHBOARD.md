# 6. Frontend & Dashboard Improvements

The repo contains `index.html` and `dashboard.html` which likely serve as the live control UI.

Objectives:
- Provide a single clean dashboard that can run on Netlify and talk to the backend.
- Show live stats: SKA credits, revenue engine stats, agent readiness.

## 6.1. Single dashboard entry

**Task for Claude:**
1. Decide which HTML file is the main dashboard (recommend: `dashboard.html`).
2. Ensure Netlify serves this as the primary page or link it clearly from `index.html`.

## 6.2. Wire to backend endpoints

**Task for Claude:**
- Using vanilla JS or a small framework, wire the dashboard to:
  - `GET /health` – show system operational status.
  - `GET /api/credits` – show current SKA Credits.
  - `GET /api/revenue/stats` – show total revenue, deals, cycles.
  - `POST /trigger` – button to manually trigger revenue cycle (protected by an admin key).

UI Elements to include:
- Big status header: “SALES KING ACADEMY – LIVE CONTROL”
- Cards for:
  - Credits (total, value, genesis date)
  - Revenue stats (total, conversion, avg deal size)
  - Agent stats (total, ready vs working)
- A log area showing last cycles.

## 6.3. Admin key entry

**Task for Claude:**
- Add a small admin area:
  - Input for `Admin Key`
  - Store it client‑side only in memory (do not persist to localStorage).
  - Use it in `fetch` headers as `X-SKA-ADMIN-KEY` when calling `/trigger`, `/stop`, `/start`.
