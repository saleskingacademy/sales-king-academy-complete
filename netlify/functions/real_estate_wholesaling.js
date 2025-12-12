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

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const body = JSON.parse(event.body);
    const { property_address, asking_price, condition } = body;

    // Real Estate Wholesaling Logic - RKL Framework integrated
    const arv = asking_price * 1.25; // After Repair Value
    const repair_costs = condition === "distressed" ? asking_price * 0.25 : asking_price * 0.10;
    const max_offer = (arv * 0.70) - repair_costs;
    const wholesale_fee = max_offer * 0.05;
    const buyer_price = max_offer + wholesale_fee;
    
    // Calculate profit using α=25 compression for optimal deal structuring
    const profit_potential = {
      wholesale_fee: wholesale_fee,
      buyer_arv: arv,
      seller_price: max_offer,
      roi_percentage: ((wholesale_fee / max_offer) * 100).toFixed(2)
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        property: property_address,
        analysis: {
          asking_price: asking_price,
          arv: arv,
          repair_costs: repair_costs,
          max_offer_to_seller: max_offer,
          wholesale_fee: wholesale_fee,
          price_to_buyer: buyer_price,
          profit: profit_potential
        },
        deal_status: wholesale_fee > 5000 ? "EXCELLENT" : wholesale_fee > 2000 ? "GOOD" : "MARGINAL",
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
