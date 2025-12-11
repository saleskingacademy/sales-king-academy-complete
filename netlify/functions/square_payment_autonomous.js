exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
    const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
    
    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
      throw new Error('Square credentials not configured');
    }

    const body = JSON.parse(event.body || '{}');
    const { 
      amount,
      currency = 'USD',
      source_id,
      customer_email,
      product_name,
      customer_name,
      note
    } = body;

    if (!amount || !source_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields: amount, source_id' 
        })
      };
    }

    // Generate idempotency key for safe retries
    const idempotency_key = `ska_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Calculate SKA Credits earned (1 credit per second since genesis)
    const genesis = new Date('2024-07-01T00:00:00Z').getTime();
    const now = Date.now();
    const ska_credits = Math.floor((now - genesis) / 1000);

    // Create payment via Square API
    const square_response = await fetch('https://connect.squareup.com/v2/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Square-Version': '2024-12-18'
      },
      body: JSON.stringify({
        source_id: source_id,
        idempotency_key: idempotency_key,
        amount_money: {
          amount: parseInt(amount), // Amount in cents
          currency: currency
        },
        location_id: SQUARE_LOCATION_ID,
        note: note || `Sales King Academy - ${product_name || 'Service'}`,
        buyer_email_address: customer_email,
        autocomplete: true,
        reference_id: `SKA_${Date.now()}`
      })
    });

    const square_data = await square_response.json();

    if (!square_response.ok) {
      return {
        statusCode: square_response.status,
        headers,
        body: JSON.stringify({ 
          error: 'Square Payment Error',
          details: square_data,
          timestamp: new Date().toISOString()
        })
      };
    }

    const payment = square_data.payment;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        system: 'Square Payment Processing',
        status: 'PAYMENT_SUCCESSFUL',
        timestamp: new Date().toISOString(),
        payment: {
          id: payment.id,
          status: payment.status,
          amount: payment.amount_money.amount / 100,
          currency: payment.amount_money.currency,
          receipt_url: payment.receipt_url,
          receipt_number: payment.receipt_number,
          created_at: payment.created_at
        },
        customer: {
          name: customer_name,
          email: customer_email
        },
        product: product_name,
        square: {
          location_id: SQUARE_LOCATION_ID,
          reference_id: payment.reference_id
        },
        framework: {
          alpha: 25,
          complexity: 'O(n^1.77)',
          ska_credits: ska_credits,
          genesis: '0701202400000000'
        },
        revenue_ops: {
          agent: 'Sage (Agent 19)',
          tracking: 'ACTIVE',
          forecasting: 'ENABLED'
        },
        next_actions: [
          'Send receipt to customer',
          'Update CRM via Harper (Agent 8)',
          'Log transaction for forecasting via Parker (Agent 16)',
          'Trigger fulfillment if applicable'
        ]
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Square Payment Processing Error',
        message: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
