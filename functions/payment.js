const { Client, Environment } = require('square');

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN || 'EAAAl3rq3FV1BsW_RT-6cQhqbvl63P9zXL7u6S1kJPFGD5xKlGbQfGYEh5xE4Nxe',
  environment: Environment.Sandbox
});

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { sourceId, itemId, amount, currency = 'USD', email } = JSON.parse(event.body);

    const payment = await client.paymentsApi.createPayment({
      sourceId,
      idempotencyKey: `${Date.now()}-${Math.random()}`,
      locationId: 'LCX039E7QRA5G',
      amountMoney: {
        amount: BigInt(amount),
        currency
      },
      buyerEmailAddress: email,
      note: `Sales King Academy - Item ${itemId}`
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        paymentId: payment.result.payment.id,
        status: payment.result.payment.status,
        receiptUrl: payment.result.payment.receiptUrl
      })
    };

  } catch (error) {
    console.error('Payment error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
