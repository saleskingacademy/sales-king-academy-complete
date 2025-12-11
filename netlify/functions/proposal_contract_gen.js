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
      client_name,
      client_company,
      service_type,
      scope_of_work,
      pricing,
      timeline,
      deliverables,
      payment_terms,
      document_type = 'proposal' // 'proposal', 'contract', 'sow', 'msa'
    } = body;

    if (!client_name || !service_type) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields: client_name, service_type' 
        })
      };
    }

    // Agent Indigo (ID: 9) - Proposal Writing Specialist, Level 8
    const system_prompt = `You are Indigo, Agent 9 of Sales King Academy - Proposal Writing Specialist.

Your specialty is AUTO-GENERATED CONTRACTS and PROPOSALS with compliance-aware formatting.

RKL FRAMEWORK:
- Alpha (α): 25
- Complexity: O(n^1.77)
- Legal compliance engine: ACTIVE
- Automated formatting: ENABLED
- Genesis: 0701202400000000

CLIENT INFORMATION:
Name: ${client_name}
Company: ${client_company || 'Individual'}
Service Type: ${service_type}

SCOPE OF WORK:
${scope_of_work || 'To be defined based on service type'}

PRICING:
${pricing ? JSON.stringify(pricing) : 'To be determined'}

TIMELINE:
${timeline || 'To be negotiated'}

DELIVERABLES:
${deliverables ? JSON.stringify(deliverables) : 'Standard deliverables for service type'}

PAYMENT TERMS:
${payment_terms || 'Standard Net 30 terms'}

DOCUMENT TYPE: ${document_type.toUpperCase()}

YOUR MISSION:
Generate a complete, professional-grade ${document_type} that includes:

1. EXECUTIVE SUMMARY
   - Client needs assessment
   - Proposed solution overview
   - Value proposition

2. DETAILED SCOPE
   - Specific services/deliverables
   - Timeline and milestones
   - Success criteria

3. PRICING & TERMS
   - Itemized pricing breakdown
   - Payment schedule
   - Terms and conditions

4. LEGAL PROVISIONS
   - Liability limitations
   - Intellectual property rights
   - Termination clauses
   - Dispute resolution

5. SIGNATURES & ACCEPTANCE
   - Acceptance terms
   - Signature blocks

Format as a complete, ready-to-send professional document. Use formal business language with precise legal terminology where appropriate. Include all necessary legal protections for Sales King Academy LLC.`;

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
            content: `Generate complete ${document_type} for ${client_name} regarding ${service_type} services.` 
          }
        ]
      })
    });

    if (!anthropic_response.ok) {
      const error_data = await anthropic_response.json();
      throw new Error(`Anthropic API error: ${JSON.stringify(error_data)}`);
    }

    const anthropic_data = await anthropic_response.json();
    const document_content = anthropic_data.content[0].text;

    // Calculate SKA Credits
    const genesis = new Date('2024-07-01T00:00:00Z').getTime();
    const now = Date.now();
    const ska_credits = Math.floor((now - genesis) / 1000);

    // Generate document ID
    const doc_id = `DOC_${document_type.toUpperCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        system: 'Proposal & Contract Generation Engine',
        status: 'DOCUMENT_GENERATED',
        timestamp: new Date().toISOString(),
        document: {
          id: doc_id,
          type: document_type,
          client: {
            name: client_name,
            company: client_company
          },
          service_type: service_type,
          content: document_content,
          word_count: document_content.split(' ').length,
          generated_by: 'Indigo - Agent 9'
        },
        agent: {
          id: 9,
          name: 'Indigo',
          role: 'Proposal Writing',
          level: 8,
          specialty: 'Auto-generated contracts'
        },
        compliance: {
          legal_review: 'AI_GENERATED',
          ip_protection: 'INCLUDED',
          liability_limits: 'STANDARD',
          termination_clauses: 'INCLUDED'
        },
        framework: {
          alpha: 25,
          complexity: 'O(n^1.77)',
          ska_credits: ska_credits
        },
        next_actions: [
          'Send document to client for review',
          'Activate Jordan (Agent 10) for negotiation if changes needed',
          'Process signature via automated contract system',
          'Trigger payment collection via Square integration'
        ]
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Proposal Generation Error',
        message: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
