// SQUARE WEBHOOK HANDLER
exports.handler = async (event) => {
  const headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'};
  
  try {
    const webhook = JSON.parse(event.body);
    const { type, data } = webhook;

    if (type === 'payment.created') {
      // Process new payment
      const payment = data.object.payment;
      
      // Auto-enroll in training
      // Send confirmation email
      // Update database
      
      return { statusCode: 200, headers, body: JSON.stringify({
        success: true,
        processed: payment.id
      })};
    }

    if (type === 'order.created') {
      // Process new order
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
