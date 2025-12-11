const Anthropic = require('@anthropic-ai/sdk');
const anthropic = new Anthropic({apiKey: process.env.ANTHROPIC_API_KEY});

const AGENTS = [
  {id:1,name:'Alex',role:'Lead Generation',level:7,active:true},
  {id:2,name:'Blake',role:'Email Outreach',level:7,active:true},
  {id:3,name:'Cameron',role:'SMS Campaigns',level:6,active:true},
  {id:4,name:'Dana',role:'Cold Calling',level:6,active:true},
  {id:5,name:'Emerson',role:'Social Media',level:8,active:true},
  {id:6,name:'Finley',role:'Content Creation',level:7,active:true},
  {id:7,name:'Gray',role:'Data Analysis',level:9,active:true},
  {id:8,name:'Harper',role:'CRM Management',level:6,active:true},
  {id:9,name:'Indigo',role:'Proposal Writing',level:8,active:true},
  {id:10,name:'Jordan',role:'Contract Negotiation',level:10,active:true},
  {id:11,name:'Kelly',role:'Customer Service',level:5,active:true},
  {id:12,name:'Logan',role:'Market Research',level:7,active:true},
  {id:13,name:'Morgan',role:'Competitive Intel',level:8,active:true},
  {id:14,name:'Noah',role:'Training Development',level:6,active:true},
  {id:15,name:'Oakley',role:'Quality Assurance',level:7,active:true},
  {id:16,name:'Parker',role:'Sales Forecasting',level:8,active:true},
  {id:17,name:'Quinn',role:'Territory Planning',level:7,active:true},
  {id:18,name:'Riley',role:'Partner Relations',level:9,active:true},
  {id:19,name:'Sage',role:'Revenue Operations',level:8,active:true},
  {id:20,name:'Taylor',role:'Performance Analytics',level:10,active:true},
  {id:21,name:'Val',role:'Sales Enablement',level:7,active:true},
  {id:22,name:'Winter',role:'Deal Strategy',level:9,active:true},
  {id:23,name:'Xen',role:'Account Management',level:8,active:true},
  {id:24,name:'Yael',role:'Executive Liaison',level:10,active:true},
  {id:25,name:'Master CEO',role:'Ultimate Authority',level:10,active:true,master:true}
];

async function executeAgent(agentId, task) {
  const agent = AGENTS.find(a => a.id === agentId);
  if (!agent) return {error: 'Agent not found'};
  
  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [{role:'user',content:`You are ${agent.name}, ${agent.role} agent (L${agent.level}). Execute: ${task}`}]
  });
  
  return {agent: agent.name, role: agent.role, result: msg.content[0].text, timestamp: Date.now()};
}

exports.handler = async (event) => {
  const path = event.path.replace('/.netlify/functions/agents_operational', '');
  const body = event.body ? JSON.parse(event.body) : {};
  
  try {
    if (path === '/execute') {
      return {statusCode: 200, body: JSON.stringify(await executeAgent(body.agent_id, body.task))};
    }
    
    if (path === '/list') {
      return {statusCode: 200, body: JSON.stringify({agents: AGENTS, total: 25, active: 25})};
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        system: '25 Agent Autonomous Swarm',
        status: 'OPERATIONAL',
        agents: AGENTS.map(a => ({id:a.id, name:a.name, role:a.role, level:a.level})),
        total: 25,
        active: 25,
        endpoints: {
          execute: 'POST /execute {agent_id, task}',
          list: 'GET /list'
        }
      })
    };
  } catch (e) {
    return {statusCode: 500, body: JSON.stringify({error: e.message})};
  }
};