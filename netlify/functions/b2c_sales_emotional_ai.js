/**
 * SALES KING ACADEMY - B2C SALES SYSTEM WITH EMOTIONAL AI
 * ========================================================
 * RELL: Recursive Emotional-Loyalty Loop
 * REAL: Recursive Emotional-Adaptation Logic
 * High-pressure modeling, buyer psychology, emotional response prediction
 * Powered by Anthropic Claude API for emotional intelligence
 */

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ALPHA_PARAMETER = 25;
const GENESIS_TIMESTAMP = new Date('2024-07-01T00:00:00Z').getTime();

// Emotional states and response patterns
const EMOTIONAL_STATES = {
  SKEPTICAL: { urgency: 0.3, trust: 0.2, interest: 0.4 },
  CURIOUS: { urgency: 0.4, trust: 0.5, interest: 0.7 },
  INTERESTED: { urgency: 0.6, trust: 0.6, interest: 0.8 },
  READY: { urgency: 0.8, trust: 0.8, interest: 0.9 },
  COMMITTED: { urgency: 0.9, trust: 0.9, interest: 1.0 }
};

// Sales psychological triggers
const PSYCHOLOGICAL_TRIGGERS = [
  { name: 'scarcity', multiplier: 1.3, description: 'Limited availability' },
  { name: 'social_proof', multiplier: 1.25, description: 'Others are buying' },
  { name: 'authority', multiplier: 1.2, description: 'Expert endorsement' },
  { name: 'urgency', multiplier: 1.35, description: 'Time-sensitive offer' },
  { name: 'reciprocity', multiplier: 1.15, description: 'Give before ask' },
  { name: 'consistency', multiplier: 1.1, description: 'Build on commitments' },
  { name: 'liking', multiplier: 1.2, description: 'Personal connection' }
];

class EmotionalSalesAI {
  constructor() {
    this.conversationMemory = new Map();
    this.emotionalProfiles = new Map();
    this.closedDeals = [];
  }

  async callClaudeAPI(prompt, maxTokens = 1500) {
    if (!ANTHROPIC_API_KEY) {
      return { error: 'Anthropic API key not configured' };
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: maxTokens,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      if (!response.ok) {
        return { error: `API error: ${response.status}` };
      }

      const data = await response.json();
      return {
        text: data.content[0].text,
        usage: data.usage
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  // RELL: Recursive Emotional-Loyalty Loop
  analyzeEmotionalState(conversation, previousState = null) {
    // Analyze conversation for emotional cues
    const text = conversation.toLowerCase();
    
    let state = { ...EMOTIONAL_STATES.SKEPTICAL };
    
    // Positive indicators
    if (text.includes('interested') || text.includes('sounds good') || text.includes('tell me more')) {
      state = { ...EMOTIONAL_STATES.INTERESTED };
    }
    if (text.includes('curious') || text.includes('how does') || text.includes('what about')) {
      state = { ...EMOTIONAL_STATES.CURIOUS };
    }
    if (text.includes('ready') || text.includes('let\'s do it') || text.includes('sign up')) {
      state = { ...EMOTIONAL_STATES.READY };
    }
    if (text.includes('buy') || text.includes('purchase') || text.includes('commitment')) {
      state = { ...EMOTIONAL_STATES.COMMITTED };
    }
    
    // Negative indicators (reduce scores)
    if (text.includes('not sure') || text.includes('expensive') || text.includes('think about')) {
      state.trust *= 0.8;
      state.urgency *= 0.7;
    }
    
    // Apply RELL: recursively build on previous emotional state
    if (previousState) {
      state.trust = Math.min(1.0, (state.trust + previousState.trust) / 2 * 1.1);
      state.urgency = Math.min(1.0, (state.urgency + previousState.urgency) / 2 * 1.05);
      state.interest = Math.min(1.0, (state.interest + previousState.interest) / 2 * 1.08);
    }
    
    return state;
  }

  // REAL: Recursive Emotional-Adaptation Logic
  async adaptConversationStrategy(prospectId, currentState, conversation) {
    const prompt = `You are an expert B2C sales consultant for Sales King Academy (AI automation platform, $197-$9,997/month).

Current prospect emotional state:
- Trust Level: ${(currentState.trust * 100).toFixed(0)}%
- Urgency: ${(currentState.urgency * 100).toFixed(0)}%
- Interest: ${(currentState.interest * 100).toFixed(0)}%

Recent conversation:
"${conversation}"

Using REAL (Recursive Emotional-Adaptation Logic), provide:
1. Next best response to move them forward
2. Which psychological trigger to apply (scarcity/urgency/social_proof/authority/reciprocity/consistency/liking)
3. Objection handling if needed
4. Close probability (0-100%)
5. Recommended next action

Format as JSON.`;

    const result = await this.callClaudeAPI(prompt);
    
    if (result.error) {
      // Fallback strategy without AI
      return this.fallbackStrategy(currentState);
    }

    try {
      return JSON.parse(result.text);
    } catch (e) {
      return {
        response: result.text,
        trigger: 'urgency',
        close_probability: Math.round(currentState.urgency * 100),
        next_action: currentState.urgency > 0.7 ? 'CLOSE' : 'NURTURE'
      };
    }
  }

  fallbackStrategy(currentState) {
    // Mathematical fallback using RKL Framework
    const closeProbability = (
      currentState.trust * 0.4 +
      currentState.urgency * 0.35 +
      currentState.interest * 0.25
    ) * 100;
    
    let response = '';
    let trigger = 'urgency';
    let nextAction = 'NURTURE';
    
    if (closeProbability > 80) {
      response = "Based on everything we've discussed, I'd love to get you started today. Which package works best for your business?";
      trigger = 'urgency';
      nextAction = 'CLOSE';
    } else if (closeProbability > 60) {
      response = "Let me share how we've helped businesses just like yours increase revenue by 300%. We have limited spots available this month.";
      trigger = 'scarcity';
      nextAction = 'PRESENT';
    } else if (closeProbability > 40) {
      response = "I understand you're evaluating options. Over 500 businesses trust Sales King Academy for their automation. What questions can I answer?";
      trigger = 'social_proof';
      nextAction = 'QUALIFY';
    } else {
      response = "No pressure at all. Would it help if I showed you a quick demo of how our 25 AI agents work?";
      trigger = 'reciprocity';
      nextAction = 'EDUCATE';
    }
    
    return {
      response: response,
      trigger: trigger,
      close_probability: Math.round(closeProbability),
      next_action: nextAction
    };
  }

  applyPsychologicalTrigger(baseMessage, triggerName) {
    const trigger = PSYCHOLOGICAL_TRIGGERS.find(t => t.name === triggerName);
    
    if (!trigger) return baseMessage;
    
    let enhancement = '';
    
    switch (triggerName) {
      case 'scarcity':
        enhancement = ' (Only 3 spots left this month at this price)';
        break;
      case 'social_proof':
        enhancement = ' (Join 500+ businesses already using SKA)';
        break;
      case 'authority':
        enhancement = ' (Featured in Forbes, recommended by sales experts)';
        break;
      case 'urgency':
        enhancement = ' (Special pricing expires in 48 hours)';
        break;
      case 'reciprocity':
        enhancement = ' (Free 30-minute strategy session included)';
        break;
      case 'consistency':
        enhancement = ' (You mentioned wanting to scale - this is the next step)';
        break;
      case 'liking':
        enhancement = ' (I love your enthusiasm for growth!)';
        break;
    }
    
    return baseMessage + enhancement;
  }

  async conductSalesConversation(prospectId, userMessage, packagePreference = null) {
    // Get or create conversation memory
    let memory = this.conversationMemory.get(prospectId) || {
      messages: [],
      emotionalState: { ...EMOTIONAL_STATES.SKEPTICAL },
      conversationStage: 'INITIAL',
      package: packagePreference || 'Professional',
      touchpoints: 0
    };
    
    // Add user message to memory
    memory.messages.push({
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    });
    memory.touchpoints++;
    
    // Analyze emotional state with RELL
    const previousState = memory.emotionalState;
    memory.emotionalState = this.analyzeEmotionalState(
      userMessage,
      previousState
    );
    
    // Adapt strategy with REAL
    const strategy = await this.adaptConversationStrategy(
      prospectId,
      memory.emotionalState,
      userMessage
    );
    
    // Apply psychological trigger
    const response = this.applyPsychologicalTrigger(
      strategy.response,
      strategy.trigger
    );
    
    // Add AI response to memory
    memory.messages.push({
      role: 'assistant',
      content: response,
      timestamp: Date.now(),
      strategy: strategy
    });
    
    // Update conversation stage
    if (strategy.close_probability > 80) {
      memory.conversationStage = 'CLOSING';
    } else if (strategy.close_probability > 60) {
      memory.conversationStage = 'PRESENTING';
    } else if (strategy.close_probability > 40) {
      memory.conversationStage = 'QUALIFYING';
    } else {
      memory.conversationStage = 'EDUCATING';
    }
    
    // Save memory
    this.conversationMemory.set(prospectId, memory);
    
    // Check if ready to close
    if (strategy.next_action === 'CLOSE' && strategy.close_probability > 85) {
      return this.attemptClose(prospectId, memory);
    }
    
    return {
      response: response,
      emotional_state: memory.emotionalState,
      close_probability: strategy.close_probability,
      next_action: strategy.next_action,
      conversation_stage: memory.conversationStage,
      touchpoints: memory.touchpoints,
      trigger_used: strategy.trigger
    };
  }

  async attemptClose(prospectId, memory) {
    const pricing = {
      'Starter': { monthly: 197, annual: 1970, agents: 5 },
      'Professional': { monthly: 1997, annual: 19970, agents: 12 },
      'Enterprise': { monthly: 9997, annual: 99970, agents: 25 }
    };
    
    const pkg = pricing[memory.package];
    
    this.closedDeals.push({
      prospect_id: prospectId,
      package: memory.package,
      value: pkg.annual,
      touchpoints: memory.touchpoints,
      closed_at: new Date().toISOString(),
      emotional_journey: memory.emotionalState
    });
    
    return {
      success: true,
      response: `Fantastic! I'm getting you set up with the ${memory.package} package. You'll have access to ${pkg.agents} AI agents immediately. Welcome to Sales King Academy! 🎉`,
      deal_closed: true,
      package: memory.package,
      annual_value: pkg.annual,
      emotional_state: memory.emotionalState,
      touchpoints: memory.touchpoints
    };
  }

  getStats() {
    return {
      active_conversations: this.conversationMemory.size,
      closed_deals: this.closedDeals.length,
      total_revenue: this.closedDeals.reduce((sum, d) => sum + d.value, 0),
      average_touchpoints: this.closedDeals.length > 0
        ? (this.closedDeals.reduce((sum, d) => sum + d.touchpoints, 0) / this.closedDeals.length).toFixed(1)
        : 0,
      close_rate: this.conversationMemory.size > 0
        ? ((this.closedDeals.length / this.conversationMemory.size) * 100).toFixed(1) + '%'
        : '0%'
    };
  }
}

// Global instance
let salesAI = null;

exports.handler = async (event) => {
  if (!salesAI) {
    salesAI = new EmotionalSalesAI();
  }

  const method = event.httpMethod;
  
  try {
    if (method === 'GET') {
      const stats = salesAI.getStats();
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          system: 'Sales King Academy - B2C Emotional Sales AI',
          status: 'OPERATIONAL',
          rell: 'Recursive Emotional-Loyalty Loop ACTIVE',
          real: 'Recursive Emotional-Adaptation Logic ACTIVE',
          ...stats,
          rkl_framework: {
            alpha: ALPHA_PARAMETER,
            emotional_precision: 'HIGH'
          },
          psychological_triggers: PSYCHOLOGICAL_TRIGGERS.length,
          timestamp: new Date().toISOString()
        })
      };
    }

    if (method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const action = body.action || 'chat';
      
      if (action === 'chat') {
        const prospectId = body.prospect_id || `prospect-${Date.now()}`;
        const message = body.message;
        const package_preference = body.package;
        
        if (!message) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Message required' })
          };
        }
        
        const result = await salesAI.conductSalesConversation(
          prospectId,
          message,
          package_preference
        );
        
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(result)
        };
      }
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Emotional sales AI error',
        message: error.message
      })
    };
  }
};
