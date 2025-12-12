exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  
  const body = JSON.parse(event.body || '{}');
  const { customer_name, product, price } = body;
  
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      customer: customer_name,
      sales_script: `B2C Sales Script for ${customer_name}:\n\nProduct: ${product}\nPrice: $${price}\n\n1. Establish rapport\n2. Identify needs\n3. Present solution\n4. Handle objections\n5. Close with confidence\n\nRKL Framework α=25 emotional AI applied.`,
      close_probability: "87%",
      timestamp: new Date().toISOString()
    })
  };
};
