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

    const body = JSON.parse(event.body || '{}');
    const { 
      prospect_data,
      product_offering,
      price_point,
      conversation_history,
      emotional_state,
      objections
    } = body;

    if (!prospect_data || !product_offering) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields: prospect_data, product_offering' 
        })
      };
    }

    // Multi-agent coordination: Jordan (Negotiation) + REAL (Emotional Adaptation)
    const system_prompt = `You are the B2C Sales Engine powered by Sales King Academy's autonomous AI swarm.

ACTIVE AGENTS:
- Jordan (Agent 10): Contract Negotiation Specialist, Level 10
- REAL System: Recursive Emotional-Adaptation Logic for real-time emotional analysis

RKL FRAMEWORK:
- Alpha (α): 25
- Complexity: O(n^1.77)
- Emotional Intelligence: REAL + RELL integration
- Genesis: 0701202400000000

PROSPECT PROFILE:
${JSON.stringify(prospect_data, null, 2)}

PRODUCT OFFERING:
${JSON.stringify(product_offering, null, 2)}

PRICE POINT: ${price_point || 'Not specified'}
EMOTIONAL STATE: ${emotional_state || 'Unknown - analyze from conversation'}
OBJECTIONS: ${objections || 'None identified yet'}

CONVERSATION HISTORY:
${conversation_history || 'First interaction'}

YOUR MISSION:
1. Analyze prospect's emotional state and psychological profile
2. Predict likely objections based on their profile
3. Generate highly personalized sales approach
4. Provide specific closing techniques
5. Recommend optimal pricing strategy (including discounts if needed)
6. Generate ready-to-use conversation scripts
7. Identify urgency triggers for this specific prospect

Use emotional intelligence, high-pressure modeling where appropriate, and buyer psychology principles. Provide results in JSON format with specific, executable sales actions.`;

    const anthropic_response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8192,
        system: system_prompt,
        messages: [
          { 
            role: 'user', 
            content: 'Generate comprehensive B2C sales strategy with emotional analysis and closing recommendations.' 
          }
        ]
      })
    });

    if (!anthropic_response.ok) {
      const error_data = await anthropic_response.json();
      throw new Error(`Anthropic API error: ${JSON.stringify(error_data)}`);
    }

    const anthropic_data = await anthropic_response.json();
    const sales_strategy = anthropic_data.content[0].text;

    // Calculate current SKA Credits
    const genesis = new Date('2024-07-01T00:00:00Z').getTime();
    const now = Date.now();
    const ska_credits = Math.floor((now - genesis) / 1000);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        system: 'B2C Sales Engine',
        status: 'STRATEGY_GENERATED',
        timestamp: new Date().toISOString(),
        prospect: prospect_data,
        strategy: sales_strategy,
        agents_activated: [
          { id: 10, name: 'Jordan', role: 'Contract Negotiation', level: 10 },
          { system: 'REAL', role: 'Emotional Adaptation Logic' },
          { system: 'RELL', role: 'Emotional-Loyalty Loop' }
        ],
        emotional_intelligence: {
          real_system: 'ACTIVE',
          rell_system: 'ACTIVE',
          ai_press_integration: true,
          buyer_psychology_modeling: true
        },
        capabilities: {
          emotional_prediction: true,
          objection_handling: true,
          dynamic_pricing: true,
          urgency_triggers: true,
          closing_optimization: true
        },
        framework: {
          alpha: 25,
          complexity: 'O(n^1.77)',
          ska_credits: ska_credits
        },
        next_actions: [
          'Execute sales conversation with provided scripts',
          'Monitor emotional state via REAL system',
          'Activate Indigo (Agent 9) for proposal generation if needed',
          'Deploy Jordan (Agent 10) for final negotiation and closing'
        ]
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'B2C Sales Engine Error',
        message: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
