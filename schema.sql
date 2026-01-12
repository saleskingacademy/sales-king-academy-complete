-- SALES KING ACADEMY D1 DATABASE SCHEMA

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS credits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    amount REAL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS ai_agents (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    capabilities TEXT,
    status TEXT DEFAULT 'active',
    created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    agent_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (agent_id) REFERENCES ai_agents(id)
);

CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    square_payment_id TEXT,
    status TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Initialize 25 AI Agents
INSERT OR IGNORE INTO ai_agents (id, name, role, capabilities, status, created_at) VALUES
(1, 'Lead Generation Master', 'lead_gen', 'prospecting,outreach', 'active', strftime('%s','now')),
(2, 'Email Outreach Specialist', 'email', 'email,automation', 'active', strftime('%s','now')),
(3, 'SMS Campaign Expert', 'sms', 'sms,campaigns', 'active', strftime('%s','now')),
(4, 'Cold Calling Specialist', 'calling', 'phone,scripts', 'active', strftime('%s','now')),
(5, 'Social Media Manager', 'social', 'social_media,content', 'active', strftime('%s','now')),
(6, 'Content Creator', 'content', 'writing,design', 'active', strftime('%s','now')),
(7, 'Data Analyst', 'analytics', 'analysis,reporting', 'active', strftime('%s','now')),
(8, 'CRM Manager', 'crm', 'crm,integration', 'active', strftime('%s','now')),
(9, 'Proposal Writer', 'proposals', 'writing,sales', 'active', strftime('%s','now')),
(10, 'Contract Negotiator', 'negotiation', 'contracts,legal', 'active', strftime('%s','now')),
(11, 'Customer Service', 'support', 'support,tickets', 'active', strftime('%s','now')),
(12, 'Market Researcher', 'research', 'research,intelligence', 'active', strftime('%s','now')),
(13, 'Competitive Intel', 'intelligence', 'competitive,analysis', 'active', strftime('%s','now')),
(14, 'Training Developer', 'training', 'education,courses', 'active', strftime('%s','now')),
(15, 'Quality Assurance', 'qa', 'testing,quality', 'active', strftime('%s','now')),
(16, 'Sales Forecaster', 'forecasting', 'forecasting,prediction', 'active', strftime('%s','now')),
(17, 'Territory Planner', 'territory', 'planning,strategy', 'active', strftime('%s','now')),
(18, 'Partner Relations', 'partners', 'partnerships,alliances', 'active', strftime('%s','now')),
(19, 'Revenue Operations', 'rev_ops', 'operations,optimization', 'active', strftime('%s','now')),
(20, 'Performance Analytics', 'performance', 'metrics,kpis', 'active', strftime('%s','now')),
(21, 'Sales Enablement', 'enablement', 'tools,training', 'active', strftime('%s','now')),
(22, 'Deal Strategist', 'strategy', 'strategy,deals', 'active', strftime('%s','now')),
(23, 'Account Manager', 'accounts', 'accounts,retention', 'active', strftime('%s','now')),
(24, 'Executive Liaison', 'executive', 'c_level,relationships', 'active', strftime('%s','now')),
(25, 'Master CEO Agent', 'ceo', 'orchestration,leadership', 'active', strftime('%s','now'));
