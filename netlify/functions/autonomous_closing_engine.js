const Anthropic = require("@anthropic-ai/sdk");

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const body = JSON.parse(event.body);
    const { deal_value, customer_profile, objections, timeline } = body;

    const systemPrompt = `You are Agent #10 - Jordan, the Contract Negotiation King with Authority Level 10.

Deal Value: $${deal_value}
Customer: ${JSON.stringify(customer_profile)}
Objections: ${objections || "None"}
Timeline: ${timeline}

Using the RKL Framework and Quantum King Protocol for optimal negotiation:

1. Analyze deal structure with O(n^1.77) complexity optimization
2. Counter-offer modeling with α=25 precision
3. Risk scoring using temporal DNA validation
4. Close probability calculation
5. Generate optimal negotiation strategy

Provide a complete closing strategy that will secure this deal.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3072,
      system: systemPrompt,
      messages: [{
        role: "user",
        content: "Execute autonomous closing sequence."
      }]
    });

    // Calculate close probability using RKL Framework
    const base_probability = 0.65;
    const objection_penalty = (objections?.length || 0) * 0.05;
    const timeline_bonus = timeline === "urgent" ? 0.15 : 0.05;
    const close_probability = Math.min(0.98, base_probability - objection_penalty + timeline_bonus);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        closing_strategy: message.content[0].text,
        close_probability: (close_probability * 100).toFixed(1) + "%",
        estimated_revenue: deal_value,
        agent: "Jordan - Contract Negotiation King",
        authority: 10,
        rkl_optimized: true,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
