# SALES KING ACADEMY - SELF-OWNED PLATFORM

Complete business automation platform with 25 AI agents, running on:
- ✅ **Cloudflare Workers** (serverless backend)
- ✅ **Cloudflare D1** (persistent SQLite database)
- ✅ **GitHub** (source control & CI/CD)
- ✅ **Square** (payment processing)

**NO dependencies on Render, Netlify, AWS, or other platforms.**

---

## 🚀 ONE-COMMAND DEPLOYMENT

```bash
chmod +x deploy.sh && ./deploy.sh
```

That's it. Your entire system will be live in 2 minutes.

---

## 📦 MANUAL DEPLOYMENT (If Preferred)

### Prerequisites
```bash
npm install -g wrangler
wrangler login
```

### Step 1: Create Database
```bash
wrangler d1 create ska_production
```

Copy the `database_id` from the output and update `wrangler.toml`:
```toml
database_id = "YOUR_DATABASE_ID_HERE"
```

### Step 2: Initialize Schema
```bash
wrangler d1 execute ska_production --file=schema.sql
```

### Step 3: Deploy
```bash
wrangler deploy
```

Your site is now live at: `https://sales-king-academy.YOUR-SUBDOMAIN.workers.dev`

---

## 🌐 CUSTOM DOMAIN

Add your own domain:
```bash
wrangler domains add saleskingacademy.com
```

---

## 🏗️ ARCHITECTURE

```
GitHub (Source)
    ↓
Cloudflare Workers (Backend)
    ↓
Cloudflare D1 (Database)
    ↓
Square API (Payments)
```

### Features
- ✅ 25 AI Agents (config-driven)
- ✅ User authentication (JWT)
- ✅ Credit system
- ✅ Square payment processing
- ✅ Global edge deployment
- ✅ Zero spin-down time
- ✅ Free tier: 100k requests/day

---

## 📊 SYSTEM COMPONENTS

### AI Agents (25 Total)
1. Lead Generation Master
2. Email Outreach Specialist
3. SMS Campaign Expert
4. Cold Calling Specialist
5. Social Media Manager
6. Content Creator
7. Data Analyst
8. CRM Manager
9. Proposal Writer
10. Contract Negotiator
11. Customer Service
12. Market Researcher
13. Competitive Intel
14. Training Developer
15. Quality Assurance
16. Sales Forecaster
17. Territory Planner
18. Partner Relations
19. Revenue Operations
20. Performance Analytics
21. Sales Enablement
22. Deal Strategist
23. Account Manager
24. Executive Liaison
25. Master CEO Agent

### Database Schema
- `users` - User accounts
- `credits` - User credit balances
- `ai_agents` - Agent configurations
- `conversations` - Agent interactions
- `payments` - Transaction records

---

## 💰 COST BREAKDOWN

| Service | Cost | Usage |
|---------|------|-------|
| **Cloudflare Workers** | $0 | 100k requests/day |
| **Cloudflare D1** | $0 | 5GB storage, 5M reads/day |
| **GitHub** | $0 | Unlimited public repos |
| **Square** | 2.9% + 30¢ | Per transaction |

**Total infrastructure cost: $0/month**

---

## 🔒 SECURITY

- JWT-based authentication
- Password hashing (SHA-256)
- CORS protection
- Rate limiting (Cloudflare built-in)
- Edge security
- No exposed credentials

---

## 🛠️ DEVELOPMENT

### Local Development
```bash
wrangler dev
```

### View Logs
```bash
wrangler tail
```

### Database Management
```bash
# Query database
wrangler d1 execute ska_production --command="SELECT * FROM users"

# Run SQL file
wrangler d1 execute ska_production --file=query.sql
```

---

## 📈 MONITORING

View real-time analytics:
```bash
wrangler pages deployment list
```

Or visit: https://dash.cloudflare.com

---

## 🔄 UPDATES

Push to GitHub → Auto-deploy to Cloudflare:
```bash
git add .
git commit -m "Update system"
git push origin main
wrangler deploy
```

---

## 📞 SUPPORT

For issues or questions:
- GitHub Issues: `https://github.com/saleskingacademy/sales-king-academy-complete/issues`
- Documentation: This README

---

## 📜 LICENSE

Proprietary - Sales King Academy LLC
All rights reserved.

---

**Built with:**
- Cloudflare Workers
- Cloudflare D1
- Square API
- Tailwind CSS
