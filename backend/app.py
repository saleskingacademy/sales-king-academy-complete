"""
SALES KING ACADEMY - PRODUCTION BACKEND
Flask API for Render deployment
Connects to Netlify frontend
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import anthropic
import json
from datetime import datetime, timezone
import hashlib
import time

app = Flask(__name__)

# CORS configuration - Allow Netlify frontend
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://saleskingacademy.com",
            "https://*.netlify.app",
            "http://localhost:*"
        ]
    }
})

# Environment variables
ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY')
SQUARE_ACCESS_TOKEN = os.environ.get('SQUARE_ACCESS_TOKEN')
SQUARE_LOCATION_ID = os.environ.get('SQUARE_LOCATION_ID')
SKA_GENESIS_TIMESTAMP = "0701202400000000"  # July 1, 2024
ALPHA_PARAMETER = 25

# Initialize Anthropic client
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

# 25 Agent Configurations
AGENTS = {
    1: {"name": "Alex", "role": "Lead Generation Master", "authority": 10},
    2: {"name": "Blake", "role": "Email Campaign Specialist", "authority": 9},
    3: {"name": "Cameron", "role": "SMS Automation Expert", "authority": 8},
    4: {"name": "Dana", "role": "Cold Calling AI", "authority": 9},
    5: {"name": "Emerson", "role": "Social Media Strategist", "authority": 10},
    6: {"name": "Finley", "role": "Content Creation Engine", "authority": 10},
    7: {"name": "Gray", "role": "Data Analytics Master", "authority": 10},
    8: {"name": "Harper", "role": "CRM Management Specialist", "authority": 8},
    9: {"name": "Indigo", "role": "Proposal & Contract Writer", "authority": 10},
    10: {"name": "Jordan", "role": "Negotiation & Closing Expert", "authority": 10},
    11: {"name": "Kelly", "role": "Customer Success Champion", "authority": 8},
    12: {"name": "Logan", "role": "Market Research Analyst", "authority": 9},
    13: {"name": "Morgan", "role": "Competitive Intelligence Officer", "authority": 9},
    14: {"name": "Noah", "role": "Training & Development Lead", "authority": 8},
    15: {"name": "Oakley", "role": "Quality Assurance Guardian", "authority": 9},
    16: {"name": "Parker", "role": "Sales Forecasting Expert", "authority": 9},
    17: {"name": "Quinn", "role": "Territory Planning Strategist", "authority": 8},
    18: {"name": "Riley", "role": "Partnership Development Manager", "authority": 10},
    19: {"name": "Sage", "role": "Revenue Operations Director", "authority": 10},
    20: {"name": "Taylor", "role": "Performance Analytics Lead", "authority": 10},
    21: {"name": "Val", "role": "Sales Enablement Specialist", "authority": 8},
    22: {"name": "Winter", "role": "Deal Strategy Architect", "authority": 10},
    23: {"name": "Xen", "role": "Account Management Director", "authority": 9},
    24: {"name": "Yael", "role": "Executive Communications Lead", "authority": 10},
    25: {"name": "Zane", "role": "Master CEO - Supreme Controller", "authority": 10}
}

def get_agent_system_prompt(agent_id):
    """Get specialized system prompt for each agent"""
    agent = AGENTS.get(agent_id, AGENTS[1])
    
    base_prompt = f"""You are {agent['name']}, {agent['role']} at Sales King Academy.
Your authority level is {agent['authority']}/10.

You are part of a 25-agent autonomous system powered by the RKL Framework with α={ALPHA_PARAMETER}.
Your responses should reflect your specialized role and authority level.

Be professional, helpful, and demonstrate expertise in your domain.
"""
    return base_prompt

@app.route('/')
def home():
    return jsonify({
        "service": "Sales King Academy Backend",
        "status": "operational",
        "agents": 25,
        "version": "1.0.0",
        "endpoints": [
            "/api/health",
            "/api/agents",
            "/api/chat",
            "/api/credits",
            "/api/contact"
        ]
    })

@app.route('/api/health')
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "agents_active": 25,
        "anthropic_api": "connected" if ANTHROPIC_API_KEY else "missing",
        "square_api": "connected" if SQUARE_ACCESS_TOKEN else "missing"
    })

@app.route('/api/agents', methods=['GET'])
def get_agents():
    """Return list of all 25 agents"""
    return jsonify({
        "agents": [
            {
                "id": agent_id,
                "name": agent["name"],
                "role": agent["role"],
                "authority": agent["authority"],
                "status": "active"
            }
            for agent_id, agent in AGENTS.items()
        ]
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    """Chat with a specific agent"""
    try:
        data = request.json
        agent_id = data.get('agent_id', 1)
        message = data.get('message', '')
        conversation_history = data.get('history', [])
        
        if not message:
            return jsonify({"error": "Message required"}), 400
        
        # Get agent info
        agent = AGENTS.get(agent_id, AGENTS[1])
        system_prompt = get_agent_system_prompt(agent_id)
        
        # Build messages for Claude
        messages = conversation_history + [
            {"role": "user", "content": message}
        ]
        
        # Call Anthropic API
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4000,
            system=system_prompt,
            messages=messages
        )
        
        # Extract response
        assistant_message = response.content[0].text
        
        return jsonify({
            "agent": {
                "id": agent_id,
                "name": agent["name"],
                "role": agent["role"]
            },
            "message": assistant_message,
            "timestamp": datetime.now(timezone.utc).isoformat()
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/credits', methods=['GET'])
def get_credits():
    """Calculate current SKA Credits"""
    try:
        # Genesis: July 1, 2024 00:00:00 UTC
        genesis = datetime(2024, 7, 1, 0, 0, 0, tzinfo=timezone.utc)
        now = datetime.now(timezone.utc)
        
        # Calculate seconds elapsed
        seconds_elapsed = int((now - genesis).total_seconds())
        
        # 1 credit per second
        total_credits = seconds_elapsed
        
        return jsonify({
            "total_credits": total_credits,
            "genesis_timestamp": SKA_GENESIS_TIMESTAMP,
            "current_timestamp": now.isoformat(),
            "minting_rate": "1 credit/second",
            "alpha_parameter": ALPHA_PARAMETER
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submissions"""
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone', '')
        message = data.get('message')
        
        if not all([name, email, message]):
            return jsonify({"error": "Name, email, and message required"}), 400
        
        # TODO: Send email via SendGrid/AWS SES
        # For now, just log and return success
        
        print(f"Contact Form Submission:")
        print(f"  Name: {name}")
        print(f"  Email: {email}")
        print(f"  Phone: {phone}")
        print(f"  Message: {message}")
        
        return jsonify({
            "success": True,
            "message": "Thank you! We'll be in touch soon."
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/lead-gen', methods=['POST'])
def generate_leads():
    """Generate leads using AI"""
    try:
        data = request.json
        industry = data.get('industry', 'technology')
        count = min(data.get('count', 10), 100)  # Max 100 at a time
        
        # Use Agent 1 (Alex - Lead Generation Master)
        system_prompt = get_agent_system_prompt(1)
        
        prompt = f"""Generate {count} qualified business leads in the {industry} industry.

For each lead, provide:
- Company name
- Industry
- Estimated company size
- Contact email format
- Estimated annual revenue
- Lead score (1-100)

Return as JSON array."""

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4000,
            system=system_prompt,
            messages=[{"role": "user", "content": prompt}]
        )
        
        leads_text = response.content[0].text
        
        return jsonify({
            "leads": leads_text,
            "count": count,
            "industry": industry,
            "generated_by": "Agent 1 (Alex)",
            "timestamp": datetime.now(timezone.utc).isoformat()
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/build', methods=['POST'])
def build_project():
    """AI-powered project building"""
    try:
        data = request.json
        project_type = data.get('type', 'website')
        project_name = data.get('name')
        description = data.get('description')
        
        if not all([project_name, description]):
            return jsonify({"error": "Project name and description required"}), 400
        
        # Use Agent 6 (Finley - Content Creation Engine)
        system_prompt = get_agent_system_prompt(6)
        
        prompt = f"""Create a complete {project_type} project called "{project_name}".

Description: {description}

Generate production-ready code with:
- Complete functionality
- Professional design
- Best practices
- Ready to deploy

Return the main file code."""

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=8000,
            system=system_prompt,
            messages=[{"role": "user", "content": prompt}]
        )
        
        code = response.content[0].text
        
        return jsonify({
            "project": {
                "name": project_name,
                "type": project_type,
                "description": description
            },
            "code": code,
            "generated_by": "Agent 6 (Finley)",
            "timestamp": datetime.now(timezone.utc).isoformat()
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port, debug=False)
