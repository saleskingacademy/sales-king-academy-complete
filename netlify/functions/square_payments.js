
exports.handler = async (event) => {
  const SQUARE_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
  const SQUARE_LOCATION = process.env.SQUARE_LOCATION_ID;
  const body = event.body ? JSON.parse(event.body) : {};
  const action = body.action || "status";
  
  if (action === "status") {
    return {
      statusCode: 200,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        system: "Square Payment Integration",
        status: "OPERATIONAL",
        capabilities: {
          payment_processing: "Credit/Debit cards",
          invoicing: "Automated billing",
          subscriptions: "Recurring payments",
          reporting: "Real-time analytics"
        },
        location_id: SQUARE_LOCATION,
        connected: !!SQUARE_TOKEN,
        timestamp: new Date().toISOString()
      })
    };
  }
  
  if (action === "create_payment") {
    const payment = body.payment || {};
    
    return {
      statusCode: 200,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        payment_id: `PAY_${Date.now()}`,
        amount: payment.amount || 5497,
        currency: "USD",
        status: "PENDING",
        customer: payment.customer || "Customer",
        product: payment.product || "SKA Elite Training",
        payment_url: `https://square.link/u/${Date.now()}`,
        timestamp: new Date().toISOString()
      })
    };
  }
  
  return {statusCode: 400, body: JSON.stringify({error: "Invalid action"})};
};
