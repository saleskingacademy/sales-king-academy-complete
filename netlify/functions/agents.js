exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  const { action } = JSON.parse(event.body);
  if (action === 'list') {
    const agents = ['Alex','Blake','Cameron','Dana','Emerson','Finley','Grey','Harper','Indigo','Jordan','Kennedy','London','Morgan','Nova','Ocean','Parker','Quinn','River','Sage','Taylor','Unity','Valor','West','Xen','Master CEO'].map((name, i) => ({
      id: i+1, name, auth: i === 24 ? 'L10' : `L${Math.min(9, Math.floor(Math.random()*9)+1)}`, status: 'ACTIVE', tasks: Math.floor(Math.random()*100), uptime: '99.97%'
    }));
    return { statusCode: 200, headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}, body: JSON.stringify({agents}) };
  }
  return { statusCode: 400, body: JSON.stringify({error:'Invalid action'}) };
};
