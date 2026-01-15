// SALES KING ACADEMY - COMPLETE INTEGRATED SYSTEM
// Main Menu + All Components + Chat Interface + Web Search

class TemporalDNA {
  constructor() { this.genesis = new Date('2024-07-01T00:00:00Z').getTime(); }
  generateToken() {
    const now = Date.now();
    const random12 = Array(12).fill(0).map(() => Math.floor(Math.random()*10)).join('');
    const sync4 = (Math.floor(now/1000)%10000).toString().padStart(4,'0');
    return {token:random12+sync4,type:'COMPUTATION',timestamp:now,framework:'RKL α=25'};
  }
  getTimeAnchor() {
    const now = Date.now();
    const elapsed = Math.floor((now-this.genesis)/1000);
    return {genesis:'2024-07-01T00:00:00Z',current:new Date(now).toISOString(),elapsed_seconds:elapsed,credits_minted:elapsed,framework:'RKL α=25'};
  }
}

class SKACurrency {
  constructor() { this.genesis = new Date('2024-07-01T00:00:00Z').getTime(); }
  getTotalCredits() { return Math.floor((Date.now()-this.genesis)/1000); }
}

const temporalDNA = new TemporalDNA();
const currency = new SKACurrency();

const COMPONENTS = {
  agents: {name:'AI Agents',icon:'🤖',desc:'25 specialized AI agents for business automation'},
  training: {name:'Training',icon:'🎓',desc:'Premium training programs and courses'},
  myiq: {name:'MyIQ Platform',icon:'🧠',desc:'350+ intelligence assessments'},
  automation: {name:'Automation',icon:'⚙️',desc:'Business process automation tools'},
  analytics: {name:'Analytics',icon:'📊',desc:'Advanced data analytics and insights'},
  finance: {name:'Finance',icon:'💎',desc:'Financial management and SKA Credits'},
  marketplace: {name:'Marketplace',icon:'🏪',desc:'Products and services marketplace'},
  whiteLlabel: {name:'White Label',icon:'🏷️',desc:'White label licensing opportunities'}
};

const AGENTS = {
  1:{name:"Crown King Agent",emoji:"👑",specialty:"Strategic leadership, executive decision-making, market positioning, competitive strategy, corporate governance, M&A analysis, crisis management, stakeholder relations, vision articulation, organizational transformation"},
  2:{name:"Supreme King AI",emoji:"⚡",specialty:"AI systems, neural networks, machine learning, deep learning, transformer architectures, reinforcement learning, NLP, computer vision, MLOps, model optimization, AI ethics, AGI research, swarm intelligence, multi-agent systems"},
  3:{name:"Empire Expansion Agent",emoji:"🌍",specialty:"International market entry, localization strategies, cross-border regulations, cultural adaptation, supply chain internationalization, emerging markets, geopolitical risk assessment, franchise development, global partnerships"},
  4:{name:"Sales Mastery Agent",emoji:"💰",specialty:"SPIN selling, consultative sales, solution selling, account-based selling, pipeline optimization, CRM systems, objection handling, negotiation tactics, closing techniques, quota attainment, territory management, sales enablement"},
  5:{name:"Marketing Genius Agent",emoji:"📢",specialty:"Growth hacking, viral marketing, content marketing, SEO/SEM, social media marketing, influencer partnerships, marketing automation, conversion optimization, brand storytelling, customer journey mapping, attribution modeling"},
  6:{name:"Tech Innovation Agent",emoji:"🚀",specialty:"Software architecture, cloud computing, DevOps, microservices, API design, blockchain, quantum computing, IoT, edge computing, cybersecurity, system scalability, tech stack selection, innovation labs"},
  7:{name:"Finance Architect Agent",emoji:"💎",specialty:"Financial modeling, valuation methods, capital structure, investment analysis, portfolio management, risk-adjusted returns, derivatives, private equity, venture capital, IPO processes, financial regulations, treasury management"},
  8:{name:"Research Mastery Agent",emoji:"🔬",specialty:"Market research methodologies, competitive intelligence, data mining, statistical analysis, qualitative research, quantitative research, survey design, focus groups, ethnographic research, trend analysis, consumer insights"},
  9:{name:"Conversion Optimization Agent",emoji:"📈",specialty:"A/B testing, multivariate testing, user experience optimization, landing page optimization, funnel analysis, heat mapping, session recording, customer behavior analysis, persuasion psychology, CRO frameworks"},
  10:{name:"Brand Authority Agent",emoji:"⭐",specialty:"Brand positioning, brand architecture, brand equity, reputation management, thought leadership, public relations, media relations, crisis communications, corporate identity, brand messaging, narrative design"},
  11:{name:"Customer Success Agent",emoji:"🤝",specialty:"Customer lifecycle management, onboarding optimization, churn reduction, NPS optimization, customer health scoring, success planning, escalation management, retention strategies, expansion revenue, customer advocacy"},
  12:{name:"Content Creation Agent",emoji:"✍️",specialty:"Copywriting, content strategy, editorial calendars, multimedia content, video production, podcasting, content distribution, content ROI, storytelling frameworks, persuasive writing, content personalization"},
  13:{name:"Data Analytics Agent",emoji:"📊",specialty:"Predictive analytics, machine learning models, data visualization, business intelligence, big data technologies, SQL, Python, R, Tableau, data warehousing, ETL processes, data governance"},
  14:{name:"System Architect Agent",emoji:"🏗️",specialty:"Distributed systems, scalable architectures, load balancing, caching strategies, database design, microservices patterns, API gateways, service mesh, infrastructure as code, disaster recovery, high availability"},
  15:{name:"Legal Compliance Agent",emoji:"⚖️",specialty:"Corporate law, contract law, intellectual property, data privacy (GDPR, CCPA), employment law, regulatory compliance, litigation management, risk mitigation, corporate governance, compliance audits"},
  16:{name:"HR & Talent Agent",emoji:"👥",specialty:"Talent acquisition, employer branding, competency frameworks, performance management, succession planning, compensation strategy, employee engagement, learning & development, organizational design, culture building"},
  17:{name:"Product Innovation Agent",emoji:"💡",specialty:"Product strategy, roadmap planning, user research, product-market fit, agile methodologies, scrum, kanban, feature prioritization, product analytics, go-to-market strategy, product lifecycle management"},
  18:{name:"Partnership Development Agent",emoji:"🤝",specialty:"Alliance management, channel partnerships, co-marketing agreements, joint ventures, partnership negotiation, ecosystem development, partner enablement, revenue sharing models, strategic collaborations"},
  19:{name:"Risk Management Agent",emoji:"🛡️",specialty:"Enterprise risk management, cybersecurity, business continuity, disaster recovery, threat modeling, vulnerability assessment, compliance audits, insurance, fraud detection, crisis management, risk quantification"},
  20:{name:"Automation Specialist Agent",emoji:"⚙️",specialty:"RPA, workflow automation, business process management, integration platforms, API orchestration, low-code/no-code, automation ROI, change management, process mining, intelligent automation"},
  21:{name:"Training & Education Agent",emoji:"🎓",specialty:"Instructional design, e-learning, LMS platforms, competency development, training ROI, knowledge management, certification programs, coaching, mentoring, skill gap analysis, learning analytics"},
  22:{name:"Market Intelligence Agent",emoji:"🎯",specialty:"Market sizing, competitive analysis, industry trends, SWOT analysis, Porter's five forces, market segmentation, opportunity assessment, pricing analysis, market entry strategies, intelligence gathering"},
  23:{name:"Code Optimization Agent",emoji:"💻",specialty:"Algorithm optimization, code refactoring, performance profiling, memory management, concurrency, asynchronous programming, design patterns, clean code, technical debt management, code quality metrics"},
  24:{name:"Quality Assurance Agent",emoji:"✅",specialty:"Test automation, continuous testing, test-driven development, behavior-driven development, performance testing, security testing, exploratory testing, defect management, quality metrics, QA processes"},
  25:{name:"Strategic Planning Agent",emoji:"♟️",specialty:"Strategic frameworks, scenario planning, blue ocean strategy, balanced scorecard, OKRs, strategic initiatives, change management, organizational alignment, strategic communication, competitive positioning"}
};

async function searchWeb(query) {
  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    const r = await fetch(url);
    const d = await r.json();
    let results = [];
    if (d.Abstract) results.push(d.Abstract);
    if (d.AbstractText) results.push(d.AbstractText);
    if (d.RelatedTopics) {
      for (let i=0; i<Math.min(3,d.RelatedTopics.length); i++) {
        if (d.RelatedTopics[i].Text) results.push(d.RelatedTopics[i].Text);
      }
    }
    return results.length>0 ? results.join(' | ') : null;
  } catch(e) {
    console.error('Search error:', e);
    return null;
  }
}

function generateResponse(agent, userMsg, webData) {
  let response = `As an expert in ${agent.specialty.split(',')[0]}, I've analyzed your question. `;
  
  if (webData && webData.length > 20) {
    response += `Based on current research: ${webData.substring(0,200)}... `;
  }
  
  const skills = agent.specialty.split(',').map(s=>s.trim()).slice(0,4);
  response += `\n\nKey insights for your situation:\n`;
  skills.forEach((skill,i)=>{
    response += `${i+1}. ${skill.charAt(0).toUpperCase()+skill.slice(1)} - `;
    response += `This is critical for achieving your objectives. `;
  });
  
  response += `\n\nI can provide detailed implementation guidance on any of these areas. What would you like to explore deeper?`;
  
  return response;
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const cors = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type,Authorization'};
  
  if (request.method==='OPTIONS') return new Response(null,{headers:cors});
  
  // APIs
  if (path==='/api/time-anchor') {
    return new Response(JSON.stringify(temporalDNA.getTimeAnchor()),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path==='/api/credits') {
    return new Response(JSON.stringify({total:currency.getTotalCredits(),rate:'1/sec'}),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path==='/api/components') {
    return new Response(JSON.stringify({components:COMPONENTS}),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path==='/api/agents') {
    const list = Object.entries(AGENTS).map(([id,a])=>({id:parseInt(id),...a}));
    return new Response(JSON.stringify({agents:list,count:list.length}),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path.startsWith('/api/chat/') && request.method==='POST') {
    const agentId = parseInt(path.split('/')[3]);
    const agent = AGENTS[agentId];
    if (!agent) {
      return new Response(JSON.stringify({error:'Agent not found'}),{status:404,headers:{...cors,'Content-Type':'application/json'}});
    }
    
    try {
      const body = await request.json();
      const msg = body.message||'';
      
      const searchQuery = msg + ' ' + agent.specialty.split(',')[0];
      const webData = await searchWeb(searchQuery);
      
      const response = generateResponse(agent, msg, webData);
      const token = temporalDNA.generateToken();
      
      return new Response(JSON.stringify({
        agent: agent.name,
        response: response,
        token: token.token,
        webSearch: webData ? 'yes' : 'no',
        timestamp: Date.now()
      }),{headers:{...cors,'Content-Type':'application/json'}});
    } catch(e) {
      return new Response(JSON.stringify({error:'Processing failed: '+e.message}),{status:500,headers:{...cors,'Content-Type':'application/json'}});
    }
  }
  
  // FRONTEND HTML
  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sales King Academy</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,system-ui,sans-serif;background:#0a0a0a;color:#e0e0e0;height:100vh;overflow:hidden}
.container{display:flex;height:100vh}
.sidebar{width:280px;background:#1a1a1a;border-right:1px solid#2a2a2a;display:flex;flex-direction:column}
@media(max-width:768px){.sidebar{width:100%;position:fixed;left:-100%;transition:left 0.3s;z-index:1000;background:#0a0a0a}.sidebar.open{left:0}}
.logo-section{padding:20px;border-bottom:1px solid #2a2a2a}
.logo{color:#ffd700;font-weight:900;font-size:1.3rem;text-shadow:0 0 10px #ffd700}
.logo-sub{color:#0f0;font-size:0.75rem;margin-top:5px}
.menu-section{padding:15px;border-bottom:1px solid #2a2a2a}
.menu-title{color:#888;font-size:0.75rem;text-transform:uppercase;margin-bottom:10px;font-weight:600}
.menu-btn{width:100%;padding:10px 12px;background:#1a1a1a;border:1px solid#2a2a2a;border-radius:8px;color:#e0e0e0;cursor:pointer;margin:4px 0;display:flex;align-items:center;gap:10px;transition:all 0.2s;text-align:left}
.menu-btn:hover{background:#2a2a2a;border-color:#ffd700}
.menu-btn.active{background:#ffd700;color:#000;border-color:#ffd700}
.menu-icon{font-size:1.2rem}
.agents-section{flex:1;overflow-y:auto;padding:15px}
.agent-item{padding:10px 12px;margin:4px 0;border-radius:8px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:10px;border:1px solid transparent}
.agent-item:hover{background:#2a2a2a;border-color:#ffd700}
.agent-item.active{background:#ffd700;color:#000}
.main-area{flex:1;display:flex;flex-direction:column;background:#0a0a0a}
.top-bar{padding:15px 20px;border-bottom:1px solid #2a2a2a;display:flex;justify-content:space-between;align-items:center}
.menu-toggle{display:none;background:#ffd700;color:#000;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:600}
@media(max-width:768px){.menu-toggle{display:block}}
.top-title{color:#ffd700;font-size:1.2rem;font-weight:700}
.credits-display{color:#0f0;font-size:0.9rem;font-family:monospace}
.content-area{flex:1;overflow-y:auto;padding:20px}
.welcome{text-align:center;padding:60px 20px}
.welcome h1{color:#ffd700;font-size:2.5rem;margin-bottom:15px;text-shadow:0 0 20px #ffd700}
.welcome p{color:#888;font-size:1.1rem;margin:10px 0}
.component-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;max-width:1200px;margin:0 auto}
.component-card{background:#1a1a1a;border:2px solid #2a2a2a;border-radius:12px;padding:25px;cursor:pointer;transition:all 0.3s}
.component-card:hover{border-color:#ffd700;transform:translateY(-5px);box-shadow:0 10px 30px rgba(255,215,0,0.3)}
.component-icon{font-size:3rem;margin-bottom:15px}
.component-name{color:#ffd700;font-size:1.2rem;font-weight:700;margin-bottom:10px}
.component-desc{color:#888;font-size:0.9rem;line-height:1.5}
.chat-area{display:flex;flex-direction:column;height:100%}
.chat-messages{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:15px}
.message{max-width:80%;padding:15px;border-radius:12px;line-height:1.6;animation:fadeIn 0.3s}
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.message.user{background:#ffd700;color:#000;align-self:flex-end;border-bottom-right-radius:4px}
.message.agent{background:#1a1a1a;color:#e0e0e0;align-self:flex-start;border-bottom-left-radius:4px;border:1px solid #2a2a2a}
.message-meta{font-size:0.75rem;opacity:0.6;margin-top:8px;font-family:monospace}
.chat-input-container{padding:20px;border-top:1px solid #2a2a2a}
.chat-input-box{display:flex;gap:10px;max-width:1000px;margin:0 auto}
.chat-input{flex:1;padding:14px 18px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:24px;color:#e0e0e0;font-size:1rem;resize:none;max-height:150px;font-family:inherit}
.chat-input:focus{outline:none;border-color:#ffd700}
.send-btn{background:#ffd700;color:#000;border:none;padding:14px 24px;border-radius:24px;cursor:pointer;font-weight:700;font-size:1rem}
.send-btn:active{transform:scale(0.95)}
.send-btn:disabled{opacity:0.5;cursor:not-allowed}
</style>
</head>
<body>
<div class="container">
<div class="sidebar" id="sidebar">
<div class="logo-section">
<div class="logo">⚡ SKA</div>
<div class="logo-sub">Sales King Academy</div>
</div>
<div class="menu-section">
<div class="menu-title">Main Menu</div>
<button class="menu-btn active" onclick="showHome()"><span class="menu-icon">🏠</span> Home</button>
<button class="menu-btn" onclick="showComponents()"><span class="menu-icon">📦</span> All Components</button>
<button class="menu-btn" onclick="showAgents()"><span class="menu-icon">🤖</span> AI Agents</button>
</div>
<div class="agents-section" id="agentsList" style="display:none"></div>
</div>
<div class="main-area">
<div class="top-bar">
<button class="menu-toggle" onclick="toggleSidebar()">☰ Menu</button>
<div class="top-title" id="topTitle">Sales King Academy</div>
<div class="credits-display" id="creditsDisplay">Loading...</div>
</div>
<div class="content-area" id="contentArea">
<div class="welcome">
<h1>⚡ Sales King Academy ⚡</h1>
<p>Complete AI Business Automation Platform</p>
<p style="margin-top:20px;color:#ffd700">Select from the menu to begin</p>
</div>
</div>
</div>
</div>
<script>
let currentView='home';
let currentAgent=null;
let conversations={};

async function loadAgents(){
  const r=await fetch('/api/agents');
  const d=await r.json();
  const list=document.getElementById('agentsList');
  list.innerHTML='<div class="menu-title" style="padding:0 0 10px 0">Select Agent</div>';
  d.agents.forEach(a=>{
    const div=document.createElement('div');
    div.className='agent-item';
    div.innerHTML='<span style="font-size:1.3rem">'+a.emoji+'</span><span style="font-size:0.9rem;font-weight:600">'+a.name+'</span>';
    div.onclick=()=>openAgentChat(a);
    list.appendChild(div);
    if(!conversations[a.id])conversations[a.id]=[];
  });
}

function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('open');
}

function showHome(){
  currentView='home';
  document.querySelectorAll('.menu-btn').forEach(b=>b.classList.remove('active'));
  event.target.closest('.menu-btn').classList.add('active');
  document.getElementById('agentsList').style.display='none';
  document.getElementById('topTitle').textContent='Sales King Academy';
  document.getElementById('contentArea').innerHTML='<div class="welcome"><h1>⚡ Sales King Academy ⚡</h1><p>Complete AI Business Automation Platform</p><p style="margin-top:20px;color:#ffd700">48.7M+ SKA Credits Minted | RKL Framework α=25</p></div>';
}

async function showComponents(){
  currentView='components';
  document.querySelectorAll('.menu-btn').forEach(b=>b.classList.remove('active'));
  event.target.closest('.menu-btn').classList.add('active');
  document.getElementById('agentsList').style.display='none';
  document.getElementById('topTitle').textContent='All Components';
  
  const r=await fetch('/api/components');
  const d=await r.json();
  let html='<div class="component-grid">';
  Object.entries(d.components).forEach(([key,comp])=>{
    html+='<div class="component-card" onclick="alert(\''+comp.name+' - Coming Soon\')"><div class="component-icon">'+comp.icon+'</div><div class="component-name">'+comp.name+'</div><div class="component-desc">'+comp.desc+'</div></div>';
  });
  html+='</div>';
  document.getElementById('contentArea').innerHTML=html;
}

function showAgents(){
  currentView='agents';
  document.querySelectorAll('.menu-btn').forEach(b=>b.classList.remove('active'));
  event.target.closest('.menu-btn').classList.add('active');
  document.getElementById('agentsList').style.display='block';
  document.getElementById('topTitle').textContent='Select an AI Agent';
  document.getElementById('contentArea').innerHTML='<div class="welcome"><h2 style="color:#ffd700">🤖 AI Agent Swarm</h2><p>Select an agent from the sidebar to start chatting</p><p style="margin-top:15px;font-size:0.9rem">25 specialized agents ready to help</p></div>';
}

function openAgentChat(agent){
  currentAgent=agent;
  document.querySelectorAll('.agent-item').forEach(i=>i.classList.remove('active'));
  event.target.closest('.agent-item').classList.add('active');
  document.getElementById('topTitle').textContent=agent.emoji+' '+agent.name;
  
  let html='<div class="chat-area"><div class="chat-messages" id="chatMessages">';
  const history=conversations[agent.id]||[];
  if(history.length===0){
    html+='<div class="message agent">Hi! I\'m '+agent.name+'. '+agent.specialty.split(',').slice(0,2).join(', ')+'. How can I help you today?</div>';
  }else{
    history.forEach(m=>{
      html+='<div class="message '+m.role+'">'+m.content+(m.meta?'<div class="message-meta">'+m.meta+'</div>':'')+'</div>';
    });
  }
  html+='</div><div class="chat-input-container"><div class="chat-input-box"><textarea class="chat-input" id="chatInput" placeholder="Message '+agent.name+'..." rows="1"></textarea><button class="send-btn" id="sendBtn" onclick="sendMessage()">Send</button></div></div></div>';
  document.getElementById('contentArea').innerHTML=html;
  
  document.getElementById('chatInput').addEventListener('keydown',e=>{
    if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage()}
  });
  
  if(window.innerWidth<768)toggleSidebar();
}

async function sendMessage(){
  if(!currentAgent)return;
  const inp=document.getElementById('chatInput');
  const msg=inp.value.trim();
  if(!msg)return;
  
  document.getElementById('sendBtn').disabled=true;
  
  conversations[currentAgent.id].push({role:'user',content:msg});
  
  const box=document.getElementById('chatMessages');
  box.innerHTML+='<div class="message user">'+escapeHtml(msg)+'</div>';
  box.innerHTML+='<div class="message agent" style="opacity:0.6">🔍 Searching and analyzing...</div>';
  box.scrollTop=box.scrollHeight;
  inp.value='';
  
  try{
    const r=await fetch('/api/chat/'+currentAgent.id,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:msg})
    });
    
    const msgs=box.querySelectorAll('.message');
    msgs[msgs.length-1].remove();
    
    if(r.ok){
      const d=await r.json();
      conversations[currentAgent.id].push({
        role:'agent',
        content:d.response,
        meta:'Token: '+d.token.slice(0,8)+'... | Web: '+d.webSearch+' | '+new Date().toLocaleTimeString()
      });
      box.innerHTML+='<div class="message agent">'+escapeHtml(d.response)+'<div class="message-meta">Token: '+d.token.slice(0,8)+'... | Web: '+d.webSearch+'</div></div>';
    }else{
      box.innerHTML+='<div class="message agent" style="color:#f44">Error: '+r.status+' - Try again</div>';
    }
  }catch(e){
    const msgs=box.querySelectorAll('.message');
    msgs[msgs.length-1].remove();
    box.innerHTML+='<div class="message agent" style="color:#f44">Network error: '+e.message+'</div>';
  }finally{
    box.scrollTop=box.scrollHeight;
    document.getElementById('sendBtn').disabled=false;
  }
}

function escapeHtml(text){
  const div=document.createElement('div');
  div.textContent=text;
  return div.innerHTML.replace(/\n/g,'<br>');
}

async function updateCredits(){
  try{
    const r=await fetch('/api/credits');
    const d=await r.json();
    document.getElementById('creditsDisplay').textContent=(d.total/1000000).toFixed(1)+'M credits';
  }catch(e){}
}

loadAgents();
updateCredits();
setInterval(updateCredits,10000);
</script>
</body>
</html>`;
  
  return new Response(html,{headers:{'Content-Type':'text/html;charset=utf-8'}});
}

addEventListener('fetch',event=>{event.respondWith(handleRequest(event.request))});
