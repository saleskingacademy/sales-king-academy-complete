// SKA Credits API
const GENESIS_UNIX = 1719792000;

exports.handler = async (event, context) => {
  const now = Math.floor(Date.now() / 1000);
  const credits = now - GENESIS_UNIX;
  
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({
      credits: credits,
      value_usd: credits,
      genesis: "0701202400000000",
      rate: 1,
      updated: new Date().toISOString()
    })
  };
};
