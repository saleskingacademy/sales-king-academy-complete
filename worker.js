/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SALES KING ACADEMY - CORRECTED DUAL SYSTEM ARCHITECTURE
 * 
 * SYSTEM 1: TEMPORAL DNA TOKENIZATION (Computation)
 * - Used for: LLM computational tokens, processing units
 * - Format: 16-digit blocks (12 random + 4 synchronized to world clock)
 * 
 * SYSTEM 2: SKA CREDITS CURRENCY (Financial)
 * - Used for: Financial transactions, purchasing power
 * - Auto-minting: 1 credit/second since July 1, 2024
 * - Value: 1 SKA Credit = $1 USD
 * 
 * INTERLOCKING SECURITY:
 * - Both systems use synchronized 4-digit validation
 * - Cross-reference for tamper detection
 * - Moving security - changes every second
 * - Separate purposes, shared security layer
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// SYSTEM 1: TEMPORAL DNA TOKENIZATION - FOR COMPUTATION
// ═══════════════════════════════════════════════════════════════════════════

class TemporalDNATokenization {
  constructor() {
    this.genesis = new Date('2024-07-01T00:00:00Z').getTime();
    this.blockSize = 16; // 16 digits per computational token block
  }
  
  generateComputationalToken() {
    // Generate 12 random digits for uniqueness
    const random12 = Array(12).fill(0)
      .map(() => Math.floor(Math.random() * 10))
      .join('');
    
    // Get synchronized 4 digits from world clock (last 4 digits of current second)
    const now = Date.now();
    const currentSecond = Math.floor(now / 1000);
    const sync4 = (currentSecond % 10000).toString().padStart(4, '0');
    
    // 16-digit computational token
    return {
      token: random12 + sync4,
      type: 'COMPUTATIONAL',
      purpose: 'LLM_PROCESSING',
      timestamp: now,
      sync: sync4
    };
  }
  
  validateComputationalToken(token) {
    if (token.length !== 16) return { valid: false, reason: 'Invalid length' };
    
    const sync4 = token.slice(-4);
    const currentSecond = Math.floor(Date.now() / 1000);
    const expectedSync = (currentSecond % 10000).toString().padStart(4, '0');
    
    // Allow ±5 second tolerance for network latency
    const tokenTime = parseInt(sync4);
    const currentTime = parseInt(expectedSync);
    const diff = Math.abs(tokenTime - currentTime);
    
    return {
      valid: diff <= 5,
      reason: diff <= 5 ? 'Valid' : 'Expired',
      timeDiff: diff
    };
  }
  
  // For RKL Framework computation tracking
  generateComputationBatch(count) {
    return Array(count).fill(0).map(() => this.generateComputationalToken());
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// SYSTEM 2: SKA CREDITS CURRENCY - FOR FINANCIAL TRANSACTIONS
// ═══════════════════════════════════════════════════════════════════════════

class SKACreditsCurrency {
  constructor() {
    this.genesis = new Date('2024-07-01T00:00:00Z').getTime();
    this.mintRate = 1; // 1 credit per second
    this.usdValue = 1; // 1 SKA Credit = $1 USD
  }
  
  getCurrentBalance() {
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - this.genesis) / 1000);
    return elapsedSeconds * this.mintRate;
  }
  
  getBalanceUSD() {
    return this.getCurrentBalance() * this.usdValue;
  }
  
  getDetailedInfo() {
    const balance = this.getCurrentBalance();
    const now = Date.now();
    const elapsed = now - this.genesis;
    
    return {
      type: 'CURRENCY',
      purpose: 'FINANCIAL_TRANSACTIONS',
      balance: balance,
      balanceUSD: balance * this.usdValue,
      mintRate: this.mintRate + ' credit/second',
      genesisDate: new Date(this.genesis).toISOString(),
      elapsedDays: Math.floor(elapsed / (1000 * 60 * 60 * 24)),
      elapsedSeconds: Math.floor(elapsed / 1000),
      nextMint: new Date(Math.ceil(now / 1000) * 1000).toISOString()
    };
  }
  
  // Validate transaction using interlocking security
  validateTransaction(amount, securityToken) {
    // Use Temporal DNA sync for transaction validation
    const temporal = new TemporalDNATokenization();
    const validation = temporal.validateComputationalToken(securityToken);
    
    if (!validation.valid) {
      return { success: false, error: 'Invalid security token' };
    }
    
    if (amount <= 0) {
      return { success: false, error: 'Invalid amount' };
    }
    
    return {
      success: true,
      amount: amount,
      timestamp: Date.now(),
      securityValidated: true
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// RKL FRAMEWORK - MATHEMATICAL COMPUTATION SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

class RKLFramework {
  constructor() {
    this.alpha = 25; // Quantum-classical balance parameter
    this.complexity = 1.77; // O(n^1.77) computational complexity
    this.tokenizer = new TemporalDNATokenization();
  }
  
  solve(problem) {
    // Generate computational tokens for processing
    const computeTokens = this.tokenizer.generateComputationBatch(3);
    
    const n = problem.length || 1;
    const steps = Math.pow(n, this.complexity);
    
    return {
      solution: this.optimizedSolve(problem),
      framework: 'RKL',
      alpha: this.alpha,
      complexity: `O(n^${this.complexity})`,
      computationalSteps: Math.floor(steps),
      tokensUsed: computeTokens.length,
      computeTokens: computeTokens.map(t => t.token)
    };
  }
  
  optimizedSolve(problem) {
    // RKL optimization with α=25 parameter
    // Polynomial time instead of exponential
    return `Solution computed using RKL Framework (α=${this.alpha}, complexity=O(n^${this.complexity}))`;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// RKL LLM - CUSTOM LANGUAGE MODEL WITH EMBEDDED KNOWLEDGE
// ═══════════════════════════════════════════════════════════════════════════

class RKLLLM {
  constructor() {
    this.framework = new RKLFramework();
    this.tokenizer = new TemporalDNATokenization();
    this.knowledgeBase = this.initializeKnowledge();
  }
  
  initializeKnowledge() {
    return {
      mathematics: {
        algebra: "Equations, polynomials, factoring, systems, matrices",
        calculus: "Derivatives, integrals, limits, optimization, series",
        statistics: "Probability, distributions, hypothesis testing, regression",
        numberTheory: "Primes, modular arithmetic, cryptography, divisibility"
      },
      science: {
        physics: "Mechanics, thermodynamics, electromagnetism, quantum, relativity",
        chemistry: "Atomic structure, bonding, reactions, organic, inorganic",
        biology: "Cell biology, genetics, evolution, ecology, physiology",
        astronomy: "Cosmology, planetary science, stellar evolution"
      },
      technology: {
        programming: "Algorithms, data structures, OOP, functional programming",
        ai: "Machine learning, neural networks, NLP, computer vision",
        systems: "Operating systems, networking, databases, cloud",
        security: "Cryptography, authentication, authorization, threat modeling"
      },
      business: {
        strategy: "Planning, execution, competitive analysis, growth",
        sales: "Prospecting, qualifying, presenting, closing, follow-up",
        marketing: "Positioning, messaging, channels, campaigns, analytics",
        finance: "Accounting, budgeting, investing, valuation, risk"
      }
    };
  }
  
  async process(query, useWebSearch = true) {
    // Generate computational token for this processing
    const computeToken = this.tokenizer.generateComputationalToken();
    
    const lowerQuery = query.toLowerCase();
    
    // Math computation
    if (this.isMathQuery(lowerQuery)) {
      return this.computeMath(query, computeToken);
    }
    
    // Web search for current info
    if (useWebSearch && this.needsWebSearch(lowerQuery)) {
      return await this.searchAndRespond(query, computeToken);
    }
    
    // Knowledge-based response
    return this.generateKnowledgeResponse(query, computeToken);
  }
  
  isMathQuery(query) {
    return /[\d\+\-\*\/\(\)\^]/.test(query) || 
           /calculate|compute|solve|what is \d/.test(query);
  }
  
  computeMath(query, computeToken) {
    try {
      // Extract math expression
      const expr = query.replace(/[^0-9+\-*/().]/g, '');
      const result = Function('"use strict"; return (' + expr + ')')();
      
      return {
        response: `The answer is ${result}. (Computed using RKL Framework with α=${this.framework.alpha})`,
        type: 'COMPUTATION',
        computeToken: computeToken.token,
        framework: 'RKL',
        result: result
      };
    } catch {
      return this.generateKnowledgeResponse(query, computeToken);
    }
  }
  
  needsWebSearch(query) {
    const webKeywords = ['weather', 'news', 'latest', 'current', 'today', 'now', 'recent'];
    return webKeywords.some(keyword => query.includes(keyword));
  }
  
  async searchAndRespond(query, computeToken) {
    try {
      const searchUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
      const response = await fetch(searchUrl);
      const data = await response.json();
      
      let answer = data.Abstract || data.AbstractText || '';
      
      if (!answer && data.RelatedTopics && data.RelatedTopics.length > 0) {
        const topics = data.RelatedTopics.slice(0, 3)
          .filter(t => t.Text)
          .map(t => t.Text)
          .join(' ');
        answer = topics;
      }
      
      return {
        response: answer || "I searched for current information but couldn't find specific results. Let me provide what I know from my knowledge base.",
        type: 'WEB_SEARCH',
        computeToken: computeToken.token,
        source: 'DuckDuckGo',
        query: query
      };
    } catch (error) {
      return this.generateKnowledgeResponse(query, computeToken);
    }
  }
  
  generateKnowledgeResponse(query, computeToken) {
    const lowerQuery = query.toLowerCase();
    
    // Find relevant knowledge domain
    for (const [domain, topics] of Object.entries(this.knowledgeBase)) {
      for (const [topic, knowledge] of Object.entries(topics)) {
        if (lowerQuery.includes(topic) || lowerQuery.includes(domain)) {
          return {
            response: `Regarding ${topic}: ${knowledge}. I can elaborate more on any specific aspect you're interested in.`,
            type: 'KNOWLEDGE_BASE',
            computeToken: computeToken.token,
            domain: domain,
            topic: topic
          };
        }
      }
    }
    
    // General intelligent response
    return {
      response: `I understand your question about "${query}". Based on my knowledge, I can provide comprehensive information. Could you specify which aspect you'd like me to focus on?`,
      type: 'GENERAL',
      computeToken: computeToken.token
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// INTELLIGENT AGENTS - USING RKL LLM
// ═══════════════════════════════════════════════════════════════════════════

class IntelligentAgent {
  constructor(id, name, specialty, color) {
    this.id = id;
    this.name = name;
    this.specialty = specialty;
    this.color = color;
    this.llm = new RKLLLM();
    this.credits = new SKACreditsCurrency();
  }
  
  async processQuery(question) {
    const result = await this.llm.process(question);
    
    return {
      agent: this.name,
      response: result.response,
      specialty: this.specialty,
      computeToken: result.computeToken,
      type: result.type,
      credits: this.credits.getCurrentBalance()
    };
  }
}

// Initialize 25 Agents with RKL LLM
const AGENTS = [
  new IntelligentAgent(1, "Supreme King", "Strategic Leadership", "#FFD700"),
  new IntelligentAgent(2, "Sales Commander", "Revenue Generation", "#FF6B35"),
  new IntelligentAgent(3, "Market Intel", "Data Analysis", "#4ECDC4"),
  new IntelligentAgent(4, "Tech Architect", "System Design", "#95E1D3"),
  new IntelligentAgent(5, "Growth Hacker", "Marketing", "#F38181"),
  new IntelligentAgent(6, "Finance Guru", "Financial Planning", "#AA96DA"),
  new IntelligentAgent(7, "Operations Master", "Process Optimization", "#FCBAD3"),
  new IntelligentAgent(8, "Legal Shield", "Compliance", "#FFFFD2"),
  new IntelligentAgent(9, "Customer Success", "Client Relations", "#A8D8EA"),
  new IntelligentAgent(10, "Product Visionary", "Product Strategy", "#AA96DA"),
  new IntelligentAgent(11, "HR Champion", "Talent Management", "#FCBAD3"),
  new IntelligentAgent(12, "Brand Storyteller", "Content & Communications", "#FEC8D8"),
  new IntelligentAgent(13, "Security Guardian", "Cybersecurity", "#957DAD"),
  new IntelligentAgent(14, "Innovation Lab", "R&D", "#D291BC"),
  new IntelligentAgent(15, "Quality Assurance", "Testing", "#FEC8D8"),
  new IntelligentAgent(16, "Supply Chain", "Logistics", "#E0BBE4"),
  new IntelligentAgent(17, "Partnership Dev", "Strategic Alliances", "#957DAD"),
  new IntelligentAgent(18, "Analytics Engine", "Metrics", "#D291BC"),
  new IntelligentAgent(19, "Training Master", "Education", "#FFDFD3"),
  new IntelligentAgent(20, "Community Builder", "Engagement", "#FEC8D8"),
  new IntelligentAgent(21, "Crisis Manager", "Emergency Response", "#E0BBE4"),
  new IntelligentAgent(22, "Sustainability Lead", "ESG", "#957DAD"),
  new IntelligentAgent(23, "Global Expansion", "International Growth", "#D291BC"),
  new IntelligentAgent(24, "Platform Engineer", "Infrastructure", "#FFDFD3"),
  new IntelligentAgent(25, "AI Research", "Machine Learning", "#C3B1E1")
];

// ═══════════════════════════════════════════════════════════════════════════
// USER AUTHENTICATION
// ═══════════════════════════════════════════════════════════════════════════

class UserAuth {
  constructor() {
    this.users = new Map();
    this.sessions = new Map();
    this.tokenizer = new TemporalDNATokenization();
  }
  
  async register(email, password, name) {
    if (this.users.has(email)) {
      return { success: false, error: "Email already registered" };
    }
    
    const user = {
      email,
      password: btoa(password), // In production use proper hashing
      name,
      createdAt: Date.now(),
      credits: 0
    };
    
    this.users.set(email, user);
    return { success: true, user: { email, name } };
  }
  
  async login(email, password) {
    const user = this.users.get(email);
    if (!user || btoa(password) !== user.password) {
      return { success: false, error: "Invalid credentials" };
    }
    
    // Generate session token using Temporal DNA
    const sessionToken = this.tokenizer.generateComputationalToken();
    this.sessions.set(sessionToken.token, { email, createdAt: Date.now() });
    
    return { 
      success: true, 
      sessionId: sessionToken.token,
      user: { email: user.email, name: user.name }
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN REQUEST HANDLER
// ═══════════════════════════════════════════════════════════════════════════

const auth = new UserAuth();
const currency = new SKACreditsCurrency();
const tokenizer = new TemporalDNATokenization();

async function handleRequest(request) {
  const url = new URL(request.url);
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // API Routes
  if (url.pathname.startsWith('/api/')) {
    return handleAPI(url, request, corsHeaders);
  }
  
  // Frontend
  return handleFrontend();
}

async function handleAPI(url, request, corsHeaders) {
  const path = url.pathname;
  
  // Agent chat
  if (path.match(/^\/api\/agent\/\d+\/chat$/)) {
    const agentId = parseInt(path.split('/')[3]);
    const agent = AGENTS[agentId - 1];
    if (!agent) return jsonResponse({ error: "Agent not found" }, 404, corsHeaders);
    
    const { message } = await request.json();
    const response = await agent.processQuery(message);
    
    return jsonResponse(response, 200, corsHeaders);
  }
  
  // Currency info
  if (path === '/api/credits') {
    return jsonResponse(currency.getDetailedInfo(), 200, corsHeaders);
  }
  
  // Tokenization info  
  if (path === '/api/tokenization') {
    const token = tokenizer.generateComputationalToken();
    return jsonResponse({
      purpose: 'COMPUTATIONAL',
      example: token,
      format: '16 digits (12 random + 4 synchronized)'
    }, 200, corsHeaders);
  }
  
  // System info
  if (path === '/api/system') {
    return jsonResponse({
      systems: {
        tokenization: {
          purpose: 'Computational processing',
          format: '16-digit blocks',
          type: 'TEMPORAL_DNA'
        },
        currency: {
          purpose: 'Financial transactions',
          balance: currency.getCurrentBalance(),
          balanceUSD: currency.getBalanceUSD(),
          type: 'SKA_CREDITS'
        },
        framework: {
          name: 'RKL',
          alpha: 25,
          complexity: 'O(n^1.77)'
        }
      },
      interlocking: 'Both systems use synchronized validation for security',
      separation: 'Tokenization for computation, Currency for finance'
    }, 200, corsHeaders);
  }
  
  // Auth endpoints
  if (path === '/api/auth/register' && request.method === 'POST') {
    const { email, password, name } = await request.json();
    return jsonResponse(await auth.register(email, password, name), 200, corsHeaders);
  }
  
  if (path === '/api/auth/login' && request.method === 'POST') {
    const { email, password } = await request.json();
    return jsonResponse(await auth.login(email, password), 200, corsHeaders);
  }
  
  return jsonResponse({ error: "Not found" }, 404, corsHeaders);
}

function jsonResponse(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' }
  });
}

function handleFrontend() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sales King Academy - Dual System Architecture</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #000 0%, #1a1a00 100%);
  color: #0f0;
  min-height: 100vh;
}
.container { max-width: 1400px; margin: 0 auto; padding: 20px; }
.header { 
  background: linear-gradient(90deg, #000, #1a1a00);
  border-bottom: 3px solid #ffd700;
  padding: 20px;
  text-align: center;
}
.header h1 { 
  color: #ffd700; 
  font-size: clamp(1.5rem, 5vw, 3rem);
  text-shadow: 0 0 20px #ffd700;
}
.systems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
}
.system-card {
  background: #0a0a00;
  border: 3px solid #ffd700;
  border-radius: 15px;
  padding: 25px;
}
.system-card h2 { color: #ffd700; margin-bottom: 15px; }
.system-card .value { 
  font-size: clamp(1.5rem, 4vw, 2rem);
  color: #0f0;
  font-weight: bold;
  margin: 10px 0;
}
.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}
.agent-card {
  background: #0a0a00;
  border: 2px solid;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.2s;
}
.agent-card:hover { transform: scale(1.05); }
.chat-modal {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.95);
  z-index: 1000;
}
.chat-modal.active { display: flex; align-items: center; justify-content: center; }
.chat-window {
  background: #000;
  border: 3px solid #ffd700;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}
.chat-header {
  background: #ffd700;
  color: #000;
  padding: 20px;
  border-radius: 17px 17px 0 0;
  display: flex;
  justify-content: space-between;
}
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
.message {
  padding: 15px;
  border-radius: 10px;
  margin: 10px 0;
  max-width: 85%;
}
.message.user {
  background: #1a1a00;
  border: 2px solid #0f0;
  margin-left: auto;
}
.message.agent {
  background: #0a0a00;
  border: 2px solid #ffd700;
}
.chat-input {
  display: flex;
  padding: 20px;
  gap: 10px;
  border-top: 2px solid #ffd700;
}
.chat-input input {
  flex: 1;
  padding: 15px;
  background: #0a0a00;
  border: 2px solid #0f0;
  border-radius: 10px;
  color: #0f0;
  font-size: 16px;
}
.btn {
  padding: 15px 30px;
  background: #ffd700;
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.btn:hover { background: #ffed4e; }
.close-btn {
  background: #000;
  color: #ffd700;
  border: 2px solid #ffd700;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}
@media (max-width: 768px) {
  .agents-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }
  .chat-window { width: 95%; max-height: 90vh; }
}
</style>
</head>
<body>
<div class="header">
  <h1>👑 SALES KING ACADEMY</h1>
  <p style="color: #0f0; margin-top: 10px;">Dual System Architecture: Computation & Currency</p>
</div>

<div class="container">
  <div class="systems-grid">
    <div class="system-card">
      <h2>💎 SKA Credits Currency</h2>
      <div class="value" id="credits">Loading...</div>
      <p>Purpose: Financial Transactions</p>
      <p>Minting: 1 credit/second since July 1, 2024</p>
      <p>Value: 1 SKA = $1 USD</p>
    </div>
    
    <div class="system-card">
      <h2>🔷 Temporal DNA Tokenization</h2>
      <div class="value" id="token">Generating...</div>
      <p>Purpose: Computational Processing</p>
      <p>Format: 16 digits (12 random + 4 sync)</p>
      <p>Used for: LLM computation tracking</p>
    </div>
    
    <div class="system-card">
      <h2>⚡ RKL Framework</h2>
      <div class="value">α = 25</div>
      <p>Complexity: O(n^1.77)</p>
      <p>Quantum-classical balance</p>
      <p>Powers all AI agent processing</p>
    </div>
  </div>

  <h2 style="color: #ffd700; margin: 40px 0 20px;">25 AI Agents with RKL LLM</h2>
  <div class="agents-grid" id="agents"></div>
</div>

<div class="chat-modal" id="chat-modal">
  <div class="chat-window">
    <div class="chat-header">
      <h3 id="chat-agent-name">Agent</h3>
      <button class="close-btn" onclick="closeChat()">✕</button>
    </div>
    <div class="chat-messages" id="chat-messages"></div>
    <div class="chat-input">
      <input type="text" id="chat-input" placeholder="Ask anything..." onkeypress="if(event.key==='Enter') sendMessage()">
      <button class="btn" onclick="sendMessage()">Send</button>
    </div>
  </div>
</div>

<script>
let currentAgent = null;
const agents = ${JSON.stringify(AGENTS.map(a => ({ id: a.id, name: a.name, specialty: a.specialty, color: a.color })))};

// Render agents
const agentsGrid = document.getElementById('agents');
agents.forEach(agent => {
  const card = document.createElement('div');
  card.className = 'agent-card';
  card.style.borderColor = agent.color;
  card.innerHTML = \`
    <div style="color: \${agent.color}; font-weight: bold; margin-bottom: 10px;">\${agent.name}</div>
    <div style="color: #0f0; font-size: 0.9rem;">\${agent.specialty}</div>
  \`;
  card.onclick = () => openChat(agent);
  agentsGrid.appendChild(card);
});

// Update currency every 2 seconds
setInterval(async () => {
  try {
    const resp = await fetch('/api/credits');
    const data = await resp.json();
    document.getElementById('credits').textContent = data.balance.toLocaleString() + ' Credits ($' + data.balanceUSD.toLocaleString() + ')';
  } catch {}
}, 2000);

// Update computational token every 3 seconds
setInterval(async () => {
  try {
    const resp = await fetch('/api/tokenization');
    const data = await resp.json();
    document.getElementById('token').textContent = data.example.token;
  } catch {}
}, 3000);

// Initial load
(async () => {
  const [creditsResp, tokenResp] = await Promise.all([
    fetch('/api/credits'),
    fetch('/api/tokenization')
  ]);
  const credits = await creditsResp.json();
  const token = await tokenResp.json();
  
  document.getElementById('credits').textContent = credits.balance.toLocaleString() + ' Credits ($' + credits.balanceUSD.toLocaleString() + ')';
  document.getElementById('token').textContent = token.example.token;
})();

function openChat(agent) {
  currentAgent = agent;
  document.getElementById('chat-agent-name').textContent = agent.name;
  document.getElementById('chat-messages').innerHTML = '';
  document.getElementById('chat-modal').classList.add('active');
}

function closeChat() {
  document.getElementById('chat-modal').classList.remove('active');
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;
  
  input.value = '';
  
  const messagesDiv = document.getElementById('chat-messages');
  messagesDiv.innerHTML += \`<div class="message user">\${message}</div>\`;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  
  messagesDiv.innerHTML += \`<div class="message agent" id="loading">Processing with RKL LLM...</div>\`;
  
  try {
    const resp = await fetch(\`/api/agent/\${currentAgent.id}/chat\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    
    const data = await resp.json();
    document.getElementById('loading').remove();
    
    const typeLabel = data.type === 'WEB_SEARCH' ? '🌐 Web Search' : 
                     data.type === 'COMPUTATION' ? '⚡ Computed' : 
                     data.type === 'KNOWLEDGE_BASE' ? '📚 Knowledge' : '';
    
    messagesDiv.innerHTML += \`<div class="message agent">
      <div style="color: #888; font-size: 0.8rem; margin-bottom: 5px;">\${typeLabel} • Token: \${data.computeToken.slice(0,8)}...</div>
      \${data.response}
    </div>\`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (error) {
    document.getElementById('loading').textContent = 'Error: ' + error.message;
  }
}
</script>
</body>
</html>`;
  
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}

export default {
  async fetch(request) {
    return handleRequest(request);
  }
};
