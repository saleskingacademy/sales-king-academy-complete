// REAL-TIME REVENUE METRICS API
// Powers the live dashboard

exports.handler = async (event, context) => {
    try {
        // In production, this would query your PostgreSQL database
        // For now, returning structure that matches dashboard expectations
        
        const metrics = {
            revenueToday: await getTodayRevenue(),
            leadsGenerated: await getTodayLeads(),
            emailsSent: await getTodayEmails(),
            smsSent: await getTodaySMS(),
            dealsClosed: await getTodayDeals(),
            conversionRate: await getConversionRate(),
            timestamp: new Date().toISOString()
        };
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(metrics)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

async function getTodayRevenue() {
    // Query: SELECT SUM(amount) FROM transactions WHERE DATE(transaction_date) = CURRENT_DATE
    // For demo, simulate growing revenue
    return Math.floor(Math.random() * 100000) + 50000;
}

async function getTodayLeads() {
    // Query: SELECT COUNT(*) FROM leads WHERE DATE(created_at) = CURRENT_DATE
    return Math.floor(Math.random() * 500) + 100;
}

async function getTodayEmails() {
    // Query: SELECT COUNT(*) FROM outreach_log WHERE outreach_type='email' AND DATE(sent_at) = CURRENT_DATE
    return Math.floor(Math.random() * 1000) + 500;
}

async function getTodaySMS() {
    // Query: SELECT COUNT(*) FROM outreach_log WHERE outreach_type='sms' AND DATE(sent_at) = CURRENT_DATE
    return Math.floor(Math.random() * 500) + 200;
}

async function getTodayDeals() {
    // Query: SELECT COUNT(*) FROM transactions WHERE DATE(transaction_date) = CURRENT_DATE
    return Math.floor(Math.random() * 15) + 5;
}

async function getConversionRate() {
    // Calculate: (deals_closed / leads_contacted) * 100
    return (Math.random() * 8) + 2; // 2-10% range
}
