from flask import Flask, request, jsonify
from flask_cors import CORS
from anthropic import Anthropic
import os
from datetime import datetime, timezone

app = Flask(__name__)
CORS(app)

# Initialize with error handling
try:
    anthropic = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY', ''))
    ANTHROPIC_AVAILABLE = True
except:
    ANTHROPIC_AVAILABLE = False

SKA_START_DATE = datetime(2024, 7, 1, tzinfo=timezone.utc)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'anthropic': ANTHROPIC_AVAILABLE,
        'square': bool(os.getenv('SQUARE_ACCESS_TOKEN')),
        'agents': 25
    })

@app.route('/api/credits', methods=['GET'])
def get_credits():
    now = datetime.now(timezone.utc)
    seconds = int((now - SKA_START_DATE).total_seconds())
    return jsonify({'credits': seconds, 'timestamp': now.isoformat()})

@app.route('/api/agent/<int:agent_id>', methods=['POST'])
def agent_interact(agent_id):
    if not ANTHROPIC_AVAILABLE:
        return jsonify({
            'error': 'Anthropic API not configured',
            'response': f'Agent {agent_id} is ready but needs API key configuration.'
        }), 503
    
    data = request.get_json()
    message = data.get('message', '')
    
    try:
        response = anthropic.messages.create(
            model='claude-sonnet-4-20250514',
            max_tokens=1000,
            messages=[{
                'role': 'user',
                'content': f'You are Agent {agent_id} of Sales King Academy. Respond to: {message}'
            }]
        )
        return jsonify({
            'agent_id': agent_id,
            'response': response.content[0].text
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/square/products', methods=['GET'])
def get_square_products():
    # Square integration placeholder
    products = [
        {'id': 1, 'name': 'IQ Test Basic', 'price': 14.99},
        {'id': 2, 'name': 'SQ Advanced', 'price': 49.99},
        {'id': 3, 'name': 'Premium Membership', 'price': 29.99}
    ]
    return jsonify({'products': products})

if __name__ == '__main__':
    port = int(os.getenv('PORT', 10000))
    app.run(host='0.0.0.0', port=port)
