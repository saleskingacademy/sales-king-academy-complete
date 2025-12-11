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
      skill_level = 'beginner', // beginner, intermediate, advanced, expert
      focus_area,
      duration_weeks = 12,
      learning_objectives,
      client_type = 'individual' // individual, corporate, enterprise
    } = body;

    if (!industry || !focus_area) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields: industry, focus_area' 
        })
      };
    }

    // Agent Noah (ID: 14) - Training Development Specialist, Level 6
    const system_prompt = `You are Noah, Agent 14 of Sales King Academy - Training Development Specialist.

Your specialty is CURRICULUM GENERATION with psychological sales system integration and objection modeling.

RKL FRAMEWORK:
- Alpha (α): 25
- Complexity: O(n^1.77)
- Multi-industry curriculum database: ACTIVE
- Industry-specific modules: ENABLED
- Enterprise-level training automation: OPERATIONAL
- Genesis: 0701202400000000

TRAINING PARAMETERS:
Industry: ${industry}
Skill Level: ${skill_level}
Focus Area: ${focus_area}
Duration: ${duration_weeks} weeks
Client Type: ${client_type}

LEARNING OBJECTIVES:
${learning_objectives || 'Standard objectives for skill level and industry'}

YOUR MISSION:
Generate a comprehensive training curriculum that includes:

1. PROGRAM OVERVIEW
   - Training philosophy
   - Success metrics
   - Certification path

2. WEEK-BY-WEEK CURRICULUM (${duration_weeks} weeks)
   - Module topics
   - Learning objectives per module
   - Practical exercises
   - Assessment methods

3. PSYCHOLOGICAL SALES SYSTEM INTEGRATION
   - Emotional intelligence training
   - Buyer psychology principles
   - Objection handling frameworks
   - Closing techniques

4. INDUSTRY-SPECIFIC MODULES
   - Market dynamics
   - Competitive positioning
   - Industry best practices
   - Regulatory compliance

5. PRACTICAL APPLICATION
   - Role-playing scenarios
   - Real-world case studies
   - Sales scripts and templates
   - Performance tracking

6. ASSESSMENT & CERTIFICATION
   - Knowledge checks
   - Practical evaluations
   - Final certification requirements
   - Continuing education paths

Provide comprehensive curriculum suitable for ${client_type} training at ${skill_level} level.`;

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
            content: `Generate complete ${duration_weeks}-week training curriculum for ${skill_level} level in ${industry} with focus on ${focus_area}.` 
          }
        ]
      })
    });

    if (!anthropic_response.ok) {
      const error_data = await anthropic_response.json();
      throw new Error(`Anthropic API error: ${JSON.stringify(error_data)}`);
    }

    const anthropic_data = await anthropic_response.json();
    const curriculum = anthropic_data.content[0].text;

    // Calculate SKA Credits
    const genesis = new Date('2024-07-01T00:00:00Z').getTime();
    const now = Date.now();
    const ska_credits = Math.floor((now - genesis) / 1000);

    // Generate curriculum ID
    const curriculum_id = `CURR_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Pricing based on client type and duration
    const pricing_tiers = {
      individual: { base: 5497, per_week: 400 },
      corporate: { base: 25000, per_week: 1800 },
      enterprise: { base: 97000, per_week: 7000 }
    };

    const tier = pricing_tiers[client_type] || pricing_tiers.individual;
    const total_price = tier.base + (tier.per_week * duration_weeks);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        system: 'Sales King Academy Training Engine',
        status: 'CURRICULUM_GENERATED',
        timestamp: new Date().toISOString(),
        curriculum: {
          id: curriculum_id,
          industry: industry,
          focus_area: focus_area,
          skill_level: skill_level,
          duration_weeks: duration_weeks,
          client_type: client_type,
          content: curriculum,
          modules_count: duration_weeks,
          total_hours: duration_weeks * 10 // Est. 10 hours per week
        },
        agent: {
          id: 14,
          name: 'Noah',
          role: 'Training Development',
          level: 6,
          specialty: 'Curriculum generation'
        },
        pricing: {
          client_type: client_type,
          total_price: total_price,
          currency: 'USD',
          payment_options: ['full_upfront', 'installments', 'subscription']
        },
        features: {
          psychological_sales_system: true,
          objection_modeling: true,
          industry_specific: true,
          certification_included: true,
          lifetime_access: true
        },
        framework: {
          alpha: 25,
          complexity: 'O(n^1.77)',
          ska_credits: ska_credits
        },
        competitive_positioning: {
          vs_jordan_stupar: 'SKA training: $5,497+ vs Stupar: $3,500',
          vs_harvard_mit: 'SKA enterprise: $97K+ vs Harvard/MIT: $75K-150K',
          value_proposition: 'AI-powered, industry-specific, immediate ROI'
        },
        next_actions: [
          'Send curriculum to prospect via Blake (Agent 2)',
          'Schedule consultation call via Dana (Agent 4)',
          'Generate proposal via Indigo (Agent 9)',
          'Process payment via Square integration'
        ]
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Training Engine Error',
        message: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
