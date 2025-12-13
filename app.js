/* Sales King Academy — 25 Agent Frontend (Backend-optional)
   - 25 agent cards
   - Dedicated full-screen interface per agent
   - Per-agent chat history saved to localStorage
   - Attempts backend call; falls back to offline reply if backend unavailable
*/

const DEFAULT_API_BASE = ""; // leave blank for auto; or set e.g. "https://your-backend.onrender.com"
const API_TIMEOUT_MS = 6500;

// You can rename/adjust these anytime.
const AGENTS = [
  { key:"agent1",  id:1,  name:"Executive Orchestrator", role:"Global control, prioritization, and system execution.", authority:10, status:"active" },
  { key:"agent2",  id:2,  name:"Finance Master", role:"Revenue strategy, analytics, pricing, cashflow execution.", authority:9, status:"active" },
  { key:"agent3",  id:3,  name:"Sales Commander", role:"Outbound/inbound sales, closing, objection handling, scripts.", authority:9, status:"active" },
  { key:"agent4",  id:4,  name:"Marketing Strategist", role:"Ads, funnels, content, positioning, conversion optimization.", authority:8, status:"active" },
  { key:"agent5",  id:5,  name:"Customer Success Lead", role:"Retention, onboarding, support systems, satisfaction metrics.", authority:8, status:"active" },
  { key:"agent6",  id:6,  name:"Product Architect", role:"Platform features, roadmap, UX decisions, integration plan.", authority:9, status:"active" },
  { key:"agent7",  id:7,  name:"Backend Engineer", role:"API design, services, reliability, deployment readiness.", authority:9, status:"active" },
  { key:"agent8",  id:8,  name:"Frontend Engineer", role:"UI, performance, mobile-first refinement, accessibility.", authority:9, status:"active" },
  { key:"agent9",  id:9,  name:"DevOps Operator", role:"Deploy pipelines, env vars, logs, uptime, incident response.", authority:9, status:"active" },
  { key:"agent10", id:10, name:"Security Fortress", role:"Threat modeling, hardening, auth, rate limiting, audits.", authority:10, status:"active" },
  { key:"agent11", id:11, name:"Legal & Compliance", role:"Policies, compliance posture, contracts, risk mitigation.", authority:9, status:"active" },
  { key:"agent12", id:12, name:"Partnership Director", role:"Affiliates, alliances, reseller programs, territory strategy.", authority:8, status:"active" },
  { key:"agent13", id:13, name:"Ops Manager", role:"SOPs, processes, team workflows, execution checklists.", authority:8, status:"active" },
  { key:"agent14", id:14, name:"Recruiting & HR", role:"Hiring plans, role definitions, screening workflows.", authority:7, status:"active" },
  { key:"agent15", id:15, name:"Data Analyst", role:"KPIs, dashboards, attribution logic, performance reporting.", authority:8, status:"active" },
  { key:"agent16", id:16, name:"Content Engine", role:"Course copy, landing pages, email sequences, scripts.", authority:8, status:"active" },
  { key:"agent17", id:17, name:"Automation Builder", role:"Workflows, integrations, bots, triggers, system glue.", authority:9, status:"active" },
  { key:"agent18", id:18, name:"Payments & Billing", role:"Square/Stripe flows, checkout, receipts, subscription logic.", authority:8, status:"active" },
  { key:"agent19", id:19, name:"QA & Testing", role:"Regression tests, acceptance checks, release readiness.", authority:8, status:"active" },
  { key:"agent20", id:20, name:"Documentation Lead", role:"README, runbooks, setup docs, customer instructions.", authority:7, status:"active" },
  { key:"agent21", id:21, name:"Brand Director", role:"Brand voice, design system, identity consistency.", authority:7, status:"active" },
  { key:"agent22", id:22, name:"Education Designer", role:"Curriculum structure, learning outcomes, assessments.", authority:8, status:"active" },
  { key:"agent23", id:23, name:"Research & R&D", role:"Innovation mapping, new capabilities, future modules.", authority:8, status:"active" },
  { key:"agent24", id:24, name:"Real Estate Ops", role:"Lead screening, deal pipeline, as-is acquisition workflows.", authority:8, status:"active" },
  { key:"agent25", id:25, name:"Investor Relations", role:"Pitch readiness, partner comms, evidence pack structure.", authority:8, status:"active" },
];

const els = {
  grid: document.getElementById("grid"),
  search: document.getElementById("search"),
  clearLocal: document.getElementById("clearLocal"),
  apiDot: document.getElementById("apiDot"),
  apiText: document.getElementById("apiText"),

  screen: document.getElementById("screen"),
  backBtn: document.getElementById("backBtn"),
  agentName: document.getElementById("agentName"),
  agentRole: document.getElementById("agentRole"),
  agentDot: document.getElementById("agentDot"),
  agentStatus: document.getElementById("agentStatus"),
  apiBaseView: document.getElementById("apiBaseView"),
  chatLog: document.getElementById("chatLog"),
  message: document.getElementById("message"),
  sendBtn: document.getElementById("sendBtn"),
};

let currentAgent = null;
let apiBase = DEFAULT_API_BASE;

function storageKeyFor(agentKey){ return `ska_chat_${agentKey}`; }

function safeJsonParse(str, fallback){
  try { return JSON.parse(str); } catch { return fallback; }
}

function nowIso(){ return new Date().toISOString(); }

function loadChat(agentKey){
  return safeJsonParse(localStorage.getItem(storageKeyFor(agentKey)) || "[]", []);
}

function saveChat(agentKey, msgs){
  localStorage.setItem(storageKeyFor(agentKey), JSON.stringify(msgs.slice(-200))); // cap
}

function addMsg(agentKey, who, text){
  const msgs = loadChat(agentKey);
  msgs.push({ who, text, at: nowIso() });
  saveChat(agentKey, msgs);
  return msgs;
}

function clearAllChats(){
  AGENTS.forEach(a => localStorage.removeItem(storageKeyFor(a.key)));
}

function escapeHtml(s){
  return (s||"").replace(/[&<>"']/g, (c)=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[c]));
}

function renderGrid(list){
  els.grid.innerHTML = "";
  list.forEach(agent => {
    const card = document.createElement("div");
    card.className = "card";

    const statusClass = agent.status === "active" ? "ok" : (agent.status === "down" ? "bad" : "");
    card.innerHTML = `
      <div class="row">
        <div>
          <div class="name">${escapeHtml(agent.name)}</div>
          <div class="role">${escapeHtml(agent.role)}</div>
        </div>
        <div class="pill"><span class="miniDot ${statusClass}"></span>${escapeHtml(agent.status.toUpperCase())}</div>
      </div>
      <div class="meta">
        <div class="pill">Agent ID: <b style="margin-left:6px">${agent.id}</b></div>
        <div class="pill">Authority: <b style="margin-left:6px">${agent.authority}</b></div>
      </div>
      <div class="cta">
        <button class="btn" data-open="${agent.key}">Open Interface</button>
      </div>
      <div class="small">Dedicated chat + local history. Will call backend when online.</div>
    `;

    card.querySelector("[data-open]")?.addEventListener("click", () => openAgent(agent.key));
    els.grid.appendChild(card);
  });
}

function setApiStatus(state, text){
  els.apiDot.classList.remove("ok","bad");
  if(state === "ok") els.apiDot.classList.add("ok");
  if(state === "bad") els.apiDot.classList.add("bad");
  els.apiText.textContent = text;
}

async function probeApi(){
  // If user didn't set apiBase, try to infer from window config later (you can hardcode)
  if(!apiBase){
    setApiStatus("bad", "API not set (offline mode)");
    return false;
  }

  try{
    const r = await fetchWithTimeout(`${apiBase}/health`, { method:"GET" });
    if(r.ok){
      setApiStatus("ok", "API online");
      return true;
    }
    setApiStatus("bad", `API error (${r.status})`);
    return false;
  }catch{
    setApiStatus("bad", "API offline (using local mode)");
    return false;
  }
}

function getApiBase(){
  // Priority: localStorage override -> DEFAULT_API_BASE -> none
  const saved = localStorage.getItem("ska_api_base") || "";
  return (saved || DEFAULT_API_BASE || "").trim().replace(/\/+$/,"");
}

function setApiBase(url){
  const clean = (url||"").trim().replace(/\/+$/,"");
  apiBase = clean;
  localStorage.setItem("ska_api_base", clean);
  els.apiBaseView.textContent = clean ? clean : "offline";
  probeApi();
}

function showScreen(on){
  els.screen.classList.toggle("on", !!on);
}

function renderChat(agentKey){
  const msgs = loadChat(agentKey);
  els.chatLog.innerHTML = msgs.map(m => {
    const isUser = m.who === "user";
    return `
      <div class="msg">
        <div class="who">${escapeHtml(isUser ? "You" : "Agent")} • ${escapeHtml(new Date(m.at).toLocaleString())}</div>
        <div class="bubble ${isUser ? "user":""}">${escapeHtml(m.text)}</div>
      </div>
    `;
  }).join("");
  els.chatLog.scrollTop = els.chatLog.scrollHeight;
}

function openAgent(agentKey){
  const agent = AGENTS.find(a => a.key === agentKey);
  if(!agent) return;

  currentAgent = agent;
  els.agentName.textContent = `${agent.name} (ID ${agent.id})`;
  els.agentRole.textContent = agent.role;

  els.agentDot.classList.remove("ok","bad");
  els.agentDot.classList.add(agent.status === "active" ? "ok" : "bad");
  els.agentStatus.textContent = agent.status === "active" ? "READY" : "NOT READY";

  renderChat(agent.key);
  showScreen(true);

  // set hash route for direct linking
  location.hash = `agent=${encodeURIComponent(agent.key)}`;
  els.message.focus();
}

function closeAgent(){
  showScreen(false);
  currentAgent = null;
  location.hash = "";
}

function offlineReply(agent, userText){
  // Simple local fallback while backend is offline.
  // Keep it deterministic, useful, and short.
  return [
    `OFFLINE MODE — ${agent.name}`,
    ``,
    `I cannot reach the backend API right now, so I'm responding locally.`,
    `Message received:`,
    `- ${userText}`,
    ``,
    `Next steps (frontend-ready):`,
    `1) Keep building UI flows (agent screens, routing, storage, prompts).`,
    `2) When backend is ready, set API base URL and this will switch to live calls automatically.`,
    `3) If you tell me the exact API routes you want, I’ll wire them in.`,
  ].join("\n");
}

async function fetchWithTimeout(url, options={}){
  const controller = new AbortController();
  const t = setTimeout(()=>controller.abort(), API_TIMEOUT_MS);
  try{
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(t);
  }
}

async function sendMessage(){
  if(!currentAgent) return;
  const text = (els.message.value || "").trim();
  if(!text) return;

  els.message.value = "";
  addMsg(currentAgent.key, "user", text);
  renderChat(currentAgent.key);

  // Try backend if configured; otherwise offline.
  const base = getApiBase();
  apiBase = base;
  els.apiBaseView.textContent = base ? base : "offline";

  if(!base){
    addMsg(currentAgent.key, "agent", offlineReply(currentAgent, text));
    renderChat(currentAgent.key);
    return;
  }

  // Expected endpoint convention (you can change later):
  // POST {API_BASE}/agents/{agentKey}/interact  or /agents/{id}/interact
  const url = `${base}/agents/${encodeURIComponent(currentAgent.key)}/interact`;

  try{
    const res = await fetchWithTimeout(url, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        agent_key: currentAgent.key,
        agent_id: currentAgent.id,
        message: text,
        ts: nowIso(),
      })
    });

    if(!res.ok){
      const bodyText = await res.text().catch(()=> "");
      addMsg(currentAgent.key, "agent", `Backend responded with error (${res.status}).\n\n${bodyText || "No details."}`);
      renderChat(currentAgent.key);
      return;
    }

    const data = await res.json().catch(()=>null);
    const reply =
      (data && (data.reply || data.message || data.output)) ?
        (data.reply || data.message || data.output) :
        `Backend OK, but no "reply/message/output" field returned.\nRaw: ${JSON.stringify(data)}`;

    addMsg(currentAgent.key, "agent", reply);
    renderChat(currentAgent.key);
    setApiStatus("ok", "API online");
  }catch(err){
    addMsg(currentAgent.key, "agent", offlineReply(currentAgent, text));
    renderChat(currentAgent.key);
    setApiStatus("bad", "API offline (using local mode)");
  }
}

function applySearch(){
  const q = (els.search.value||"").trim().toLowerCase();
  if(!q){
    renderGrid(AGENTS);
    return;
  }
  const filtered = AGENTS.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.role.toLowerCase().includes(q) ||
    String(a.id) === q ||
    a.key.toLowerCase().includes(q)
  );
  renderGrid(filtered);
}

function wireQuickPrompts(){
  document.querySelectorAll("[data-quick]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const txt = btn.getAttribute("data-quick") || "";
      els.message.value = txt;
      els.message.focus();
    });
  });
}

function restoreFromHash(){
  const h = (location.hash || "").replace(/^#/,"");
  if(!h) return;
  const m = h.match(/^agent=(.+)$/);
  if(!m) return;
  const key = decodeURIComponent(m[1]);
  const found = AGENTS.find(a => a.key === key);
  if(found) openAgent(found.key);
}

function init(){
  // API base can be set later in localStorage:
  // localStorage.setItem("ska_api_base", "https://your-backend.onrender.com")
  setApiBase(getApiBase());

  renderGrid(AGENTS);

  els.search.addEventListener("input", applySearch);

  els.clearLocal.addEventListener("click", ()=>{
    if(confirm("Clear ALL local agent chat histories on this device?")){
      clearAllChats();
      if(currentAgent) renderChat(currentAgent.key);
      alert("Local histories cleared.");
    }
  });

  els.backBtn.addEventListener("click", closeAgent);
  els.sendBtn.addEventListener("click", sendMessage);

  els.message.addEventListener("keydown", (e)=>{
    if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      sendMessage();
    }
  });

  window.addEventListener("hashchange", ()=>{
    if(!location.hash) closeAgent();
    else restoreFromHash();
  });

  wireQuickPrompts();
  restoreFromHash();
  probeApi();
}

init();
