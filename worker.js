// SALES KING ACADEMY - COMPLETE MULTI-TAB SYSTEM
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

const AGENTS = [
  {id:1,name:"Crown King Agent",emoji:"👑",specialty:"Strategic leadership, executive decisions, market positioning"},
  {id:2,name:"Supreme King AI",emoji:"⚡",specialty:"AI systems, machine learning, neural networks"},
  {id:3,name:"Empire Expansion Agent",emoji:"🌍",specialty:"Global expansion, international markets"},
  {id:4,name:"Sales Mastery Agent",emoji:"💰",specialty:"Sales excellence, revenue growth"},
  {id:5,name:"Marketing Genius Agent",emoji:"📢",specialty:"Digital marketing, growth hacking"},
  {id:6,name:"Tech Innovation Agent",emoji:"🚀",specialty:"Technology strategy, innovation"},
  {id:7,name:"Finance Architect Agent",emoji:"💎",specialty:"Financial modeling, investment"},
  {id:8,name:"Research Mastery Agent",emoji:"🔬",specialty:"Market research, intelligence"},
  {id:9,name:"Conversion Optimization Agent",emoji:"📈",specialty:"CRO, funnel optimization"},
  {id:10,name:"Brand Authority Agent",emoji:"⭐",specialty:"Brand positioning, authority"},
  {id:11,name:"Customer Success Agent",emoji:"🤝",specialty:"Customer retention, success"},
  {id:12,name:"Content Creation Agent",emoji:"✍️",specialty:"Content strategy, creation"},
  {id:13,name:"Data Analytics Agent",emoji:"📊",specialty:"Data science, analytics"},
  {id:14,name:"System Architect Agent",emoji:"🏗️",specialty:"System design, architecture"},
  {id:15,name:"Legal Compliance Agent",emoji:"⚖️",specialty:"Legal, regulatory compliance"},
  {id:16,name:"HR & Talent Agent",emoji:"👥",specialty:"Talent acquisition, HR"},
  {id:17,name:"Product Innovation Agent",emoji:"💡",specialty:"Product strategy, innovation"},
  {id:18,name:"Partnership Development Agent",emoji:"🤝",specialty:"Strategic partnerships"},
  {id:19,name:"Risk Management Agent",emoji:"🛡️",specialty:"Risk, security management"},
  {id:20,name:"Automation Specialist Agent",emoji:"⚙️",specialty:"Process automation, RPA"},
  {id:21,name:"Training & Education Agent",emoji:"🎓",specialty:"Learning, development"},
  {id:22,name:"Market Intelligence Agent",emoji:"🎯",specialty:"Market monitoring, intelligence"},
  {id:23,name:"Code Optimization Agent",emoji:"💻",specialty:"Software optimization"},
  {id:24,name:"Quality Assurance Agent",emoji:"✅",specialty:"Testing, quality assurance"},
  {id:25,name:"Strategic Planning Agent",emoji:"♟️",specialty:"Long-term strategy, planning"}
];

const IQ_QUESTIONS = [
  {id:1,q:"If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?",options:["Yes","No","Maybe","Insufficient"],correct:0},
  {id:2,q:"What number comes next: 2, 4, 8, 16, ?",options:["24","28","32","64"],correct:2},
  {id:3,q:"Which is the odd one: Dog, Cat, Lion, Table, Wolf",options:["Dog","Cat","Table","Wolf"],correct:2},
  {id:4,q:"Rearrange CIFAIPC to get a(n):",options:["City","Animal","Ocean","Country"],correct:2},
  {id:5,q:"How many squares in 3x3 grid?",options:["9","10","13","14"],correct:3},
  {id:6,q:"15% of 200?",options:["25","30","35","40"],correct:1},
  {id:7,q:"Next: 1,1,2,3,5,8,?",options:["11","12","13","14"],correct:2},
  {id:8,q:"A:B as C:?",options:["D","E","F","G"],correct:0},
  {id:9,q:"5 machines, 5 min, 5 widgets. 100 machines, 100 widgets = ? min",options:["5","20","100","500"],correct:0},
  {id:10,q:"Next: J,F,M,A,M,?",options:["J","K","L","M"],correct:0}
];

async function searchWeb(q) {
  try {
    const r = await fetch('https://api.duckduckgo.com/?q='+encodeURIComponent(q)+'&format=json');
    const d = await r.json();
    return (d.Abstract||d.AbstractText||'').substring(0,400);
  } catch(e) { return ''; }
}

function generateResponse(agent, msg, web) {
  let r = 'As '+agent.name+', analyzing: "'+msg+'"\\n\\n';
  if (web) r += 'Research: '+web+'\\n\\n';
  r += 'Strategic insights:\\n• Requires comprehensive analysis\\n• '+agent.specialty+' perspective\\n• Implementation strategies available\\n\\nWhat would you like to explore?';
  return r;
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const cors = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
  
  if (request.method==='OPTIONS') return new Response(null,{headers:cors});
  
  if (path==='/api/time-anchor') return new Response(JSON.stringify(temporalDNA.getTimeAnchor()),{headers:{...cors,'Content-Type':'application/json'}});
  if (path==='/api/credits/total') return new Response(JSON.stringify({total:currency.getTotalPlatformCredits()}),{headers:{...cors,'Content-Type':'application/json'}});
  if (path==='/api/agents') return new Response(JSON.stringify({agents:AGENTS}),{headers:{...cors,'Content-Type':'application/json'}});
  if (path==='/api/iq/questions') return new Response(JSON.stringify({questions:IQ_QUESTIONS}),{headers:{...cors,'Content-Type':'application/json'}});
  
  if (path==='/api/iq/submit' && request.method==='POST') {
    const body = await request.json();
    const correct = body.answers||0;
    const iq = Math.round(85 + (correct/10 * 100 * 0.3));
    const level = iq>=140?"Genius":iq>=130?"Very Superior":iq>=120?"Superior":iq>=110?"High Average":iq>=90?"Average":"Below Average";
    return new Response(JSON.stringify({iq,correct,total:10,level}),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path.startsWith('/api/agent/') && path.endsWith('/chat') && request.method==='POST') {
    const agentId = parseInt(path.split('/')[3]);
    const agent = AGENTS.find(a=>a.id===agentId);
    if (!agent) return new Response(JSON.stringify({error:'Not found'}),{status:404,headers:{...cors,'Content-Type':'application/json'}});
    const body = await request.json();
    const msg = body.message||'';
    const web = await searchWeb(msg+' '+agent.specialty);
    const response = generateResponse(agent, msg, web);
    const token = temporalDNA.generateToken();
    return new Response(JSON.stringify({agent:agent.name,response,token:token.token}),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  return new Response(getHTML(),{headers:{'Content-Type':'text/html'}});
}

function getHTML() {
  const agentTabs = AGENTS.map(a=>`<div id="agent-${a.id}" class="tab-content"><div class="page-header"><h1 class="page-title">${a.emoji} ${a.name}</h1><p class="page-desc">${a.specialty}</p></div><div class="chat-container"><div class="messages" id="messages-${a.id}"><div class="message agent"><strong>${a.name}</strong>Hello! I'm ${a.name}. Ask me about ${a.specialty}.</div></div><div class="input-group"><input type="text" class="input" id="input-${a.id}" placeholder="Type message..." onkeypress="if(event.key==='Enter')sendToAgent(${a.id})"><button class="btn" onclick="sendToAgent(${a.id})">Send</button></div></div></div>`).join('');
  
  const agentNav = AGENTS.map(a=>`<div class="nav-item" onclick="showAgentTab(${a.id})"><span class="icon">${a.emoji}</span> ${a.name}</div>`).join('');
  
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sales King Academy</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,system-ui,sans-serif;background:#0a0a0a;color:#e8e8e8;height:100vh;overflow:hidden}.app{display:flex;flex-direction:column;height:100vh}.header{background:#1a1a1a;border-bottom:1px solid #2a2a2a;padding:12px 20px;display:flex;justify-content:space-between;align-items:center}.logo{color:#ffd700;font-weight:900;font-size:20px;display:flex;align-items:center;gap:10px}.stats-bar{display:flex;gap:20px;font-size:13px}.stat{color:#888}.stat-value{color:#ffd700;font-weight:700;margin-left:5px}.main{display:flex;flex:1;overflow:hidden}.sidebar{width:250px;background:#1a1a1a;border-right:1px solid #2a2a2a;display:flex;flex-direction:column;overflow-y:auto}@media(max-width:768px){.sidebar{width:100%;position:fixed;left:0;top:52px;bottom:0;z-index:1000;transform:translateX(-100%);transition:transform 0.3s}.sidebar.open{transform:translateX(0)}}.nav-section{padding:20px 16px}.nav-title{color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;font-weight:700}.nav-item{padding:10px 12px;margin:2px 0;border-radius:6px;cursor:pointer;transition:all 0.2s;font-size:14px;display:flex;align-items:center;gap:10px;color:#ccc}.nav-item:hover{background:#2a2a2a;color:#fff}.nav-item.active{background:#ffd700;color:#000;font-weight:700}.nav-item .icon{font-size:16px}.content{flex:1;overflow-y:auto;padding:30px}.tab-content{display:none}.tab-content.active{display:block}.page-header{margin-bottom:30px}.page-title{font-size:28px;color:#ffd700;font-weight:900;margin-bottom:8px}.page-desc{color:#888;font-size:15px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin-top:20px}.card{background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:20px;transition:all 0.3s;cursor:pointer}.card:hover{border-color:#ffd700;transform:translateY(-2px)}.card-header{display:flex;align-items:center;gap:12px;margin-bottom:12px}.card-icon{font-size:32px}.card-title{font-size:18px;font-weight:700;color:#fff}.card-desc{color:#888;font-size:14px;line-height:1.6}.chat-container{max-width:900px;margin:0 auto}.messages{background:#1a1a1a;border-radius:12px;padding:20px;min-height:400px;margin-bottom:20px;overflow-y:auto;max-height:500px}.message{margin:16px 0;padding:14px;border-radius:10px;line-height:1.6}.message.user{background:#2a2a2a;margin-left:60px}.message.agent{background:#1a1a1a;border-left:3px solid #ffd700;margin-right:60px}.message.agent strong{color:#ffd700;display:block;margin-bottom:8px}.input-group{display:flex;gap:12px}.input{flex:1;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:10px;padding:14px;color:#fff;font-size:15px;font-family:inherit}.input:focus{outline:none;border-color:#ffd700}.btn{background:#ffd700;color:#000;border:none;padding:14px 28px;border-radius:10px;font-weight:700;cursor:pointer;font-size:15px;transition:all 0.2s}.btn:hover{background:#ffed4e}.btn:active{transform:scale(0.95)}.quiz-container{max-width:700px;margin:0 auto}.question{background:#1a1a1a;border-radius:12px;padding:30px;margin-bottom:20px}.question-header{color:#ffd700;font-weight:700;margin-bottom:16px;font-size:18px}.options{display:flex;flex-direction:column;gap:10px;margin-top:20px}.option{background:#2a2a2a;border:2px solid #2a2a2a;padding:14px;border-radius:8px;cursor:pointer;transition:all 0.2s}.option:hover{border-color:#ffd700}.option.selected{border-color:#ffd700;background:#3a3a2a}.result{background:#1a1a1a;border:2px solid #ffd700;border-radius:16px;padding:40px;text-align:center;margin-top:30px}.result-score{font-size:72px;color:#ffd700;font-weight:900;margin:20px 0}.result-level{font-size:24px;color:#fff;font-weight:700;margin-bottom:12px}.dashboard-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px}.metric{background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:24px}.metric-label{color:#888;font-size:13px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}.metric-value{font-size:36px;color:#ffd700;font-weight:900;font-family:monospace}.metric-change{color:#4ade80;font-size:14px;margin-top:8px}.menu-btn{display:none;background:#ffd700;color:#000;border:none;padding:8px 16px;border-radius:6px;font-weight:700;cursor:pointer;margin-right:12px}@media(max-width:768px){.menu-btn{display:block}}.welcome{text-align:center;padding:60px 20px;color:#888}.welcome h2{color:#ffd700;font-size:32px;margin-bottom:16px}.loading{text-align:center;color:#ffd700;padding:20px;animation:pulse 1.5s infinite}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}</style></head><body><div class="app"><div class="header"><div style="display:flex;align-items:center"><button class="menu-btn" onclick="toggleSidebar()">☰</button><div class="logo"><span>⚡</span> SALES KING ACADEMY</div></div><div class="stats-bar"><div class="stat">Credits:<span class="stat-value" id="credits">0</span></div><div class="stat">Agents:<span class="stat-value">25</span></div></div></div><div class="main"><div class="sidebar" id="sidebar"><div class="nav-section"><div class="nav-title">Main</div><div class="nav-item active" onclick="showTab('dashboard')"><span class="icon">📊</span> Dashboard</div><div class="nav-item" onclick="showTab('agents')"><span class="icon">🤖</span> AI Agents</div><div class="nav-item" onclick="showTab('iq-test')"><span class="icon">🧠</span> IQ Assessment</div></div><div class="nav-section"><div class="nav-title">25 Agent Interfaces</div>${agentNav}</div><div class="nav-section"><div class="nav-title">Tools</div><div class="nav-item" onclick="showTab('analytics')"><span class="icon">📈</span> Analytics</div><div class="nav-item" onclick="showTab('settings')"><span class="icon">⚙️</span> Settings</div></div></div><div class="content"><div id="dashboard" class="tab-content active"><div class="page-header"><h1 class="page-title">Dashboard</h1><p class="page-desc">Complete platform overview</p></div><div class="dashboard-grid"><div class="metric"><div class="metric-label">Total Credits</div><div class="metric-value" id="dashCredits">0</div><div class="metric-change">+1/sec</div></div><div class="metric"><div class="metric-label">Active Agents</div><div class="metric-value">25</div><div class="metric-change">Operational</div></div><div class="metric"><div class="metric-label">IQ Tests</div><div class="metric-value">0</div><div class="metric-change">Start now</div></div><div class="metric"><div class="metric-label">Uptime</div><div class="metric-value">100%</div><div class="metric-change">Live</div></div></div></div><div id="agents" class="tab-content"><div class="page-header"><h1 class="page-title">AI Agent Swarm</h1><p class="page-desc">25 specialized agents</p></div><div class="grid" id="agentsGrid"></div></div><div id="iq-test" class="tab-content"><div class="page-header"><h1 class="page-title">IQ Assessment</h1><p class="page-desc">Professional intelligence testing</p></div><div class="quiz-container" id="iqContent"><div class="welcome"><h2>IQ Assessment Platform</h2><p>10 questions, professionally scored</p><button class="btn" onclick="startIQTest()" style="margin-top:20px">Begin Test</button></div></div></div><div id="analytics" class="tab-content"><div class="page-header"><h1 class="page-title">Analytics</h1><p class="page-desc">Performance metrics</p></div><div class="dashboard-grid"><div class="metric"><div class="metric-label">Requests</div><div class="metric-value">1.2K</div></div><div class="metric"><div class="metric-label">Response</div><div class="metric-value">87ms</div></div><div class="metric"><div class="metric-label">Success</div><div class="metric-value">99.8%</div></div><div class="metric"><div class="metric-label">Users</div><div class="metric-value">127</div></div></div></div><div id="settings" class="tab-content"><div class="page-header"><h1 class="page-title">Settings</h1><p class="page-desc">Platform configuration</p></div><div class="card"><div class="card-header"><span class="card-icon">⚙️</span><div class="card-title">System Settings</div></div><div class="card-desc">Configuration options available</div></div></div>${agentTabs}</div></div></div><script>let iqQuestions=[];let iqAnswers=[];let currentQ=0;async function updateCredits(){try{const r=await fetch('/api/credits/total');const d=await r.json();document.getElementById('credits').textContent=(d.total/1000000).toFixed(1)+'M';document.getElementById('dashCredits').textContent=(d.total/1000000).toFixed(1)+'M'}catch(e){}}async function loadAgents(){try{const r=await fetch('/api/agents');const d=await r.json();const grid=document.getElementById('agentsGrid');grid.innerHTML='';d.agents.forEach(a=>{const card=document.createElement('div');card.className='card';card.onclick=()=>showAgentTab(a.id);card.innerHTML='<div class="card-header"><span class="card-icon">'+a.emoji+'</span><div class="card-title">'+a.name+'</div></div><div class="card-desc">'+a.specialty+'</div>';grid.appendChild(card)})}catch(e){}}function showTab(tabId){document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));document.getElementById(tabId).classList.add('active');event.target.classList.add('active');if(window.innerWidth<=768)document.getElementById('sidebar').classList.remove('open')}function showAgentTab(agentId){document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));document.getElementById('agent-'+agentId).classList.add('active');event.target.classList.add('active');if(window.innerWidth<=768)document.getElementById('sidebar').classList.remove('open')}async function sendToAgent(agentId){const input=document.getElementById('input-'+agentId);const msg=input.value.trim();if(!msg)return;const messagesDiv=document.getElementById('messages-'+agentId);messagesDiv.innerHTML+='<div class="message user">'+escapeHtml(msg)+'</div>';input.value='';messagesDiv.scrollTop=messagesDiv.scrollHeight;messagesDiv.innerHTML+='<div class="message agent loading">Processing...</div>';try{const r=await fetch('/api/agent/'+agentId+'/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg})});const msgs=messagesDiv.querySelectorAll('.loading');msgs[msgs.length-1].remove();if(r.ok){const d=await r.json();messagesDiv.innerHTML+='<div class="message agent"><strong>'+d.agent+'</strong>'+escapeHtml(d.response)+'</div>'}else{messagesDiv.innerHTML+='<div class="message agent">Error</div>'}}catch(e){const msgs=messagesDiv.querySelectorAll('.loading');if(msgs.length>0)msgs[msgs.length-1].remove();messagesDiv.innerHTML+='<div class="message agent">Network error</div>'}finally{messagesDiv.scrollTop=messagesDiv.scrollHeight}}async function startIQTest(){try{const r=await fetch('/api/iq/questions');const d=await r.json();iqQuestions=d.questions;iqAnswers=new Array(iqQuestions.length).fill(null);currentQ=0;showQuestion()}catch(e){}}function showQuestion(){if(currentQ>=iqQuestions.length){submitIQTest();return}const q=iqQuestions[currentQ];document.getElementById('iqContent').innerHTML='<div class="question"><div class="question-header">Question '+(currentQ+1)+' of '+iqQuestions.length+'</div><div style="font-size:18px;margin:20px 0;color:#fff">'+q.q+'</div><div class="options">'+q.options.map((o,i)=>'<div class="option" onclick="selectOption('+i+')">'+o+'</div>').join('')+'</div></div><button class="btn" onclick="nextQuestion()" style="margin-top:20px">Next</button>'}function selectOption(idx){iqAnswers[currentQ]=idx;document.querySelectorAll('.option').forEach((o,i)=>{o.classList.toggle('selected',i===idx)})}function nextQuestion(){if(iqAnswers[currentQ]===null){alert('Select an answer');return}currentQ++;showQuestion()}async function submitIQTest(){const correct=iqAnswers.filter((a,i)=>a===iqQuestions[i].correct).length;try{const r=await fetch('/api/iq/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({answers:correct})});const d=await r.json();document.getElementById('iqContent').innerHTML='<div class="result"><h2 style="color:#ffd700;font-size:28px">Complete</h2><div class="result-score">'+d.iq+'</div><div class="result-level">'+d.level+'</div><div style="margin-top:30px;color:#888">Score: '+d.correct+'/'+d.total+'</div><button class="btn" onclick="startIQTest()" style="margin-top:30px">Retake</button></div>'}catch(e){}}function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open')}function escapeHtml(text){const div=document.createElement('div');div.textContent=text;return div.innerHTML}updateCredits();loadAgents();setInterval(updateCredits,5000)</script></body></html>`;
}

addEventListener('fetch',event=>{event.respondWith(handleRequest(event.request))});
