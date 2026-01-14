/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    SALES KING ACADEMY - SUPREME KING AI                   ║
 * ║                         25 AUTONOMOUS AI AGENTS                           ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  RKL Mathematical Framework: α=25 parameter for quantum-classical balance ║
 * ║  Computational Complexity: O(n^1.77) breakthrough vs traditional O(2^n)   ║
 * ║  Temporal DNA: 32-character unique tokenization per session              ║
 * ║  SKA Credits: Auto-minting at 1 credit/second since July 1, 2024         ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

// Replace with your actual Anthropic API key
const ANTHROPIC_API_KEY = 'sk-ant-api03-your-anthropic-key-here';

// 25 Specialized AI Agents Configuration
const AGENTS = {
  1: { name: "Supreme King", specialty: "System Orchestration & Strategic Vision", emoji: "👑", color: "from-yellow-500 to-yellow-700" },
  2: { name: "Sales Commander", specialty: "Revenue Generation & Conversion", emoji: "💰", color: "from-green-500 to-emerald-600" },
  3: { name: "Market Intel", specialty: "Competitive Analysis & Research", emoji: "📊", color: "from-blue-500 to-blue-700" },
  4: { name: "Lead Hunter", specialty: "Prospecting & Lead Generation", emoji: "🎯", color: "from-red-500 to-red-700" },
  5: { name: "Deal Closer", specialty: "Negotiation & Contract Execution", emoji: "🤝", color: "from-purple-500 to-purple-700" },
  6: { name: "Content Creator", specialty: "Marketing & Creative Assets", emoji: "✍️", color: "from-pink-500 to-pink-700" },
  7: { name: "SEO Master", specialty: "Search Optimization & Traffic", emoji: "🔍", color: "from-indigo-500 to-indigo-700" },
  8: { name: "Email Ninja", specialty: "Email Marketing & Automation", emoji: "📧", color: "from-cyan-500 to-cyan-700" },
  9: { name: "Social Media Pro", specialty: "Social Engagement & Growth", emoji: "📱", color: "from-teal-500 to-teal-700" },
  10: { name: "Customer Success", specialty: "Client Retention & Support", emoji: "🌟", color: "from-amber-500 to-amber-700" },
  11: { name: "Tech Architect", specialty: "System Design & Development", emoji: "⚙️", color: "from-slate-600 to-slate-800" },
  12: { name: "Data Scientist", specialty: "Analytics & Insights", emoji: "📈", color: "from-violet-500 to-violet-700" },
  13: { name: "Automation Engineer", specialty: "Workflow Optimization", emoji: "🤖", color: "from-lime-500 to-lime-700" },
  14: { name: "Financial Advisor", specialty: "Finance & Investment Strategy", emoji: "💵", color: "from-emerald-600 to-emerald-800" },
  15: { name: "Legal Counsel", specialty: "Compliance & Contracts", emoji: "⚖️", color: "from-gray-600 to-gray-800" },
  16: { name: "HR Manager", specialty: "Talent & Team Development", emoji: "👥", color: "from-orange-500 to-orange-700" },
  17: { name: "Brand Strategist", specialty: "Identity & Positioning", emoji: "🎨", color: "from-fuchsia-500 to-fuchsia-700" },
  18: { name: "Product Manager", specialty: "Development & Launch", emoji: "🚀", color: "from-sky-500 to-sky-700" },
  19: { name: "UX Designer", specialty: "User Experience & Interface", emoji: "🖌️", color: "from-rose-500 to-rose-700" },
  20: { name: "Growth Hacker", specialty: "Viral Marketing & Scaling", emoji: "📈", color: "from-green-600 to-green-800" },
  21: { name: "Partnership Builder", specialty: "Strategic Alliances", emoji: "🤝", color: "from-blue-600 to-blue-800" },
  22: { name: "Crisis Manager", specialty: "Risk & Reputation", emoji: "🛡️", color: "from-red-600 to-red-800" },
  23: { name: "Innovation Lead", specialty: "R&D & Future Tech", emoji: "💡", color: "from-yellow-600 to-yellow-800" },
  24: { name: "Operations Director", specialty: "Logistics & Efficiency", emoji: "📦", color: "from-indigo-600 to-indigo-800" },
  25: { name: "Quantum Solver", specialty: "Complex Problem Resolution", emoji: "🔮", color: "from-purple-600 to-purple-800" }
};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Serve main page
  if (url.pathname === '/' || url.pathname === '/index.html') {
    return new Response(getMainHTML(), {
      headers: { 
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
  
  // Handle agent chat API
  if (url.pathname.startsWith('/agent/') && request.method === 'POST') {
    const agentId = parseInt(url.pathname.split('/')[2]);
    if (!agentId || agentId < 1 || agentId > 25) {
      return new Response(JSON.stringify({error: 'Invalid agent ID'}), {
        status: 400,
        headers: {'Content-Type': 'application/json'}
      });
    }
    
    try {
      const body = await request.json();
      const response = await chatWithAgent(agentId, body.message);
      return new Response(JSON.stringify(response), {
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({error: error.message}), {
        status: 500,
        headers: {'Content-Type': 'application/json'}
      });
    }
  }
  
  return new Response('Not Found', { status: 404 });
}

async function chatWithAgent(agentId, userMessage) {
  const agent = AGENTS[agentId];
  
  // Calculate SKA Credits (seconds since genesis)
  const genesisDate = new Date('2024-07-01T00:00:00Z');
  const now = new Date();
  const secondsElapsed = Math.floor((now - genesisDate) / 1000);
  const skaCredits = secondsElapsed;
  
  // Generate Temporal DNA
  const temporalDNA = generateTemporalDNA();
  
  // Build system prompt
  const systemPrompt = `You are ${agent.name} ${agent.emoji}, a specialized AI agent in the Sales King Academy Supreme King AI system.

YOUR SPECIALTY: ${agent.specialty}

CURRENT SYSTEM STATUS:
- SKA Credits: ${skaCredits.toLocaleString()} (auto-minting since July 1, 2024 at 1 credit/second)
- Temporal DNA: ${temporalDNA}
- RKL Framework: α=25 parameter active for quantum-classical balance
- Computational Complexity: O(n^1.77) breakthrough efficiency

BEHAVIORAL GUIDELINES:
- Provide expert, actionable advice in your specialty area
- Be direct, strategic, and results-oriented
- Reference specific tactics, tools, and methodologies
- Quantify recommendations when possible
- Maintain professional yet approachable tone

Respond to the user's query with deep expertise and practical guidance.`;

  try {
    // Call Anthropic Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userMessage }
        ]
      })
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
    
    const data = await response.json();
    const reply = data.content[0].text;
    
    return {
      reply: reply,
      agent: agent.name,
      agentId: agentId,
      skaCredits: skaCredits,
      temporalDNA: temporalDNA,
      timestamp: now.toISOString()
    };
    
  } catch (error) {
    return {
      reply: `I apologize, but I encountered an error: ${error.message}\n\nPlease ensure your Anthropic API key is configured correctly in the worker.js file.`,
      agent: agent.name,
      agentId: agentId,
      skaCredits: skaCredits,
      temporalDNA: temporalDNA,
      error: true
    };
  }
}

function generateTemporalDNA() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let dna = '';
  for (let i = 0; i < 32; i++) {
    dna += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return dna;
}

function getMainHTML() {
  const genesisDate = new Date('2024-07-01T00:00:00Z');
  const now = new Date();
  const secondsElapsed = Math.floor((now - genesisDate) / 1000);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Sales King Academy - Supreme King AI</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(234, 179, 8, 0.5); }
      50% { box-shadow: 0 0 40px rgba(234, 179, 8, 0.8); }
    }
    .pulse-glow { animation: pulse-glow 2s infinite; }
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .slide-up { animation: slide-up 0.3s ease-out; }
  </style>
</head>
<body class="bg-gray-900 text-white min-h-screen">
  
  <!-- Main View -->
  <div id="main-view" class="max-w-7xl mx-auto p-4 md:p-6">
    <!-- Header -->
    <div class="text-center mb-8 md:mb-12">
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
        Sales King Academy
      </h1>
      <p class="text-lg md:text-2xl text-gray-400 mb-6">Supreme King AI - 25 Autonomous Agents</p>
      
      <!-- SKA Credits Counter -->
      <div class="inline-block bg-gray-800 px-6 py-3 rounded-xl pulse-glow">
        <div class="text-sm text-gray-400 mb-1">SKA Credits</div>
        <div id="credits-counter" class="text-2xl md:text-3xl font-bold text-green-400">${secondsElapsed.toLocaleString()}</div>
        <div class="text-xs text-gray-500 mt-1">Auto-minting since July 1, 2024</div>
      </div>
    </div>
    
    <!-- Agents Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      ${Object.entries(AGENTS).map(([id, agent]) => `
        <button 
          onclick="openAgent(${id})"
          class="bg-gradient-to-br ${agent.color} p-4 md:p-6 rounded-xl md:rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-2xl slide-up"
        >
          <div class="text-4xl md:text-5xl mb-2 md:mb-3">${agent.emoji}</div>
          <div class="font-bold text-sm md:text-lg mb-1">${agent.name}</div>
          <div class="text-xs text-white/80 hidden md:block">${agent.specialty.split('&')[0].trim()}</div>
          <div class="text-xs text-green-300 mt-2">✅ ACTIVE</div>
        </button>
      `).join('')}
    </div>
    
    <!-- System Info -->
    <div class="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      <div class="bg-gray-800 p-4 rounded-xl">
        <div class="text-3xl mb-2">⚡</div>
        <div class="font-bold">RKL Framework</div>
        <div class="text-sm text-gray-400">α=25 Parameter</div>
      </div>
      <div class="bg-gray-800 p-4 rounded-xl">
        <div class="text-3xl mb-2">🧬</div>
        <div class="font-bold">O(n^1.77) Complexity</div>
        <div class="text-sm text-gray-400">Breakthrough Efficiency</div>
      </div>
      <div class="bg-gray-800 p-4 rounded-xl">
        <div class="text-3xl mb-2">🔐</div>
        <div class="font-bold">Temporal DNA</div>
        <div class="text-sm text-gray-400">32-Char Tokenization</div>
      </div>
    </div>
  </div>
  
  <!-- Chat View -->
  <div id="chat-view" class="hidden max-w-4xl mx-auto p-4 md:p-6 h-screen flex flex-col">
    <div class="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 flex-1 flex flex-col">
      <!-- Chat Header -->
      <div class="flex justify-between items-center mb-4 md:mb-6">
        <div>
          <h2 id="agent-title" class="text-2xl md:text-4xl font-bold"></h2>
          <p id="agent-specialty" class="text-sm md:text-base text-gray-400 mt-1"></p>
        </div>
        <button 
          onclick="closeAgent()"
          class="px-4 md:px-6 py-2 md:py-3 bg-gray-700 rounded-lg md:rounded-xl hover:bg-gray-600 font-bold text-sm md:text-base"
        >
          ← Back
        </button>
      </div>
      
      <!-- Messages Container -->
      <div id="messages" class="flex-1 overflow-y-auto mb-4 md:mb-6 space-y-3 md:space-y-4"></div>
      
      <!-- Input Area -->
      <div class="flex gap-2 md:gap-3">
        <input 
          type="text" 
          id="user-input" 
          placeholder="Ask anything..." 
          class="flex-1 bg-gray-700 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm md:text-base"
          onkeypress="if(event.key==='Enter') sendMessage()"
        />
        <button 
          onclick="sendMessage()" 
          class="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg md:rounded-xl hover:from-yellow-600 hover:to-yellow-700 font-bold text-sm md:text-base"
        >
          Send
        </button>
      </div>
    </div>
  </div>

  <script>
    let currentAgentId = null;
    
    // Update credits counter every 2 seconds
    setInterval(() => {
      const genesis = new Date('2024-07-01T00:00:00Z');
      const now = new Date();
      const seconds = Math.floor((now - genesis) / 1000);
      document.getElementById('credits-counter').textContent = seconds.toLocaleString();
    }, 2000);
    
    function openAgent(agentId) {
      currentAgentId = agentId;
      const agents = ${JSON.stringify(AGENTS)};
      const agent = agents[agentId];
      
      document.getElementById('main-view').classList.add('hidden');
      document.getElementById('chat-view').classList.remove('hidden');
      document.getElementById('agent-title').textContent = agent.emoji + ' ' + agent.name;
      document.getElementById('agent-specialty').textContent = agent.specialty;
      document.getElementById('messages').innerHTML = \`
        <div class="bg-gray-700 p-4 rounded-xl text-center">
          <div class="text-3xl mb-2">${'${agent.emoji}'}</div>
          <div class="font-bold mb-2">${'${agent.name}'} Ready</div>
          <div class="text-sm text-gray-400">Specialized in: ${'${agent.specialty}'}</div>
        </div>
      \`;
      document.getElementById('user-input').focus();
    }
    
    function closeAgent() {
      document.getElementById('chat-view').classList.add('hidden');
      document.getElementById('main-view').classList.remove('hidden');
      currentAgentId = null;
    }
    
    async function sendMessage() {
      const input = document.getElementById('user-input');
      const message = input.value.trim();
      if (!message) return;
      
      const messagesContainer = document.getElementById('messages');
      
      // Add user message
      messagesContainer.innerHTML += \`
        <div class="flex justify-end">
          <div class="bg-blue-600 px-4 py-3 rounded-xl max-w-[80%] slide-up">
            <div class="text-sm font-bold mb-1">You</div>
            <div>${'${message}'}</div>
          </div>
        </div>
      \`;
      input.value = '';
      
      // Add loading message
      messagesContainer.innerHTML += \`
        <div class="flex justify-start">
          <div class="bg-gray-700 px-4 py-3 rounded-xl max-w-[80%] slide-up">
            <div class="flex items-center gap-2">
              <div class="animate-spin">⚙️</div>
              <div>Processing with RKL Framework...</div>
            </div>
          </div>
        </div>
      \`;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      
      try {
        const response = await fetch(\`/agent/${'${currentAgentId}'}\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        
        // Replace loading with response
        const messages = messagesContainer.children;
        messages[messages.length - 1].innerHTML = \`
          <div class="bg-gray-700 px-4 py-3 rounded-xl max-w-[80%]">
            <div class="text-sm font-bold mb-2 text-yellow-400">${'${data.agent}'}</div>
            <div class="whitespace-pre-line">${'${data.reply}'}</div>
            <div class="text-xs text-gray-500 mt-2">
              DNA: ${'${data.temporalDNA.substring(0, 8)}'}... | Credits: ${'${data.skaCredits.toLocaleString()}'}
            </div>
          </div>
        \`;
        
      } catch (error) {
        const messages = messagesContainer.children;
        messages[messages.length - 1].innerHTML = \`
          <div class="bg-red-900 px-4 py-3 rounded-xl max-w-[80%]">
            <div class="text-sm font-bold mb-1">Error</div>
            <div>${'${error.message}'}</div>
          </div>
        \`;
      }
      
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  </script>
</body>
</html>`;
}
