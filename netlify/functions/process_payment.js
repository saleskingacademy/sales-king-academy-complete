const { Client, Environment } = require('square');

const client = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN || 'EAAAl8ol1Y5pYRVu1O-L_M2V9_bFIw',
    environment: Environment.Sandbox
});

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { sourceId, amount, currency, productId, programName, locationId } = JSON.parse(event.body);

        const payment = await client.paymentsApi.createPayment({
            sourceId,
            amountMoney: {
                amount: BigInt(amount),
                currency: currency || 'USD'
            },
            locationId: locationId || 'LCX039E7QRA5G',
            idempotencyKey: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            note: `Sales King Academy - ${programName}`,
            autocomplete: true
        });

        // Record in database
        const dbResponse = await fetch('https://mcp.cloud.cdata.com/mcp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `INSERT INTO transactions (square_payment_id, product_id, product_name, amount, payment_status) VALUES ('${payment.result.payment.id}', '${productId}', '${programName}', ${amount/100}, 'completed')`
            })
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: true,
                paymentId: payment.result.payment.id,
                amount: amount / 100,
                program: programName,
                receiptUrl: payment.result.payment.receiptUrl
            })
        };
    } catch (error) {
        console.error('Payment processing error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error: error.message
            })
        };
    }
};
