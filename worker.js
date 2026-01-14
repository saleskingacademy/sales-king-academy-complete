/**
 * SALES KING ACADEMY - 25 AUTONOMOUS AI AGENTS
 * Mobile-Optimized | Full Stack | Production Ready
 * RKL Framework α=25 | O(n^1.77) Complexity
 */

const ANTHROPIC_API_KEY = 'sk-ant-api03-your-anthropic-key-here';

const AGENTS = {
  1: { name: "Supreme King AI", specialty: "Ultimate Intelligence", emoji: "👑", color: "from-yellow-400 to-amber-600" },
  2: { name: "Master Strategist", specialty: "Business Strategy", emoji: "♟️", color: "from-red-500 to-pink-600" },
  3: { name: "Financial Wizard", specialty: "Trading & Markets", emoji: "💰", color: "from-green-500 to-emerald-600" },
  4: { name: "Creative Genius", specialty: "Art & Innovation", emoji: "🎨", color: "from-purple-500 to-indigo-600" },
  5: { name: "Tech Oracle", specialty: "AI & Engineering", emoji: "⚡", color: "from-blue-500 to-cyan-600" },
  6: { name: "Health Guardian", specialty: "Medical & Wellness", emoji: "❤️", color: "from-pink-400 to-rose-600" },
  7: { name: "Legal Eagle", specialty: "Law & Compliance", emoji: "⚖️", color: "from-gray-600 to-slate-700" },
  8: { name: "Marketing Maverick", specialty: "Brand Growth", emoji: "📢", color: "from-orange-500 to-amber-600" },
  9: { name: "Sales King", specialty: "Deal Closing", emoji: "🤝", color: "from-yellow-500 to-gold-600" },
  10: { name: "Data Scientist", specialty: "Analytics", emoji: "📊", color: "from-teal-500 to-cyan-600" },
  11: { name: "Educator Pro", specialty: "Training", emoji: "🎓", color: "from-blue-400 to-indigo-500" },
  12: { name: "Research Master", specialty: "Investigation", emoji: "🔬", color: "from-violet-500 to-purple-600" },
  13: { name: "Social Sage", specialty: "Influence", emoji: "🌟", color: "from-pink-500 to-fuchsia-600" },
  14: { name: "Operations Chief", specialty: "Logistics", emoji: "🏭", color: "from-slate-600 to-gray-700" },
  15: { name: "Innovation Lab", specialty: "R&D", emoji: "🚀", color: "from-lime-500 to-green-600" },
  16: { name: "Crisis Manager", specialty: "Emergency", emoji: "🚨", color: "from-red-600 to-orange-700" },
  17: { name: "Customer Champion", specialty: "Support", emoji: "💬", color: "from-sky-500 to-blue-600" },
  18: { name: "Investment Guru", specialty: "Wealth", emoji: "💎", color: "from-emerald-600 to-green-700" },
  19: { name: "Content King", specialty: "Media", emoji: "🎬", color: "from-amber-500 to-orange-600" },
  20: { name: "Automation Expert", specialty: "Efficiency", emoji: "🤖", color: "from-cyan-500 to-teal-600" },
  21: { name: "Philosophy Sage", specialty: "Wisdom", emoji: "🧘", color: "from-indigo-600 to-violet-700" },
  22: { name: "Sports Analyst", specialty: "Performance", emoji: "⚽", color: "from-orange-600 to-red-700" },
  23: { name: "Culinary Master", specialty: "Food", emoji: "👨‍🍳", color: "from-rose-500 to-pink-600" },
  24: { name: "Travel Guide", specialty: "Exploration", emoji: "✈️", color: "from-blue-600 to-purple-700" },
  25: { name: "Quantum Solver", specialty: "Complex Problems", emoji: "🔮", color: "from-violet-600 to-purple-700" }
};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  if (url.pathname === '/' || url.pathname === '/index.html') {
    return new Response(getHTML(), {
      headers: { 
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
  
  if (url.pathname.startsWith('/agent/') && request.method === 'POST') {
    const agentId = parseInt(url.pathname.split('/')[2]);
    const body = await request.json();
    const response = await chatWithAgent(agentId, body.message);
    return new Response(JSON.stringify(response), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  }
  
  return new Response('Not Found', { status: 404 });
}

async function chatWithAgent(agentId, userMessage) {
  const agent = AGENTS[agentId];
  const genesisDate = new Date('2024-07-01T00:00:00Z');
  const now = new Date();
  const secondsElapsed = Math.floor((now - genesisDate) / 1000);
  const skaCredits = secondsElapsed;
  const temporalDNA = generateTemporalDNA();
  
  const systemPrompt = `You are ${agent.name} ${agent.emoji}, an expert AI agent specializing in ${agent.specialty}.

You are part of the Sales King Academy Supreme King AI system with 25 specialized agents.

CURRENT SYSTEM STATUS:
- SKA Credits: ${skaCredits.toLocaleString()} (auto-minting since July 1, 2024 at 1 credit/second)
- Temporal DNA: ${temporalDNA}
- RKL Framework: α=25 parameter active for quantum-classical balance
- Computational Complexity: O(n^1.77) breakthrough vs O(2^n) traditional

Respond with deep expertise, actionable insights, and practical guidance. Be helpful, clear, and professional.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        messages: [{
          role: 'user',
          content: userMessage
        }],
        system: systemPrompt
      })
    });
    
    if (!response.ok) {
      throw new Error(\`API error: \${response.status}\`);
    }
    
    const data = await response.json();
    
    return {
      reply: data.content[0].text,
      credits: skaCredits,
      dna: temporalDNA,
      agent: agent.name
    };
  } catch (error) {
    return {
      reply: \`I'm \${agent.name}, your \${agent.specialty} expert. I'm currently experiencing connectivity issues. Please try again in a moment. (\${error.message})\`,
      credits: skaCredits,
      dna: temporalDNA,
      agent: agent.name
    };
  }
}

function generateTemporalDNA() {
  const chars = 'ACGT0123456789';
  let dna = '';
  for (let i = 0; i < 32; i++) {
    dna += chars[Math.floor(Math.random() * chars.length)];
  }
  return dna;
}

function getHTML() {
  return \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>👑 Sales King Academy - 25 AI Agents</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * { -webkit-tap-highlight-color: transparent; }
    body { 
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
      overscroll-behavior: none;
    }
    .agent-card { 
      transition: all 0.3s ease;
      cursor: pointer;
      touch-action: manipulation;
    }
    .agent-card:active {
      transform: scale(0.95);
    }
    .agent-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(255,215,0,0.3);
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    .credits-pulse { animation: pulse 2s infinite; }
    @keyframes slideUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .chat-message { animation: slideUp 0.3s ease-out; }
  </style>
</head>
<body class="text-white font-sans min-h-screen">
  
  <!-- MAIN GRID VIEW -->
  <div id="main-view" class="container mx-auto px-4 py-6 md:py-8">
    <header class="text-center mb-8 md:mb-12">
      <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-gold-500 to-amber-600 bg-clip-text text-transparent mb-3 md:mb-4">
        👑 SALES KING ACADEMY
      </h1>
      <p class="text-lg md:text-xl text-gray-300 mb-4 md:mb-6">25 Autonomous AI Agents | RKL Framework Active</p>
      <div class="bg-gray-800/50 backdrop-blur rounded-xl p-3 md:p-4 inline-block">
        <div class="text-xs md:text-sm text-gray-400 mb-1">SKA CREDITS (LIVE)</div>
        <div id="credits" class="text-2xl md:text-3xl font-bold text-green-400 credits-pulse">Loading...</div>
        <div class="text-xs text-gray-500 mt-2">Auto-minting since July 1, 2024</div>
      </div>
    </header>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      \${Object.entries(${JSON.stringify(AGENTS)}).map(([id, agent]) => \`
        <div onclick="openAgent(\${id})" class="agent-card bg-gradient-to-br \${agent.color} p-4 md:p-6 rounded-xl shadow-lg">
          <div class="text-3xl md:text-4xl mb-2">\${agent.emoji}</div>
          <div class="text-lg md:text-2xl font-bold mb-1">Agent \${id}</div>
          <div class="text-sm md:text-lg font-semibold mb-1">\${agent.name}</div>
          <div class="text-xs md:text-sm opacity-90">\${agent.specialty}</div>
        </div>
      \`).join('')}
    </div>
  </div>

  <!-- CHAT VIEW -->
  <div id="chat-view" class="hidden fixed inset-0 bg-black/95 z-50 overflow-hidden">
    <div class="h-full flex flex-col">
      <div class="bg-gray-800/90 backdrop-blur p-4 flex justify-between items-center">
        <div>
          <h2 id="agent-name" class="text-2xl md:text-3xl font-bold"></h2>
          <p id="agent-specialty" class="text-sm md:text-base text-gray-400"></p>
        </div>
        <button onclick="closeChat()" class="px-4 md:px-6 py-2 md:py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-sm md:text-base">
          ← Back
        </button>
      </div>

      <div id="messages" class="flex-1 overflow-y-auto p-4 space-y-3"></div>

      <div class="bg-gray-800/90 backdrop-blur p-4">
        <div class="flex gap-2 md:gap-3 max-w-4xl mx-auto">
          <input 
            type="text" 
            id="input" 
            placeholder="Ask anything..."
            class="flex-1 bg-gray-700 text-white px-4 md:px-6 py-3 md:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg"
            onkeypress="if(event.key==='Enter') sendMessage()"
          />
          <button 
            onclick="sendMessage()" 
            class="px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg font-bold text-base md:text-lg">
            Send
          </button>
        </div>
        <div class="mt-3 text-center text-xs md:text-sm text-gray-500">
          <span id="chat-credits"></span> | DNA: <span id="chat-dna" class="font-mono"></span>
        </div>
      </div>
    </div>
  </div>

  <script>
    let currentAgent = null;
    const AGENTS_DATA = \${JSON.stringify(AGENTS)};
    
    setInterval(updateCredits, 2000);
    updateCredits();
    
    function updateCredits() {
      const genesis = new Date('2024-07-01T00:00:00Z');
      const now = new Date();
      const seconds = Math.floor((now - genesis) / 1000);
      const elem = document.getElementById('credits');
      if (elem) elem.textContent = seconds.toLocaleString();
    }
    
    function openAgent(id) {
      currentAgent = id;
      const agent = AGENTS_DATA[id];
      document.getElementById('main-view').classList.add('hidden');
      document.getElementById('chat-view').classList.remove('hidden');
      document.getElementById('agent-name').textContent = agent.emoji + ' ' + agent.name;
      document.getElementById('agent-specialty').textContent = agent.specialty;
      document.getElementById('messages').innerHTML = \\`
        <div class="text-center text-gray-400 py-8">
          <p class="text-xl md:text-2xl mb-2">👋 Welcome to \${agent.name}</p>
          <p class="text-sm md:text-base">Ask me anything about \${agent.specialty}</p>
        </div>
      \\`;
    }
    
    function closeChat() {
      document.getElementById('chat-view').classList.add('hidden');
      document.getElementById('main-view').classList.remove('hidden');
      currentAgent = null;
    }
    
    async function sendMessage() {
      const input = document.getElementById('input');
      const msg = input.value.trim();
      if (!msg) return;
      
      input.value = '';
      const messages = document.getElementById('messages');
      
      messages.innerHTML += \\`
        <div class="chat-message bg-blue-600/20 border border-blue-500/30 rounded-lg p-3 md:p-4 max-w-[85%] ml-auto">
          <div class="font-bold text-blue-300 mb-1 text-sm md:text-base">You</div>
          <div class="text-sm md:text-base">\${msg}</div>
        </div>
      \\`;
      
      messages.innerHTML += \\`
        <div id="loading" class="chat-message bg-gray-700/50 rounded-lg p-3 md:p-4 max-w-[85%]">
          <div class="font-bold text-gray-300 mb-1 text-sm md:text-base">\${AGENTS_DATA[currentAgent].emoji} \${AGENTS_DATA[currentAgent].name}</div>
          <div class="text-gray-400 text-sm md:text-base">Thinking...</div>
        </div>
      \\`;
      
      messages.scrollTop = messages.scrollHeight;
      
      try {
        const response = await fetch(\\`/agent/\\${currentAgent}\\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: msg })
        });
        
        const data = await response.json();
        document.getElementById('loading').remove();
        
        messages.innerHTML += \\`
          <div class="chat-message bg-purple-600/20 border border-purple-500/30 rounded-lg p-3 md:p-4 max-w-[85%]">
            <div class="font-bold text-purple-300 mb-1 text-sm md:text-base">\${AGENTS_DATA[currentAgent].emoji} \${AGENTS_DATA[currentAgent].name}</div>
            <div class="text-sm md:text-base whitespace-pre-wrap">\${data.reply}</div>
          </div>
        \\`;
        
        document.getElementById('chat-credits').textContent = \\`Credits: \\${data.credits.toLocaleString()}\\`;
        document.getElementById('chat-dna').textContent = data.dna;
        
        messages.scrollTop = messages.scrollHeight;
      } catch (error) {
        document.getElementById('loading').remove();
        messages.innerHTML += \\`
          <div class="chat-message bg-red-600/20 border border-red-500/30 rounded-lg p-3 md:p-4 max-w-[85%]">
            <div class="font-bold text-red-300 text-sm md:text-base">Error</div>
            <div class="text-sm md:text-base">Failed to get response. Please try again.</div>
          </div>
        \\`;
      }
    }
    
    // Prevent pull-to-refresh on mobile
    document.body.addEventListener('touchmove', function(e) {
      if (e.target.closest('#messages')) return;
      e.preventDefault();
    }, { passive: false });
  </script>
</body>
</html>\`;
}
