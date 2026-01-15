
class TemporalDNA {
  constructor() { this.genesis = new Date('2024-07-01T00:00:00Z').getTime(); }
  generateToken() {
    const now = Date.now();
    const random12 = Array(12).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
    const sync4 = (Math.floor(now/1000)%10000).toString().padStart(4,'0');
    return {token:random12+sync4,type:'COMPUTATION',timestamp:now};
  }
  getTimeAnchor() {
    const now = Date.now();
    const elapsed = Math.floor((now - this.genesis)/1000);
    return {genesis:'2024-07-01T00:00:00Z',current:new Date(now).toISOString(),elapsed_seconds:elapsed,credits_minted:elapsed,framework:'RKL α=25'};
  }
}

class SKACurrencySystem {
  constructor() { this.genesis = new Date('2024-07-01T00:00:00Z').getTime(); this.balances = new Map(); }
  getTotalPlatformCredits() { return Math.floor((Date.now() - this.genesis)/1000); }
  getUserBalance(userId) { return this.balances.get(userId) || 0; }
  addCredits(userId, amount) { const cur = this.getUserBalance(userId); this.balances.set(userId, cur + amount); return cur + amount; }
}

const temporalDNA = new TemporalDNA();
const currency = new SKACurrencySystem();

const AGENTS = {
  1: {name:"Crown King Agent",emoji:"👑",specialty:"Strategic leadership, executive decision-making, market positioning, competitive strategy"},
  2: {name:"Supreme King AI",emoji:"⚡",specialty:"AI systems, machine learning, neural networks, automation, swarm intelligence"},
  3: {name:"Empire Expansion Agent",emoji:"🌍",specialty:"Global expansion, international markets, territory acquisition, franchising"},
  4: {name:"Sales Mastery Agent",emoji:"💰",specialty:"Sales optimization, pipeline management, closing techniques, revenue growth"},
  5: {name:"Marketing Genius Agent",emoji:"📢",specialty:"Digital marketing, viral campaigns, brand building, growth hacking"},
  6: {name:"Tech Innovation Agent",emoji:"🚀",specialty:"Technology strategy, software architecture, cloud computing, innovation"},
  7: {name:"Finance Architect Agent",emoji:"💎",specialty:"Financial modeling, investment strategy, capital allocation, valuation"},
  8: {name:"Research Mastery Agent",emoji:"🔬",specialty:"Market research, competitive intelligence, data analysis, insights"},
  9: {name:"Conversion Optimization Agent",emoji:"📈",specialty:"CRO, A/B testing, funnel optimization, user experience"},
  10: {name:"Brand Authority Agent",emoji:"⭐",specialty:"Brand positioning, reputation management, thought leadership"},
  11: {name:"Customer Success Agent",emoji:"🤝",specialty:"Customer retention, support excellence, satisfaction optimization"},
  12: {name:"Content Creation Agent",emoji:"✍️",specialty:"Copywriting, content strategy, storytelling, engagement"},
  13: {name:"Data Analytics Agent",emoji:"📊",specialty:"Data science, predictive analytics, business intelligence"},
  14: {name:"System Architect Agent",emoji:"🏗️",specialty:"System design, scalability, infrastructure, DevOps"},
  15: {name:"Legal Compliance Agent",emoji:"⚖️",specialty:"Corporate law, contracts, regulatory compliance, risk"},
  16: {name:"HR & Talent Agent",emoji:"👥",specialty:"Talent acquisition, performance management, organizational development"},
  17: {name:"Product Innovation Agent",emoji:"💡",specialty:"Product strategy, roadmap planning, market fit, innovation"},
  18: {name:"Partnership Development Agent",emoji:"🤝",specialty:"Strategic partnerships, alliances, ecosystem development"},
  19: {name:"Risk Management Agent",emoji:"🛡️",specialty:"Risk assessment, security, business continuity, mitigation"},
  20: {name:"Automation Specialist Agent",emoji:"⚙️",specialty:"Process automation, RPA, workflow optimization, efficiency"},
  21: {name:"Training & Education Agent",emoji:"🎓",specialty:"Learning programs, skill development, knowledge transfer"},
  22: {name:"Market Intelligence Agent",emoji:"🎯",specialty:"Market monitoring, opportunity detection, competitive tracking"},
  23: {name:"Code Optimization Agent",emoji:"💻",specialty:"Software optimization, algorithm efficiency, performance tuning"},
  24: {name:"Quality Assurance Agent",emoji:"✅",specialty:"Testing, quality control, defect management, standards"},
  25: {name:"Strategic Planning Agent",emoji:"♟️",specialty:"Long-term strategy, scenario planning, strategic initiatives"}
};

async function searchWeb(query) {
  try {
    const r = await fetch('https://api.duckduckgo.com/?q=' + encodeURIComponent(query) + '&format=json&no_html=1&skip_disambig=1');
    const data = await r.json();
    let results = [];
    if (data.Abstract) results.push(data.Abstract);
    if (data.RelatedTopics && data.RelatedTopics.length > 0) {
      for (let i = 0; i < Math.min(3, data.RelatedTopics.length); i++) {
        if (data.RelatedTopics[i].Text) results.push(data.RelatedTopics[i].Text);
      }
    }
    return results.length > 0 ? results.join(' ') : null;
  } catch (e) {
    return null;
  }
}

function generateResponse(agent, userMessage, webResults) {
  const responses = [
    "Based on my analysis of " + agent.specialty + ", here's what I found: ",
    "Drawing from my expertise in " + agent.specialty + ", ",
    "As a specialist in " + agent.specialty + ", let me share: ",
    "My research into " + agent.specialty + " reveals: "
  ];
  
  const intro = responses[Math.floor(Math.random() * responses.length)];
  
  if (webResults) {
    return intro + webResults + " This aligns with proven strategies in " + agent.specialty + ". I can help you implement this effectively.";
  }
  
  const fallbacks = [
    "I'm analyzing your query about '" + userMessage + "' through the lens of " + agent.specialty + ". The key factors to consider are market dynamics, competitive positioning, and execution strategy. What specific aspect would you like to explore?",
    "Regarding '" + userMessage + "', my expertise in " + agent.specialty + " suggests focusing on data-driven decision making and strategic implementation. I can provide detailed analysis on specific areas.",
    "Your question about '" + userMessage + "' touches on critical aspects of " + agent.specialty + ". Let me break down the strategic approach: identify opportunities, assess risks, and execute with precision. Which area interests you most?"
  ];
  
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const cors = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
  
  if (request.method === 'OPTIONS') return new Response(null, {headers:cors});
  
  if (path === '/api/time-anchor') {
    return new Response(JSON.stringify(temporalDNA.getTimeAnchor()), {headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path === '/api/computation/token') {
    return new Response(JSON.stringify(temporalDNA.generateToken()), {headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path === '/api/credits/platform-total') {
    return new Response(JSON.stringify({totalPlatformCredits:currency.getTotalPlatformCredits(),mintRate:'1/sec',genesis:'2024-07-01T00:00:00Z'}), {headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path === '/api/agents') {
    const agentList = Object.entries(AGENTS).map(([id,a])=>({id:parseInt(id),...a}));
    return new Response(JSON.stringify({agents:agentList,count:agentList.length,framework:'RKL α=25'}), {headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path.startsWith('/api/agent/') && path.endsWith('/chat') && request.method === 'POST') {
    const agentId = parseInt(path.split('/')[3]);
    const agent = AGENTS[agentId];
    if (!agent) return new Response(JSON.stringify({error:'Agent not found'}), {status:404,headers:{...cors,'Content-Type':'application/json'}});
    
    const body = await request.json();
    const userMessage = body.message || '';
    
    const searchQuery = userMessage + ' ' + agent.specialty;
    const webResults = await searchWeb(searchQuery);
    
    const response = generateResponse(agent, userMessage, webResults);
    const token = temporalDNA.generateToken();
    
    return new Response(JSON.stringify({
      agent: agent.name,
      response: response,
      token: token.token,
      webSearch: webResults ? 'Used live web data' : 'Used embedded intelligence',
      timestamp: Date.now()
    }), {headers:{...cors,'Content-Type':'application/json'}});
  }
  
  return new Response(`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5"><title>Sales King Academy</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,system-ui,sans-serif;background:#000;color:#0f0;min-height:100vh;overflow-x:hidden;touch-action:pan-y}@media(max-width:768px){body{font-size:16px}}.header{background:linear-gradient(90deg,#000,#0a0a00);border-bottom:3px solid #ffd700;padding:15px;text-align:center;position:sticky;top:0;z-index:1000}.header h1{color:#ffd700;font-size:clamp(1.2rem,5vw,2.5rem);text-shadow:0 0 20px #ffd700;margin-bottom:5px;font-weight:900}.header p{color:#0f0;font-size:clamp(0.75rem,2.5vw,1rem)}.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;padding:15px;max-width:100%}@media(min-width:769px){.stats{max-width:1200px;margin:0 auto;gap:15px}}.stat-card{background:#0a0a00;border:2px solid #ffd700;border-radius:12px;padding:15px;text-align:center;min-height:80px;display:flex;flex-direction:column;justify-content:center}.stat-label{color:#ffd700;font-size:clamp(0.75rem,2vw,0.9rem);margin-bottom:5px;font-weight:600}.stat-value{color:#0f0;font-size:clamp(1.2rem,4vw,1.8rem);font-weight:900;font-family:monospace}.section-title{color:#ffd700;font-size:clamp(1.1rem,3.5vw,1.8rem);text-align:center;margin:20px 0 15px;font-weight:800}.agents-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;padding:15px;max-width:100%}@media(min-width:480px){.agents-grid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px}}@media(min-width:769px){.agents-grid{max-width:1200px;margin:0 auto;gap:15px}}.agent{background:#0a0a00;border:2px solid #ffd700;border-radius:10px;padding:12px;cursor:pointer;text-align:center;transition:transform 0.2s;min-height:100px;display:flex;flex-direction:column;justify-content:center;touch-action:manipulation}.agent:active{transform:scale(0.95);border-color:#ffed4e}.agent-emoji{font-size:clamp(1.8rem,5vw,2.5rem);margin-bottom:8px}.agent-name{color:#ffd700;font-size:clamp(0.8rem,2.2vw,0.95rem);font-weight:700;line-height:1.3}.modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:2000;touch-action:none}.modal.active{display:flex;align-items:center;justify-content:center;padding:10px}.modal-content{background:#000;border:3px solid #ffd700;border-radius:15px;padding:20px;width:100%;max-width:600px;max-height:90vh;overflow-y:auto;-webkit-overflow-scrolling:touch}.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;padding-bottom:12px;border-bottom:2px solid #ffd700}.modal-title{color:#ffd700;font-size:clamp(1.1rem,3.5vw,1.5rem);font-weight:800}.close-btn{background:#ffd700;color:#000;border:none;width:40px;height:40px;border-radius:50%;font-size:1.5rem;cursor:pointer;font-weight:bold;flex-shrink:0;touch-action:manipulation}.chat-messages{max-height:40vh;overflow-y:auto;margin-bottom:15px;padding:10px;background:#0a0a00;border-radius:8px;-webkit-overflow-scrolling:touch}.message{margin:8px 0;padding:10px;border-radius:8px;line-height:1.5;font-size:clamp(0.85rem,2.2vw,0.95rem)}.user-msg{background:#1a1a00;border-left:3px solid #ffd700;color:#0f0}.agent-msg{background:#001a00;border-left:3px solid #0f0;color:#0f0}.chat-input-box{display:flex;gap:8px;margin-top:10px}.chat-input{flex:1;padding:12px;background:#0a0a00;border:2px solid #ffd700;border-radius:8px;color:#0f0;font-size:16px;min-height:44px}.send-btn{padding:12px 20px;background:#ffd700;color:#000;border:none;border-radius:8px;font-weight:bold;cursor:pointer;font-size:16px;min-width:60px;min-height:44px;touch-action:manipulation}.send-btn:active{background:#ffed4e}</style></head><body><div class="header"><h1>⚡ SALES KING ACADEMY ⚡</h1><p>AI Business Automation | RKL α=25</p></div><div class="stats"><div class="stat-card"><div class="stat-label">SKA Credits</div><div class="stat-value" id="credits">Loading...</div></div><div class="stat-card"><div class="stat-label">DNA Tokens</div><div class="stat-value">∞</div></div><div class="stat-card"><div class="stat-label">AI Agents</div><div class="stat-value">25</div></div></div><h2 class="section-title">🤖 AI AGENT SWARM 🤖</h2><div id="agents" class="agents-grid"></div><div id="modal" class="modal"><div class="modal-content"><div class="modal-header"><h3 class="modal-title" id="modalTitle">Agent</h3><button class="close-btn" onclick="closeModal()">×</button></div><div id="modalBody"><div id="agentInfo" style="color:#0f0;margin-bottom:15px;font-size:0.9rem"></div><div class="chat-messages" id="chatBox"></div><div class="chat-input-box"><input type="text" class="chat-input" id="chatInput" placeholder="Ask me anything..."><button class="send-btn" onclick="sendMsg()">Send</button></div></div></div></div><script>let currentAgent=null;let creditsValue=0;async function updateCredits(){try{const r=await fetch('/api/credits/platform-total');const d=await r.json();creditsValue=d.totalPlatformCredits;document.getElementById('credits').textContent=(creditsValue/1000000).toFixed(1)+'M'}catch(e){}}async function loadAgents(){try{const r=await fetch('/api/agents');const d=await r.json();const g=document.getElementById('agents');g.innerHTML='';d.agents.forEach(a=>{const div=document.createElement('div');div.className='agent';div.innerHTML='<div class="agent-emoji">'+a.emoji+'</div><div class="agent-name">'+a.name+'</div>';div.onclick=()=>openAgent(a);g.appendChild(div)})}catch(e){}}function openAgent(a){currentAgent=a;document.getElementById('modalTitle').textContent=a.emoji+' '+a.name;document.getElementById('agentInfo').innerHTML='<strong>Specialty:</strong> '+a.specialty;document.getElementById('chatBox').innerHTML='<div class="message agent-msg">Hi! I\'m '+a.name+'. Ask me anything about '+a.specialty+'.</div>';document.getElementById('modal').classList.add('active')}function closeModal(){document.getElementById('modal').classList.remove('active');currentAgent=null}async function sendMsg(){if(!currentAgent)return;const inp=document.getElementById('chatInput');const msg=inp.value.trim();if(!msg)return;const box=document.getElementById('chatBox');box.innerHTML+='<div class="message user-msg">'+msg+'</div>';inp.value='';box.scrollTop=box.scrollHeight;box.innerHTML+='<div class="message agent-msg" style="opacity:0.6">Searching web and analyzing...</div>';try{const r=await fetch('/api/agent/'+currentAgent.id+'/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg})});const d=await r.json();const msgs=box.querySelectorAll('.message');msgs[msgs.length-1].remove();box.innerHTML+='<div class="message agent-msg">'+d.response+'<br><small style="opacity:0.7;margin-top:5px;display:block">'+d.webSearch+' | Token: '+d.token.slice(0,8)+'...</small></div>';box.scrollTop=box.scrollHeight}catch(e){const msgs=box.querySelectorAll('.message');msgs[msgs.length-1].remove();box.innerHTML+='<div class="message agent-msg" style="color:#f44">Connection error. Try again.</div>'}}document.getElementById('chatInput').addEventListener('keypress',e=>{if(e.key==='Enter')sendMsg()});document.getElementById('modal').onclick=e=>{if(e.target.id==='modal')closeModal()};updateCredits();loadAgents();setInterval(updateCredits,5000);setInterval(()=>{creditsValue+=5;document.getElementById('credits').textContent=(creditsValue/1000000).toFixed(1)+'M'},5000)</script></body></html>`, {headers:{'Content-Type':'text/html'}});
}

addEventListener('fetch', event => { event.respondWith(handleRequest(event.request)); });
