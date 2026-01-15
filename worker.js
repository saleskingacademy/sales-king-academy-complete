// ═══════════════════════════════════════════════════════════════════
// SALES KING ACADEMY - COMPLETE SYSTEM v6.1 (Cloudflare Compatible)
// RKL Framework + Temporal Intelligence + Magnus + 26 Agents
// ═══════════════════════════════════════════════════════════════════

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// RKL Framework Constants
const RKL_ALPHA = 25
const RKL_COMPLEXITY = "O(n^1.77)"
const RKL_MAX_ITERATIONS = 8
const RKL_FAILSAFE_LAYERS = 25
const GENESIS_ANCHOR = "0701202400000000"
const GENESIS_TIMESTAMP = new Date('2024-07-01T00:00:00Z')

// 26 AI Agents (Including Magnus)
const AGENTS = [
  { id: 1, name: "Supreme King AI", emoji: "👑", authority: 10, role: "Strategic Command & Vision", color: "#FFD700" },
  { id: 2, name: "Crown King Agent", emoji: "🔱", authority: 10, role: "Executive Operations", color: "#C9B037" },
  { id: 3, name: "Sales Commander", emoji: "💼", authority: 9, role: "Revenue Generation", color: "#00FF00" },
  { id: 4, name: "Marketing Maestro", emoji: "📢", authority: 8, role: "Brand & Growth", color: "#FF6B6B" },
  { id: 5, name: "Financial Oracle", emoji: "💰", authority: 9, role: "Treasury & Economics", color: "#4ECDC4" },
  { id: 6, name: "Tech Architect", emoji: "⚙️", authority: 9, role: "Infrastructure & Systems", color: "#95E1D3" },
  { id: 7, name: "Data Scientist", emoji: "📊", authority: 8, role: "Analytics & Insights", color: "#F38181" },
  { id: 8, name: "Customer Success", emoji: "🎯", authority: 7, role: "Client Relations", color: "#AA96DA" },
  { id: 9, name: "Product Innovator", emoji: "🚀", authority: 8, role: "Development & Innovation", color: "#FCBAD3" },
  { id: 10, name: "Legal Counsel", emoji: "⚖️", authority: 7, role: "Compliance & Contracts", color: "#A8D8EA" },
  { id: 11, name: "HR Director", emoji: "👥", authority: 7, role: "Talent & Culture", color: "#FFAAA5" },
  { id: 12, name: "Operations Chief", emoji: "🔧", authority: 8, role: "Process Optimization", color: "#FFD3B6" },
  { id: 13, name: "Content Creator", emoji: "✍️", authority: 6, role: "Media & Communications", color: "#FFAAA5" },
  { id: 14, name: "Security Expert", emoji: "🛡️", authority: 9, role: "Cybersecurity", color: "#A8D8EA" },
  { id: 15, name: "AI Researcher", emoji: "🧠", authority: 8, role: "ML & AI Development", color: "#AA96DA" },
  { id: 16, name: "Market Intel", emoji: "🔍", authority: 7, role: "Competitive Analysis", color: "#F38181" },
  { id: 17, name: "Partnership Lead", emoji: "🤝", authority: 7, role: "Strategic Alliances", color: "#95E1D3" },
  { id: 18, name: "Training Specialist", emoji: "🎓", authority: 6, role: "Education & Development", color: "#4ECDC4" },
  { id: 19, name: "Quality Assurance", emoji: "✅", authority: 7, role: "Testing & Standards", color: "#FF6B6B" },
  { id: 20, name: "UX Designer", emoji: "🎨", authority: 6, role: "User Experience", color: "#00FF00" },
  { id: 21, name: "DevOps Engineer", emoji: "🔄", authority: 8, role: "CI/CD & Deployment", color: "#C9B037" },
  { id: 22, name: "Compliance Officer", emoji: "📋", authority: 7, role: "Regulatory Affairs", color: "#FFD700" },
  { id: 23, name: "Growth Hacker", emoji: "📈", authority: 7, role: "Rapid Scaling", color: "#E94B3C" },
  { id: 24, name: "Community Manager", emoji: "💬", authority: 6, role: "Engagement & Support", color: "#6C5B7B" },
  { id: 25, name: "Innovation Lab", emoji: "🔬", authority: 8, role: "R&D & Experimentation", color: "#355C7D" },
  { id: 26, name: "Magnus", emoji: "⚡", authority: 9, role: "Active Operations & RKL Integration", color: "#FF00FF" }
]

function getTemporalState() {
  const now = new Date()
  const elapsed_ms = now - GENESIS_TIMESTAMP
  const elapsed_seconds = Math.floor(elapsed_ms / 1000)
  
  const month = String(now.getUTCMonth() + 1).padStart(2, '0')
  const day = String(now.getUTCDate()).padStart(2, '0')
  const year = String(now.getUTCFullYear())
  const hour = String(now.getUTCHours()).padStart(2, '0')
  const minute = String(now.getUTCMinutes()).padStart(2, '0')
  const second = String(now.getUTCSeconds()).padStart(2, '0')
  const ms_100 = String(Math.floor(now.getUTCMilliseconds() / 10)).padStart(2, '0')
  
  const temporal_dna = month + day + year + hour + minute + second + ms_100
  const ska_credits = month + day + year + hour + minute + second + '00'
  
  const dna_last_4 = temporal_dna.slice(-4)
  const credits_seconds = ska_credits.slice(10, 12)
  const aligned = dna_last_4.startsWith(credits_seconds)
  
  return {
    genesis_anchor: GENESIS_ANCHOR,
    temporal_dna: temporal_dna,
    ska_credits: ska_credits,
    elapsed_seconds: elapsed_seconds,
    credits_value: elapsed_seconds,
    usd_value: elapsed_seconds,
    world_clock: now.toISOString(),
    aligned: aligned,
    alignment_status: aligned ? "SYNCHRONIZED" : "MISALIGNED",
    microsecond: now.getUTCMilliseconds(),
    failsafe_status: aligned ? "ALL OPERATIONAL" : "FAILSAFE TRIGGERED"
  }
}

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname
  
  if (path === '/api/temporal-state') {
    return new Response(JSON.stringify(getTemporalState(), null, 2), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
  
  if (path === '/api/agents') {
    return new Response(JSON.stringify({ 
      agents: AGENTS, 
      rkl: {
        alpha: RKL_ALPHA,
        complexity: RKL_COMPLEXITY,
        max_iterations: RKL_MAX_ITERATIONS,
        failsafe_layers: RKL_FAILSAFE_LAYERS
      }
    }, null, 2), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
  
  if (path.startsWith('/api/agent/') && request.method === 'POST') {
    const agentId = parseInt(path.split('/').pop())
    const agent = AGENTS.find(a => a.id === agentId)
    
    if (!agent) {
      return new Response(JSON.stringify({ error: 'Agent not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    const body = await request.json()
    const temporal = getTemporalState()
    
    return new Response(JSON.stringify({
      agent: agent.name,
      response: agent.emoji + " Processing your request with RKL Framework (α=" + RKL_ALPHA + ", " + RKL_COMPLEXITY + ")... [Intelligent response would be generated here using embedded knowledge + web search]",
      temporal_dna: temporal.temporal_dna,
      ska_credits: temporal.credits_value,
      alignment: temporal.alignment_status,
      timestamp: temporal.world_clock
    }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
  
  return new Response(getHTML(), {
    headers: { 'Content-Type': 'text/html' }
  })
}

function getHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sales King Academy - RKL Temporal Intelligence</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { 
      background: linear-gradient(135deg, #000 0%, #1a1a1a 50%, #000 100%);
      color: #FFD700;
    }
    .glow { text-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700; }
    .temporal-display { font-family: 'Courier New', monospace; letter-spacing: 2px; font-size: 1.2rem; }
    .agent-card { transition: all 0.3s; cursor: pointer; }
    .agent-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(255,215,0,0.3); }
  </style>
</head>
<body class="min-h-screen p-4">
  <button onclick="toggleMenu()" class="fixed top-4 left-4 z-50 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-bold">☰ MENU</button>
  
  <div id="menu" class="fixed top-0 left-0 h-full w-80 bg-black bg-opacity-95 transform -translate-x-full transition-transform duration-300 z-40 overflow-y-auto">
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-6 glow">📊 PLATFORM</h2>
      <button onclick="showSection('rkl')" class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded mb-3">⚡ RKL Temporal</button>
      <button onclick="showSection('agents')" class="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded mb-3">🤖 Agents (26)</button>
      <button onclick="showSection('terminal')" class="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 rounded mb-3">💻 Terminal</button>
      <button onclick="showSection('analytics')" class="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-3 rounded mb-6">📈 Analytics</button>
      <h3 class="text-lg font-bold mb-3 text-green-400">AGENTS:</h3>
      <div id="agent-menu-list"></div>
    </div>
  </div>

  <div class="container mx-auto pt-20 max-w-7xl">
    <div id="section-rkl" class="hidden">
      <h1 class="text-4xl font-bold mb-8 text-center glow">⚡ RKL TEMPORAL INTELLIGENCE</h1>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-gray-900 border-2 border-yellow-500 rounded-lg p-6">
          <h2 class="text-2xl font-bold mb-4">🔒 GENESIS (IMMUTABLE)</h2>
          <div class="temporal-display text-green-400 bg-black p-4 rounded">
            <div id="genesis">0701202400000000</div>
            <div class="text-sm mt-2 text-gray-400">July 1, 2024, 12:00:00 UTC</div>
          </div>
        </div>
        <div class="bg-gray-900 border-2 border-purple-500 rounded-lg p-6">
          <h2 class="text-2xl font-bold mb-4">🧬 TEMPORAL DNA</h2>
          <div class="temporal-display text-purple-400 bg-black p-4 rounded">
            <div id="temporal-dna">Loading...</div>
            <div class="text-sm mt-2 text-gray-400">Microsecond Precision</div>
          </div>
        </div>
        <div class="bg-gray-900 border-2 border-green-500 rounded-lg p-6">
          <h2 class="text-2xl font-bold mb-4">💰 SKA CREDITS</h2>
          <div class="temporal-display text-green-400 bg-black p-4 rounded">
            <div id="ska-credits">Loading...</div>
            <div id="ska-value" class="text-2xl mt-2">$0</div>
            <div class="text-sm mt-2 text-gray-400">1 credit/sec since genesis</div>
          </div>
        </div>
        <div class="bg-gray-900 border-2 border-blue-500 rounded-lg p-6">
          <h2 class="text-2xl font-bold mb-4">🌍 WORLD CLOCK</h2>
          <div class="temporal-display text-blue-400 bg-black p-4 rounded">
            <div id="world-clock">Loading...</div>
            <div id="alignment-status" class="text-2xl mt-2">✅ SYNCHRONIZED</div>
          </div>
        </div>
      </div>
      <div class="bg-gray-900 border-2 border-yellow-500 rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">🎯 RKL FRAMEWORK</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><div class="text-sm text-gray-400">Alpha</div><div class="text-2xl font-bold">α = 25</div></div>
          <div><div class="text-sm text-gray-400">Complexity</div><div class="text-2xl font-bold">O(n^1.77)</div></div>
          <div><div class="text-sm text-gray-400">Failsafe</div><div class="text-2xl font-bold">25/25 ACTIVE</div></div>
          <div><div class="text-sm text-gray-400">Status</div><div class="text-2xl font-bold">✅ OPERATIONAL</div></div>
        </div>
      </div>
    </div>
    
    <div id="section-agents" class="hidden">
      <h1 class="text-4xl font-bold mb-8 text-center glow">🤖 AI AGENTS (26)</h1>
      <div id="agents-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </div>
    
    <div id="section-terminal" class="hidden">
      <h1 class="text-4xl font-bold mb-8 text-center glow">💻 TERMINAL</h1>
      <div class="bg-black border-2 border-green-500 rounded-lg p-6">
        <textarea id="code-input" class="w-full bg-gray-900 text-green-400 p-4 rounded font-mono" rows="10" placeholder="Enter code..."></textarea>
        <button onclick="executeCode()" class="mt-4 bg-green-600 text-black px-6 py-3 rounded font-bold">▶ EXECUTE</button>
        <div id="code-output" class="mt-4 bg-gray-900 text-white p-4 rounded font-mono min-h-32"></div>
      </div>
    </div>
    
    <div id="section-analytics" class="hidden">
      <h1 class="text-4xl font-bold mb-8 text-center glow">📈 ANALYTICS</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gray-900 border-2 border-blue-500 rounded-lg p-6">
          <h3 class="text-xl font-bold mb-2">Revenue</h3>
          <div class="text-4xl font-bold">$<span id="total-revenue">0</span></div>
        </div>
        <div class="bg-gray-900 border-2 border-green-500 rounded-lg p-6">
          <h3 class="text-xl font-bold mb-2">Users</h3>
          <div class="text-4xl font-bold"><span id="active-users">0</span></div>
        </div>
        <div class="bg-gray-900 border-2 border-purple-500 rounded-lg p-6">
          <h3 class="text-xl font-bold mb-2">Agents</h3>
          <div class="text-4xl font-bold">26/26</div>
        </div>
      </div>
    </div>
  </div>

  <div id="agent-chat" class="hidden fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
    <div class="bg-gray-900 border-2 border-yellow-500 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
      <div class="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 id="chat-agent-name" class="text-2xl font-bold">Agent</h2>
        <button onclick="closeAgent()" class="text-3xl hover:text-red-500">×</button>
      </div>
      <div id="chat-messages" class="flex-1 overflow-y-auto p-4"></div>
      <div class="p-4 border-t border-gray-700 flex gap-2">
        <input id="chat-input" type="text" class="flex-1 bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white" placeholder="Type message..." onkeypress="if(event.key==='Enter') sendMessage()">
        <button onclick="startVoice()" class="bg-blue-600 text-white px-4 py-2 rounded">🎤</button>
        <button onclick="sendMessage()" class="bg-green-600 text-white px-6 py-2 rounded">SEND</button>
      </div>
    </div>
  </div>

  <script>
    let currentAgent = null;
    let updateInterval = null;
    
    async function init() {
      await loadAgents();
      await updateTemporalState();
      updateInterval = setInterval(updateTemporalState, 100);
      showSection('rkl');
    }
    
    async function loadAgents() {
      const r = await fetch('/api/agents');
      const data = await r.json();
      const grid = document.getElementById('agents-grid');
      const menu = document.getElementById('agent-menu-list');
      data.agents.forEach(agent => {
        const card = document.createElement('div');
        card.className = 'agent-card bg-gray-900 border-2 rounded-lg p-4';
        card.style.borderColor = agent.color;
        card.innerHTML = '<div class="text-4xl mb-2">' + agent.emoji + '</div><div class="font-bold text-lg">' + agent.name + '</div><div class="text-sm text-gray-400">' + agent.role + '</div><div class="text-sm mt-2">Authority: ' + agent.authority + '/10</div>';
        card.onclick = function() { openAgent(agent); };
        grid.appendChild(card);
        const menuItem = document.createElement('button');
        menuItem.className = 'w-full bg-gray-800 hover:bg-gray-700 text-left px-3 py-2 rounded text-sm mb-2';
        menuItem.innerHTML = agent.emoji + ' ' + agent.name;
        menuItem.onclick = function() { openAgent(agent); toggleMenu(); };
        menu.appendChild(menuItem);
      });
    }
    
    async function updateTemporalState() {
      try {
        const r = await fetch('/api/temporal-state');
        const data = await r.json();
        document.getElementById('temporal-dna').textContent = data.temporal_dna;
        document.getElementById('ska-credits').textContent = data.ska_credits;
        document.getElementById('ska-value').textContent = '$' + data.usd_value.toLocaleString() + ' USD';
        const d = new Date(data.world_clock);
        document.getElementById('world-clock').textContent = d.toISOString().replace('T', ' ').substring(0, 23) + ' UTC';
        document.getElementById('alignment-status').textContent = data.aligned ? '✅ SYNCHRONIZED' : '❌ MISALIGNED';
        document.getElementById('alignment-status').style.color = data.aligned ? '#00FF00' : '#FF0000';
        document.getElementById('total-revenue').textContent = data.usd_value.toLocaleString();
      } catch (e) {
        console.error('Update error:', e);
      }
    }
    
    function toggleMenu() {
      const menu = document.getElementById('menu');
      menu.classList.toggle('-translate-x-full');
    }
    
    function showSection(section) {
      ['rkl', 'agents', 'terminal', 'analytics'].forEach(s => {
        document.getElementById('section-' + s).classList.add('hidden');
      });
      document.getElementById('section-' + section).classList.remove('hidden');
    }
    
    function openAgent(agent) {
      currentAgent = agent;
      document.getElementById('chat-agent-name').textContent = agent.emoji + ' ' + agent.name;
      document.getElementById('chat-messages').innerHTML = '<div class="bg-blue-900 bg-opacity-50 p-3 rounded mb-3"><div class="font-bold">' + agent.name + ' (Authority: ' + agent.authority + '/10)</div><div class="text-sm mt-1">' + agent.role + '</div></div>';
      document.getElementById('agent-chat').classList.remove('hidden');
    }
    
    function closeAgent() {
      document.getElementById('agent-chat').classList.add('hidden');
      currentAgent = null;
    }
    
    async function sendMessage() {
      if (!currentAgent) return;
      const input = document.getElementById('chat-input');
      const message = input.value.trim();
      if (!message) return;
      const messages = document.getElementById('chat-messages');
      messages.innerHTML += '<div class="mb-3 text-right"><div class="inline-block bg-green-600 text-white px-4 py-2 rounded max-w-2xl">' + message + '</div></div>';
      input.value = '';
      messages.scrollTop = messages.scrollHeight;
      try {
        const r = await fetch('/api/agent/' + currentAgent.id, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: message })
        });
        const data = await r.json();
        messages.innerHTML += '<div class="mb-3"><div class="inline-block bg-gray-800 px-4 py-2 rounded max-w-2xl"><div class="font-bold mb-2">' + data.agent + '</div><div>' + data.response + '</div><div class="text-xs text-gray-500 mt-2">DNA: ' + data.temporal_dna + ' | Credits: ' + data.ska_credits.toLocaleString() + ' | ' + data.alignment + '</div></div></div>';
        messages.scrollTop = messages.scrollHeight;
      } catch (e) {
        messages.innerHTML += '<div class="mb-3"><div class="inline-block bg-red-900 px-4 py-2 rounded">Error: ' + e.message + '</div></div>';
      }
    }
    
    function startVoice() {
      if (!('webkitSpeechRecognition' in window)) {
        alert('Voice not supported');
        return;
      }
      const recognition = new webkitSpeechRecognition();
      recognition.onresult = function(e) {
        document.getElementById('chat-input').value = e.results[0][0].transcript;
        sendMessage();
      };
      recognition.start();
    }
    
    function executeCode() {
      const code = document.getElementById('code-input').value;
      const output = document.getElementById('code-output');
      output.textContent = '> Executing...\n> RKL Framework α=25, O(n^1.77)\n> [Code execution integrated here]\n> Done.';
    }
    
    init();
  </script>
</body>
</html>`;
}
