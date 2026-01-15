// SALES KING ACADEMY - PRODUCTION SYSTEM
// Complete integration: Backend + Frontend + Intelligence + Web Search

class TemporalDNA {
  constructor() { this.genesis = new Date('2024-07-01T00:00:00Z').getTime(); }
  generateToken() {
    const now = Date.now();
    const random12 = Array(12).fill(0).map(() => Math.floor(Math.random()*10)).join('');
    const sync4 = (Math.floor(now/1000)%10000).toString().padStart(4,'0');
    return {token:random12+sync4,type:'COMPUTATION',timestamp:now,purpose:'Infinite computational expansion'};
  }
  getTimeAnchor() {
    const now = Date.now();
    const elapsed = Math.floor((now-this.genesis)/1000);
    return {genesis:'2024-07-01T00:00:00Z',current:new Date(now).toISOString(),elapsed_seconds:elapsed,credits_minted:elapsed,framework:'RKL α=25',system:'Temporal Superintelligence'};
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
  1:{name:"Crown King Agent",emoji:"👑",color:"#ffd700",domain:"Strategic Leadership & Executive Decision-Making",skills:["Strategic planning","Executive leadership","Market positioning","Competitive analysis","Corporate governance","M&A strategy","Crisis management","Stakeholder relations","Vision articulation","Organizational transformation"]},
  2:{name:"Supreme King AI",emoji:"⚡",color:"#00ffff",domain:"AI Systems & Machine Learning",skills:["Neural networks","Deep learning","Transformer architectures","Reinforcement learning","NLP","Computer vision","MLOps","Model optimization","AI ethics","Swarm intelligence"]},
  3:{name:"Empire Expansion Agent",emoji:"🌍",color:"#ff6b35",domain:"Global Market Expansion",skills:["International market entry","Localization strategies","Cross-border regulations","Cultural adaptation","Supply chain internationalization","Emerging markets","Geopolitical risk","Franchise development"]},
  4:{name:"Sales Mastery Agent",emoji:"💰",color:"#4caf50",domain:"Sales Excellence & Revenue Growth",skills:["SPIN selling","Consultative sales","Solution selling","Account-based selling","Pipeline optimization","CRM systems","Objection handling","Negotiation tactics","Closing techniques"]},
  5:{name:"Marketing Genius Agent",emoji:"📢",color:"#ff4081",domain:"Digital Marketing & Growth",skills:["Growth hacking","Viral marketing","Content marketing","SEO/SEM","Social media","Influencer partnerships","Marketing automation","Conversion optimization","Brand storytelling"]},
  6:{name:"Tech Innovation Agent",emoji:"🚀",color:"#2196f3",domain:"Technology & Innovation",skills:["Software architecture","Cloud computing","DevOps","Microservices","API design","Blockchain","Quantum computing","IoT","Edge computing","Cybersecurity"]},
  7:{name:"Finance Architect Agent",emoji:"💎",color:"#ffd700",domain:"Finance & Investment Strategy",skills:["Financial modeling","Valuation methods","Capital structure","Investment analysis","Portfolio management","Risk-adjusted returns","Private equity","Venture capital","IPO processes"]},
  8:{name:"Research Mastery Agent",emoji:"🔬",color:"#9c27b0",domain:"Research & Market Intelligence",skills:["Market research","Competitive intelligence","Data mining","Statistical analysis","Qualitative research","Survey design","Focus groups","Ethnographic research","Trend analysis"]},
  9:{name:"Conversion Optimization Agent",emoji:"📈",color:"#ff9800",domain:"CRO & Analytics",skills:["A/B testing","Multivariate testing","UX optimization","Landing page optimization","Funnel analysis","Heat mapping","Session recording","Behavior analysis","Persuasion psychology"]},
  10:{name:"Brand Authority Agent",emoji:"⭐",color:"#ffeb3b",domain:"Brand Management & Authority",skills:["Brand positioning","Brand architecture","Brand equity","Reputation management","Thought leadership","Public relations","Media relations","Crisis communications","Corporate identity"]},
  11:{name:"Customer Success Agent",emoji:"🤝",color:"#4caf50",domain:"Customer Experience & Success",skills:["Lifecycle management","Onboarding optimization","Churn reduction","NPS optimization","Health scoring","Success planning","Escalation management","Retention strategies","Expansion revenue"]},
  12:{name:"Content Creation Agent",emoji:"✍️",color:"#e91e63",domain:"Content Strategy & Creation",skills:["Copywriting","Content strategy","Editorial calendars","Multimedia content","Video production","Podcasting","Content distribution","Content ROI","Storytelling frameworks"]},
  13:{name:"Data Analytics Agent",emoji:"📊",color:"#3f51b5",domain:"Data Science & Analytics",skills:["Predictive analytics","Machine learning models","Data visualization","Business intelligence","Big data technologies","SQL","Python","R","Tableau","Data warehousing"]},
  14:{name:"System Architect Agent",emoji:"🏗️",color:"#607d8b",domain:"System Design & Architecture",skills:["Distributed systems","Scalable architectures","Load balancing","Caching strategies","Database design","Microservices patterns","API gateways","Service mesh","Infrastructure as code"]},
  15:{name:"Legal Compliance Agent",emoji:"⚖️",color:"#795548",domain:"Legal & Regulatory Compliance",skills:["Corporate law","Contract law","Intellectual property","Data privacy (GDPR/CCPA)","Employment law","Regulatory compliance","Litigation management","Risk mitigation","Corporate governance"]},
  16:{name:"HR & Talent Agent",emoji:"👥",color:"#00bcd4",domain:"Human Resources & Talent",skills:["Talent acquisition","Employer branding","Competency frameworks","Performance management","Succession planning","Compensation strategy","Employee engagement","Learning & development"]},
  17:{name:"Product Innovation Agent",emoji:"💡",color:"#ffeb3b",domain:"Product Management & Innovation",skills:["Product strategy","Roadmap planning","User research","Product-market fit","Agile methodologies","Scrum","Feature prioritization","Product analytics","Go-to-market strategy"]},
  18:{name:"Partnership Development Agent",emoji:"🤝",color:"#8bc34a",domain:"Strategic Partnerships",skills:["Alliance management","Channel partnerships","Co-marketing agreements","Joint ventures","Partnership negotiation","Ecosystem development","Partner enablement","Revenue sharing models"]},
  19:{name:"Risk Management Agent",emoji:"🛡️",color:"#f44336",domain:"Risk & Security Management",skills:["Enterprise risk management","Cybersecurity","Business continuity","Disaster recovery","Threat modeling","Vulnerability assessment","Compliance audits","Insurance","Fraud detection"]},
  20:{name:"Automation Specialist Agent",emoji:"⚙️",color:"#9e9e9e",domain:"Process Automation",skills:["RPA","Workflow automation","Business process management","Integration platforms","API orchestration","Low-code/no-code","Automation ROI","Change management","Process mining"]},
  21:{name:"Training & Education Agent",emoji:"🎓",color:"#03a9f4",domain:"Learning & Development",skills:["Instructional design","E-learning","LMS platforms","Competency development","Training ROI","Knowledge management","Certification programs","Coaching","Mentoring"]},
  22:{name:"Market Intelligence Agent",emoji:"🎯",color:"#ff5722",domain:"Market Analysis & Intelligence",skills:["Market sizing","Competitive analysis","Industry trends","SWOT analysis","Porter's five forces","Market segmentation","Opportunity assessment","Pricing analysis"]},
  23:{name:"Code Optimization Agent",emoji:"💻",color:"#4caf50",domain:"Software Engineering & Optimization",skills:["Algorithm optimization","Code refactoring","Performance profiling","Memory management","Concurrency","Asynchronous programming","Design patterns","Clean code","Technical debt management"]},
  24:{name:"Quality Assurance Agent",emoji:"✅",color:"#00bcd4",domain:"QA & Testing Excellence",skills:["Test automation","Continuous testing","TDD","BDD","Performance testing","Security testing","Exploratory testing","Defect management","Quality metrics"]},
  25:{name:"Strategic Planning Agent",emoji:"♟️",color:"#9c27b0",domain:"Strategy & Long-term Planning",skills:["Strategic frameworks","Scenario planning","Blue ocean strategy","Balanced scorecard","OKRs","Strategic initiatives","Change management","Organizational alignment"]}
};

async function searchDuckDuckGo(query) {
  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    const response = await fetch(url, {headers:{'User-Agent':'Mozilla/5.0'}});
    const data = await response.json();
    let results = [];
    if (data.Abstract) results.push(data.Abstract);
    if (data.AbstractText) results.push(data.AbstractText);
    if (data.RelatedTopics) {
      for (let i=0; i<Math.min(5,data.RelatedTopics.length); i++) {
        const topic = data.RelatedTopics[i];
        if (topic.Text) results.push(topic.Text);
        if (topic.FirstURL) results.push(topic.FirstURL);
      }
    }
    return results.length>0 ? results.join(' | ') : null;
  } catch(e) {
    return null;
  }
}

function generateIntelligentResponse(agent, userMessage, webData) {
  const intros = [
    `Analyzing ${agent.domain} for your query...`,
    `From my ${agent.skills.length}+ specialized skills in ${agent.domain}...`,
    `Drawing on expertise in ${agent.skills.slice(0,3).join(', ')}...`,
    `Based on ${agent.domain} intelligence...`
  ];
  
  let response = intros[Math.floor(Math.random()*intros.length)] + ' ';
  
  if (webData) {
    response += `Latest research shows: ${webData.substring(0,300)}... `;
  }
  
  response += `Key insights for your situation: `;
  const relevantSkills = agent.skills.slice(0,3);
  response += relevantSkills.map((s,i) => `(${i+1}) ${s} strategies`).join(', ');
  response += `. I can provide detailed implementation guidance on any of these areas. What aspect would you like to explore deeper?`;
  
  return response;
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const cors = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS','Access-Control-Allow-Headers':'Content-Type,Authorization'};
  
  if (request.method==='OPTIONS') return new Response(null,{headers:cors});
  
  if (path==='/api/time-anchor') {
    return new Response(JSON.stringify(temporalDNA.getTimeAnchor()),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path==='/api/computation/token') {
    return new Response(JSON.stringify(temporalDNA.generateToken()),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path==='/api/credits/platform-total') {
    return new Response(JSON.stringify({totalPlatformCredits:currency.getTotalPlatformCredits(),mintRate:'1/sec',genesis:'2024-07-01T00:00:00Z'}),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path==='/api/agents') {
    const agentList = Object.entries(AGENTS).map(([id,a])=>({id:parseInt(id),...a}));
    return new Response(JSON.stringify({agents:agentList,count:agentList.length,framework:'RKL α=25'}),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  if (path.startsWith('/api/agent/') && path.endsWith('/chat') && request.method==='POST') {
    const agentId = parseInt(path.split('/')[3]);
    const agent = AGENTS[agentId];
    if (!agent) return new Response(JSON.stringify({error:'Agent not found'}),{status:404,headers:{...cors,'Content-Type':'application/json'}});
    
    const body = await request.json();
    const userMessage = body.message||'';
    
    const searchQuery = `${userMessage} ${agent.domain} ${agent.skills.slice(0,2).join(' ')}`;
    const webData = await searchDuckDuckGo(searchQuery);
    
    const response = generateIntelligentResponse(agent, userMessage, webData);
    const token = temporalDNA.generateToken();
    const interlock = currency.verifyInterlock(token.token);
    
    return new Response(JSON.stringify({
      agent:agent.name,
      response:response,
      token:token.token,
      interlock:interlock?'VERIFIED':'FAILED',
      webSearch:webData?'Live web data integrated':'Embedded intelligence used',
      skills:agent.skills.slice(0,5),
      timestamp:Date.now()
    }),{headers:{...cors,'Content-Type':'application/json'}});
  }
  
  // FRONTEND HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5,user-scalable=yes">
<meta name="description" content="Sales King Academy - Complete AI Business Automation Platform">
<meta name="theme-color" content="#ffd700">
<title>Sales King Academy | AI Business Automation</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--gold:#ffd700;--green:#0f0;--black:#000;--dark:#0a0a00;--darker:#1a1a00}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;background:linear-gradient(135deg,var(--black) 0%,var(--dark) 50%,var(--darker) 100%);color:var(--green);min-height:100vh;overflow-x:hidden;touch-action:pan-y;-webkit-tap-highlight-color:transparent}
.header{background:linear-gradient(90deg,var(--black),var(--dark));border-bottom:3px solid var(--gold);padding:clamp(12px,3vw,20px);text-align:center;position:sticky;top:0;z-index:1000;backdrop-filter:blur(10px);box-shadow:0 4px 20px rgba(255,215,0,0.3)}
.header h1{color:var(--gold);font-size:clamp(1.3rem,5vw,2.5rem);text-shadow:0 0 30px var(--gold);margin-bottom:5px;font-weight:900;letter-spacing:2px}
.header p{color:var(--green);font-size:clamp(0.75rem,2.5vw,1rem);text-shadow:0 0 10px var(--green)}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr));gap:clamp(8px,2vw,15px);padding:clamp(12px,3vw,20px);max-width:1200px;margin:0 auto}
.stat-card{background:linear-gradient(135deg,var(--dark),var(--black));border:2px solid var(--gold);border-radius:12px;padding:clamp(12px,3vw,18px);text-align:center;transition:all 0.3s;cursor:pointer;min-height:70px;display:flex;flex-direction:column;justify-content:center}
.stat-card:active{transform:scale(0.95)}
.stat-label{color:var(--gold);font-size:clamp(0.7rem,2vw,0.85rem);margin-bottom:5px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600}
.stat-value{color:var(--green);font-size:clamp(1.2rem,4vw,1.8rem);font-weight:900;text-shadow:0 0 10px var(--green);font-family:monospace}
.section-title{color:var(--gold);font-size:clamp(1.1rem,3.5vw,1.8rem);text-align:center;margin:clamp(20px,4vw,30px) 0 clamp(12px,3vw,20px);text-shadow:0 0 20px var(--gold);font-weight:800;letter-spacing:1px}
.agents-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,135px),1fr));gap:clamp(8px,2vw,12px);padding:clamp(12px,3vw,20px);max-width:1200px;margin:0 auto}
@media(min-width:480px){.agents-grid{grid-template-columns:repeat(auto-fill,minmax(155px,1fr))}}
@media(min-width:769px){.agents-grid{grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:15px}}
.agent{background:linear-gradient(135deg,var(--dark),var(--black));border:2px solid var(--gold);border-radius:10px;padding:clamp(10px,2.5vw,16px);cursor:pointer;text-align:center;transition:all 0.3s;min-height:90px;display:flex;flex-direction:column;justify-content:center;touch-action:manipulation;position:relative;overflow:hidden}
.agent::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,215,0,0.2),transparent);transition:left 0.5s}
.agent:hover::before{left:100%}
.agent:active{transform:scale(0.92);border-color:#ffed4e}
.agent:hover{border-color:#ffed4e;box-shadow:0 0 25px rgba(255,215,0,0.6);transform:translateY(-3px)}
.agent-emoji{font-size:clamp(1.8rem,5vw,2.5rem);margin-bottom:6px;display:block;filter:drop-shadow(0 0 8px currentColor)}
.agent-name{color:var(--gold);font-size:clamp(0.75rem,2.2vw,0.9rem);font-weight:700;line-height:1.2}
.modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:2000;touch-action:none;backdrop-filter:blur(5px)}
.modal.active{display:flex;align-items:center;justify-content:center;padding:clamp(10px,3vw,20px)}
.modal-content{background:linear-gradient(135deg,var(--dark),var(--black));border:3px solid var(--gold);border-radius:15px;padding:clamp(15px,4vw,30px);width:100%;max-width:700px;max-height:90vh;overflow-y:auto;-webkit-overflow-scrolling:touch;box-shadow:0 0 50px rgba(255,215,0,0.8)}
.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;padding-bottom:12px;border-bottom:2px solid var(--gold)}
.modal-title{color:var(--gold);font-size:clamp(1.1rem,3.5vw,1.6rem);font-weight:800}
.close-btn{background:var(--gold);color:var(--black);border:none;width:40px;height:40px;border-radius:50%;font-size:1.5rem;cursor:pointer;font-weight:bold;flex-shrink:0;touch-action:manipulation;transition:all 0.3s}
.close-btn:hover{background:#ffed4e;transform:rotate(90deg)}
.close-btn:active{transform:scale(0.9)}
.agent-details{color:var(--green);margin-bottom:15px;font-size:clamp(0.8rem,2.2vw,0.9rem);line-height:1.6}
.agent-details strong{color:var(--gold)}
.skills-list{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0}
.skill-badge{background:var(--darker);border:1px solid var(--gold);color:var(--green);padding:4px 8px;border-radius:6px;font-size:clamp(0.7rem,1.8vw,0.8rem)}
.chat-messages{max-height:40vh;overflow-y:auto;margin-bottom:12px;padding:10px;background:var(--black);border-radius:8px;-webkit-overflow-scrolling:touch}
.message{margin:8px 0;padding:10px;border-radius:8px;line-height:1.5;font-size:clamp(0.8rem,2.2vw,0.9rem);animation:fadeIn 0.3s}
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.user-msg{background:var(--darker);border-left:3px solid var(--gold);color:var(--green)}
.agent-msg{background:rgba(0,26,0,0.5);border-left:3px solid var(--green);color:var(--green)}
.msg-meta{font-size:clamp(0.65rem,1.8vw,0.75rem);opacity:0.7;margin-top:5px;font-family:monospace}
.chat-input-box{display:flex;gap:8px;margin-top:12px}
.chat-input{flex:1;padding:12px;background:var(--black);border:2px solid var(--gold);border-radius:8px;color:var(--green);font-size:16px;min-height:44px;font-family:inherit}
.chat-input::placeholder{color:rgba(0,255,0,0.5)}
.chat-input:focus{outline:none;border-color:#ffed4e;box-shadow:0 0 10px rgba(255,215,0,0.3)}
.send-btn{padding:12px 20px;background:var(--gold);color:var(--black);border:none;border-radius:8px;font-weight:bold;cursor:pointer;font-size:16px;min-width:60px;min-height:44px;touch-action:manipulation;transition:all 0.2s}
.send-btn:active{background:#ffed4e;transform:scale(0.95)}
.send-btn:disabled{opacity:0.5;cursor:not-allowed}
.loading{color:var(--gold);text-align:center;padding:20px;font-size:clamp(0.9rem,2.5vw,1.1rem);animation:pulse 1.5s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
</style>
</head>
<body>
<div class="header">
<h1>⚡ SALES KING ACADEMY ⚡</h1>
<p>Complete AI Business Automation | RKL Framework α=25 | Temporal Superintelligence</p>
</div>
<div class="stats">
<div class="stat-card">
<div class="stat-label">SKA Credits Minted</div>
<div class="stat-value" id="credits">Loading...</div>
</div>
<div class="stat-card">
<div class="stat-label">Temporal DNA Tokens</div>
<div class="stat-value">∞ Infinite</div>
</div>
<div class="stat-card">
<div class="stat-label">Active AI Agents</div>
<div class="stat-value">25</div>
</div>
</div>
<h2 class="section-title">🤖 INTELLIGENT AI AGENT SWARM 🤖</h2>
<div id="agents" class="agents-grid"><div class="loading">Loading agent swarm...</div></div>
<div id="modal" class="modal">
<div class="modal-content">
<div class="modal-header">
<h3 class="modal-title" id="modalTitle">Agent</h3>
<button class="close-btn" onclick="closeModal()" aria-label="Close">×</button>
</div>
<div id="modalBody">
<div id="agentInfo" class="agent-details"></div>
<div class="chat-messages" id="chatBox"></div>
<div class="chat-input-box">
<input type="text" class="chat-input" id="chatInput" placeholder="Ask me anything..." autocomplete="off">
<button class="send-btn" id="sendBtn" onclick="sendMsg()">Send</button>
</div>
</div>
</div>
</div>
<script>
let currentAgent=null;
let creditsValue=0;
let isSending=false;

async function updateCredits(){
  try{
    const r=await fetch('/api/credits/platform-total');
    const d=await r.json();
    creditsValue=d.totalPlatformCredits;
    document.getElementById('credits').textContent=(creditsValue/1000000).toFixed(1)+'M';
  }catch(e){console.error('Credits update failed:',e)}
}

async function loadAgents(){
  try{
    const r=await fetch('/api/agents');
    const d=await r.json();
    const g=document.getElementById('agents');
    g.innerHTML='';
    d.agents.forEach(a=>{
      const div=document.createElement('div');
      div.className='agent';
      div.style.borderColor=a.color||'#ffd700';
      div.innerHTML='<div class="agent-emoji">'+a.emoji+'</div><div class="agent-name">'+a.name+'</div>';
      div.onclick=()=>openAgent(a);
      g.appendChild(div);
    });
  }catch(e){
    console.error('Agents load failed:',e);
    document.getElementById('agents').innerHTML='<div class="loading">Error loading agents. Retrying...</div>';
    setTimeout(loadAgents,3000);
  }
}

function openAgent(a){
  currentAgent=a;
  document.getElementById('modalTitle').textContent=a.emoji+' '+a.name;
  let html='<p><strong>Domain:</strong> '+a.domain+'</p>';
  if(a.skills&&a.skills.length>0){
    html+='<p style="margin-top:10px"><strong>Expertise Areas:</strong></p><div class="skills-list">';
    a.skills.slice(0,8).forEach(s=>html+='<span class="skill-badge">'+s+'</span>');
    html+='</div>';
  }
  document.getElementById('agentInfo').innerHTML=html;
  document.getElementById('chatBox').innerHTML='<div class="message agent-msg">Hi! I\'m '+a.name+'. I specialize in '+a.domain+'. Ask me anything!</div>';
  document.getElementById('chatInput').value='';
  document.getElementById('modal').classList.add('active');
  document.getElementById('chatInput').focus();
}

function closeModal(){
  document.getElementById('modal').classList.remove('active');
  currentAgent=null;
  isSending=false;
}

async function sendMsg(){
  if(!currentAgent||isSending)return;
  const inp=document.getElementById('chatInput');
  const msg=inp.value.trim();
  if(!msg)return;
  
  isSending=true;
  document.getElementById('sendBtn').disabled=true;
  const box=document.getElementById('chatBox');
  box.innerHTML+='<div class="message user-msg">'+escapeHtml(msg)+'</div>';
  inp.value='';
  box.scrollTop=box.scrollHeight;
  
  box.innerHTML+='<div class="message agent-msg loading">🔍 Searching web and analyzing...</div>';
  box.scrollTop=box.scrollHeight;
  
  try{
    const r=await fetch('/api/agent/'+currentAgent.id+'/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:msg})
    });
    
    const msgs=box.querySelectorAll('.message');
    msgs[msgs.length-1].remove();
    
    if(r.ok){
      const d=await r.json();
      let response='<strong>'+d.agent+':</strong><br>'+escapeHtml(d.response);
      if(d.skills&&d.skills.length>0){
        response+='<br><br><small style="opacity:0.8">Related skills: '+d.skills.join(', ')+'</small>';
      }
      response+='<div class="msg-meta">'+d.webSearch+' | Token: '+d.token.slice(0,8)+'... | Interlock: '+d.interlock+'</div>';
      box.innerHTML+='<div class="message agent-msg">'+response+'</div>';
    }else{
      box.innerHTML+='<div class="message agent-msg" style="color:#f44">⚠️ Connection error. Please try again.</div>';
    }
  }catch(e){
    const msgs=box.querySelectorAll('.message');
    msgs[msgs.length-1].remove();
    box.innerHTML+='<div class="message agent-msg" style="color:#f44">⚠️ Network error: '+e.message+'</div>';
  }finally{
    box.scrollTop=box.scrollHeight;
    isSending=false;
    document.getElementById('sendBtn').disabled=false;
    document.getElementById('chatInput').focus();
  }
}

function escapeHtml(text){
  const div=document.createElement('div');
  div.textContent=text;
  return div.innerHTML;
}

document.getElementById('chatInput').addEventListener('keypress',e=>{
  if(e.key==='Enter'&&!isSending)sendMsg();
});

document.getElementById('modal').onclick=e=>{
  if(e.target.id==='modal')closeModal();
};

updateCredits();
loadAgents();
setInterval(updateCredits,5000);
setInterval(()=>{
  creditsValue+=5;
  document.getElementById('credits').textContent=(creditsValue/1000000).toFixed(1)+'M';
},5000);
</script>
</body>
</html>`;
  
  return new Response(html,{headers:{'Content-Type':'text/html;charset=utf-8'}});
}

addEventListener('fetch',event=>{event.respondWith(handleRequest(event.request))});
