// AUTHENTICATION SYSTEM
const crypto = require('crypto');
exports.handler = async (event) => {
  const headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'};
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  try {
    const { action, email, password, token } = JSON.parse(event.body);

    if (action === 'register') {
      const userId = crypto.randomBytes(16).toString('hex');
      const hash = crypto.createHash('sha256').update(password).digest('hex');
      const authToken = crypto.randomBytes(32).toString('hex');
      
      return { statusCode: 200, headers, body: JSON.stringify({
        success: true,
        userId,
        token: authToken,
        message: 'Registration successful'
      })};
    }

    if (action === 'login') {
      const authToken = crypto.randomBytes(32).toString('hex');
      return { statusCode: 200, headers, body: JSON.stringify({
        success: true,
        token: authToken,
        user: { email }
      })};
    }

    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid action' }) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
