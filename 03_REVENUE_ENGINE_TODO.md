# 3. Revenue Engine Improvements – `revenue_engine_live.py`

The current revenue engine:
- Generates leads with random data.
- Simulates outreach (email/SMS/voice) with sleep delays.
- Closes deals based on simple score thresholds and random probabilities.

This is fine as a **simulation**, but for Sales King Academy as a real business engine, we want:
- Clear separation between SIMULATED mode and REAL mode.
- Hooks where real CRM / email / SMS / dialer systems can be plugged in.

## 3.1. Add execution mode flag

**Task for Claude:**
- In `services/revenue_service.py` (after refactor), add a `mode` field:
  - `"SIMULATION"` vs `"LIVE"`
- Make the outreach and close logic branch on mode:
  - In SIMULATION: keep using random data as now.
  - In LIVE: call stub functions (`send_email()`, `send_sms()`, `place_call()`) that can later be wired to real providers.

## 3.2. Persist key stats

**Task for Claude:**
- Introduce a simple persistence mechanism:
  - Start with SQLite using SQLAlchemy or plain SQL, OR
  - A small JSON file persisted to disk in `data/` (only if DB is too heavy for now).
- At minimum, persist:
  - `total_revenue`
  - `leads_generated`
  - `deals_closed`
  - `cycles_completed`
  - `last_cycle` snapshot
- On startup, load this state so stats survive restarts.

## 3.3. Expose clean JSON schema

**Task for Claude:**
- Standardize the JSON response from `/stats` and `/trigger`:
  - Always include:
    - `status`, `total_revenue`, `leads_generated`, `deals_closed`, `conversion_rate`, `avg_deal_size`, `cycles_completed`, `last_cycle`.
- Define this schema in a comment or a separate `docs/REVENUE_API.md` file.

## 3.4. Logging & observability

**Task for Claude:**
- Keep the existing logging but:
  - Use structured logs where possible (key=value format).
  - Ensure logs include: cycle number, deals closed, revenue, duration.
- Add a `/logs` debug endpoint **only in development mode** that returns the last N log lines or summaries.
