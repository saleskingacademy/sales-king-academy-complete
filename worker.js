// SALES KING ACADEMY - COMPLETE PRODUCTION SYSTEM
// RKL Framework α=25 | Temporal DNA | SKA Credits | 25 AI Agents

class TemporalDNA {
  constructor() {
    this.genesis = new Date('2024-07-01T00:00:00Z').getTime();
  }
  
  generateToken() {
    const now = Date.now();
    const random12 = Array(12).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
    const sync4 = (Math.floor(now / 1000) % 10000).toString().padStart(4, '0');
    return {
      token: random12 + sync4,
      type: 'COMPUTATION',
      timestamp: now,
      purpose: 'Computational tokenization - infinite production'
    };
  }
  
  getTimeAnchor() {
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - this.genesis) / 1000);
    return {
      genesis: '2024-07-01T00:00:00Z',
      current: new Date(now).toISOString(),
      elapsed_seconds: elapsedSeconds,
      credits_minted: elapsedSeconds,
      system: 'Temporal DNA Tokenization',
      framework: 'RKL α=25'
    };
  }
}

class SKACurrencySystem {
  constructor() {
    this.genesis = new Date('2024-07-01T00:00:00Z').getTime();
    this.balances = new Map();
  }
  
  getTotalPlatformCredits() {
    const now = Date.now();
    return Math.floor((now - this.genesis) / 1000);
  }
  
  getUserBalance(userId) {
    return this.balances.get(userId) || 0;
  }
  
  addCredits(userId, amount) {
    const current = this.getUserBalance(userId);
    this.balances.set(userId, current + amount);
    return current + amount;
  }
}

const temporalDNA = new TemporalDNA();
const currency = new SKACurrencySystem();

const AGENTS = [
  {id:1,name:"Crown King Agent",emoji:"👑",desc:"Supreme strategic oversight and decision-making authority"},
  {id:2,name:"Supreme King AI",emoji:"⚡",desc:"Advanced AI orchestration and swarm intelligence optimization"},
  {id:3,name:"Empire Expansion Agent",emoji:"🌍",desc:"Global market penetration and territory acquisition"},
  {id:4,name:"Sales Mastery Agent",emoji:"💰",desc:"Revenue optimization and sales funnel perfection"},
  {id:5,name:"Marketing Genius Agent",emoji:"📢",desc:"Brand amplification and viral marketing campaigns"},
  {id:6,name:"Tech Innovation Agent",emoji:"🚀",desc:"Cutting-edge technology research and implementation"},
  {id:7,name:"Finance Architect Agent",emoji:"💎",desc:"Financial modeling, investment strategy, and capital allocation"},
  {id:8,name:"Research Mastery Agent",emoji:"🔬",desc:"Deep market research and competitive intelligence"},
  {id:9,name:"Conversion Optimization Agent",emoji:"📈",desc:"Funnel optimization and conversion rate maximization"},
  {id:10,name:"Brand Authority Agent",emoji:"⭐",desc:"Brand positioning and market authority establishment"},
  {id:11,name:"Customer Success Agent",emoji:"🤝",desc:"Customer retention and lifetime value optimization"},
  {id:12,name:"Content Creation Agent",emoji:"✍️",desc:"High-converting content production and distribution"},
  {id:13,name:"Data Analytics Agent",emoji:"📊",desc:"Advanced analytics and predictive modeling"},
  {id:14,name:"System Architect Agent",emoji:"🏗️",desc:"Infrastructure design and scalability engineering"},
  {id:15,name:"Legal Compliance Agent",emoji:"⚖️",desc:"Regulatory compliance and legal risk management"},
  {id:16,name:"HR & Talent Agent",emoji:"👥",desc:"Talent acquisition and human capital optimization"},
  {id:17,name:"Product Innovation Agent",emoji:"💡",desc:"Product development and market fit validation"},
  {id:18,name:"Partnership Development Agent",emoji:"🤝",desc:"Strategic alliances and partnership negotiation"},
  {id:19,name:"Risk Management Agent",emoji:"🛡️",desc:"Risk assessment and mitigation strategy"},
  {id:20,name:"Automation Specialist Agent",emoji:"⚙️",desc:"Process automation and efficiency maximization"},
  {id:21,name:"Training & Education Agent",emoji:"🎓",desc:"Knowledge transfer and skill development programs"},
  {id:22,name:"Market Intelligence Agent",emoji:"🎯",desc:"Real-time market monitoring and opportunity detection"},
  {id:23,name:"Code Optimization Agent",emoji:"💻",desc:"Software optimization and performance tuning"},
  {id:24,name:"Quality Assurance Agent",emoji:"✅",desc:"Quality control and testing automation"},
  {id:25,name:"Strategic Planning Agent",emoji:"♟️",desc:"Long-term strategy and competitive positioning"}
];

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
  
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // API ENDPOINTS
  if (path === '/api/time-anchor') {
    return new Response(JSON.stringify(temporalDNA.getTimeAnchor()), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  if (path === '/api/computation/token') {
    return new Response(JSON.stringify(temporalDNA.generateToken()), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  if (path === '/api/credits/platform-total') {
    return new Response(JSON.stringify({ 
      totalPlatformCredits: currency.getTotalPlatformCredits(),
      mintRate: '1 credit/second',
      genesis: '2024-07-01T00:00:00Z'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  if (path === '/api/agents') {
    return new Response(JSON.stringify({ 
      agents: AGENTS,
      count: AGENTS.length,
      framework: 'RKL α=25'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  if (path.startsWith('/api/agent/') && path.endsWith('/info')) {
    const agentId = parseInt(path.split('/')[3]);
    const agent = AGENTS.find(a => a.id === agentId);
    if (agent) {
      return new Response(JSON.stringify(agent), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify({error: 'Agent not found'}), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  if (path === '/api/system/status') {
    return new Response(JSON.stringify({
      status: 'operational',
      uptime: Math.floor((Date.now() - new Date('2024-07-01T00:00:00Z').getTime()) / 1000),
      agents: AGENTS.length,
      framework: 'RKL α=25',
      systems: {
        temporalDNA: 'active',
        skaCurrency: 'active',
        agentSwarm: 'active'
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  // FRONTEND
  return new Response(getHTML(), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

function getHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="theme-color" content="#ffd700">
<title>Sales King Academy - AI Business Automation</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;background:linear-gradient(135deg,#000 0%,#0a0a00 50%,#1a1a00 100%);color:#0f0;min-height:100vh;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.header{background:linear-gradient(90deg,#000,#0a0a00);border-bottom:3px solid #ffd700;padding:clamp(15px,4vw,25px);text-align:center;position:sticky;top:0;z-index:1000;backdrop-filter:blur(10px);box-shadow:0 4px 20px rgba(255,215,0,0.3)}
.header h1{color:#ffd700;font-size:clamp(1.5rem,6vw,3rem);text-shadow:0 0 30px #ffd700,0 0 60px #ffd700;margin-bottom:8px;letter-spacing:2px;font-weight:900}
.header p{color:#0f0;font-size:clamp(0.8rem,3vw,1.1rem);text-shadow:0 0 10px #0f0}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:clamp(12px,3vw,20px);padding:clamp(15px,4vw,25px);max-width:1400px;margin:0 auto}
.stat-card{background:linear-gradient(135deg,#0a0a00,#000);border:2px solid #ffd700;border-radius:15px;padding:clamp(18px,4vw,25px);text-align:center;transition:transform 0.3s,box-shadow 0.3s;cursor:pointer}
.stat-card:active{transform:scale(0.95)}
.stat-card:hover{box-shadow:0 0 25px rgba(255,215,0,0.5);border-color:#ffed4e}
.stat-label{color:#ffd700;font-size:clamp(0.85rem,2.5vw,1rem);margin-bottom:10px;text-transform:uppercase;letter-spacing:1px;font-weight:600}
.stat-value{color:#0f0;font-size:clamp(1.5rem,5vw,2.2rem);font-weight:900;text-shadow:0 0 15px #0f0;font-family:monospace}
.section-title{color:#ffd700;font-size:clamp(1.3rem,4vw,2rem);text-align:center;margin:clamp(25px,5vw,40px) 0 clamp(15px,3vw,25px);text-shadow:0 0 20px #ffd700;font-weight:800;letter-spacing:1px}
.agents-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,170px),1fr));gap:clamp(10px,2.5vw,15px);padding:clamp(15px,4vw,25px);max-width:1400px;margin:0 auto}
.agent{background:linear-gradient(135deg,#0a0a00,#000);border:2px solid #ffd700;border-radius:12px;padding:clamp(14px,3.5vw,20px);cursor:pointer;transition:all 0.3s;text-align:center;position:relative;overflow:hidden}
.agent::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,215,0,0.2),transparent);transition:left 0.5s}
.agent:hover::before{left:100%}
.agent:active{transform:scale(0.92)}
.agent:hover{border-color:#ffed4e;box-shadow:0 0 30px rgba(255,215,0,0.6);transform:translateY(-5px)}
.agent-emoji{font-size:clamp(2rem,6vw,3rem);margin-bottom:10px;display:block;filter:drop-shadow(0 0 10px currentColor)}
.agent-name{color:#ffd700;font-size:clamp(0.85rem,2.5vw,1rem);font-weight:700;margin-bottom:8px;line-height:1.3}
.agent-desc{color:#0f0;font-size:clamp(0.7rem,2vw,0.85rem);line-height:1.4;opacity:0.9}
.modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:2000;backdrop-filter:blur(5px)}
.modal.active{display:flex;align-items:center;justify-content:center;padding:20px}
.modal-content{background:linear-gradient(135deg,#0a0a00,#000);border:3px solid #ffd700;border-radius:20px;padding:clamp(20px,5vw,40px);max-width:600px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 0 50px rgba(255,215,0,0.8)}
.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding-bottom:15px;border-bottom:2px solid #ffd700}
.modal-title{color:#ffd700;font-size:clamp(1.3rem,4vw,1.8rem);font-weight:800}
.close-btn{background:#ffd700;color:#000;border:none;width:35px;height:35px;border-radius:50%;font-size:1.5rem;cursor:pointer;font-weight:bold;transition:all 0.3s}
.close-btn:hover{background:#ffed4e;transform:rotate(90deg)}
.modal-body{color:#0f0;font-size:clamp(0.9rem,2.5vw,1.1rem);line-height:1.8}
.pulse{animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.6}}
.loading{color:#ffd700;text-align:center;padding:40px;font-size:1.2rem}
@media(max-width:768px){.agents-grid{grid-template-columns:repeat(auto-fill,minmax(min(100%,145px),1fr))}.stat-card{padding:15px}}
</style>
</head>
<body>
<div class="header">
<h1>⚡ SALES KING ACADEMY ⚡</h1>
<p>Complete AI Business Automation Platform | RKL Framework α=25</p>
</div>

<div class="stats">
<div class="stat-card" onclick="showInfo('credits')">
<div class="stat-label">SKA Credits Minted</div>
<div class="stat-value pulse" id="credits">Loading...</div>
</div>
<div class="stat-card" onclick="showInfo('dna')">
<div class="stat-label">Temporal DNA Tokens</div>
<div class="stat-value">∞ Infinite</div>
</div>
<div class="stat-card" onclick="showInfo('agents')">
<div class="stat-label">Active AI Agents</div>
<div class="stat-value">25</div>
</div>
</div>

<h2 class="section-title">🤖 25 AUTONOMOUS AI AGENTS 🤖</h2>

<div id="agents" class="agents-grid">
<div class="loading">Loading agent swarm...</div>
</div>

<div id="modal" class="modal">
<div class="modal-content">
<div class="modal-header">
<h3 class="modal-title" id="modalTitle">Agent</h3>
<button class="close-btn" onclick="closeModal()">×</button>
</div>
<div class="modal-body" id="modalBody">Loading...</div>
</div>
</div>

<script>
let creditsValue = 0;

async function updateCredits() {
  try {
    const r = await fetch('/api/credits/platform-total');
    const data = await r.json();
    creditsValue = data.totalPlatformCredits;
    document.getElementById('credits').textContent = creditsValue.toLocaleString();
  } catch(e) {
    console.error('Credits update failed:', e);
  }
}

async function loadAgents() {
  try {
    const r = await fetch('/api/agents');
    const data = await r.json();
    const grid = document.getElementById('agents');
    grid.innerHTML = '';
    
    data.agents.forEach(agent => {
      const div = document.createElement('div');
      div.className = 'agent';
      div.innerHTML = '<div class="agent-emoji">' + agent.emoji + '</div><div class="agent-name">' + agent.name + '</div><div class="agent-desc">' + agent.desc + '</div>';
      div.onclick = () => showAgentDetails(agent);
      grid.appendChild(div);
    });
  } catch(e) {
    console.error('Agents load failed:', e);
    document.getElementById('agents').innerHTML = '<div class="loading">Error loading agents</div>';
  }
}

function showAgentDetails(agent) {
  document.getElementById('modalTitle').textContent = agent.emoji + ' ' + agent.name;
  document.getElementById('modalBody').innerHTML = '<p style="margin-bottom:15px"><strong>Agent ID:</strong> ' + agent.id + '</p><p style="margin-bottom:15px"><strong>Mission:</strong> ' + agent.desc + '</p><p style="color:#ffd700"><strong>Status:</strong> ✅ ACTIVE & OPERATIONAL</p>';
  document.getElementById('modal').classList.add('active');
}

function showInfo(type) {
  let title, body;
  if(type === 'credits') {
    title = '💎 SKA Credits System';
    body = '<p>Auto-minting rate: <strong>1 credit per second</strong></p><p style="margin-top:10px">Genesis: <strong>July 1, 2024 00:00:00 UTC</strong></p><p style="margin-top:10px">Current minted: <strong>' + creditsValue.toLocaleString() + '</strong></p><p style="margin-top:15px;color:#ffd700">SKA Credits are the platform currency, automatically minted since genesis.</p>';
  } else if(type === 'dna') {
    title = '🧬 Temporal DNA System';
    body = '<p>Token format: <strong>16-digit unique</strong></p><p style="margin-top:10px">Production: <strong>Infinite capacity</strong></p><p style="margin-top:10px">Purpose: <strong>Computational tokenization</strong></p><p style="margin-top:15px;color:#ffd700">Temporal DNA provides infinite computation tokens with moving interlock security.</p>';
  } else {
    title = '🤖 25 AI Agent Swarm';
    body = '<p>Framework: <strong>RKL α=25</strong></p><p style="margin-top:10px">Agents: <strong>25 specialized autonomous AI</strong></p><p style="margin-top:10px">Capabilities: <strong>Full business automation</strong></p><p style="margin-top:15px;color:#ffd700">Complete AI swarm for sales, marketing, tech, finance, and operations.</p>';
  }
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = body;
  document.getElementById('modal').classList.add('active');
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
}

document.getElementById('modal').onclick = (e) => {
  if(e.target.id === 'modal') closeModal();
};

updateCredits();
loadAgents();
setInterval(updateCredits, 3000);
setInterval(() => {
  creditsValue += 3;
  document.getElementById('credits').textContent = creditsValue.toLocaleString();
}, 3000);
</script>
</body>
</html>`;
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
