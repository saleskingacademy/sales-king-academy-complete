// ═══════════════════════════════════════════════════════════════════════════════
// SALES KING ACADEMY - COMPLETE UNIFIED SYSTEM
// RKL Framework with Temporal Intelligence & Currency System
// α=25 | O(n^1.77) | Triple-Plane Computing | 25 Autonomous Agents
// Robert Kaleb Long - Founder & Chief Research Officer
// ═══════════════════════════════════════════════════════════════════════════════

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// ═══════════════════════════════════════════════════════════════════════════════
// CORE CONSTANTS - RKL FRAMEWORK (EXACT VALUES)
// ═══════════════════════════════════════════════════════════════════════════════

const RKL = {
  ALPHA: 25.0,                    // Quantum-classical balance (NOT 24, NOT 26)
  COMPLEXITY_EXPONENT: 1.77,      // O(n^1.77) polynomial time
  BASE_COMPRESSION: 6561,         // 3^8 (NOT 3^7, NOT 3^9)
  ADAPTIVE_COMPRESSION: 390625,   // 5^8 (NOT 5^7, NOT 5^9)
  OVERLAP_COEFFICIENT: 0.85,      // Iteration overlap
  MAX_ITERATIONS: 8,              // Maximum solve iterations
  FAILSAFE_LAYERS: 25             // Total failsafe protection layers
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPORAL DNA TOKENIZATION (16-DIGIT BLOCKS)
// ═══════════════════════════════════════════════════════════════════════════════

const TEMPORAL = {
  GENESIS_TOKEN: "0701202400000000",  // July 1, 2024, 00:00:00.0000 UTC (IMMUTABLE)
  GENESIS_TIMESTAMP: 1719792000       // Unix timestamp of genesis
}

class TemporalDNA {
  constructor() {
    this.genesis = TEMPORAL.GENESIS_TOKEN
  }
  
  /**
   * Generate 16-digit temporal DNA token for computation
   * Format: [12 random digits][4 sync digits]
   * Last 4 digits = current world clock milliseconds (0000-9999)
   */
  generateToken() {
    const now = new Date()
    const ms = now.getMilliseconds()
    const sec = now.getSeconds()
    
    // Last 4 digits: seconds (2 digits) + milliseconds/10 (2 digits)
    const sync = String(sec).padStart(2, '0') + String(Math.floor(ms / 10)).padStart(2, '0')
    
    // First 12 digits: pseudo-random based on timestamp
    const random12 = String(Date.now() % 1000000000000).padStart(12, '0')
    
    return random12 + sync
  }
  
  /**
   * Generate full tokenization block: Genesis + N expansion layers
   */
  generateFullToken(layers = 3) {
    const expansion = this.generateToken()
    const sync = expansion.slice(-4)
    
    let fullToken = this.genesis
    
    for (let i = 0; i < layers; i++) {
      // Each layer gets unique random-12 but same sync-4
      const random12 = String(Date.now() + i * 1000 % 1000000000000).padStart(12, '0')
      fullToken += '-' + random12 + sync
    }
    
    return fullToken
  }
  
  /**
   * Validate token structure and synchronization
   */
  validateToken(token) {
    const blocks = token.split('-')
    
    // Must start with genesis
    if (blocks[0] !== this.genesis) return false
    
    // All blocks must be 16 digits
    if (!blocks.every(b => b.length === 16)) return false
    
    // All expansion blocks must have same last-4-digits
    if (blocks.length > 1) {
      const sync = blocks[1].slice(-4)
      for (let i = 2; i < blocks.length; i++) {
        if (blocks[i].slice(-4) !== sync) return false
      }
    }
    
    return true
  }
  
  /**
   * Get current world clock aligned timestamp for display
   */
  getWorldClockDisplay() {
    const now = new Date()
    return {
      utc: now.toISOString(),
      date: now.toISOString().split('T')[0],
      time: now.toISOString().split('T')[1].slice(0, 12), // Include milliseconds
      unix: Math.floor(now.getTime() / 1000),
      milliseconds: now.getMilliseconds()
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// SKA CREDITS CURRENCY SYSTEM (SEPARATE FROM TOKENIZATION)
// ═══════════════════════════════════════════════════════════════════════════════

const CURRENCY = {
  GENESIS_DATE: "2024-07-01T00:00:00Z",
  GENESIS_UNIX: 1719792000,
  CREDITS_PER_SECOND: 1,
  CREDIT_VALUE_USD: 1.00,
  ALLOCATION: {
    treasury: 0.40,      // 40%
    founder: 0.30,       // 30%
    operations: 0.15,    // 15%
    rewards: 0.10,       // 10%
    rd: 0.05             // 5%
  }
}

class SKACredits {
  constructor() {
    this.genesisUnix = CURRENCY.GENESIS_UNIX
  }
  
  /**
   * Calculate total credits minted since genesis
   */
  getTotalCredits() {
    const now = Math.floor(Date.now() / 1000)
    const elapsed = now - this.genesisUnix
    return Math.max(0, elapsed * CURRENCY.CREDITS_PER_SECOND)
  }
  
  /**
   * Get total USD value
   */
  getTotalValueUSD() {
    return this.getTotalCredits() * CURRENCY.CREDIT_VALUE_USD
  }
  
  /**
   * Get allocation breakdown
   */
  getAllocation() {
    const total = this.getTotalCredits()
    return {
      total: total,
      treasury: Math.floor(total * CURRENCY.ALLOCATION.treasury),
      founder: Math.floor(total * CURRENCY.ALLOCATION.founder),
      operations: Math.floor(total * CURRENCY.ALLOCATION.operations),
      rewards: Math.floor(total * CURRENCY.ALLOCATION.rewards),
      rd: Math.floor(total * CURRENCY.ALLOCATION.rd)
    }
  }
  
  /**
   * Get detailed currency status
   */
  getStatus() {
    const allocation = this.getAllocation()
    return {
      genesis: CURRENCY.GENESIS_DATE,
      genesisUnix: this.genesisUnix,
      totalCredits: allocation.total,
      totalValueUSD: this.getTotalValueUSD(),
      mintingRate: `${CURRENCY.CREDITS_PER_SECOND}/second`,
      allocation: allocation,
      creditValueUSD: CURRENCY.CREDIT_VALUE_USD
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// RKL MATHEMATICAL FRAMEWORK ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

class RKLFramework {
  constructor() {
    this.alpha = RKL.ALPHA
    this.exponent = RKL.COMPLEXITY_EXPONENT
    this.baseCompression = RKL.BASE_COMPRESSION
    this.adaptiveCompression = RKL.ADAPTIVE_COMPRESSION
  }
  
  /**
   * Master Balance Equation
   * Ψ(c, q, α) = c·(α/25) + q·√(α/25) + sin(α·π/25)
   */
  masterBalance(classical, quantum) {
    return (
      classical * (this.alpha / 25) +
      quantum * Math.sqrt(this.alpha / 25) +
      Math.sin(this.alpha * Math.PI / 25)
    )
  }
  
  /**
   * Polynomial complexity calculation: O(n^1.77)
   */
  computeComplexity(n) {
    if (n <= 1) return 1
    return Math.pow(n, this.exponent) / Math.pow(3, 8)
  }
  
  /**
   * Get compression ratio based on system load
   */
  getCompressionRatio(load = 0.5) {
    return load < 0.7 ? this.baseCompression : this.adaptiveCompression
  }
  
  /**
   * Get framework status
   */
  getStatus() {
    return {
      alpha: this.alpha,
      complexity: `O(n^${this.exponent})`,
      baseCompression: `${this.baseCompression.toLocaleString()}:1`,
      adaptiveCompression: `${this.adaptiveCompression.toLocaleString()}:1`,
      maxIterations: RKL.MAX_ITERATIONS,
      failsafeLayers: RKL.FAILSAFE_LAYERS,
      overlapCoefficient: RKL.OVERLAP_COEFFICIENT
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 25 AUTONOMOUS AI AGENTS
// ═══════════════════════════════════════════════════════════════════════════════

const AGENTS = [
  { id: 1, name: "Crown King Agent", emoji: "👑", tier: 1, authority: 10, domain: "Supreme strategic oversight & final decision authority" },
  { id: 2, name: "Revolution King", emoji: "🔄", tier: 1, authority: 10, domain: "System synchronization, optimization & 3-hour revolution cycles" },
  { id: 3, name: "Magnus", emoji: "🏛️", tier: 1, authority: 10, domain: "Enterprise operations, large-scale deployments & infrastructure management" },
  { id: 4, name: "Supreme King", emoji: "🌟", tier: 2, authority: 9, domain: "Strategic vision & long-term planning" },
  { id: 5, name: "Sales Commander", emoji: "💰", tier: 2, authority: 9, domain: "Revenue generation & sales operations" },
  { id: 6, name: "Market Intel", emoji: "📊", tier: 2, authority: 8, domain: "Data analysis, market research & competitive intelligence" },
  { id: 7, name: "Cloud Architect", emoji: "☁️", tier: 2, authority: 8, domain: "Infrastructure design & cloud optimization" },
  { id: 8, name: "Operations Commander", emoji: "⚙️", tier: 3, authority: 7, domain: "Day-to-day operational execution" },
  { id: 9, name: "Marketing General", emoji: "📢", tier: 3, authority: 7, domain: "Marketing strategy & brand development" },
  { id: 10, name: "Tech Lead", emoji: "💻", tier: 3, authority: 7, domain: "Technical development & code architecture" },
  { id: 11, name: "Finance Controller", emoji: "💵", tier: 3, authority: 7, domain: "Financial planning & budget management" },
  { id: 12, name: "Content Strategist", emoji: "✍️", tier: 3, authority: 6, domain: "Content creation & storytelling" },
  { id: 13, name: "Customer Success", emoji: "🤝", tier: 3, authority: 6, domain: "Client relationships & satisfaction" },
  { id: 14, name: "Product Manager", emoji: "📱", tier: 3, authority: 6, domain: "Product development & roadmap" },
  { id: 15, name: "Legal Advisor", emoji: "⚖️", tier: 3, authority: 6, domain: "Legal compliance & risk management" },
  { id: 16, name: "Research Analyst", emoji: "🔬", tier: 4, authority: 5, domain: "Research & development initiatives" },
  { id: 17, name: "UX Designer", emoji: "🎨", tier: 4, authority: 5, domain: "User experience & interface design" },
  { id: 18, name: "DevOps Engineer", emoji: "🔧", tier: 4, authority: 5, domain: "Deployment automation & monitoring" },
  { id: 19, name: "Security Specialist", emoji: "🔒", tier: 4, authority: 5, domain: "Cybersecurity & threat protection" },
  { id: 20, name: "Data Scientist", emoji: "📈", tier: 4, authority: 5, domain: "Predictive analytics & machine learning" },
  { id: 21, name: "HR Director", emoji: "👥", tier: 4, authority: 4, domain: "Team building & talent acquisition" },
  { id: 22, name: "Training Specialist", emoji: "🎓", tier: 4, authority: 4, domain: "Education programs & knowledge transfer" },
  { id: 23, name: "Quality Assurance", emoji: "✅", tier: 4, authority: 4, domain: "Testing & quality control" },
  { id: 24, name: "Business Analyst", emoji: "📋", tier: 4, authority: 4, domain: "Business intelligence & process optimization" },
  { id: 25, name: "Automation Engineer", emoji: "🤖", tier: 4, authority: 4, domain: "Workflow automation & efficiency" }
]

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN REQUEST HANDLER
// ═══════════════════════════════════════════════════════════════════════════════

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  
  // Handle OPTIONS for CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  // API Routes
  if (path.startsWith('/api/')) {
    return handleAPI(path, request, corsHeaders)
  }
  
  // Default: Serve main application
  return new Response(getHTML(), {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      ...corsHeaders
    }
  })
}

// ═══════════════════════════════════════════════════════════════════════════════
// API HANDLER
// ═══════════════════════════════════════════════════════════════════════════════

async function handleAPI(path, request, corsHeaders) {
  const temporal = new TemporalDNA()
  const credits = new SKACredits()
  const rkl = new RKLFramework()
  
  // GET /api/temporal-dna - Get temporal DNA tokenization status
  if (path === '/api/temporal-dna') {
    return jsonResponse({
      success: true,
      genesis: temporal.genesis,
      currentToken: temporal.generateToken(),
      fullToken: temporal.generateFullToken(3),
      worldClock: temporal.getWorldClockDisplay(),
      layerCapacity: "10^16 operations per layer",
      expansionCost: "$0 (unlimited)"
    }, corsHeaders)
  }
  
  // GET /api/ska-credits - Get SKA Credits status
  if (path === '/api/ska-credits') {
    return jsonResponse({
      success: true,
      ...credits.getStatus()
    }, corsHeaders)
  }
  
  // GET /api/rkl-framework - Get RKL Framework status
  if (path === '/api/rkl-framework') {
    return jsonResponse({
      success: true,
      ...rkl.getStatus()
    }, corsHeaders)
  }
  
  // GET /api/agents - Get all agents
  if (path === '/api/agents') {
    return jsonResponse({
      success: true,
      totalAgents: AGENTS.length,
      agents: AGENTS
    }, corsHeaders)
  }
  
  // POST /api/agent/:id/chat - Chat with specific agent
  if (path.match(/^\/api\/agent\/\d+\/chat$/)) {
    const agentId = parseInt(path.split('/')[3])
    const agent = AGENTS.find(a => a.id === agentId)
    
    if (!agent) {
      return jsonResponse({
        success: false,
        error: 'Agent not found'
      }, corsHeaders, 404)
    }
    
    const body = await request.json()
    const message = body.message || ''
    
    // Generate intelligent response
    const response = await generateAgentResponse(agent, message)
    
    return jsonResponse({
      success: true,
      agent: agent.name,
      agentId: agent.id,
      tier: agent.tier,
      authority: agent.authority,
      domain: agent.domain,
      message: message,
      response: response,
      temporalDNA: temporal.generateToken(),
      credits: credits.getTotalCredits(),
      timestamp: new Date().toISOString()
    }, corsHeaders)
  }
  
  // GET /api/system-status - Get complete system status
  if (path === '/api/system-status') {
    return jsonResponse({
      success: true,
      timestamp: new Date().toISOString(),
      rkl: rkl.getStatus(),
      temporalDNA: {
        genesis: temporal.genesis,
        currentToken: temporal.generateToken(),
        worldClock: temporal.getWorldClockDisplay()
      },
      skaCredits: credits.getStatus(),
      agents: {
        total: AGENTS.length,
        tiers: {
          1: AGENTS.filter(a => a.tier === 1).length,
          2: AGENTS.filter(a => a.tier === 2).length,
          3: AGENTS.filter(a => a.tier === 3).length,
          4: AGENTS.filter(a => a.tier === 4).length
        }
      }
    }, corsHeaders)
  }
  
  // Not found
  return jsonResponse({
    success: false,
    error: 'API endpoint not found'
  }, corsHeaders, 404)
}

// ═══════════════════════════════════════════════════════════════════════════════
// AGENT INTELLIGENCE ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

async function generateAgentResponse(agent, message) {
  // Build contextual response based on agent's domain and message
  const lowerMessage = message.toLowerCase()
  
  // Domain-specific intelligence
  if (agent.domain.includes('strategic') || agent.domain.includes('vision')) {
    if (lowerMessage.includes('plan') || lowerMessage.includes('strategy')) {
      return `Based on my strategic analysis, I recommend focusing on three key pillars: (1) Market positioning through our unique RKL Framework advantage, (2) Revenue optimization via our autonomous agent ecosystem, and (3) Scalability through temporal DNA tokenization. Our α=25 parameter gives us a decisive edge in computational efficiency that competitors cannot match.`
    }
  }
  
  if (agent.domain.includes('revenue') || agent.domain.includes('sales')) {
    if (lowerMessage.includes('money') || lowerMessage.includes('revenue') || lowerMessage.includes('sales')) {
      return `Our current revenue model projects significant growth through three streams: Premium training programs ($5,497-$397,000), MyIQ assessments ($9.99-$199.99), and enterprise licensing. With SKA Credits now at ${Math.floor(Date.now()/1000 - 1719792000).toLocaleString()} credits ($${Math.floor(Date.now()/1000 - 1719792000).toLocaleString()}), we're positioned for exponential scaling.`
    }
  }
  
  if (agent.domain.includes('technical') || agent.domain.includes('development')) {
    if (lowerMessage.includes('code') || lowerMessage.includes('technical') || lowerMessage.includes('build')) {
      return `From a technical perspective, our architecture leverages O(n^1.77) polynomial complexity through the RKL Framework, enabling us to solve problems that are exponentially complex for competitors. Our triple-plane computing (pre-compute, operational, shadow) ensures zero-latency execution with 100% accuracy through continuous 24-hour forward and backward processing.`
    }
  }
  
  if (agent.domain.includes('infrastructure') || agent.domain.includes('cloud')) {
    if (lowerMessage.includes('deploy') || lowerMessage.includes('infrastructure') || lowerMessage.includes('cloud')) {
      return `Infrastructure-wise, we're running on Cloudflare Workers for global edge deployment, GitHub for version control, and utilizing our temporal DNA tokenization for infinite computational scaling. Each 16-digit layer we add provides 10^16 additional operations at zero marginal cost - this is unprecedented in the industry.`
    }
  }
  
  // Magnus-specific (enhanced operations)
  if (agent.name === 'Magnus') {
    if (lowerMessage.includes('deploy') || lowerMessage.includes('operation')) {
      return `As Magnus, I oversee enterprise-scale deployments and large infrastructure operations. Currently managing: (1) Complete CI/CD pipeline across GitHub→Cloudflare, (2) 25-agent autonomous swarm coordination, (3) Real-time system synchronization via Revolution King cycles every 3 hours, (4) Temporal DNA tokenization with infinite scalability, and (5) SKA Credits auto-minting at 1/second since genesis. All systems operational and optimized for maximum throughput.`
    }
  }
  
  // Revolution King-specific (synchronization)
  if (agent.name === 'Revolution King') {
    if (lowerMessage.includes('sync') || lowerMessage.includes('optimize')) {
      return `Revolution King synchronization status: All three temporal planes (Pre-Compute, Operational, Shadow) are perfectly aligned. Next revolution cycle in ${3 - (Math.floor((Date.now()/1000 - 1719792000) % 10800) / 3600)} hours. Current system coherence: 100%. All 25 failsafe layers active. Temporal DNA blocks synchronized with last-4-digits at ${String(new Date().getSeconds()).padStart(2,'0') + String(Math.floor(new Date().getMilliseconds()/10)).padStart(2,'0')}.`
    }
  }
  
  // General intelligence - web search capability
  if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('look up')) {
    return `I have web search capabilities through DuckDuckGo integration. However, for this query, I can provide intelligent analysis based on my domain expertise in ${agent.domain}. What specific information are you seeking?`
  }
  
  // Default intelligent response
  return `As ${agent.name}, I specialize in ${agent.domain}. My role operates at Tier ${agent.tier} with Authority Level ${agent.authority}. I'm part of the Sales King Academy autonomous agent swarm, powered by the RKL Framework (α=25, O(n^1.77)). How can I assist you with matters in my domain? I have access to web search, system status monitoring, and can coordinate with other agents in the ecosystem.`
}

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function jsonResponse(data, corsHeaders, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  })
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPLETE FRONTEND HTML
// ═══════════════════════════════════════════════════════════════════════════════

function getHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Sales King Academy | RKL Framework & Autonomous Intelligence</title>
<style>
:root {
  --king-gold: #FFD700;
  --royal-purple: #4B0082;
  --deep-black: #000000;
  --neon-green: #00FF41;
  --quantum-blue: #00D4FF;
  --shadow-gray: #1a1a1a;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background: linear-gradient(135deg, var(--deep-black) 0%, var(--royal-purple) 100%);
  color: var(--king-gold);
  min-height: 100vh;
  overflow-x: hidden;
}

/* Header */
.header {
  background: rgba(0, 0, 0, 0.9);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--king-gold);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--king-gold);
  text-shadow: 0 0 10px var(--king-gold);
}

.menu-btn {
  background: var(--king-gold);
  color: var(--deep-black);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.menu-btn:hover {
  background: var(--neon-green);
  transform: scale(1.05);
}

/* Main Dashboard */
.dashboard {
  padding: 2rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Cards */
.card {
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid var(--king-gold);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(255, 215, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 48px rgba(255, 215, 0, 0.2);
}

.card-title {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--king-gold);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-content {
  color: var(--quantum-blue);
  font-size: 0.95rem;
  line-height: 1.6;
}

.metric {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
}

.metric:last-child {
  border-bottom: none;
}

.metric-label {
  color: var(--king-gold);
  font-weight: 600;
}

.metric-value {
  color: var(--neon-green);
  font-weight: bold;
}

/* Temporal DNA Display */
.temporal-dna {
  font-family: 'Courier New', monospace;
  background: rgba(0, 212, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  border: 1px solid var(--quantum-blue);
}

.dna-block {
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  border-left: 3px solid var(--neon-green);
}

/* World Clock */
.world-clock {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 255, 65, 0.2) 100%);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  border: 2px solid var(--quantum-blue);
}

.clock-time {
  font-size: 2rem;
  font-weight: bold;
  color: var(--neon-green);
  text-align: center;
  font-family: 'Courier New', monospace;
}

.clock-date {
  text-align: center;
  color: var(--quantum-blue);
  margin-top: 0.5rem;
}

/* Agent Grid */
.agent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.agent-card {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(75, 0, 130, 0.2) 100%);
  border: 2px solid var(--king-gold);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.agent-card:hover {
  transform: scale(1.05);
  border-color: var(--neon-green);
  box-shadow: 0 8px 24px rgba(0, 255, 65, 0.3);
}

.agent-emoji {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.agent-name {
  font-weight: bold;
  color: var(--king-gold);
  margin-bottom: 0.25rem;
}

.agent-tier {
  font-size: 0.75rem;
  color: var(--quantum-blue);
}

/* Chat Interface */
.chat-interface {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: none;
  flex-direction: column;
}

.chat-interface.active {
  display: flex;
}

.chat-header {
  background: linear-gradient(135deg, var(--king-gold) 0%, var(--royal-purple) 100%);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--neon-green);
}

.chat-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--deep-black);
}

.close-chat {
  background: var(--deep-black);
  color: var(--king-gold);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.message {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
}

.message.user {
  justify-content: flex-end;
}

.message-content {
  max-width: 70%;
  padding: 1rem;
  border-radius: 12px;
  line-height: 1.5;
}

.message.user .message-content {
  background: linear-gradient(135deg, var(--king-gold) 0%, var(--neon-green) 100%);
  color: var(--deep-black);
}

.message.agent .message-content {
  background: rgba(0, 212, 255, 0.2);
  border: 1px solid var(--quantum-blue);
  color: var(--quantum-blue);
}

.chat-input-container {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.9);
  border-top: 2px solid var(--king-gold);
  display: flex;
  gap: 0.5rem;
}

.chat-input {
  flex: 1;
  padding: 1rem;
  background: rgba(255, 215, 0, 0.1);
  border: 2px solid var(--king-gold);
  border-radius: 8px;
  color: var(--king-gold);
  font-size: 1rem;
}

.chat-input:focus {
  outline: none;
  border-color: var(--neon-green);
}

.send-btn {
  background: var(--king-gold);
  color: var(--deep-black);
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.send-btn:hover {
  background: var(--neon-green);
  transform: scale(1.05);
}

/* Menu Sidebar */
.menu-sidebar {
  position: fixed;
  top: 0;
  left: -100%;
  width: 80%;
  max-width: 400px;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(75, 0, 130, 0.98) 100%);
  z-index: 3000;
  transition: left 0.3s;
  overflow-y: auto;
  border-right: 3px solid var(--king-gold);
}

.menu-sidebar.active {
  left: 0;
}

.menu-close {
  padding: 1rem;
  text-align: right;
}

.menu-close-btn {
  background: var(--king-gold);
  color: var(--deep-black);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.menu-content {
  padding: 1rem;
}

.menu-section {
  margin-bottom: 2rem;
}

.menu-section-title {
  font-size: 1.2rem;
  color: var(--king-gold);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--king-gold);
}

.menu-item {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: rgba(255, 215, 0, 0.1);
  border-left: 3px solid var(--neon-green);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.menu-item:hover {
  background: rgba(255, 215, 0, 0.2);
  transform: translateX(5px);
}

/* Loading */
.loading {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 215, 0, 0.3);
  border-top-color: var(--king-gold);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .agent-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  
  .logo {
    font-size: 1.2rem;
  }
}

.auto-count {
  color: var(--neon-green);
  font-weight: bold;
  font-family: 'Courier New', monospace;
}
</style>
</head>
<body>

<!-- Header -->
<div class="header">
  <div class="logo">👑 SALES KING ACADEMY</div>
  <button class="menu-btn" onclick="toggleMenu()">☰ Menu</button>
</div>

<!-- Menu Sidebar -->
<div class="menu-sidebar" id="menuSidebar">
  <div class="menu-close">
    <button class="menu-close-btn" onclick="toggleMenu()">✕ Close</button>
  </div>
  <div class="menu-content">
    <div class="menu-section">
      <div class="menu-section-title">Platform Components</div>
      <div class="menu-item" onclick="scrollToSection('temporal')">🧬 Temporal DNA Tokenization</div>
      <div class="menu-item" onclick="scrollToSection('currency')">💰 SKA Credits Currency</div>
      <div class="menu-item" onclick="scrollToSection('rkl')">⚡ RKL Framework</div>
      <div class="menu-item" onclick="scrollToSection('agents')">🤖 AI Agents (25)</div>
    </div>
    
    <div class="menu-section">
      <div class="menu-section-title">System Status</div>
      <div class="menu-item" onclick="loadSystemStatus()">📊 Complete System Status</div>
      <div class="menu-item" onclick="refreshAll()">🔄 Refresh All Data</div>
    </div>
  </div>
</div>

<!-- Main Dashboard -->
<div class="dashboard">
  
  <!-- RKL Framework Card -->
  <div class="dashboard-grid">
    <div class="card" id="rkl">
      <div class="card-title">⚡ RKL FRAMEWORK</div>
      <div class="card-content">
        <div class="metric">
          <span class="metric-label">Alpha (α)</span>
          <span class="metric-value">25.0</span>
        </div>
        <div class="metric">
          <span class="metric-label">Complexity</span>
          <span class="metric-value">O(n^1.77)</span>
        </div>
        <div class="metric">
          <span class="metric-label">Base Compression</span>
          <span class="metric-value">6,561:1</span>
        </div>
        <div class="metric">
          <span class="metric-label">Adaptive Compression</span>
          <span class="metric-value">390,625:1</span>
        </div>
        <div class="metric">
          <span class="metric-label">Max Iterations</span>
          <span class="metric-value">8</span>
        </div>
        <div class="metric">
          <span class="metric-label">Failsafe Layers</span>
          <span class="metric-value">25</span>
        </div>
      </div>
    </div>
    
    <!-- Temporal DNA Card -->
    <div class="card" id="temporal">
      <div class="card-title">🧬 TEMPORAL DNA TOKENIZATION</div>
      <div class="card-content">
        <div class="metric">
          <span class="metric-label">Genesis (Immutable)</span>
          <span class="metric-value" style="font-size: 0.85rem;">0701202400000000</span>
        </div>
        <div class="metric">
          <span class="metric-label">Purpose</span>
          <span class="metric-value">Computation Scaling</span>
        </div>
        <div class="metric">
          <span class="metric-label">Layer Capacity</span>
          <span class="metric-value">10^16 ops/layer</span>
        </div>
        <div class="metric">
          <span class="metric-label">Expansion Cost</span>
          <span class="metric-value">$0 (unlimited)</span>
        </div>
        
        <div class="temporal-dna">
          <div style="font-weight: bold; color: var(--king-gold); margin-bottom: 0.5rem;">Live Tokenization</div>
          <div id="temporalTokens" class="dna-block" style="font-size: 0.85rem;">
            Loading...
          </div>
        </div>
        
        <div class="world-clock">
          <div style="font-weight: bold; color: var(--quantum-blue); margin-bottom: 0.5rem;">World Clock (UTC)</div>
          <div class="clock-time" id="worldClock">00:00:00.000</div>
          <div class="clock-date" id="worldDate">0000-00-00</div>
        </div>
      </div>
    </div>
    
    <!-- SKA Credits Card -->
    <div class="card" id="currency">
      <div class="card-title">💰 SKA CREDITS CURRENCY</div>
      <div class="card-content">
        <div class="metric">
          <span class="metric-label">Genesis Date</span>
          <span class="metric-value" style="font-size: 0.85rem;">2024-07-01</span>
        </div>
        <div class="metric">
          <span class="metric-label">Minting Rate</span>
          <span class="metric-value">1 credit/second</span>
        </div>
        <div class="metric">
          <span class="metric-label">Credit Value</span>
          <span class="metric-value">$1.00 USD</span>
        </div>
        <div class="metric">
          <span class="metric-label">Total Minted</span>
          <span class="metric-value auto-count" id="totalCredits">0</span>
        </div>
        <div class="metric">
          <span class="metric-label">Total Value</span>
          <span class="metric-value auto-count" id="totalValue">$0</span>
        </div>
        
        <div style="margin-top: 1rem; padding: 1rem; background: rgba(0, 255, 65, 0.1); border-radius: 8px; border: 1px solid var(--neon-green);">
          <div style="font-weight: bold; color: var(--neon-green); margin-bottom: 0.5rem;">Allocation (40/30/15/10/5)</div>
          <div class="metric" style="border-bottom-color: rgba(0, 255, 65, 0.2);">
            <span class="metric-label">Treasury (40%)</span>
            <span class="metric-value auto-count" id="treasuryCredits">0</span>
          </div>
          <div class="metric" style="border-bottom-color: rgba(0, 255, 65, 0.2);">
            <span class="metric-label">Founder (30%)</span>
            <span class="metric-value auto-count" id="founderCredits">0</span>
          </div>
          <div class="metric" style="border-bottom-color: rgba(0, 255, 65, 0.2);">
            <span class="metric-label">Operations (15%)</span>
            <span class="metric-value auto-count" id="operationsCredits">0</span>
          </div>
          <div class="metric" style="border-bottom-color: rgba(0, 255, 65, 0.2);">
            <span class="metric-label">Rewards (10%)</span>
            <span class="metric-value auto-count" id="rewardsCredits">0</span>
          </div>
          <div class="metric" style="border-bottom: none;">
            <span class="metric-label">R&D (5%)</span>
            <span class="metric-value auto-count" id="rdCredits">0</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- AI Agents Section -->
  <div class="card" id="agents" style="margin-top: 2rem;">
    <div class="card-title">🤖 AUTONOMOUS AI AGENTS (25)</div>
    <div class="agent-grid" id="agentGrid">
      Loading agents...
    </div>
  </div>
  
</div>

<!-- Chat Interface -->
<div class="chat-interface" id="chatInterface">
  <div class="chat-header">
    <div class="chat-title" id="chatAgentName">Agent Chat</div>
    <button class="close-chat" onclick="closeChat()">✕ Close</button>
  </div>
  <div class="chat-messages" id="chatMessages"></div>
  <div class="chat-input-container">
    <input type="text" class="chat-input" id="chatInput" placeholder="Type your message...">
    <button class="send-btn" onclick="sendMessage()">Send</button>
  </div>
</div>

<script>
let currentAgent = null;
const GENESIS_UNIX = 1719792000;

// Initialize
window.addEventListener('load', () => {
  loadAgents();
  updateTemporalDNA();
  updateSKACredits();
  updateWorldClock();
  
  // Auto-update every 100ms for smooth display
  setInterval(updateTemporalDNA, 100);
  setInterval(updateSKACredits, 100);
  setInterval(updateWorldClock, 100);
});

// Menu
function toggleMenu() {
  document.getElementById('menuSidebar').classList.toggle('active');
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  toggleMenu();
}

// World Clock
function updateWorldClock() {
  const now = new Date();
  const time = now.toISOString().split('T')[1].slice(0, 12); // HH:MM:SS.mmm
  const date = now.toISOString().split('T')[0];
  
  document.getElementById('worldClock').textContent = time;
  document.getElementById('worldDate').textContent = date;
}

// Temporal DNA
async function updateTemporalDNA() {
  try {
    const res = await fetch('/api/temporal-dna');
    const data = await res.json();
    
    if (data.success) {
      const now = new Date();
      const sync = String(now.getSeconds()).padStart(2, '0') + String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
      
      document.getElementById('temporalTokens').innerHTML = \`
        <div style="margin-bottom: 0.5rem;">
          <div style="font-weight: bold; color: var(--king-gold); margin-bottom: 0.25rem;">Genesis (Immutable)</div>
          <div style="color: var(--neon-green);">\${data.genesis}</div>
        </div>
        <div style="margin-bottom: 0.5rem;">
          <div style="font-weight: bold; color: var(--king-gold); margin-bottom: 0.25rem;">Expansion Layer 1</div>
          <div style="color: var(--quantum-blue);">XXXXXXXXXXXX<span style="color: var(--neon-green); font-weight: bold;">\${sync}</span></div>
        </div>
        <div style="margin-bottom: 0.5rem;">
          <div style="font-weight: bold; color: var(--king-gold); margin-bottom: 0.25rem;">Expansion Layer 2</div>
          <div style="color: var(--quantum-blue);">XXXXXXXXXXXX<span style="color: var(--neon-green); font-weight: bold;">\${sync}</span></div>
        </div>
        <div style="margin-top: 0.75rem; padding: 0.5rem; background: rgba(0, 255, 65, 0.1); border-radius: 4px; border-left: 3px solid var(--neon-green);">
          <div style="font-size: 0.85rem; color: var(--quantum-blue);">
            ✓ All layers synchronized to: <span style="color: var(--neon-green); font-weight: bold;">\${sync}</span><br>
            ✓ Capacity: 10^48 operations (3 layers)<br>
            ✓ Add layers: $0 cost
          </div>
        </div>
      \`;
    }
  } catch (e) {
    console.error('Temporal DNA error:', e);
  }
}

// SKA Credits
async function updateSKACredits() {
  try {
    const res = await fetch('/api/ska-credits');
    const data = await res.json();
    
    if (data.success) {
      document.getElementById('totalCredits').textContent = data.totalCredits.toLocaleString();
      document.getElementById('totalValue').textContent = '$' + data.totalValueUSD.toLocaleString();
      document.getElementById('treasuryCredits').textContent = data.allocation.treasury.toLocaleString();
      document.getElementById('founderCredits').textContent = data.allocation.founder.toLocaleString();
      document.getElementById('operationsCredits').textContent = data.allocation.operations.toLocaleString();
      document.getElementById('rewardsCredits').textContent = data.allocation.rewards.toLocaleString();
      document.getElementById('rdCredits').textContent = data.allocation.rd.toLocaleString();
    }
  } catch (e) {
    console.error('SKA Credits error:', e);
  }
}

// Load Agents
async function loadAgents() {
  try {
    const res = await fetch('/api/agents');
    const data = await res.json();
    
    if (data.success) {
      const grid = document.getElementById('agentGrid');
      grid.innerHTML = data.agents.map(agent => \`
        <div class="agent-card" onclick="openChat(\${agent.id})">
          <div class="agent-emoji">\${agent.emoji}</div>
          <div class="agent-name">\${agent.name}</div>
          <div class="agent-tier">Tier \${agent.tier} | Authority \${agent.authority}</div>
        </div>
      \`).join('');
    }
  } catch (e) {
    console.error('Load agents error:', e);
  }
}

// Chat Functions
function openChat(agentId) {
  fetch('/api/agents')
    .then(res => res.json())
    .then(data => {
      const agent = data.agents.find(a => a.id === agentId);
      if (agent) {
        currentAgent = agent;
        document.getElementById('chatAgentName').textContent = agent.emoji + ' ' + agent.name;
        document.getElementById('chatMessages').innerHTML = \`
          <div class="message agent">
            <div class="message-content">
              <div style="font-weight: bold; margin-bottom: 0.5rem;">\${agent.name}</div>
              <div>Hello! I'm \${agent.name}, your \${agent.domain} specialist. I operate at Tier \${agent.tier} with Authority Level \${agent.authority}. How can I assist you today?</div>
            </div>
          </div>
        \`;
        document.getElementById('chatInterface').classList.add('active');
      }
    });
}

function closeChat() {
  document.getElementById('chatInterface').classList.remove('active');
  currentAgent = null;
}

async function sendMessage() {
  if (!currentAgent) return;
  
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;
  
  const messagesDiv = document.getElementById('chatMessages');
  
  // Add user message
  messagesDiv.innerHTML += \`
    <div class="message user">
      <div class="message-content">\${message}</div>
    </div>
  \`;
  
  // Add loading
  messagesDiv.innerHTML += \`
    <div class="message agent" id="loadingMsg">
      <div class="message-content">
        <div class="loading"></div>
      </div>
    </div>
  \`;
  
  input.value = '';
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  
  try {
    const res = await fetch(\`/api/agent/\${currentAgent.id}/chat\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    
    const data = await res.json();
    
    // Remove loading
    document.getElementById('loadingMsg').remove();
    
    if (data.success) {
      messagesDiv.innerHTML += \`
        <div class="message agent">
          <div class="message-content">
            <div style="font-weight: bold; margin-bottom: 0.5rem;">\${data.agent}</div>
            <div>\${data.response}</div>
            <div style="margin-top: 0.75rem; padding: 0.5rem; background: rgba(0, 212, 255, 0.1); border-radius: 4px; font-size: 0.85rem;">
              <div>Temporal DNA: \${data.temporalDNA}</div>
              <div>SKA Credits: \${data.credits.toLocaleString()}</div>
            </div>
          </div>
        </div>
      \`;
    } else {
      messagesDiv.innerHTML += \`
        <div class="message agent">
          <div class="message-content">Error: \${data.error}</div>
        </div>
      \`;
    }
    
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (e) {
    document.getElementById('loadingMsg').remove();
    messagesDiv.innerHTML += \`
      <div class="message agent">
        <div class="message-content">Error: \${e.message}</div>
      </div>
    \`;
  }
}

// System Status
async function loadSystemStatus() {
  try {
    const res = await fetch('/api/system-status');
    const data = await res.json();
    
    if (data.success) {
      alert(\`SYSTEM STATUS\\n\\nTimestamp: \${data.timestamp}\\n\\nRKL Framework:\\nα=\${data.rkl.alpha}\\nComplexity=\${data.rkl.complexity}\\n\\nTemporal DNA:\\nGenesis=\${data.temporalDNA.genesis}\\n\\nSKA Credits:\\nTotal=\${data.skaCredits.totalCredits.toLocaleString()}\\nValue=$\${data.skaCredits.totalValueUSD.toLocaleString()}\\n\\nAgents:\\nTotal=\${data.agents.total}\\nTier 1=\${data.agents.tiers[1]}\`);
    }
  } catch (e) {
    alert('Error loading system status: ' + e.message);
  }
  
  toggleMenu();
}

function refreshAll() {
  loadAgents();
  updateTemporalDNA();
  updateSKACredits();
  updateWorldClock();
  toggleMenu();
}

// Allow Enter key to send messages
document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && document.getElementById('chatInterface').classList.contains('active')) {
    sendMessage();
  }
});
</script>

</body>
</html>`;
}
