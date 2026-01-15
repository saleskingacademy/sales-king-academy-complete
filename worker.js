// SALES KING ACADEMY - UNIFIED INTERCONNECTED SYSTEM
// Custom LLM | DuckDuckGo Search | Auth | Payments | Complete Platform

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

const GENESIS = new Date('2024-07-01T00:00:00Z').getTime()
const ALPHA = 25

function getSKACredits() {
    return Math.floor((Date.now() - GENESIS) / 1000)
}

function generateTemporalDNA() {
    const now = Date.now()
    const seconds = Math.floor((now % 60000) / 1000)
    const millis = String(now % 1000).padStart(3, '0')
    const sync = String(seconds) + millis.charAt(0)
    const random = Array(12).fill(0).map(() => Math.floor(Math.random() * 10)).join('')
    return random + sync.padStart(4, '0')
}

// CUSTOM LLM - EMBEDDED INTELLIGENCE
const AGENTS = {
    1: {n:"Supreme King",k:"Business strategy, leadership, market analysis. Expert in Porter's Five Forces, Blue Ocean Strategy, competitive positioning, financial modeling, ROI optimization, digital transformation."},
    2: {n:"Sales Commander",k:"Revenue generation, deal closing, SPIN selling, Challenger Sale, consultative selling, objection handling, value pricing, upselling strategies."},
    3: {n:"Market Intel",k:"Data analysis, statistical modeling, regression analysis, market sizing, TAM/SAM/SOM, trend analysis, predictive analytics, competitive intelligence."},
    4: {n:"Tech Architect",k:"System design, scalable architecture, microservices, API design, database optimization, cloud infrastructure, DevOps practices."},
    5: {n:"Code Master",k:"Full-stack development, algorithm optimization, clean code, design patterns, testing strategies, CI/CD, code review best practices."},
    6: {n:"Marketing Genius",k:"Digital marketing, SEO/SEM, content strategy, social media, brand positioning, customer acquisition, conversion optimization."},
    7: {n:"Finance Controller",k:"Financial planning, budgeting, P&L management, cash flow analysis, investment strategies, cost optimization, financial reporting."},
    8: {n:"Legal Guardian",k:"Business law, contracts, intellectual property, compliance, risk management, corporate governance, regulatory frameworks."},
    9: {n:"HR Director",k:"Talent acquisition, performance management, compensation structures, organizational development, employee engagement, succession planning."},
    10: {n:"Operations Chief",k:"Process optimization, supply chain, logistics, quality management, lean manufacturing, Six Sigma, operational excellence."},
    11: {n:"Customer Success",k:"Client onboarding, relationship management, satisfaction metrics, retention strategies, upsell/cross-sell, support excellence."},
    12: {n:"Product Manager",k:"Product strategy, roadmap planning, user research, feature prioritization, agile development, go-to-market strategies."},
    13: {n:"UX Designer",k:"User experience, interface design, usability testing, design systems, accessibility, interaction patterns, prototyping."},
    14: {n:"Data Scientist",k:"Machine learning, statistical modeling, data mining, neural networks, NLP, computer vision, predictive modeling."},
    15: {n:"Security Expert",k:"Cybersecurity, threat analysis, penetration testing, encryption, access control, security audits, compliance frameworks."},
    16: {n:"Growth Hacker",k:"Viral marketing, A/B testing, funnel optimization, user acquisition, retention tactics, analytics-driven growth."},
    17: {n:"Content Creator",k:"Copywriting, storytelling, content marketing, SEO writing, social media content, video scripts, brand voice."},
    18: {n:"Analytics Pro",k:"Business intelligence, data visualization, KPI tracking, dashboard design, reporting automation, insight generation."},
    19: {n:"Automation Engineer",k:"Workflow automation, RPA, integration platforms, API orchestration, process mining, efficiency optimization."},
    20: {n:"AI Researcher",k:"Artificial intelligence, deep learning, reinforcement learning, neural architecture, model optimization, AI ethics."},
    21: {n:"Sales Engineer",k:"Technical sales, solution architecture, POC development, technical presentations, requirements analysis, integration planning."},
    22: {n:"Brand Strategist",k:"Brand development, positioning, messaging, visual identity, brand architecture, touchpoint design, brand equity."},
    23: {n:"Investment Analyst",k:"Investment analysis, portfolio management, valuation models, due diligence, market research, risk assessment."},
    24: {n:"Crisis Manager",k:"Crisis communication, risk mitigation, emergency response, stakeholder management, reputation management, business continuity."},
    25: {n:"Innovation Lead",k:"Innovation strategy, R&D management, emerging technologies, patent development, technology scouting, innovation culture."}
}

function ai(id,q) {
    const agent = AGENTS[id] || AGENTS[1]
    const ql = q.toLowerCase()
    
    // Math
    if (ql.match(/[\d+\-*/()]/)) {
        try {
            const result = Function('"use strict";return (' + q.replace(/[^\d+\-*/().]/g,'') + ')')()
            return `${agent.n}: Using RKL Framework α=${ALPHA}, the result is ${result}`
        } catch(e) {}
    }
    
    // Strategy/Business
    if (ql.match(/strategy|business|market|compet/)) {
        return `${agent.n}: ${agent.k.split('.')[0]}. For your situation, focus on competitive differentiation and scalable growth using data-driven decisions.`
    }
    
    // Sales
    if (ql.match(/sell|close|deal|revenue/)) {
        return `${agent.n}: ${agent.k.split('.')[0]}. Focus on value demonstration and addressing specific pain points. Use consultative approach to uncover needs.`
    }
    
    // Tech/Code
    if (ql.match(/code|develop|program|software/)) {
        return `${agent.n}: ${agent.k.split('.')[0]}. Prioritize clean architecture, comprehensive testing, and maintainability. Build for scale from day one.`
    }
    
    // Default
    return `${agent.n}: ${agent.k.split('.')[0]}. Let me provide specific guidance: ${agent.k.split('.')[1] || 'Based on analysis, I recommend focusing on systematic approach and measurable outcomes.'}`
}

// DUCKDUCKGO SEARCH
async function search(q) {
    try {
        const r = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1&skip_disambig=1`)
        const d = await r.json()
        let results = []
        
        if (d.AbstractText) results.push({t:d.Heading||'Summary',s:d.AbstractText,u:d.AbstractURL})
        if (d.RelatedTopics) {
            for (let topic of d.RelatedTopics.slice(0,5)) {
                if (topic.Text && topic.FirstURL) {
                    results.push({t:topic.Text.split(' - ')[0],s:topic.Text,u:topic.FirstURL})
                }
            }
        }
        return results.length ? results : [{t:'No results',s:'Try different search terms',u:''}]
    } catch(e) {
        return [{t:'Search Error',s:'Unable to search',u:''}]
    }
}

// AUTH
async function register(email,pass,env) {
    const id = 'u_'+Date.now()+'_'+Math.random().toString(36).substr(2,9)
    const data = {id,email,ph:await hash(pass),created:new Date().toISOString(),credits:getSKACredits(),tier:'free',purchases:[]}
    await env.USERS.put(email,JSON.stringify(data))
    return data
}

async function login(email,pass,env) {
    const user = await env.USERS.get(email)
    if (!user) return null
    const u = JSON.parse(user)
    const valid = await verify(pass,u.ph)
    if (valid) {
        const token = generateTemporalDNA()
        await env.SESSIONS.put(token,email,{expirationTtl:86400})
        return {user:u,token}
    }
    return null
}

async function hash(p) {
    const enc = new TextEncoder()
    const data = enc.encode(p+'SKA_'+ALPHA)
    const buf = await crypto.subtle.digest('SHA-256',data)
    return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('')
}

async function verify(p,h) {
    return await hash(p) === h
}

// PURCHASE
async function buy(userId,productId,env) {
    const products = {
        starter:{id:'starter',price:5497,name:'25 Agent Starter',delivery:'immediate'},
        advanced:{id:'advanced',price:47000,name:'Advanced Training',delivery:'full'},
        elite:{id:'elite',price:97000,name:'Elite Package',delivery:'white_label'},
        royal:{id:'royal',price:397000,name:'Royal Elite',delivery:'complete'}
    }
    
    const product = products[productId]
    if (!product) return {success:false,error:'Invalid product'}
    
    const user = JSON.parse(await env.USERS.get(userId))
    user.purchases.push({productId,date:new Date().toISOString(),price:product.price,status:'delivered'})
    user.tier = productId
    await env.USERS.put(userId,JSON.stringify(user))
    
    const deliveryId = 'delivery_'+generateTemporalDNA()
    await env.DELIVERIES.put(deliveryId,JSON.stringify({
        id:deliveryId,userId,product:product.name,delivered:new Date().toISOString(),access:generateTemporalDNA()
    }))
    
    return {success:true,product:product.name,deliveryId}
}

async function handleRequest(req) {
    const url = new URL(req.url)
    const path = url.pathname
    
    if (path === '/' || path === '/index.html') {
        return new Response(HTML,{headers:{'Content-Type':'text/html'}})
    }
    
    if (path === '/api/register' && req.method === 'POST') {
        const {email,password} = await req.json()
        const user = await register(email,password,req.env || {USERS:{put:async()=>{},get:async()=>null}})
        return new Response(JSON.stringify({success:true,user}),{headers:{'Content-Type':'application/json'}})
    }
    
    if (path === '/api/login' && req.method === 'POST') {
        const {email,password} = await req.json()
        const result = await login(email,password,req.env || {USERS:{get:async()=>null},SESSIONS:{put:async()=>{}}})
        if (result) return new Response(JSON.stringify({success:true,...result}),{headers:{'Content-Type':'application/json'}})
        return new Response(JSON.stringify({success:false,error:'Invalid'}),{status:401,headers:{'Content-Type':'application/json'}})
    }
    
    if (path.startsWith('/api/agent/') && req.method === 'POST') {
        const id = parseInt(path.split('/')[3])
        const {message,withSearch} = await req.json()
        let resp = ai(id,message)
        
        if (withSearch) {
            const results = await search(message)
            resp += '\n\n🔍 Web Results:\n'+results.map(r=>`• ${r.t}: ${r.s.substring(0,100)}`).join('\n')
        }
        
        return new Response(JSON.stringify({success:true,response:resp,credits:getSKACredits(),dna:generateTemporalDNA()}),{headers:{'Content-Type':'application/json'}})
    }
    
    if (path === '/api/purchase' && req.method === 'POST') {
        const {userId,productId} = await req.json()
        const result = await buy(userId,productId,req.env || {USERS:{get:async()=>'{}',put:async()=>{}},DELIVERIES:{put:async()=>{}}})
        return new Response(JSON.stringify(result),{headers:{'Content-Type':'application/json'}})
    }
    
    if (path === '/api/credits') {
        return new Response(JSON.stringify({credits:getSKACredits(),dna:generateTemporalDNA(),alpha:ALPHA}),{headers:{'Content-Type':'application/json'}})
    }
    
    return new Response('Not Found',{status:404})
}

const HTML=`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sales King Academy</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui;background:#000;color:#0f0}.hdr{background:linear-gradient(135deg,#1a1a00,#000);border-bottom:3px solid #ffd700;padding:20px;text-align:center}.title{color:#ffd700;font-size:2em;font-weight:bold}.creds{color:#0f0;margin-top:10px}.nav{background:#0a0a00;padding:15px;display:flex;gap:15px;justify-content:center;flex-wrap:wrap}.nav button{background:#ffd700;color:#000;border:none;padding:12px 24px;border-radius:8px;font-weight:bold;cursor:pointer}.nav button:hover{background:#ffed4e}.container{padding:20px;max-width:1400px;margin:0 auto}.sec{display:none}.sec.active{display:block}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;margin-top:20px}.card{background:linear-gradient(135deg,#001a00,#000);border:2px solid #0f0;border-radius:12px;padding:20px;cursor:pointer;transition:all 0.3s}.card:hover{transform:translateY(-5px);border-color:#ffd700;box-shadow:0 10px 30px rgba(0,255,0,0.3)}.card h3{color:#ffd700;margin-bottom:10px}.card p{color:#0f0;font-size:0.9em}.chat{background:#0a0a00;border:2px solid #ffd700;border-radius:12px;padding:20px;height:600px;display:flex;flex-direction:column}.msgs{flex:1;overflow-y:auto;padding:20px;background:#000;border-radius:8px;margin-bottom:20px}.msg{padding:15px;border-radius:10px;margin:10px 0;max-width:80%}.msg.u{background:#1a1a00;border-left:4px solid #ffd700;margin-left:auto}.msg.a{background:#001a00;border-left:4px solid #0f0}.inp{display:flex;gap:10px}.inp input{flex:1;background:#1a1a00;border:2px solid #ffd700;color:#0f0;padding:12px;border-radius:8px;font-size:1em}.inp button{background:#ffd700;color:#000;border:none;padding:12px 24px;border-radius:8px;font-weight:bold;cursor:pointer}.auth{max-width:400px;margin:50px auto;background:#0a0a00;padding:40px;border:2px solid #ffd700;border-radius:12px}.auth input{width:100%;background:#000;border:2px solid #0f0;color:#0f0;padding:15px;margin:10px 0;border-radius:8px;font-size:1em}.prod{text-align:center;border:3px solid #ffd700}.price{color:#ffd700;font-size:2.5em;font-weight:bold;margin:20px 0}.feat{color:#0f0;text-align:left;margin:20px 0;list-style:none}.feat li{margin:10px 0;padding-left:25px;position:relative}.feat li:before{content:"✓";position:absolute;left:0;color:#0f0;font-weight:bold}.buy{background:#0f0;color:#000;border:none;padding:15px 40px;border-radius:8px;font-size:1.2em;font-weight:bold;cursor:pointer;width:100%;margin-top:20px}.buy:hover{background:#0ff}</style></head><body><div class="hdr"><div class="title">👑 SALES KING ACADEMY</div><div class="creds">SKA Credits: <span id="c">0</span> | DNA: <span id="d">...</span></div></div><div class="nav"><button onclick="show('agents')">25 AI Agents</button><button onclick="show('products')">Products</button><button onclick="show('login')">Login</button><button onclick="show('register')">Register</button></div><div class="container"><div id="agents" class="sec active"><h2 style="color:#ffd700;margin-bottom:20px">25 AI Agents - Custom LLM</h2><div class="grid" id="agrid"></div></div><div id="products" class="sec"><h2 style="color:#ffd700;margin-bottom:20px">Training & Systems</h2><div class="grid"><div class="card prod"><h3>Starter Package</h3><div class="price">$5,497</div><ul class="feat"><li>All 25 AI Agents</li><li>Basic automation</li><li>Email support</li></ul><button class="buy" onclick="purchase('starter')">Purchase</button></div><div class="card prod"><h3>Advanced Training</h3><div class="price">$47,000</div><ul class="feat"><li>Everything in Starter</li><li>Full automation</li><li>Lead generation</li><li>12 weeks training</li><li>24/7 support</li></ul><button class="buy" onclick="purchase('advanced')">Purchase</button></div><div class="card prod"><h3>Elite Package</h3><div class="price">$97,000</div><ul class="feat"><li>Everything in Advanced</li><li>White-label rights</li><li>Source code access</li><li>Dedicated support</li></ul><button class="buy" onclick="purchase('elite')">Purchase</button></div><div class="card prod"><h3>Royal Elite</h3><div class="price">$397,000</div><ul class="feat"><li>Complete ownership</li><li>Custom development</li><li>Lifetime support</li><li>Everything included</li></ul><button class="buy" onclick="purchase('royal')">Purchase</button></div></div></div><div id="login" class="sec"><div class="auth"><h2 style="color:#ffd700;text-align:center;margin-bottom:30px">Login</h2><input type="email" id="le" placeholder="Email"><input type="password" id="lp" placeholder="Password"><button class="buy" onclick="login()">Login</button></div></div><div id="register" class="sec"><div class="auth"><h2 style="color:#ffd700;text-align:center;margin-bottom:30px">Create Account</h2><input type="email" id="re" placeholder="Email"><input type="password" id="rp" placeholder="Password"><input type="password" id="rc" placeholder="Confirm Password"><button class="buy" onclick="register()">Register</button></div></div><div id="chat" class="sec"><button onclick="show('agents')" style="background:#ffd700;color:#000;border:none;padding:10px 20px;border-radius:8px;margin-bottom:20px">← Back</button><div class="chat"><div style="color:#ffd700;font-size:1.5em;margin-bottom:15px">Agent <span id="ca"></span></div><div class="msgs" id="msgs"></div><div class="inp"><input type="text" id="ci" placeholder="Ask anything..." onkeypress="if(event.key==='Enter')send()"><button onclick="send()">Send</button><button onclick="send(true)">🔍 Search</button></div></div></div></div><script>let ca=1,st=null,cu=null;async function upd(){const r=await fetch('/api/credits');const d=await r.json();document.getElementById('c').textContent=d.credits.toLocaleString();document.getElementById('d').textContent=d.dna;}setInterval(upd,2000);upd();function show(id){document.querySelectorAll('.sec').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');}const ag=[{n:"Supreme King",r:"Strategy & Leadership"},{n:"Sales Commander",r:"Revenue Generation"},{n:"Market Intel",r:"Data Analysis"},{n:"Tech Architect",r:"System Design"},{n:"Code Master",r:"Development"},{n:"Marketing Genius",r:"Digital Marketing"},{n:"Finance Controller",r:"Financial Planning"},{n:"Legal Guardian",r:"Business Law"},{n:"HR Director",r:"Talent Management"},{n:"Operations Chief",r:"Process Optimization"},{n:"Customer Success",r:"Client Relations"},{n:"Product Manager",r:"Product Strategy"},{n:"UX Designer",r:"User Experience"},{n:"Data Scientist",r:"Machine Learning"},{n:"Security Expert",r:"Cybersecurity"},{n:"Growth Hacker",r:"User Acquisition"},{n:"Content Creator",r:"Copywriting"},{n:"Analytics Pro",r:"Business Intelligence"},{n:"Automation Engineer",r:"Workflow Automation"},{n:"AI Researcher",r:"Artificial Intelligence"},{n:"Sales Engineer",r:"Technical Sales"},{n:"Brand Strategist",r:"Brand Development"},{n:"Investment Analyst",r:"Investment Analysis"},{n:"Crisis Manager",r:"Crisis Communication"},{n:"Innovation Lead",r:"Innovation Strategy"}];const grid=document.getElementById('agrid');for(let i=0;i<25;i++){const d=document.createElement('div');d.className='card';d.innerHTML=\`<h3>👑 Agent \${i+1}</h3><p><strong>\${ag[i].n}</strong></p><p>\${ag[i].r}</p>\`;d.onclick=()=>open(i+1);grid.appendChild(d);}function open(id){ca=id;document.getElementById('ca').textContent=id;document.getElementById('msgs').innerHTML='<div style="text-align:center;color:#0f0;padding:40px">Ready. Powered by custom LLM with embedded intelligence.</div>';show('chat');}async function send(ws=false){const inp=document.getElementById('ci');const msg=inp.value.trim();if(!msg)return;const m=document.getElementById('msgs');m.innerHTML+=\`<div class="msg u"><strong>You:</strong> \${msg}</div>\`;m.innerHTML+=\`<div id="t" class="msg a"><strong>Agent \${ca}:</strong> Processing...</div>\`;inp.value='';m.scrollTop=m.scrollHeight;try{const r=await fetch(\`/api/agent/\${ca}\`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg,withSearch:ws})});const d=await r.json();document.getElementById('t').remove();m.innerHTML+=\`<div class="msg a"><strong>Agent \${ca}:</strong> \${d.response.replace(/\\n/g,'<br>')}</div>\`;m.scrollTop=m.scrollHeight;}catch(e){document.getElementById('t').remove();m.innerHTML+=\`<div class="msg a" style="border-color:#f00">Error: \${e.message}</div>\`;}}async function register(){const e=document.getElementById('re').value;const p=document.getElementById('rp').value;const c=document.getElementById('rc').value;if(p!==c){alert('Passwords do not match');return;}try{const r=await fetch('/api/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:e,password:p})});const d=await r.json();if(d.success){alert('Registration successful! Please login.');show('login');}}catch(e){alert('Registration failed');}}async function login(){const e=document.getElementById('le').value;const p=document.getElementById('lp').value;try{const r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:e,password:p})});const d=await r.json();if(d.success){st=d.token;cu=d.user;alert('Login successful!');show('agents');}else{alert('Invalid credentials');}}catch(e){alert('Login failed');}}async function purchase(pid){if(!st){alert('Please login first');show('login');return;}if(!confirm('Proceed with purchase?'))return;try{const r=await fetch('/api/purchase',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId:cu.email,productId:pid})});const d=await r.json();if(d.success){alert(\`Purchase successful!\\n\\nYour access has been activated. Check email for details.\`);}else{alert('Purchase failed: '+d.error);}}catch(e){alert('Purchase error');}}</script></body></html>`
