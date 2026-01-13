# SALES KING ACADEMY - SYSTEM ARCHITECTURE

## Overview

Sales King Academy is an autonomous AI-powered business automation platform running on Cloudflare Workers with D1 database storage. The system features 25 specialized AI agents, JWT authentication, credit-based monetization, and Square payment integration.

## Runtime Flow

1. **Request Reception**: Cloudflare Worker receives HTTP request
2. **Security Middleware**: JWT validation, rate limiting, CORS
3. **Route Resolution**: Request mapped to appropriate handler
4. **Agent Invocation**: If needed, agent explicitly invoked from registry
5. **Database Operation**: D1 SQL queries for persistence
6. **Response Generation**: JSON response with CORS headers

## Agent Lifecycle

**Registration:**
- All 25 agents registered in agent registry
- Each agent has: ID, name, max_runtime, permissions

**Invocation:**
- Agents MUST be invoked explicitly via `/agents/chat` endpoint
- No auto-running agents on startup
- Time-bounded execution (max 300-600 seconds)
- Permission checks before execution

**Execution:**
```javascript
async function invokeAgent(agentId, message) {
    // Validate agent exists
    if (!AGENT_REGISTRY[agentId]) throw new Error('Invalid agent');
    
    // Check permissions
    const agent = AGENT_REGISTRY[agentId];
    
    // Time-bounded execution
    const result = await executeWithTimeout(
        () => processMessage(agentId, message),
        agent.maxRuntime
    );
    
    return result;
}
```

## Security Boundaries

**Layer 1: Cloudflare Edge**
- DDoS protection
- Rate limiting (100 req/min per IP)
- Geographic filtering

**Layer 2: Application Middleware**
- JWT token validation
- Request sanitization
- CORS enforcement

**Layer 3: Database**
- Parameterized queries (SQL injection prevention)
- Row-level security
- Encrypted at rest

**Layer 4: Agent System**
- Explicit invocation only
- Permission-based access
- Time-bounded execution

## Deployment

### Prerequisites:
```bash
npm install -g wrangler
wrangler login
```

### Initial Setup:
```bash
# Create D1 database
wrangler d1 create ska_production

# Update wrangler.toml with database ID

# Run schema
wrangler d1 execute ska_production --file=schema.sql
```

### Deploy:
```bash
wrangler deploy
```

### Verify:
```bash
curl https://saleskingacademy.com/health
```

## Monitoring

**Real-time Logs:**
```bash
wrangler tail
```

**Analytics:**
- Dashboard: https://dash.cloudflare.com
- Metrics: Requests, errors, latency, bandwidth
- D1 Stats: Query performance, storage usage

**Health Check:**
```bash
curl https://saleskingacademy.com/health
```

Expected response:
```json
{
  "status": "LIVE",
  "agents": 25,
  "platform": "Cloudflare Workers"
}
```

## File Structure

```
├── worker.js           # Main entry point (frontend + backend)
├── wrangler.toml       # Cloudflare configuration
├── schema.sql          # D1 database schema
├── deploy.sh           # Deployment automation
├── .gitignore          # Git exclusions
└── README.md           # Quick start guide
```

## Technology Stack

- **Runtime**: Cloudflare Workers (V8 isolates)
- **Database**: Cloudflare D1 (SQLite)
- **Authentication**: JWT (HS256)
- **Payment**: Square API
- **Frontend**: Vanilla JS + Tailwind CSS
- **API**: RESTful JSON

## Cost Breakdown

| Service | Free Tier | Cost |
|---------|-----------|------|
| Cloudflare Workers | 100k req/day | $0 |
| Cloudflare D1 | 5GB storage | $0 |
| GitHub | Unlimited repos | $0 |
| **Total** | | **$0/month** |

## Maintenance

**Daily:**
- Check error rate in Cloudflare dashboard
- Monitor request patterns

**Weekly:**
- Review D1 database size
- Check agent response times

**Monthly:**
- Audit security logs
- Update dependencies

**As Needed:**
- Scale up if approaching free tier limits
- Add paid Cloudflare plan for enterprise features

---

**Sales King Academy LLC**  
**System Version: 2.0**  
**Last Updated: January 2026**
