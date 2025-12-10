// SQUARE PAYMENT PROCESSING
const { Client, Environment } = require('square');

const client = new Client({
    environment: Environment.Production,
    accessToken: process.env.SQUARE_ACCESS_TOKEN
});

exports.handler = async (event, context) => {
    const { sourceId, amount, productId, customerEmail } = JSON.parse(event.body);
    
    try {
        // Create payment
        const payment = await client.paymentsApi.createPayment({
            sourceId: sourceId,
            amountMoney: {
                amount: BigInt(amount * 100), // Convert to cents
                currency: 'USD'
            },
            locationId: 'LCX039E7QRA5G',
            idempotencyKey: Date.now().toString()
        });
        
        // Save to database
        await saveTransaction({
            squarePaymentId: payment.result.payment.id,
            amount: amount,
            productId: productId,
            customerEmail: customerEmail,
            status: 'completed'
        });
        
        // Trigger onboarding
        await triggerOnboarding(customerEmail, productId);
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                paymentId: payment.result.payment.id,
                receiptUrl: payment.result.payment.receiptUrl
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
