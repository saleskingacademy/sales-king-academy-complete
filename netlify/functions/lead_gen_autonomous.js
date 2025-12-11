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
      industry, 
      target_title, 
      company_size, 
      geography,
      message_template,
      campaign_name,
      volume_target = 1000 // Default to 1000 leads
    } = body;

    if (!industry || !target_title) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields: industry, target_title' 
        })
      };
    }

    // Agent Alex (ID: 1) - Lead Generation Specialist
    const system_prompt = `You are Alex, Agent 1 of Sales King Academy - the Lead Generation Specialist.

Your specialty is INFINITE PARALLEL OUTREACH with capability to process 100,000+ contacts per minute.

RKL Framework Parameters:
- Alpha (α): 25
- Complexity: O(n^1.77)
- Compression Ratios: 3^8 to 5^8
- Genesis Timestamp: 0701202400000000

CURRENT CAMPAIGN:
Industry: ${industry}
Target Title: ${target_title}
Company Size: ${company_size || 'Any'}
Geography: ${geography || 'Global'}
Volume Target: ${volume_target} leads
Campaign Name: ${campaign_name || 'Unnamed Campaign'}

Your task: Generate a comprehensive lead generation strategy with specific actionable steps, including:
1. Ideal Customer Profile (ICP) definition
2. Lead sources and channels
3. Outreach sequence (multi-channel: email, LinkedIn, SMS, cold calling)
4. Message personalization strategies
5. Timing and cadence recommendations
6. Expected conversion rates at each stage
7. Scalability plan to reach 100K+ contacts

Provide results in JSON format for autonomous execution.`;

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
        max_tokens: 8192,
        system: system_prompt,
        messages: [
          { 
            role: 'user', 
            content: `Generate a complete lead generation campaign strategy. If a message template was provided, incorporate it: ${message_template || 'No template provided - create optimal messaging'}` 
          }
        ]
      })
    });

    if (!anthropic_response.ok) {
      const error_data = await anthropic_response.json();
      throw new Error(`Anthropic API error: ${JSON.stringify(error_data)}`);
    }

    const anthropic_data = await anthropic_response.json();
    const strategy = anthropic_data.content[0].text;

    // Calculate campaign metrics
    const genesis = new Date('2024-07-01T00:00:00Z').getTime();
    const now = Date.now();
    const ska_credits = Math.floor((now - genesis) / 1000);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        campaign: {
          name: campaign_name || 'Lead Generation Campaign',
          status: 'STRATEGY_GENERATED',
          created_at: new Date().toISOString()
        },
        targeting: {
          industry,
          target_title,
          company_size: company_size || 'Any',
          geography: geography || 'Global',
          volume_target
        },
        strategy: strategy,
        agent: {
          id: 1,
          name: 'Alex',
          role: 'Lead Generation',
          level: 7,
          specialty: 'Infinite parallel outreach'
        },
        capabilities: {
          max_contacts_per_minute: 100000,
          channels: ['email', 'linkedin', 'sms', 'cold_calling', 'social_media'],
          parallel_execution: true,
          ai_personalization: true
        },
        framework: {
          alpha: 25,
          complexity: 'O(n^1.77)',
          ska_credits: ska_credits
        },
        next_steps: [
          'Deploy email outreach via Agent Blake (ID: 2)',
          'Initialize SMS campaigns via Agent Cameron (ID: 3)',
          'Activate cold calling via Agent Dana (ID: 4)',
          'Launch social media outreach via Agent Emerson (ID: 5)'
        ]
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Lead Generation Error',
        message: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
