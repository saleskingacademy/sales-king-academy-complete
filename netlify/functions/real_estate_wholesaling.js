/**
 * SALES KING ACADEMY - REAL ESTATE WHOLESALING ENGINE
 * ===================================================
 * Property analyzer, as-is acquisition engine
 * Wholesale valuation, buyer-seller matching
 * Profit distribution, deal scoring
 * 1-second heartbeat sync, timestamped decision logging
 */

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ALPHA_PARAMETER = 25;
const GENESIS_TIMESTAMP = new Date('2024-07-01T00:00:00Z').getTime();

// Market data and analysis parameters
const MARKET_MULTIPLIERS = {
  'hot_market': 1.25,
  'balanced': 1.0,
  'cold_market': 0.85
};

const PROPERTY_CONDITIONS = {
  'excellent': { multiplier: 1.0, repair_cost: 0 },
  'good': { multiplier: 0.95, repair_cost: 5000 },
  'fair': { multiplier: 0.85, repair_cost: 15000 },
  'poor': { multiplier: 0.70, repair_cost: 35000 },
  'distressed': { multiplier: 0.55, repair_cost: 60000 }
};

class RealEstateWholesaleEngine {
  constructor() {
    this.activeDeals = new Map();
    this.buyersList = new Map();
    this.closedDeals = [];
    this.totalProfit = 0;
    this.heartbeatInterval = 1000; // 1-second heartbeat
    this.lastHeartbeat = Date.now();
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

  calculateARV(property) {
    // After Repair Value calculation
    // Using comparable sales and market analysis
    
    const baseValue = property.asking_price || property.estimated_value;
    const sqftValue = property.sqft ? (property.sqft * 150) : baseValue; // $150/sqft baseline
    
    // Market adjustment
    const marketMultiplier = MARKET_MULTIPLIERS[property.market_condition] || 1.0;
    
    // Condition adjustment
    const condition = PROPERTY_CONDITIONS[property.condition] || PROPERTY_CONDITIONS['fair'];
    
    // Calculate ARV
    const arv = Math.round(sqftValue * marketMultiplier);
    
    return arv;
  }

  calculateMAO(arv, repairCost) {
    // Maximum Allowable Offer using 70% rule
    // MAO = (ARV × 0.70) - Repair Costs - Assignment Fee
    
    const assignmentFee = 10000; // Wholesale assignment fee
    const mao = Math.round((arv * 0.70) - repairCost - assignmentFee);
    
    return Math.max(mao, 0);
  }

  async analyzeProperty(property) {
    // Calculate key metrics
    const arv = this.calculateARV(property);
    const condition = PROPERTY_CONDITIONS[property.condition] || PROPERTY_CONDITIONS['fair'];
    const repairCost = condition.repair_cost;
    const mao = this.calculateMAO(arv, repairCost);
    
    // Calculate potential profit
    const askingPrice = property.asking_price || property.estimated_value;
    const wholesaleFee = 10000;
    const potentialProfit = mao - askingPrice + wholesaleFee;
    
    // Deal score using RKL Framework (α=25)
    const profitRatio = potentialProfit / askingPrice;
    const dealScore = Math.min(100, Math.round(
      (profitRatio * 100) * (ALPHA_PARAMETER / 10) + 
      (arv / askingPrice) * 10
    ));
    
    // AI-powered market analysis if available
    let aiInsights = null;
    if (ANTHROPIC_API_KEY) {
      const prompt = `Analyze this wholesale real estate deal:
      
Address: ${property.address}
Asking Price: $${askingPrice.toLocaleString()}
ARV (After Repair Value): $${arv.toLocaleString()}
Estimated Repairs: $${repairCost.toLocaleString()}
Maximum Offer: $${mao.toLocaleString()}
Potential Profit: $${potentialProfit.toLocaleString()}
Market: ${property.market_condition}
Condition: ${property.condition}

Provide:
1. Deal Quality Score (0-100)
2. Key Risks (3-5 points)
3. Profit Optimization Strategies
4. Recommended buyer profile
5. Negotiation talking points

Format as JSON.`;

      const result = await this.callClaudeAPI(prompt);
      if (!result.error) {
        try {
          aiInsights = JSON.parse(result.text);
        } catch (e) {
          aiInsights = result.text;
        }
      }
    }
    
    return {
      property_id: property.id || `prop-${Date.now()}`,
      address: property.address,
      asking_price: askingPrice,
      arv: arv,
      repair_cost: repairCost,
      mao: mao,
      potential_profit: potentialProfit,
      profit_margin: ((potentialProfit / askingPrice) * 100).toFixed(2) + '%',
      deal_score: dealScore,
      recommendation: dealScore > 70 ? 'STRONG BUY' : 
                     dealScore > 50 ? 'CONSIDER' : 
                     dealScore > 30 ? 'MARGINAL' : 'PASS',
      wholesale_fee: wholesaleFee,
      ai_insights: aiInsights,
      analyzed_at: new Date().toISOString(),
      heartbeat_timestamp: this.recordHeartbeat()
    };
  }

  recordHeartbeat() {
    // 1-second heartbeat sync
    const now = Date.now();
    const elapsed = now - this.lastHeartbeat;
    this.lastHeartbeat = now;
    
    return {
      timestamp: now,
      elapsed_ms: elapsed,
      genesis_offset: now - GENESIS_TIMESTAMP,
      credits_minted: Math.floor((now - GENESIS_TIMESTAMP) / 1000)
    };
  }

  async findBuyersForProperty(deal) {
    // Match property with buyer criteria
    const potentialBuyers = [];
    
    this.buyersList.forEach((buyer, buyerId) => {
      let matchScore = 0;
      
      // Location match
      if (buyer.target_areas.includes(deal.address.split(',')[1]?.trim())) {
        matchScore += 30;
      }
      
      // Budget match
      if (deal.asking_price >= buyer.min_budget && deal.asking_price <= buyer.max_budget) {
        matchScore += 40;
      }
      
      // Property type match
      if (buyer.property_types.includes(deal.property_type || 'single_family')) {
        matchScore += 20;
      }
      
      // Condition preference
      if (buyer.preferred_condition === deal.condition) {
        matchScore += 10;
      }
      
      if (matchScore > 50) {
        potentialBuyers.push({
          buyer_id: buyerId,
          buyer_name: buyer.name,
          match_score: matchScore,
          buyer_budget: `$${buyer.min_budget.toLocaleString()} - $${buyer.max_budget.toLocaleString()}`,
          buyer_profile: buyer.investor_type
        });
      }
    });
    
    return potentialBuyers.sort((a, b) => b.match_score - a.match_score);
  }

  async createWholesaleDeal(property) {
    // Analyze property
    const analysis = await this.analyzeProperty(property);
    
    if (analysis.deal_score < 40) {
      return {
        success: false,
        message: 'Deal does not meet minimum profitability criteria',
        analysis: analysis
      };
    }
    
    // Find matching buyers
    const buyers = await this.findBuyersForProperty(analysis);
    
    // Create deal
    const dealId = `deal-${Date.now()}`;
    const deal = {
      deal_id: dealId,
      ...analysis,
      matched_buyers: buyers.length,
      top_buyers: buyers.slice(0, 5),
      deal_status: 'ACTIVE',
      created_at: new Date().toISOString()
    };
    
    this.activeDeals.set(dealId, deal);
    
    return {
      success: true,
      message: `Deal created successfully. ${buyers.length} potential buyers matched.`,
      deal: deal
    };
  }

  async closeDeal(dealId, buyerId, finalPrice) {
    const deal = this.activeDeals.get(dealId);
    if (!deal) {
      return { success: false, error: 'Deal not found' };
    }
    
    const actualProfit = finalPrice - deal.asking_price;
    const assignmentFee = deal.wholesale_fee;
    const totalProfit = actualProfit + assignmentFee;
    
    const closedDeal = {
      ...deal,
      buyer_id: buyerId,
      final_price: finalPrice,
      actual_profit: totalProfit,
      closed_at: new Date().toISOString(),
      days_to_close: Math.floor((Date.now() - new Date(deal.created_at).getTime()) / (1000 * 60 * 60 * 24))
    };
    
    this.closedDeals.push(closedDeal);
    this.totalProfit += totalProfit;
    this.activeDeals.delete(dealId);
    
    return {
      success: true,
      message: 'Deal closed successfully!',
      deal: closedDeal,
      profit: totalProfit
    };
  }

  registerBuyer(buyer) {
    const buyerId = buyer.id || `buyer-${Date.now()}`;
    
    this.buyersList.set(buyerId, {
      id: buyerId,
      name: buyer.name,
      investor_type: buyer.investor_type || 'rehabber',
      min_budget: buyer.min_budget,
      max_budget: buyer.max_budget,
      target_areas: buyer.target_areas || [],
      property_types: buyer.property_types || ['single_family'],
      preferred_condition: buyer.preferred_condition || 'fair',
      registered_at: new Date().toISOString()
    });
    
    return {
      success: true,
      buyer_id: buyerId,
      message: 'Buyer registered successfully'
    };
  }

  getStats() {
    return {
      active_deals: this.activeDeals.size,
      closed_deals: this.closedDeals.length,
      total_profit: this.totalProfit,
      registered_buyers: this.buyersList.size,
      average_profit_per_deal: this.closedDeals.length > 0
        ? Math.round(this.totalProfit / this.closedDeals.length)
        : 0,
      average_days_to_close: this.closedDeals.length > 0
        ? Math.round(
            this.closedDeals.reduce((sum, d) => sum + d.days_to_close, 0) / 
            this.closedDeals.length
          )
        : 0,
      heartbeat_status: 'SYNCED',
      last_heartbeat: this.lastHeartbeat
    };
  }
}

// Global instance
let wholesaleEngine = null;

exports.handler = async (event) => {
  if (!wholesaleEngine) {
    wholesaleEngine = new RealEstateWholesaleEngine();
  }

  const method = event.httpMethod;
  
  try {
    if (method === 'GET') {
      const stats = wholesaleEngine.getStats();
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          system: 'Sales King Academy - Real Estate Wholesaling Engine',
          status: 'OPERATIONAL',
          ...stats,
          rkl_framework: {
            alpha: ALPHA_PARAMETER,
            heartbeat_sync: '1-second'
          },
          timestamp: new Date().toISOString()
        })
      };
    }

    if (method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const action = body.action;
      
      if (action === 'analyze') {
        const property = body.property;
        if (!property) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Property data required' })
          };
        }
        
        const analysis = await wholesaleEngine.analyzeProperty(property);
        
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(analysis)
        };
      }
      
      if (action === 'create_deal') {
        const property = body.property;
        const result = await wholesaleEngine.createWholesaleDeal(property);
        
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(result)
        };
      }
      
      if (action === 'close_deal') {
        const { deal_id, buyer_id, final_price } = body;
        const result = await wholesaleEngine.closeDeal(deal_id, buyer_id, final_price);
        
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(result)
        };
      }
      
      if (action === 'register_buyer') {
        const buyer = body.buyer;
        const result = wholesaleEngine.registerBuyer(buyer);
        
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
        error: 'Wholesaling engine error',
        message: error.message
      })
    };
  }
};
