# 4. Security, Secrets, and Hardening

## 4.1. Environment variables & secrets

**Task for Claude:**
1. Confirm there are **no API keys, tokens, or secrets** committed in the repo.
2. If any exist, remove them and replace with environment variable lookups.
3. Update `README.md`, `DEPLOY_INSTRUCTIONS.md`, and `SQUARE_INTEGRATION_STATUS.md` so they clearly list required env vars:
   - `ANTHROPIC_API_KEY`
   - `SQUARE_LOCATION_ID`
   - `SMTP_*`
   - `SMS_*`
   - `ASTERISK_*`

## 4.2. Basic auth / API key protection

Right now, anyone who hits your backend can:
- Trigger revenue cycles.
- View stats.
- See credit supply and internal details.

**Task for Claude:**
1. Implement a simple API key middleware:
   - `X-SKA-ADMIN-KEY` header, checked against an env var `SKA_ADMIN_KEY`.
2. Protect sensitive endpoints:
   - `/trigger`
   - `/stop`
   - `/start`
   - Any future admin endpoints.

## 4.3. CORS tightening

- The current code uses `flask_cors.CORS(app)` with permissive defaults.

**Task for Claude:**
1. Restrict CORS origins to your production domains (Netlify/primary domain), something like:
   - `https://saleskingacademy.com`
   - `https://*.saleskingacademy.com`
2. Allow broader origins only in development, controlled via env var.

## 4.4. Rate limiting

**Task for Claude:**
- Add simple rate limiting using `flask-limiter` or equivalent.
- Especially protect:
  - `/api/revenue/cycle` or `/trigger`
  - `/api/agent/*` endpoints

## 4.5. Error handling

**Task for Claude:**
- Add a global error handler (`@app.errorhandler(Exception)`):
  - Log the traceback.
  - Return a JSON payload with `error` and `request_id`.
