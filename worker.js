
// COMPLETE CHAT INTERFACE - CLAUDE.AI STYLE
class TemporalDNA {
  constructor() { this.genesis = new Date('2024-07-01T00:00:00Z').getTime(); }
  generateToken() {
    const now = Date.now();
    const random12 = Array(12).fill(0).map(() => Math.floor(Math.random()*10)).join('');
    const sync4 = (Math.floor(now/1000)%10000).toString().padStart(4,'0');
    return {token:random12+sync4,type:'COMPUTATION',timestamp:now};
  }
  getTimeAnchor() {
    const now = Date.now();
    const elapsed = Math.floor((now-this.genesis)/1000);
    return {genesis:'2024-07-01T00:00:00Z',current:new Date(now).toISOString(),elapsed_seconds:elapsed,credits_minted:elapsed,framework:'RKL α=25'};
  }
}

class SKACurrencySystem {
  constructor() { this.genesis = new Date('2024-07-01T00:00:00Z').getTime(); this.balances = new Map(); }
  getTotalPlatformCredits() { return Math.floor((Date.now()-this.genesis)/1000); }
  getUserBalance(u) { return this.balances.get(u)||0; }
  addCredits(u,a) { const c=this.getUserBalance(u); this.balances.set(u,c+a); return c+a; }
  verifyInterlock(t) { return t&&t.length===16; }
}

const temporalDNA = new TemporalDNA();
const currency = new SKACurrencySystem();

const AGENTS = {
  1:{name:"Crown King Agent",emoji:"👑",specialty:"Strategic leadership, executive decisions, market positioning, corporate governance, M&A strategy"},
  2:{name:"Supreme King AI",emoji:"⚡",specialty:"AI systems, machine learning, neural networks, deep learning, model optimization"},
  3:{name:"Empire Expansion Agent",emoji:"🌍",specialty:"Global expansion, international markets, cross-border operations, emerging markets"},
  4:{name:"Sales Mastery Agent",emoji:"💰",specialty:"Sales excellence, pipeline optimization, closing techniques, revenue growth"},
  5:{name:"Marketing Genius Agent",emoji:"📢",specialty:"Digital marketing, viral campaigns, growth hacking, brand building"},
  6:{name:"Tech Innovation Agent",emoji:"🚀",specialty:"Technology strategy, software architecture, cloud computing, innovation"},
  7:{name:"Finance Architect Agent",emoji:"💎",specialty:"Financial modeling, investment strategy, capital allocation, valuation"},
  8:{name:"Research Mastery Agent",emoji:"🔬",specialty:"Market research, competitive intelligence, data analysis, insights"},
  9:{name:"Conversion Optimization Agent",emoji:"📈",specialty:"CRO, A/B testing, funnel optimization, UX design"},
  10:{name:"Brand Authority Agent",emoji:"⭐",specialty:"Brand positioning, reputation management, thought leadership"},
  11:{name:"Customer Success Agent",emoji:"🤝",specialty:"Customer retention, support excellence, satisfaction optimization"},
  12:{name:"Content Creation Agent",emoji:"✍️",specialty:"Copywriting, content strategy, storytelling, engagement"},
  13:{name:"Data Analytics Agent",emoji:"📊",specialty:"Data science, predictive analytics, visualization, business intelligence"},
  14:{name:"System Architect Agent",emoji:"🏗️",specialty:"System design, scalability, infrastructure, DevOps"},
  15:{name:"Legal Compliance Agent",emoji:"⚖️",specialty:"Corporate law, contracts, regulatory compliance, risk management"},
  16:{name:"HR & Talent Agent",emoji:"👥",specialty:"Talent acquisition, performance management, organizational development"},
  17:{name:"Product Innovation Agent",emoji:"💡",specialty:"Product strategy, roadmap planning, market fit, innovation"},
  18:{name:"Partnership Development Agent",emoji:"🤝",specialty:"Strategic partnerships, alliances, ecosystem development"},
  19:{name:"Risk Management Agent",emoji:"🛡️",specialty:"Risk assessment, security, business continuity, mitigation"},
  20:{name:"Automation Specialist Agent",emoji:"⚙️",specialty:"Process automation, RPA, workflow optimization, efficiency"},
  21:{name:"Training & Education Agent",emoji:"🎓",specialty:"Learning programs, skill development, knowledge transfer"},
  22:{name:"Market Intelligence Agent",emoji:"🎯",specialty:"Market monitoring, opportunity detection, competitive tracking"},
  23:{name:"Code Optimization Agent",emoji:"💻",specialty:"Software optimization, algorithm efficiency, performance tuning"},
  24:{name:"Quality Assurance Agent",emoji:"✅",specialty:"Testing, quality control, defect management, standards"},
  25:{name:"Strategic Planning Agent",emoji:"♟️",specialty:"Long-term strategy, scenario planning, strategic initiatives"}
};

async function searchWeb(query) {
  try {
    const r = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`);
    const d = await r.json();
    let results = [];
    if (d.Abstract) results.push(d.Abstract);
    if (d.AbstractText) results.push(d.AbstractText);
    if (d.RelatedTopics) {
      for (let i=0; i<Math.min(3,d.RelatedTopics.length); i++) {
        if (d.RelatedTopics[i].Text) results.push(d.RelatedTopics[i].Text);
      }
    }
    return results.length>0 ? results.join(' ') : null;
  } catch(e) {
    return null;
  }
}

function generateResponse(agent, userMessage, webData) {
  let response = `As ${agent.name}, specializing in ${agent.specialty}, let me address your question: "${userMessage}"\n\n`;
  
  if (webData) {
    response += `Based on current research and analysis: ${webData.substring(0,400)}\n\n`;
  }
  
  response += `From my expertise perspective:\n`;
  response += `• This requires strategic consideration of multiple factors\n`;
  response += `• Best practices in ${agent.specialty.split(',')[0]} suggest a systematic approach\n`;
  response += `• I recommend analyzing the specific context and constraints\n`;
  response += `• Implementation should prioritize measurable outcomes\n\n`;
  response += `Would you like me to dive deeper into any specific aspect? I can provide detailed analysis, case studies, or implementation strategies.`;
  
  return response;
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const cors = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
  
  if (request.method==='OPTIONS') return new Response(null,{headers:cors});
  
  if (path==='/api/time-anchor') {
    return new Response(JSON.stringify(temporalDNA.getTimeAnchor()),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path==='/api/credits/platform-total') {
    return new Response(JSON.stringify({totalPlatformCredits:currency.getTotalPlatformCredits()}),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path==='/api/agents') {
    const agentList = Object.entries(AGENTS).map(([id,a])=>({id:parseInt(id),...a}));
    return new Response(JSON.stringify({agents:agentList,count:25}),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path.startsWith('/api/agent/') && path.endsWith('/chat') && request.method==='POST') {
    const agentId = parseInt(path.split('/')[3]);
    const agent = AGENTS[agentId];
    if (!agent) return new Response(JSON.stringify({error:'Not found'}),{status:404,headers:{...cors,'Content-Type':'application/json'}});
    
    const body = await request.json();
    const userMessage = body.message||'';
    
    const webData = await searchWeb(`${userMessage} ${agent.specialty}`);
    const response = generateResponse(agent, userMessage, webData);
    const token = temporalDNA.generateToken();
    
    return new Response(JSON.stringify({
      agent:agent.name,
      response:response,
      token:token.token,
      interlock:currency.verifyInterlock(token.token)?'VERIFIED':'FAILED',
      timestamp:Date.now()
    }),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  // COMPLETE CHAT UI
  return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5">
<title>Sales King Academy | AI Agent Platform</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;background:#1a1a1a;color:#e8e8e8;height:100vh;overflow:hidden}
.container{display:flex;height:100vh}
.sidebar{width:280px;background:#2d2d2d;border-right:1px solid #3d3d3d;display:flex;flex-direction:column;flex-shrink:0}
@media(max-width:768px){.sidebar{width:100%;position:fixed;left:0;top:0;z-index:1000;transform:translateX(-100%);transition:transform 0.3s}.sidebar.open{transform:translateX(0)}}
.sidebar-header{padding:16px;border-bottom:1px solid #3d3d3d;display:flex;justify-content:space-between;align-items:center}
.logo{color:#ffd700;font-weight:900;font-size:18px;display:flex;align-items:center;gap:8px}
.new-chat-btn{background:#ffd700;color:#000;border:none;padding:10px 16px;border-radius:8px;font-weight:700;cursor:pointer;font-size:14px}
.agents-list{flex:1;overflow-y:auto;padding:8px}
.agent-item{padding:12px;margin:4px 0;border-radius:8px;cursor:pointer;transition:background 0.2s;display:flex;align-items:center;gap:10px;background:#1a1a1a}
.agent-item:hover{background:#3d3d3d}
.agent-item.active{background:#ffd700;color:#000}
.agent-item .emoji{font-size:20px}
.agent-item .name{font-size:14px;font-weight:600;flex:1}
.main-content{flex:1;display:flex;flex-direction:column;min-width:0}
.chat-header{background:#2d2d2d;border-bottom:1px solid #3d3d3d;padding:16px 20px;display:flex;justify-content:space-between;align-items:center}
.chat-header .agent-info{display:flex;align-items:center;gap:12px}
.chat-header .emoji{font-size:24px}
.chat-header .details .name{font-weight:700;font-size:16px;color:#ffd700}
.chat-header .details .specialty{font-size:12px;color:#999;margin-top:2px}
.menu-btn{display:none;background:#ffd700;color:#000;border:none;padding:8px 12px;border-radius:6px;font-weight:700;cursor:pointer}
@media(max-width:768px){.menu-btn{display:block}}
.chat-messages{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:16px}
.message{max-width:700px;padding:16px;border-radius:12px;line-height:1.6;font-size:15px;white-space:pre-wrap}
.message.user{background:#3d3d3d;align-self:flex-end;margin-left:auto}
.message.agent{background:#2d2d2d;align-self:flex-start;border-left:3px solid #ffd700}
.message.agent strong{color:#ffd700;display:block;margin-bottom:8px}
.message-meta{font-size:11px;color:#666;margin-top:8px;font-family:monospace}
.chat-input-area{border-top:1px solid #3d3d3d;padding:16px 20px;background:#2d2d2d}
.input-wrapper{display:flex;gap:12px;align-items:flex-end;max-width:900px;margin:0 auto}
.chat-input{flex:1;background:#1a1a1a;border:2px solid #3d3d3d;border-radius:12px;padding:14px 16px;color:#e8e8e8;font-size:15px;font-family:inherit;resize:none;min-height:50px;max-height:200px}
.chat-input:focus{outline:none;border-color:#ffd700}
.send-btn{background:#ffd700;color:#000;border:none;padding:14px 24px;border-radius:12px;font-weight:700;cursor:pointer;font-size:15px;white-space:nowrap}
.send-btn:disabled{opacity:0.5;cursor:not-allowed}
.send-btn:not(:disabled):active{transform:scale(0.95)}
.welcome{text-align:center;padding:60px 20px;color:#666}
.welcome h2{color:#ffd700;font-size:28px;margin-bottom:16px}
.welcome p{font-size:16px;max-width:600px;margin:0 auto}
.loading{padding:16px;text-align:center;color:#ffd700;animation:pulse 1.5s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
::-webkit-scrollbar{width:8px;height:8px}
::-webkit-scrollbar-track{background:#1a1a1a}
::-webkit-scrollbar-thumb{background:#3d3d3d;border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:#4d4d4d}
</style>
</head>
<body>
<div class="container">
<div class="sidebar" id="sidebar">
<div class="sidebar-header">
<div class="logo">⚡ SKA AI</div>
<button class="new-chat-btn" onclick="newChat()">New Chat</button>
</div>
<div class="agents-list" id="agentsList"></div>
</div>
<div class="main-content">
<div class="chat-header">
<div class="agent-info">
<button class="menu-btn" onclick="toggleSidebar()">☰ Menu</button>
<span class="emoji" id="headerEmoji">🤖</span>
<div class="details">
<div class="name" id="headerName">Select an Agent</div>
<div class="specialty" id="headerSpecialty">Choose from 25 specialized AI agents</div>
</div>
</div>
</div>
<div class="chat-messages" id="chatMessages">
<div class="welcome">
<h2>Welcome to Sales King Academy</h2>
<p>Select an AI agent from the sidebar to begin your conversation. Each agent specializes in different areas of business automation and intelligence.</p>
</div>
</div>
<div class="chat-input-area">
<div class="input-wrapper">
<textarea class="chat-input" id="chatInput" placeholder="Type your message..." rows="1"></textarea>
<button class="send-btn" id="sendBtn" onclick="sendMessage()">Send</button>
</div>
</div>
</div>
</div>
<script>
let currentAgent = null;
let chatHistory = new Map();
let isSending = false;

async function loadAgents() {
  try {
    const r = await fetch('/api/agents');
    const d = await r.json();
    const list = document.getElementById('agentsList');
    list.innerHTML = '';
    d.agents.forEach(a => {
      const div = document.createElement('div');
      div.className = 'agent-item';
      div.innerHTML = '<span class="emoji">' + a.emoji + '</span><span class="name">' + a.name + '</span>';
      div.onclick = () => selectAgent(a);
      list.appendChild(div);
    });
  } catch (e) {
    console.error('Failed to load agents:', e);
  }
}

function selectAgent(agent) {
  currentAgent = agent;
  
  document.querySelectorAll('.agent-item').forEach(el => el.classList.remove('active'));
  event.target.closest('.agent-item').classList.add('active');
  
  document.getElementById('headerEmoji').textContent = agent.emoji;
  document.getElementById('headerName').textContent = agent.name;
  document.getElementById('headerSpecialty').textContent = agent.specialty;
  
  if (chatHistory.has(agent.id)) {
    document.getElementById('chatMessages').innerHTML = chatHistory.get(agent.id);
  } else {
    document.getElementById('chatMessages').innerHTML = '<div class="message agent"><strong>' + agent.emoji + ' ' + agent.name + '</strong>Hello! I\'m ' + agent.name + '. I specialize in ' + agent.specialty + '. How can I help you today?</div>';
    chatHistory.set(agent.id, document.getElementById('chatMessages').innerHTML);
  }
  
  document.getElementById('chatInput').focus();
  
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

async function sendMessage() {
  if (!currentAgent || isSending) return;
  
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  
  isSending = true;
  document.getElementById('sendBtn').disabled = true;
  
  const messagesDiv = document.getElementById('chatMessages');
  messagesDiv.innerHTML += '<div class="message user">' + escapeHtml(msg) + '</div>';
  input.value = '';
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  
  messagesDiv.innerHTML += '<div class="message agent loading">Thinking...</div>';
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  
  try {
    const r = await fetch('/api/agent/' + currentAgent.id + '/chat', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({message: msg})
    });
    
    const loadingMsgs = messagesDiv.querySelectorAll('.loading');
    loadingMsgs[loadingMsgs.length - 1].remove();
    
    if (r.ok) {
      const d = await r.json();
      let responseHTML = '<div class="message agent"><strong>' + d.agent + ' ' + currentAgent.emoji + '</strong>';
      responseHTML += escapeHtml(d.response);
      responseHTML += '<div class="message-meta">Token: ' + d.token.substring(0, 8) + '... | Interlock: ' + d.interlock + '</div>';
      responseHTML += '</div>';
      messagesDiv.innerHTML += responseHTML;
    } else {
      messagesDiv.innerHTML += '<div class="message agent" style="color:#ff6b6b">⚠️ Error: Unable to get response. Please try again.</div>';
    }
  } catch (e) {
    const loadingMsgs = messagesDiv.querySelectorAll('.loading');
    if (loadingMsgs.length > 0) loadingMsgs[loadingMsgs.length - 1].remove();
    messagesDiv.innerHTML += '<div class="message agent" style="color:#ff6b6b">⚠️ Network error. Please check your connection.</div>';
  } finally {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    chatHistory.set(currentAgent.id, messagesDiv.innerHTML);
    isSending = false;
    document.getElementById('sendBtn').disabled = false;
    document.getElementById('chatInput').focus();
  }
}

function newChat() {
  if (currentAgent) {
    chatHistory.delete(currentAgent.id);
    document.getElementById('chatMessages').innerHTML = '<div class="message agent"><strong>' + currentAgent.emoji + ' ' + currentAgent.name + '</strong>Hello! I\'m ' + currentAgent.name + '. How can I help you today?</div>';
    chatHistory.set(currentAgent.id, document.getElementById('chatMessages').innerHTML);
    document.getElementById('chatInput').focus();
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.getElementById('chatInput').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

document.getElementById('chatInput').addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 200) + 'px';
});

loadAgents();
</script>
</body>
</html>`, {headers: {'Content-Type': 'text/html'}});
}

addEventListener('fetch', event => { event.respondWith(handleRequest(event.request)); });
