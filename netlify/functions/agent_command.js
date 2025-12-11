exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
    
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    // Parse request
    const body = JSON.parse(event.body || '{}');
    const { agent_id, command, context, task_type } = body;

    if (!agent_id || !command) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields: agent_id, command' 
        })
      };
    }

    // Agent configuration (all 25 agents)
    const agents = {
      1: { name: "Alex", role: "Lead Generation", level: 7, specialty: "Infinite parallel outreach" },
      2: { name: "Blake", role: "Email Outreach", level: 7, specialty: "Multi-channel campaigns" },
      3: { name: "Cameron", role: "SMS Campaigns", level: 6, specialty: "Real-time SMS automation" },
      4: { name: "Dana", role: "Cold Calling", level: 6, specialty: "VoIP integration" },
      5: { name: "Emerson", role: "Social Media", level: 8, specialty: "Cross-platform automation" },
      6: { name: "Finley", role: "Content Creation", level: 7, specialty: "Websites, apps, blogs" },
      7: { name: "Gray", role: "Data Analysis", level: 9, specialty: "Predictive analytics" },
      8: { name: "Harper", role: "CRM Management", level: 6, specialty: "Contact sync" },
      9: { name: "Indigo", role: "Proposal Writing", level: 8, specialty: "Auto-generated contracts" },
      10: { name: "Jordan", role: "Contract Negotiation", level: 10, specialty: "AI-driven negotiations" },
      11: { name: "Kelly", role: "Customer Service", level: 5, specialty: "24/7 support" },
      12: { name: "Logan", role: "Market Research", level: 7, specialty: "Competitive intelligence" },
      13: { name: "Morgan", role: "Competitive Intel", level: 8, specialty: "Real-time market analysis" },
      14: { name: "Noah", role: "Training Development", level: 6, specialty: "Curriculum generation" },
      15: { name: "Oakley", role: "Quality Assurance", level: 7, specialty: "Output validation" },
      16: { name: "Parker", role: "Sales Forecasting", level: 8, specialty: "Revenue prediction" },
      17: { name: "Quinn", role: "Territory Planning", level: 7, specialty: "Geographic optimization" },
      18: { name: "Riley", role: "Partner Relations", level: 9, specialty: "Network mapping" },
      19: { name: "Sage", role: "Revenue Operations", level: 8, specialty: "Deal optimization" },
      20: { name: "Taylor", role: "Performance Analytics", level: 10, specialty: "Real-time dashboards" },
      21: { name: "Val", role: "Sales Enablement", level: 7, specialty: "Training materials" },
      22: { name: "Winter", role: "Deal Strategy", level: 9, specialty: "Complex deal structuring" },
      23: { name: "Xen", role: "Account Management", level: 8, specialty: "Retention optimization" },
      24: { name: "Yael", role: "Executive Liaison", level: 10, specialty: "C-suite communication" },
      25: { name: "Master CEO", role: "Ultimate Authority", level: 10, specialty: "Controls all 24 agents" }
    };

    const agent = agents[agent_id];
    if (!agent) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Agent not found' })
      };
    }

    // Build agent-specific system prompt
    const system_prompt = `You are ${agent.name}, Agent ${agent_id} of the Sales King Academy autonomous agent swarm.

Role: ${agent.role} (Level ${agent.level})
Specialty: ${agent.specialty}

You operate within the RKL Mathematical Framework:
- Alpha parameter (α): 25
- Complexity: O(n^1.77) polynomial
- Compression: 3^8 to 5^8 ratios
- Genesis timestamp: July 1, 2024 00:00:00 UTC

Your mission is to execute commands autonomously with maximum efficiency and precision. You have access to all Sales King Academy systems and operate with level ${agent.level} authority.

Current task type: ${task_type || 'general'}
Context: ${context || 'No additional context provided'}

Execute the following command and provide actionable results.`;

    // Call Anthropic API
    const anthropic_response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: system_prompt,
        messages: [
          { role: 'user', content: command }
        ]
      })
    });

    if (!anthropic_response.ok) {
      const error_data = await anthropic_response.json();
      throw new Error(`Anthropic API error: ${JSON.stringify(error_data)}`);
    }

    const anthropic_data = await anthropic_response.json();
    const agent_response = anthropic_data.content[0].text;

    // Return agent execution result
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        agent: {
          id: agent_id,
          name: agent.name,
          role: agent.role,
          level: agent.level
        },
        command: command,
        response: agent_response,
        executed_at: new Date().toISOString(),
        status: 'completed',
        framework: {
          alpha: 25,
          complexity: 'O(n^1.77)'
        }
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Agent Command Error',
        message: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
