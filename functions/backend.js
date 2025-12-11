const axios = require('axios');

exports.handler = async (event) => {
  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  const SQUARE_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
  
  // SKA Credits calculation
  const genesis = new Date('2024-07-01T00:00:00Z');
  const now = new Date();
  const secondsSinceGenesis = Math.floor((now - genesis) / 1000);
  const skaCredits = secondsSinceGenesis;
  
  const path = event.path.replace('/.netlify/functions/backend', '');
  
  if (path === '/health') {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'operational',
        skaCredits,
        agents: 25,
        rkl_alpha: 25,
        complexity: 'O(n^1.77)',
        genesis: '0701202400000000'
      })
    };
  }
  
  if (path === '/agents/execute') {
    const body = JSON.parse(event.body || '{}');
    // Execute agent task using Anthropic
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: body.task || 'Generate lead' }]
    }, {
      headers: { 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' }
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ result: response.data.content[0].text })
    };
  }
  
  return { statusCode: 404, body: 'Not found' };
};