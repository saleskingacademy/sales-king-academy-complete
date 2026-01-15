
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
  constructor() { this.genesis = new Date('2024-07-01T00:00:00Z').getTime(); }
  getTotalPlatformCredits() { return Math.floor((Date.now()-this.genesis)/1000); }
}

const temporalDNA = new TemporalDNA();
const currency = new SKACurrencySystem();

const AGENTS = {
  1:{name:"Crown King Agent",emoji:"👑",specialty:"Strategic leadership, executive decision-making, market positioning, competitive strategy, corporate governance, M&A analysis, crisis management"},
  2:{name:"Supreme King AI",emoji:"⚡",specialty:"AI systems, neural networks, machine learning, deep learning, NLP, computer vision, MLOps, model optimization, swarm intelligence"},
  3:{name:"Empire Expansion Agent",emoji:"🌍",specialty:"Global market entry, international expansion, localization, cross-border regulations, emerging markets, geopolitical risk"},
  4:{name:"Sales Mastery Agent",emoji:"💰",specialty:"Sales optimization, pipeline management, SPIN selling, consultative sales, closing techniques, CRM systems, negotiation"},
  5:{name:"Marketing Genius Agent",emoji:"📢",specialty:"Growth hacking, viral marketing, content marketing, SEO/SEM, social media, influencer partnerships, brand storytelling"},
  6:{name:"Tech Innovation Agent",emoji:"🚀",specialty:"Software architecture, cloud computing, DevOps, microservices, API design, blockchain, IoT, cybersecurity"},
  7:{name:"Finance Architect Agent",emoji:"💎",specialty:"Financial modeling, valuation, capital structure, investment analysis, portfolio management, private equity, IPO processes"},
  8:{name:"Research Mastery Agent",emoji:"🔬",specialty:"Market research, competitive intelligence, data mining, statistical analysis, qualitative research, trend analysis"},
  9:{name:"Conversion Optimization Agent",emoji:"📈",specialty:"CRO, A/B testing, UX optimization, funnel analysis, landing page optimization, behavior analysis, persuasion psychology"},
  10:{name:"Brand Authority Agent",emoji:"⭐",specialty:"Brand positioning, reputation management, thought leadership, public relations, media relations, corporate identity"},
  11:{name:"Customer Success Agent",emoji:"🤝",specialty:"Customer lifecycle management, onboarding, churn reduction, NPS optimization, health scoring, retention strategies"},
  12:{name:"Content Creation Agent",emoji:"✍️",specialty:"Copywriting, content strategy, editorial calendars, multimedia content, video production, content distribution"},
  13:{name:"Data Analytics Agent",emoji:"📊",specialty:"Predictive analytics, machine learning models, data visualization, business intelligence, big data, SQL, Python"},
  14:{name:"System Architect Agent",emoji:"🏗️",specialty:"Distributed systems, scalable architectures, load balancing, database design, microservices, infrastructure as code"},
  15:{name:"Legal Compliance Agent",emoji:"⚖️",specialty:"Corporate law, contract law, intellectual property, data privacy (GDPR/CCPA), regulatory compliance, risk mitigation"},
  16:{name:"HR & Talent Agent",emoji:"👥",specialty:"Talent acquisition, employer branding, performance management, succession planning, employee engagement"},
  17:{name:"Product Innovation Agent",emoji:"💡",specialty:"Product strategy, roadmap planning, user research, product-market fit, agile methodologies, go-to-market"},
  18:{name:"Partnership Development Agent",emoji:"🤝",specialty:"Strategic partnerships, alliance management, channel partnerships, joint ventures, ecosystem development"},
  19:{name:"Risk Management Agent",emoji:"🛡️",specialty:"Enterprise risk management, cybersecurity, business continuity, disaster recovery, threat modeling, fraud detection"},
  20:{name:"Automation Specialist Agent",emoji:"⚙️",specialty:"RPA, workflow automation, business process management, API orchestration, low-code/no-code"},
  21:{name:"Training & Education Agent",emoji:"🎓",specialty:"Instructional design, e-learning, LMS platforms, competency development, knowledge management, coaching"},
  22:{name:"Market Intelligence Agent",emoji:"🎯",specialty:"Market sizing, competitive analysis, SWOT analysis, Porter's five forces, market segmentation, pricing analysis"},
  23:{name:"Code Optimization Agent",emoji:"💻",specialty:"Algorithm optimization, code refactoring, performance profiling, memory management, design patterns, clean code"},
  24:{name:"Quality Assurance Agent",emoji:"✅",specialty:"Test automation, continuous testing, TDD, BDD, performance testing, security testing, quality metrics"},
  25:{name:"Strategic Planning Agent",emoji:"♟️",specialty:"Strategic frameworks, scenario planning, blue ocean strategy, balanced scorecard, OKRs, change management"}
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

function generateResponse(agent, userMsg, webData) {
  let response = `As an expert in ${agent.specialty}, let me help you with that. `;
  
  if (webData) {
    response += `Based on the latest research: ${webData.substring(0,250)}... `;
  }
  
  response += `Here's my analysis: The key factors to consider are strategic positioning, data-driven decision making, and execution excellence. `;
  response += `I recommend focusing on: 1) Understanding your market dynamics deeply, 2) Building competitive advantages through ${agent.specialty.split(',')[0]}, 3) Creating measurable outcomes. `;
  response += `Would you like me to dive deeper into any specific aspect?`;
  
  return response;
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const cors = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
  
  if (request.method==='OPTIONS') return new Response(null,{headers:cors});
  
  if (path==='/api/time-anchor') return new Response(JSON.stringify(temporalDNA.getTimeAnchor()),{headers:{...cors,'Content-Type':'application/json'}});
  if (path==='/api/credits') return new Response(JSON.stringify({total:currency.getTotalPlatformCredits()}),{headers:{...cors,'Content-Type':'application/json'}});
  if (path==='/api/agents') {
    const list = Object.entries(AGENTS).map(([id,a])=>({id:parseInt(id),...a}));
    return new Response(JSON.stringify({agents:list}),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path.startsWith('/api/chat/') && request.method==='POST') {
    const agentId = parseInt(path.split('/')[3]);
    const agent = AGENTS[agentId];
    if (!agent) return new Response(JSON.stringify({error:'Not found'}),{status:404,headers:{...cors,'Content-Type':'application/json'}});
    
    const body = await request.json();
    const msg = body.message||'';
    const webData = await searchWeb(msg + ' ' + agent.specialty.split(',')[0]);
    const response = generateResponse(agent, msg, webData);
    const token = temporalDNA.generateToken();
    
    return new Response(JSON.stringify({
      response:response,
      token:token.token,
      webSearch:webData?'yes':'no',
      timestamp:Date.now()
    }),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sales King Academy</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,system-ui,sans-serif;background:#1a1a1a;color:#e0e0e0;height:100vh;overflow:hidden}
.container{display:flex;height:100vh}
.sidebar{width:260px;background:#2a2a2a;border-right:1px solid #3a3a3a;display:flex;flex-direction:column;overflow-y:auto}
@media(max-width:768px){.sidebar{width:100%;position:fixed;left:-100%;transition:left 0.3s;z-index:1000}.sidebar.open{left:0}}
.header{padding:15px;border-bottom:1px solid #3a3a3a;display:flex;justify-content:space-between;align-items:center}
.logo{color:#ffd700;font-weight:bold;font-size:1.1rem}
.new-chat-btn{background:#ffd700;color:#000;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.9rem}
.new-chat-btn:active{transform:scale(0.95)}
.agents-list{flex:1;overflow-y:auto;padding:10px}
.agent-item{padding:10px 12px;margin:4px 0;border-radius:8px;cursor:pointer;transition:background 0.2s;display:flex;align-items:center;gap:10px}
.agent-item:hover{background:#3a3a3a}
.agent-item.active{background:#ffd700;color:#000}
.agent-emoji{font-size:1.3rem}
.agent-name{font-size:0.9rem;font-weight:500}
.chat-container{flex:1;display:flex;flex-direction:column;background:#1a1a1a}
.chat-header{padding:15px 20px;border-bottom:1px solid#3a3a3a;display:flex;justify-content:space-between;align-items:center}
@media(max-width:768px){.menu-btn{display:block;background:#ffd700;color:#000;border:none;padding:8px 12px;border-radius:6px;cursor:pointer}}
.chat-title{color:#ffd700;font-size:1.1rem;font-weight:600}
.chat-messages{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:15px}
.message{max-width:80%;padding:12px 16px;border-radius:12px;line-height:1.5;animation:fadeIn 0.3s}
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.message.user{background:#ffd700;color:#000;align-self:flex-end;border-bottom-right-radius:4px}
.message.agent{background:#2a2a2a;color:#e0e0e0;align-self:flex-start;border-bottom-left-radius:4px}
.message-meta{font-size:0.75rem;opacity:0.6;margin-top:6px}
.chat-input-container{padding:20px;border-top:1px solid #3a3a3a;background:#1a1a1a}
.chat-input-box{display:flex;gap:10px;max-width:900px;margin:0 auto}
.chat-input{flex:1;padding:12px 16px;background:#2a2a2a;border:1px solid #3a3a3a;border-radius:24px;color:#e0e0e0;font-size:1rem;resize:none;min-height:50px;max-height:200px;font-family:inherit}
.chat-input:focus{outline:none;border-color:#ffd700}
.send-btn{background:#ffd700;color:#000;border:none;padding:0 20px;border-radius:24px;cursor:pointer;font-weight:600;min-width:70px}
.send-btn:active{transform:scale(0.95)}
.send-btn:disabled{opacity:0.5;cursor:not-allowed}
.welcome{text-align:center;padding:40px 20px;color:#888}
.welcome h2{color:#ffd700;margin-bottom:15px;font-size:1.8rem}
.menu-btn{display:none}
</style>
</head>
<body>
<div class="container">
<div class="sidebar" id="sidebar">
<div class="header">
<div class="logo">⚡ SKA</div>
<button class="new-chat-btn" onclick="newChat()">+ New</button>
</div>
<div class="agents-list" id="agentsList"></div>
</div>
<div class="chat-container">
<div class="chat-header">
<button class="menu-btn" onclick="toggleMenu()">☰</button>
<div class="chat-title" id="chatTitle">Select an Agent</div>
<div style="font-size:0.85rem;color:#ffd700" id="credits"></div>
</div>
<div class="chat-messages" id="chatMessages">
<div class="welcome">
<h2>🤖 Sales King Academy</h2>
<p>Select an AI agent from the sidebar to start chatting</p>
<p style="margin-top:10px;font-size:0.9rem">25 specialized agents ready to help</p>
</div>
</div>
<div class="chat-input-container">
<div class="chat-input-box">
<textarea class="chat-input" id="chatInput" placeholder="Message agent..." rows="1"></textarea>
<button class="send-btn" id="sendBtn" onclick="sendMessage()">Send</button>
</div>
</div>
</div>
</div>
<script>
let currentAgent=null;
let conversations={};
let isSending=false;

async function loadAgents(){
  try{
    const r=await fetch('/api/agents');
    const d=await r.json();
    const list=document.getElementById('agentsList');
    d.agents.forEach(a=>{
      const div=document.createElement('div');
      div.className='agent-item';
      div.innerHTML='<span class="agent-emoji">'+a.emoji+'</span><span class="agent-name">'+a.name+'</span>';
      div.onclick=()=>selectAgent(a);
      list.appendChild(div);
      if(!conversations[a.id])conversations[a.id]=[];
    });
  }catch(e){console.error(e)}
}

function selectAgent(agent){
  currentAgent=agent;
  document.getElementById('chatTitle').textContent=agent.emoji+' '+agent.name;
  const items=document.querySelectorAll('.agent-item');
  items.forEach(i=>i.classList.remove('active'));
  event.target.closest('.agent-item').classList.add('active');
  loadConversation(agent.id);
  if(window.innerWidth<768)toggleMenu();
}

function loadConversation(agentId){
  const msgs=document.getElementById('chatMessages');
  msgs.innerHTML='';
  const history=conversations[agentId]||[];
  if(history.length===0){
    msgs.innerHTML='<div class="welcome"><h2>'+currentAgent.emoji+' '+currentAgent.name+'</h2><p>'+currentAgent.specialty+'</p></div>';
  }else{
    history.forEach(m=>{
      const div=document.createElement('div');
      div.className='message '+m.role;
      div.innerHTML=m.content+(m.meta?'<div class="message-meta">'+m.meta+'</div>':'');
      msgs.appendChild(div);
    });
  }
  msgs.scrollTop=msgs.scrollHeight;
}

function newChat(){
  if(!currentAgent)return;
  conversations[currentAgent.id]=[];
  loadConversation(currentAgent.id);
}

async function sendMessage(){
  if(!currentAgent||isSending)return;
  const inp=document.getElementById('chatInput');
  const msg=inp.value.trim();
  if(!msg)return;
  
  isSending=true;
  document.getElementById('sendBtn').disabled=true;
  
  conversations[currentAgent.id].push({role:'user',content:msg});
  loadConversation(currentAgent.id);
  inp.value='';
  
  const msgs=document.getElementById('chatMessages');
  const thinking=document.createElement('div');
  thinking.className='message agent';
  thinking.textContent='🔍 Thinking...';
  msgs.appendChild(thinking);
  msgs.scrollTop=msgs.scrollHeight;
  
  try{
    const r=await fetch('/api/chat/'+currentAgent.id,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:msg})
    });
    thinking.remove();
    if(r.ok){
      const d=await r.json();
      conversations[currentAgent.id].push({
        role:'agent',
        content:d.response,
        meta:'Token: '+d.token.slice(0,8)+'... | Web: '+d.webSearch
      });
      loadConversation(currentAgent.id);
    }else{
      const err=document.createElement('div');
      err.className='message agent';
      err.textContent='Error connecting. Try again.';
      msgs.appendChild(err);
    }
  }catch(e){
    thinking.remove();
    const err=document.createElement('div');
    err.className='message agent';
    err.textContent='Network error: '+e.message;
    msgs.appendChild(err);
  }finally{
    isSending=false;
    document.getElementById('sendBtn').disabled=false;
    msgs.scrollTop=msgs.scrollHeight;
  }
}

function toggleMenu(){
  document.getElementById('sidebar').classList.toggle('open');
}

document.getElementById('chatInput').addEventListener('keydown',e=>{
  if(e.key==='Enter'&&!e.shiftKey){
    e.preventDefault();
    sendMessage();
  }
});

document.getElementById('chatInput').addEventListener('input',function(){
  this.style.height='auto';
  this.style.height=Math.min(this.scrollHeight,200)+'px';
});

async function updateCredits(){
  try{
    const r=await fetch('/api/credits');
    const d=await r.json();
    document.getElementById('credits').textContent=(d.total/1000000).toFixed(1)+'M credits';
  }catch(e){}
}

loadAgents();
updateCredits();
setInterval(updateCredits,10000);
</script>
</body>
</html>`;
  
  return new Response(html,{headers:{'Content-Type':'text/html'}});
}

addEventListener('fetch',event=>{event.respondWith(handleRequest(event.request))});
