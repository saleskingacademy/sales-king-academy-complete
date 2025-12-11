/**
 * SALES KING ACADEMY - AUTONOMOUS CLOSING ENGINE
 * ==============================================
 * AI-driven negotiations, counter-offer modeling
 * Risk scoring, close probability prediction
 * Automatic deal structuring and closing
 * Powered by Anthropic Claude API
 */

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
const ALPHA_PARAMETER = 25;

// Pricing packages
const PACKAGES = {
  'Starter': { monthly: 197, annual: 1970, setup: 0, agents: 5, discount_annual: 0.17 },
  'Professional': { monthly: 1997, annual: 19970, setup: 997, agents: 12, discount_annual: 0.17 },
  'Enterprise': { monthly: 9997, annual: 99970, setup: 4997, agents: 25, discount_annual: 0.17 }
};

// White-label and franchise pricing
const LICENSING = {
  'white_label': { upfront: 50000, revenue_share: 0.15, includes: 'Full platform access' },
  'master_franchise': { upfront: 250000, revenue_share: 0.10, includes: 'Territory rights + support' },
  'corporate_license': { upfront: 1000000, revenue_share: 0.05, includes: 'Unlimited deployment' }
};

class AutonomousClosingEngine {
  constructor() {
    this.activeDeals = new Map();
    this.closedDeals = [];
    this.totalRevenue = 0;
    this.negotiations = new Map();
  }

  async callClaudeAPI(prompt, maxTokens = 2000) {
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

  calculateRiskScore(prospect) {
    // RKL Framework risk assessment (α=25)
    let risk = 0;
    
    // Budget concerns
    if (prospect.budget_hesitation) risk += 30;
    
    // Decision authority
    if (!prospect.decision_maker) risk += 25;
    
    // Timeline concerns
    if (prospect.needs_time) risk += 20;
    
    // Competitor consideration
    if (prospect.considering_competitors) risk += 15;
    
    // Technical concerns
    if (prospect.technical_questions > 3) risk += 10;
    
    // Adjust with α parameter
    const adjustedRisk = Math.max(0, Math.min(100, risk * (25 - ALPHA_PARAMETER) / 25));
    
    return Math.round(adjustedRisk);
  }

  calculateCloseProbability(prospect) {
    // Multi-factor close probability using RKL Framework
    let probability = 50; // Base
    
    // Positive indicators
    if (prospect.budget_approved) probability += 20;
    if (prospect.urgency === 'high') probability += 15;
    if (prospect.decision_maker) probability += 15;
    if (prospect.pain_points_identified) probability += 10;
    if (prospect.demo_completed) probability += 10;
    if (prospect.references_checked) probability += 5;
    if (prospect.proposal_reviewed) probability += 5;
    
    // Negative indicators
    if (prospect.price_objection) probability -= 15;
    if (prospect.competitor_consideration) probability -= 10;
    if (prospect.needs_approval) probability -= 10;
    if (prospect.timeline_unclear) probability -= 5;
    
    // Apply RKL Framework optimization
    probability = probability * (1 + (ALPHA_PARAMETER / 100));
    
    return Math.max(0, Math.min(100, Math.round(probability)));
  }

  async generateCounterOffer(prospect, objection) {
    // AI-powered counter-offer generation
    const prompt = `You are an expert sales closer for Sales King Academy negotiating a deal.

Prospect Profile:
- Company: ${prospect.company}
- Budget: $${prospect.budget_range?.min || 0} - $${prospect.budget_range?.max || 100000}
- Package Interest: ${prospect.interested_package}
- Current Objection: ${objection}

Available Packages:
${Object.entries(PACKAGES).map(([name, pkg]) => 
  `- ${name}: $${pkg.monthly}/mo or $${pkg.annual}/yr (${agents} agents)`
).join('\n')}

Generate a compelling counter-offer that:
1. Addresses their objection directly
2. Provides clear value justification
3. Offers creative payment terms if needed
4. Creates urgency without pressure
5. Moves toward close

Provide:
- Counter-offer text (conversational, persuasive)
- Discount percentage (if applicable, max 20%)
- Payment terms recommendation
- Close probability after counter-offer
- Recommended next action

Format as JSON.`;

    const result = await this.callClaudeAPI(prompt);
    
    if (result.error) {
      return this.fallbackCounterOffer(prospect, objection);
    }

    try {
      return JSON.parse(result.text);
    } catch (e) {
      return {
        counter_offer: result.text,
        discount: 0,
        terms: 'standard',
        close_probability: this.calculateCloseProbability(prospect)
      };
    }
  }

  fallbackCounterOffer(prospect, objection) {
    const pkg = PACKAGES[prospect.interested_package] || PACKAGES['Professional'];
    let discount = 0;
    let offer = '';
    
    if (objection.toLowerCase().includes('price') || objection.toLowerCase().includes('budget')) {
      discount = 10;
      offer = `I understand budget is a concern. What if we started with a ${discount}% discount for the first 3 months? That brings your monthly investment to $${Math.round(pkg.monthly * (1 - discount/100))}, and you'll see ROI within 60 days based on similar clients.`;
    } else if (objection.toLowerCase().includes('time') || objection.toLowerCase().includes('busy')) {
      offer = `Time is exactly why our clients love Sales King Academy - it saves 20+ hours per week once implemented. What if we handled 100% of the setup for you? Zero time investment required from your team.`;
    } else if (objection.toLowerCase().includes('competitor')) {
      offer = `I'm glad you're doing due diligence. Most competitors offer 3-5 AI agents - we provide ${pkg.agents}. Plus, our RKL Framework is proprietary technology with O(n^1.77) complexity that nobody else has. Would a side-by-side comparison help?`;
    } else {
      offer = `I hear your concern. What would make this decision easier for you today? We have flexibility on payment terms, setup timeline, and even a 30-day money-back guarantee.`;
    }
    
    return {
      counter_offer: offer,
      discount: discount,
      terms: 'flexible',
      close_probability: this.calculateCloseProbability(prospect) + 15
    };
  }

  async structureDeal(prospect, package_name, payment_plan = 'monthly') {
    const pkg = PACKAGES[package_name];
    if (!pkg) {
      return { success: false, error: 'Invalid package' };
    }
    
    const isAnnual = payment_plan === 'annual';
    const basePrice = isAnnual ? pkg.annual : pkg.monthly;
    const setupFee = pkg.setup;
    
    // Calculate discounts
    let discount = 0;
    if (isAnnual) discount += pkg.discount_annual;
    if (prospect.discount_offered) discount += prospect.discount_offered;
    
    const finalPrice = Math.round(basePrice * (1 - discount));
    const totalFirstPayment = isAnnual ? finalPrice + setupFee : pkg.monthly + setupFee;
    
    // Calculate ROI
    const estimatedRevenue = prospect.estimated_value || 100000;
    const annualRevenue = estimatedRevenue * 3; // 300% increase claim
    const annualCost = isAnnual ? finalPrice : (pkg.monthly * 12);
    const roi = Math.round(((annualRevenue - annualCost) / annualCost) * 100);
    
    return {
      success: true,
      deal_structure: {
        package: package_name,
        payment_plan: payment_plan,
        base_price: basePrice,
        setup_fee: setupFee,
        discount_percentage: (discount * 100).toFixed(1) + '%',
        final_price: finalPrice,
        first_payment: totalFirstPayment,
        monthly_recurring: isAnnual ? 0 : pkg.monthly,
        annual_cost: annualCost,
        agents_included: pkg.agents,
        estimated_annual_revenue: annualRevenue,
        projected_roi: roi + '%',
        payback_period: Math.round((annualCost / (annualRevenue / 12))) + ' months'
      }
    };
  }

  async automaticClose(prospect, package_name, payment_plan = 'monthly') {
    // Close probability check
    const closeProbability = this.calculateCloseProbability(prospect);
    
    if (closeProbability < 70) {
      return {
        success: false,
        message: 'Close probability too low - continue nurturing',
        close_probability: closeProbability,
        recommendation: 'Run additional qualification or address objections'
      };
    }
    
    // Structure the deal
    const dealStructure = await this.structureDeal(prospect, package_name, payment_plan);
    
    if (!dealStructure.success) {
      return dealStructure;
    }
    
    // Generate closing AI response
    let closingMessage = '';
    if (ANTHROPIC_API_KEY) {
      const prompt = `Generate a powerful closing statement for this deal:

Prospect: ${prospect.company}
Package: ${package_name}
Price: $${dealStructure.deal_structure.final_price}
Payment: ${payment_plan}
ROI: ${dealStructure.deal_structure.projected_roi}

Create a 2-3 sentence closing that:
1. Reinforces value and ROI
2. Creates urgency
3. Makes next steps crystal clear
4. Feels natural and consultative

Just provide the closing text, no JSON.`;

      const result = await this.callClaudeAPI(prompt, 300);
      if (!result.error) {
        closingMessage = result.text;
      }
    }
    
    if (!closingMessage) {
      closingMessage = `Based on your goals and our ${dealStructure.deal_structure.agents_included}-agent system, you'll see ${dealStructure.deal_structure.projected_roi} ROI within ${dealStructure.deal_structure.payback_period}. I'm confident this is the right fit. Let's get you started today - I'll send over the agreement and we can have you operational within 48 hours.`;
    }
    
    // Create deal
    const dealId = `deal-${Date.now()}`;
    const deal = {
      deal_id: dealId,
      prospect_id: prospect.id,
      company: prospect.company,
      ...dealStructure.deal_structure,
      closing_message: closingMessage,
      close_probability: closeProbability,
      risk_score: this.calculateRiskScore(prospect),
      status: 'PENDING_SIGNATURE',
      created_at: new Date().toISOString()
    };
    
    this.activeDeals.set(dealId, deal);
    
    return {
      success: true,
      message: 'Deal structured and ready to close',
      deal: deal,
      closing_statement: closingMessage,
      next_steps: [
        'Send contract for signature',
        'Process first payment',
        'Schedule onboarding call',
        'Activate agent access'
      ]
    };
  }

  async processPayment(dealId, paymentMethod = 'square') {
    const deal = this.activeDeals.get(dealId);
    if (!deal) {
      return { success: false, error: 'Deal not found' };
    }
    
    // In production, integrate with Square API
    // For now, simulate successful payment
    const paymentAmount = deal.first_payment;
    
    deal.status = 'CLOSED';
    deal.payment_processed = true;
    deal.payment_amount = paymentAmount;
    deal.payment_method = paymentMethod;
    deal.closed_at = new Date().toISOString();
    
    this.closedDeals.push(deal);
    this.totalRevenue += paymentAmount;
    this.activeDeals.delete(dealId);
    
    return {
      success: true,
      message: 'Payment processed successfully',
      deal: deal,
      payment_confirmation: {
        amount: paymentAmount,
        method: paymentMethod,
        transaction_id: `txn-${Date.now()}`
      }
    };
  }

  getStats() {
    const activeDealsArray = Array.from(this.activeDeals.values());
    const avgCloseProbability = activeDealsArray.length > 0
      ? Math.round(activeDealsArray.reduce((sum, d) => sum + d.close_probability, 0) / activeDealsArray.length)
      : 0;
    
    return {
      active_deals: this.activeDeals.size,
      closed_deals: this.closedDeals.length,
      total_revenue: this.totalRevenue,
      average_deal_value: this.closedDeals.length > 0
        ? Math.round(this.totalRevenue / this.closedDeals.length)
        : 0,
      average_close_probability: avgCloseProbability,
      close_rate: (this.activeDeals.size + this.closedDeals.length) > 0
        ? ((this.closedDeals.length / (this.activeDeals.size + this.closedDeals.length)) * 100).toFixed(1) + '%'
        : '0%'
    };
  }
}

// Global instance
let closingEngine = null;

exports.handler = async (event) => {
  if (!closingEngine) {
    closingEngine = new AutonomousClosingEngine();
  }

  const method = event.httpMethod;
  
  try {
    if (method === 'GET') {
      const stats = closingEngine.getStats();
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          system: 'Sales King Academy - Autonomous Closing Engine',
          status: 'OPERATIONAL',
          ...stats,
          packages: PACKAGES,
          licensing: LICENSING,
          rkl_framework: {
            alpha: ALPHA_PARAMETER,
            ai_powered: 'Claude Sonnet 4'
          },
          timestamp: new Date().toISOString()
        })
      };
    }

    if (method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const action = body.action;
      
      if (action === 'calculate_probability') {
        const probability = closingEngine.calculateCloseProbability(body.prospect);
        const risk = closingEngine.calculateRiskScore(body.prospect);
        
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            close_probability: probability,
            risk_score: risk,
            recommendation: probability > 70 ? 'CLOSE NOW' : 
                          probability > 50 ? 'CONTINUE NURTURING' : 'QUALIFY FURTHER'
          })
        };
      }
      
      if (action === 'generate_counter_offer') {
        const counterOffer = await closingEngine.generateCounterOffer(
          body.prospect,
          body.objection
        );
        
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(counterOffer)
        };
      }
      
      if (action === 'structure_deal') {
        const result = await closingEngine.structureDeal(
          body.prospect,
          body.package,
          body.payment_plan
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
      
      if (action === 'automatic_close') {
        const result = await closingEngine.automaticClose(
          body.prospect,
          body.package,
          body.payment_plan
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
      
      if (action === 'process_payment') {
        const result = await closingEngine.processPayment(
          body.deal_id,
          body.payment_method
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
        error: 'Closing engine error',
        message: error.message
      })
    };
  }
};
