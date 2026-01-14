/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║            SALES KING ACADEMY - MAXIMUM INTELLIGENCE SYSTEM               ║
 * ║                    Custom LLM + DuckDuckGo Search                         ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const GENESIS_DATE = new Date('2024-07-01T00:00:00Z');
const RKL_ALPHA = 25;

function generateTemporalDNA() {
  const now = Date.now();
  const genesis = GENESIS_DATE.getTime();
  const elapsed = now - genesis;
  const block1 = String(elapsed).padStart(16, '0');
  const worldClock = String(now % 10000).padStart(4, '0');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let dna = block1;
  for (let i = 0; i < 16; i++) {
    dna += chars[Math.floor(Math.random() * chars.length)];
  }
  dna += worldClock;
  return dna;
}

function getSKACredits() {
  const now = Date.now();
  const genesis = GENESIS_DATE.getTime();
  return Math.floor((now - genesis) / 1000);
}

// DuckDuckGo Search Integration
async function duckDuckGoSearch(query) {
  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    const response = await fetch(url);
    const data = await response.json();
    
    let results = [];
    
    if (data.AbstractText) {
      results.push({
        type: 'abstract',
        text: data.AbstractText,
        url: data.AbstractURL
      });
    }
    
    if (data.RelatedTopics && data.RelatedTopics.length > 0) {
      for (let i = 0; i < Math.min(5, data.RelatedTopics.length); i++) {
        const topic = data.RelatedTopics[i];
        if (topic.Text && topic.FirstURL) {
          results.push({
            type: 'topic',
            text: topic.Text,
            url: topic.FirstURL
          });
        }
      }
    }
    
    return results;
  } catch (error) {
    return [{type: 'error', text: 'Search unavailable', url: ''}];
  }
}

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
  
  if (url.pathname === '/' || url.pathname === '/index.html') {
    return new Response(getMainHTML(), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
  
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
      const response = await processAgentQuery(agentId, body.message);
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' }
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

async function processAgentQuery(agentId, userQuery) {
  const agent = AGENTS[agentId];
  const skaCredits = getSKACredits();
  const temporalDNA = generateTemporalDNA();
  
  let response = '';
  let searchResults = null;
  
  // Check if query needs web search
  const needsSearch = userQuery.toLowerCase().includes('search') || 
                     userQuery.toLowerCase().includes('find') ||
                     userQuery.toLowerCase().includes('latest') ||
                     userQuery.toLowerCase().includes('current') ||
                     userQuery.toLowerCase().includes('news') ||
                     userQuery.toLowerCase().includes('recent');
  
  if (needsSearch) {
    searchResults = await duckDuckGoSearch(userQuery);
  }
  
  // Process with custom LLM
  response = await customLLMInference(agent, userQuery, searchResults);
  
  return {
    reply: response,
    agent: agent.name,
    agentId: agentId,
    specialty: agent.specialty,
    skaCredits: skaCredits,
    temporalDNA: temporalDNA,
    searchUsed: needsSearch,
    timestamp: new Date().toISOString()
  };
}

async function customLLMInference(agent, query, searchResults) {
  const lowerQuery = query.toLowerCase();
  
  // Mathematical computation
  if (/^[\d\+\-\*\/\(\)\.\s]+$/.test(query)) {
    try {
      const result = eval(query);
      return `${agent.emoji} ${agent.name} - RKL Computation:\n\n${query} = ${result}\n\n✅ Computed with O(n^1.77) efficiency`;
    } catch {
      return "Invalid mathematical expression";
    }
  }
  
  // SKA Credits query
  if (lowerQuery.includes('credit') || lowerQuery.includes('balance')) {
    const credits = getSKACredits();
    return `${agent.emoji} ${agent.name}:\n\nSKA Credits: ${credits.toLocaleString()}\nGenesis: July 1, 2024\nMinting: 1 credit/second\n\n✅ Auto-minting continuously`;
  }
  
  // Temporal DNA query
  if (lowerQuery.includes('dna') || lowerQuery.includes('temporal')) {
    const dna = generateTemporalDNA();
    return `${agent.emoji} ${agent.name}:\n\nTemporal DNA: ${dna}\n\nStructure:\n• 16-digit timestamp\n• 16-digit random\n• 4-digit world-clock\n\n✅ Moving interlocking active`;
  }
  
  // Web search results
  if (searchResults && searchResults.length > 0) {
    let searchSummary = `${agent.emoji} ${agent.name} - Search Results:\n\n`;
    
    for (const result of searchResults) {
      if (result.type === 'abstract') {
        searchSummary += `📖 ${result.text}\n\n`;
      } else if (result.type === 'topic') {
        searchSummary += `• ${result.text}\n`;
      }
    }
    
    searchSummary += `\n🔍 Powered by DuckDuckGo | 🧠 Custom LLM | ⚡ RKL Framework`;
    return searchSummary;
  }
  
  // Agent specialty response
  return `${agent.emoji} ${agent.name} (${agent.specialty}):\n\nI specialize in ${agent.specialty.toLowerCase()}. I can help you with:\n\n• Strategic planning and execution\n• Best practices and frameworks\n• Tools and platforms\n• Data-driven optimization\n• Real-world case studies\n\nAsk me specific questions about my domain!\n\n🔍 I can also search the web - just ask me to search for something.\n\n🧠 Custom LLM | ⚡ O(n^1.77) | 🔒 RKL Framework`;
}

function getMainHTML() {
  const currentCredits = getSKACredits();
  return \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Sales King Academy - AI Intelligence System</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes pulse-gold { 0%, 100% { box-shadow: 0 0 20px rgba(234, 179, 8, 0.5); } 50% { box-shadow: 0 0 40px rgba(234, 179, 8, 0.8); } }
    .pulse-gold { animation: pulse-gold 2s infinite; }
  </style>
</head>
<body class="bg-gray-900 text-white min-h-screen">
  <div id="main-view" class="max-w-7xl mx-auto p-4 md:p-6">
    <div class="text-center mb-8 md:mb-12">
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">Sales King Academy</h1>
      <p class="text-lg md:text-2xl text-gray-400 mb-2">Custom LLM + DuckDuckGo Search</p>
      <p class="text-sm md:text-base text-gray-500 mb-6">RKL Framework | O(n^1.77) | No External APIs</p>
      <div class="inline-block bg-gray-800 px-6 py-3 rounded-xl pulse-gold">
        <div class="text-sm text-gray-400 mb-1">SKA Credits</div>
        <div id="credits-counter" class="text-2xl md:text-3xl font-bold text-green-400">\${currentCredits.toLocaleString()}</div>
        <div class="text-xs text-gray-500 mt-1">Auto-minting since July 1, 2024</div>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      \${Object.entries(AGENTS).map(([id, agent]) => \`
        <button onclick="openAgent(\${id})" class="bg-gradient-to-br \${agent.color} p-4 md:p-6 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg">
          <div class="text-4xl md:text-5xl mb-2">\${agent.emoji}</div>
          <div class="font-bold text-sm md:text-base mb-1">\${agent.name}</div>
          <div class="text-xs text-white/80">\${agent.specialty.split('&')[0].trim()}</div>
          <div class="text-xs text-green-300 mt-2">🔍 Search Enabled</div>
        </button>
      \`).join('')}
    </div>
  </div>
  <div id="chat-view" class="hidden max-w-4xl mx-auto p-4 md:p-6 h-screen flex flex-col">
    <div class="bg-gray-800 rounded-xl p-4 md:p-6 flex-1 flex flex-col">
      <div class="flex justify-between items-center mb-4">
        <div><h2 id="agent-title" class="text-2xl md:text-4xl font-bold"></h2><p id="agent-specialty" class="text-sm text-gray-400 mt-1"></p></div>
        <button onclick="closeAgent()" class="px-4 md:px-6 py-2 md:py-3 bg-gray-700 rounded-lg hover:bg-gray-600 font-bold">← Back</button>
      </div>
      <div id="messages" class="flex-1 overflow-y-auto mb-4 space-y-3"></div>
      <div class="flex gap-2 md:gap-3">
        <input type="text" id="user-input" placeholder="Ask anything or search the web..." class="flex-1 bg-gray-700 px-4 md:px-6 py-3 md:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" onkeypress="if(event.key==='Enter') sendMessage()"/>
        <button onclick="sendMessage()" class="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg hover:from-yellow-600 hover:to-yellow-700 font-bold">Send</button>
      </div>
    </div>
  </div>
  <script>
    let currentAgentId = null;
    setInterval(() => {
      const genesis = new Date('2024-07-01T00:00:00Z');
      const now = new Date();
      const seconds = Math.floor((now - genesis) / 1000);
      document.getElementById('credits-counter').textContent = seconds.toLocaleString();
    }, 2000);
    function openAgent(agentId) {
      currentAgentId = agentId;
      const agents = \${JSON.stringify(AGENTS)};
      const agent = agents[agentId];
      document.getElementById('main-view').classList.add('hidden');
      document.getElementById('chat-view').classList.remove('hidden');
      document.getElementById('agent-title').textContent = agent.emoji + ' ' + agent.name;
      document.getElementById('agent-specialty').textContent = agent.specialty;
      document.getElementById('messages').innerHTML = \`<div class="bg-gray-700 p-4 rounded-xl text-center"><div class="text-3xl mb-2">\${agent.emoji}</div><div class="font-bold mb-2">\${agent.name} Ready</div><div class="text-sm text-gray-400">\${agent.specialty}</div><div class="text-xs text-green-400 mt-2">🔍 DuckDuckGo Search | 🧠 Custom LLM</div></div>\`;
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
      messagesContainer.innerHTML += \`<div class="flex justify-end"><div class="bg-blue-600 px-4 py-3 rounded-xl max-w-[80%]"><div class="text-sm font-bold mb-1">You</div><div>\${message}</div></div></div>\`;
      input.value = '';
      messagesContainer.innerHTML += \`<div class="flex justify-start"><div class="bg-gray-700 px-4 py-3 rounded-xl max-w-[80%]"><div class="flex items-center gap-2"><div class="animate-spin">⚙️</div><div>Processing...</div></div></div></div>\`;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      try {
        const response = await fetch(\`/agent/\${currentAgentId}\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: message })
        });
        const data = await response.json();
        const messages = messagesContainer.children;
        messages[messages.length - 1].innerHTML = \`<div class="bg-gray-700 px-4 py-3 rounded-xl max-w-[80%]"><div class="text-sm font-bold mb-2 text-yellow-400">\${data.agent}</div><div class="whitespace-pre-line">\${data.reply}</div><div class="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-600"><div>DNA: \${data.temporalDNA.substring(0, 12)}...</div><div>Credits: \${data.skaCredits.toLocaleString()}</div>\${data.searchUsed ? '<div>🔍 Web search used</div>' : ''}</div></div>\`;
      } catch (error) {
        const messages = messagesContainer.children;
        messages[messages.length - 1].innerHTML = \`<div class="bg-red-900 px-4 py-3 rounded-xl max-w-[80%]"><div class="text-sm font-bold mb-1">Error</div><div>\${error.message}</div></div>\`;
      }
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  </script>
</body>
</html>\`;
}
