# Sales King Academy - Development Roadmap (v2.1)

This document outlines the planned enhancements for the Sales King Academy platform, focusing on increasing AI intelligence, system autonomy, and functional depth.

## 1. AI Intelligence Enhancements

### 1.1 Multi-Agent Orchestration (The "Master CEO" Logic)
- **Current:** Agents are invoked individually via the UI.
- **Enhancement:** Implement a "Master CEO" mode where one agent can delegate tasks to other specialized agents.
- **Action:** Add a `delegate` tool to the Master CEO agent that can trigger other agent endpoints.

### 1.2 Long-Term Memory (Context Persistence)
- **Current:** Conversation history is passed manually in the request (up to 10 messages).
- **Enhancement:** Use Cloudflare KV or D1 to store and retrieve long-term user preferences and project context.
- **Action:** Implement a `MemoryManager` class to handle context retrieval based on user ID.

### 1.3 RKL Framework "Realization"
- **Current:** RKL is a conceptual class with placeholder logic.
- **Enhancement:** Implement actual heuristic algorithms or complex decision-making trees within the RKL framework to simulate "quantum-classical balance."
- **Action:** Expand `RKLFramework.solve()` with more sophisticated logic.

## 2. System Functionality Enhancements

### 2.1 Real-Time Web Intelligence
- **Current:** Basic DuckDuckGo search integration.
- **Enhancement:** Implement a more robust "Research" tool that can scrape and summarize specific URLs found in search results.
- **Action:** Add a `browseUrl` function to the backend.

### 2.2 Automated Task Execution
- **Current:** System is reactive (request-response).
- **Enhancement:** Implement a "Task Queue" using Cloudflare Queues or Scheduled Tasks for background processing (e.g., daily market research).
- **Action:** Add a `scheduled` handler to `worker.js`.

### 2.3 Enhanced Security & Authentication
- **Current:** JWT is mentioned but implementation in `worker.js` is minimal.
- **Enhancement:** Full implementation of JWT sign/verify and user session management.
- **Action:** Integrate a robust JWT library and session store.

## 3. Frontend & UX Enhancements

### 3.1 Dashboard Intelligence
- **Current:** Static counters and modals.
- **Enhancement:** Real-time data visualizations of "AI Activity" and "Credit Minting."
- **Action:** Integrate a lightweight charting library (e.g., Chart.js) into the frontend.

### 3.2 Agent "Personalities"
- **Current:** Generic system prompts.
- **Enhancement:** Deepen the system prompts with specific "Knowledge Bases" for each of the 25 agents.
- **Action:** Create an `AGENT_KNOWLEDGE` object to store detailed personas.

---

**Status:** Phase 2 (Planning) Complete. Proceeding to Phase 3 (Implementation).
