const { Client, Environment } = require('square');
const client = new Client({
  environment: Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const { sourceId, amount, productId, productName } = JSON.parse(event.body);
    const { result } = await client.paymentsApi.createPayment({
      sourceId,
      idempotencyKey: `${Date.now()}_${productId}`,
      amountMoney: { amount: BigInt(amount), currency: 'USD' },
      locationId: 'LCX039E7QRA5G',
      note: `Purchase: ${productName}`,
      autocomplete: true
    });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true, paymentId: result.payment.id, status: result.payment.status, receiptUrl: result.payment.receiptUrl })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
  }
};
