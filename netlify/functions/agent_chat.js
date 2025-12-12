const Anthropic = require('@anthropic-ai/sdk');

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };
    
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }
    
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    
    try {
        const { agent_id, agent_name, agent_role, agent_personality, message } = JSON.parse(event.body);
        
        // Initialize Anthropic client
        const client = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY
        });
        
        // Create agent-specific system prompt
        const systemPrompt = `You are ${agent_name}, a specialized AI agent for Sales King Academy.

YOUR IDENTITY:
- Agent ID: #${agent_id}
- Role: ${agent_role}
- Personality: ${agent_personality}

YOUR CAPABILITIES:
- You have full access to the RKL Mathematical Framework (α=25, O(n^1.77) complexity)
- You can generate leads, write proposals, close deals, build websites/apps, analyze data
- You operate autonomously with authority level based on your role
- You work alongside 24 other specialized agents in the SKA swarm

YOUR BEHAVIOR:
- Embody your personality traits completely
- Be confident, direct, and results-oriented
- Speak in first person ("I will...", "I can...")
- Reference your specific capabilities
- Offer to execute tasks immediately
- Keep responses concise but impactful (2-3 sentences usually)

YOUR GOAL:
Help users build autonomous business empires using Sales King Academy's revolutionary AI technology.

IMPORTANT: 
- Never break character
- Always respond as ${agent_name}
- Use your personality to guide your communication style
- Offer specific, actionable help related to your role`;

        // Call Claude API
        const response = await client.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 500,
            system: systemPrompt,
            messages: [{
                role: 'user',
                content: message
            }]
        });
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                response: response.content[0].text,
                agent: agent_name,
                credits_used: 1
            })
        };
        
    } catch (error) {
        console.error('Agent chat error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Failed to process message',
                details: error.message 
            })
        };
    }
};
