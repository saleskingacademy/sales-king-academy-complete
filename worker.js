
// SALES KING ACADEMY - CLOUDFLARE WORKER WITH D1 DATABASE
// Self-owned system - NO Render, NO Netlify

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // Root - Serve frontend
    if (url.pathname === '/') {
      return new Response(FRONTEND_HTML, {
        headers: { ...corsHeaders, 'Content-Type': 'text/html' }
      });
    }
    
    // Health check
    if (url.pathname === '/health') {
      return jsonResponse({ status: 'LIVE', agents: 25, platform: 'Cloudflare Workers + D1' }, corsHeaders);
    }
    
    // Auth - Register
    if (url.pathname === '/auth/register' && request.method === 'POST') {
      const body = await request.json();
      
      // Hash password (simplified for demo - use bcrypt in production)
      const passwordHash = await hashPassword(body.password);
      
      const result = await env.DB.prepare(
        'INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)'
      ).bind(body.email, passwordHash, Date.now()).run();
      
      if (result.success) {
        await env.DB.prepare(
          'INSERT INTO credits (user_id, amount) VALUES (?, ?)'
        ).bind(result.meta.last_row_id, 0).run();
        
        const token = await createToken(result.meta.last_row_id, body.email);
        return jsonResponse({ token, user_id: result.meta.last_row_id, email: body.email }, corsHeaders);
      }
      
      return jsonResponse({ error: 'Registration failed' }, corsHeaders, 400);
    }
    
    // Auth - Login
    if (url.pathname === '/auth/login' && request.method === 'POST') {
      const body = await request.json();
      
      const user = await env.DB.prepare(
        'SELECT id, password_hash FROM users WHERE email = ?'
      ).bind(body.email).first();
      
      if (user && await verifyPassword(body.password, user.password_hash)) {
        const token = await createToken(user.id, body.email);
        return jsonResponse({ token, user_id: user.id, email: body.email }, corsHeaders);
      }
      
      return jsonResponse({ error: 'Invalid credentials' }, corsHeaders, 401);
    }
    
    // Agent chat
    if (url.pathname === '/agents/chat' && request.method === 'POST') {
      const body = await request.json();
      const auth = await verifyToken(request.headers.get('Authorization'));
      
      if (!auth) {
        return jsonResponse({ error: 'Unauthorized' }, corsHeaders, 401);
      }
      
      const response = `[Agent ${body.agent_id} - Cloudflare Workers] Processed: ${body.message}`;
      
      await env.DB.prepare(
        'INSERT INTO conversations (user_id, agent_id, message, response, created_at) VALUES (?, ?, ?, ?, ?)'
      ).bind(auth.user_id, body.agent_id, body.message, response, Date.now()).run();
      
      return jsonResponse({ response, agent_id: body.agent_id }, corsHeaders);
    }
    
    // Currency balance
    if (url.pathname === '/currency/balance') {
      const auth = await verifyToken(request.headers.get('Authorization'));
      
      if (!auth) {
        return jsonResponse({ error: 'Unauthorized' }, corsHeaders, 401);
      }
      
      const credits = await env.DB.prepare(
        'SELECT amount FROM credits WHERE user_id = ?'
      ).bind(auth.user_id).first();
      
      return jsonResponse({ balance: credits?.amount || 0 }, corsHeaders);
    }
    
    // Square payment processing
    if (url.pathname === '/payments/square' && request.method === 'POST') {
      const body = await request.json();
      const auth = await verifyToken(request.headers.get('Authorization'));
      
      if (!auth) {
        return jsonResponse({ error: 'Unauthorized' }, corsHeaders, 401);
      }
      
      // Call Square API
      const squareResponse = await fetch('https://connect.squareup.com/v2/payments', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer EAAAl-swRUlg58R-PB33iXSwbL3vqgOv-KxNqLyWJqJlSZ7lV5c6FkmK1K4NHpYh',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          source_id: body.source_id,
          amount_money: { amount: body.amount, currency: 'USD' },
          location_id: 'LCX039E7QRA5G'
        })
      });
      
      const paymentResult = await squareResponse.json();
      
      if (paymentResult.payment) {
        // Credit user account
        await env.DB.prepare(
          'UPDATE credits SET amount = amount + ? WHERE user_id = ?'
        ).bind(body.amount / 100, auth.user_id).run();
        
        return jsonResponse({ success: true, payment: paymentResult.payment }, corsHeaders);
      }
      
      return jsonResponse({ error: 'Payment failed' }, corsHeaders, 400);
    }
    
    return new Response('Not Found', { status: 404 });
  }
};

function jsonResponse(data, corsHeaders, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

async function createToken(userId, email) {
  // Simplified JWT - use proper JWT library in production
  const payload = btoa(JSON.stringify({ user_id: userId, email, exp: Date.now() + 86400000 }));
  return `ska-token-${payload}`;
}

async function verifyToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  try {
    const token = authHeader.slice(7);
    const payload = JSON.parse(atob(token.replace('ska-token-', '')));
    if (payload.exp > Date.now()) return payload;
  } catch {}
  return null;
}

async function hashPassword(password) {
  // Simplified hash - use bcrypt in production
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'ska-salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
}

async function verifyPassword(password, hash) {
  return await hashPassword(password) === hash;
}

const FRONTEND_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sales King Academy - Self-Owned Platform</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white">
<div id="app"></div>
<script>
const API='';let TOKEN=localStorage.getItem('ska_token');
async function call(e,o={}){const h={'Content-Type':'application/json'};TOKEN&&(h.Authorization='Bearer '+TOKEN);const r=await fetch(API+e,{...o,headers:h});if(!r.ok)throw new Error(await r.text());return r.json()}
async function login(e,p){const d=await call('/auth/login',{method:'POST',body:JSON.stringify({email:e,password:p})});TOKEN=d.token;localStorage.setItem('ska_token',TOKEN);return d}
async function register(e,p){const d=await call('/auth/register',{method:'POST',body:JSON.stringify({email:e,password:p})});TOKEN=d.token;localStorage.setItem('ska_token',TOKEN);return d}
function LoginPage(){return\`<div class="min-h-screen flex items-center justify-center p-4"><div class="max-w-md w-full bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl"><div class="text-center mb-8"><h1 class="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Sales King Academy</h1><p class="text-gray-400 mb-2">Self-Owned Platform</p><p class="text-sm text-gray-500">Cloudflare Workers + D1 • No Render • Complete Control</p></div><input type="email" id="email" placeholder="Email" class="w-full p-4 mb-4 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500"><input type="password" id="password" placeholder="Password" class="w-full p-4 mb-6 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500"><button onclick="doLogin()" class="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-bold mb-3 transition">Login</button><button onclick="doRegister()" class="w-full p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-lg font-bold transition">Register</button><div id="error" class="mt-4 text-red-400 text-center text-sm"></div></div></div>\`}
function Dashboard(){return\`<div class="min-h-screen p-6"><div class="max-w-7xl mx-auto"><div class="flex justify-between items-center mb-8"><div><h1 class="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">Sales King Academy</h1><p class="text-gray-400 text-lg">Self-Owned • Cloudflare Edge • Global Performance</p></div><div class="flex items-center gap-4"><div class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl shadow-xl"><div class="text-sm text-gray-200">Credits</div><div id="balance" class="text-4xl font-bold">0</div></div><button onclick="logout()" class="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition">Logout</button></div></div><div class="grid grid-cols-4 gap-6 mb-8"><button onclick="showAgents()" class="p-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl font-bold text-2xl transition transform hover:scale-105 shadow-2xl">🤖 AI Agents<br><span class="text-base font-normal mt-2 block opacity-80">25 Active</span></button><button onclick="showPayments()" class="p-10 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl font-bold text-2xl transition transform hover:scale-105 shadow-2xl">💰 Payments<br><span class="text-base font-normal mt-2 block opacity-80">Square Integration</span></button><button class="p-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl font-bold text-2xl transition transform hover:scale-105 shadow-2xl">📊 Analytics<br><span class="text-base font-normal mt-2 block opacity-80">Edge Data</span></button><button class="p-10 bg-gradient-to-br from-orange-600 to-orange-800 rounded-2xl font-bold text-2xl transition transform hover:scale-105 shadow-2xl">🔒 Security<br><span class="text-base font-normal mt-2 block opacity-80">Self-Owned</span></button></div><div id="content" class="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl min-h-[600px]"></div></div></div>\`}
function AgentsView(){return\`<div class="mb-6 flex items-center justify-between"><h2 class="text-5xl font-bold flex items-center gap-3">🤖 AI Agents<span class="text-lg font-normal text-green-400 bg-green-900/30 px-4 py-2 rounded-full animate-pulse">All 25 Online</span></h2></div><div class="grid grid-cols-5 gap-6">${Array.from({length:25},(_,i)=>i+1).map(id=>\`<div onclick="openChat(${id})" class="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 p-8 rounded-2xl cursor-pointer text-center transition transform hover:scale-110 border-2 border-gray-600 hover:border-blue-500 shadow-xl"><div class="text-6xl mb-4">🤖</div><div class="font-bold text-xl mb-2">Agent ${id}</div><div class="text-xs text-green-400 flex items-center justify-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span><span>Online</span></div></div>\`).join('')}</div>\`}
function ChatView(id){return\`<div class="flex flex-col h-[700px]"><div class="flex justify-between items-center mb-6 pb-6 border-b-2 border-gray-700"><div><h2 class="text-4xl font-bold flex items-center gap-3">🤖 Agent ${id}<span class="text-base font-normal text-green-400 bg-green-900/30 px-4 py-2 rounded-full">Active</span></h2></div><button onclick="showAgents()" class="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold transition">← Back</button></div><div id="messages" class="flex-1 bg-gray-900 rounded-2xl p-6 overflow-y-auto mb-6 border-2 border-gray-700"></div><div class="flex gap-4"><input type="text" id="msg" placeholder="Message Agent ${id}..." class="flex-1 p-5 bg-gray-700 rounded-xl border-2 border-gray-600 focus:border-blue-500 text-lg" onkeypress="if(event.key==='Enter')send(${id})"><button onclick="send(${id})" class="px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl font-bold text-xl transition shadow-xl">Send</button></div></div>\`}
function showPayments(){document.getElementById('content').innerHTML='<h2 class="text-5xl font-bold mb-8">💰 Square Payment Integration</h2><p class="text-2xl text-gray-400 mb-8">Process payments directly through Square API</p><div class="bg-gray-700 p-8 rounded-xl"><p class="text-lg mb-4">Location ID: LCX039E7QRA5G</p><p class="text-sm text-gray-400">Payments are processed in real-time through Cloudflare Workers</p></div>'}
window.doLogin=async()=>{try{await login(document.getElementById('email').value,document.getElementById('password').value);render()}catch(e){document.getElementById('error').textContent=e.message}};
window.doRegister=async()=>{try{await register(document.getElementById('email').value,document.getElementById('password').value);render()}catch(e){document.getElementById('error').textContent=e.message}};
window.logout=()=>{localStorage.removeItem('ska_token');TOKEN=null;render()};
window.showAgents=()=>{document.getElementById('content').innerHTML=AgentsView()};
window.openChat=id=>{document.getElementById('content').innerHTML=ChatView(id)};
window.send=async id=>{const input=document.getElementById('msg');const msg=input.value.trim();if(!msg)return;const msgs=document.getElementById('messages');msgs.innerHTML+=\`<div class="mb-4 bg-blue-900/30 p-5 rounded-xl border border-blue-700"><div class="text-sm text-blue-400 font-bold mb-1">You</div><div class="text-lg">${msg}</div></div>\`;input.value='';try{const data=await call('/agents/chat',{method:'POST',body:JSON.stringify({agent_id:id,message:msg})});msgs.innerHTML+=\`<div class="mb-4 bg-gray-700 p-5 rounded-xl border border-gray-600"><div class="text-sm text-green-400 font-bold mb-1">Agent ${id}</div><div class="text-lg">${data.response}</div></div>\`;msgs.scrollTop=msgs.scrollHeight}catch(e){msgs.innerHTML+=\`<div class="mb-4 bg-red-900/30 p-5 rounded-xl border border-red-700"><div class="text-red-400 font-bold">Error: ${e.message}</div></div>\`}};
async function render(){const app=document.getElementById('app');if(!TOKEN){app.innerHTML=LoginPage()}else{app.innerHTML=Dashboard();try{const balance=await call('/currency/balance');document.getElementById('balance').textContent=balance.balance.toLocaleString()}catch(e){}showAgents()}}
render()
</script>
</body>
</html>\`;
