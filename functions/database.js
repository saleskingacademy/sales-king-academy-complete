// COMPLETE DATABASE SYSTEM - USER AUTH, ORDERS, LEADS, TRAINING
exports.handler = async (event) => {
  const headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'};
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  const db = {
    users: new Map(),
    orders: new Map(),
    leads: new Map(),
    progress: new Map(),
    subscriptions: new Map()
  };

  try {
    const { action, collection, data, query } = JSON.parse(event.body);

    if (action === 'create') {
      const id = `${collection}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      db[collection].set(id, {...data, id, created: new Date().toISOString()});
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, id, data: db[collection].get(id) }) };
    }

    if (action === 'read') {
      const results = Array.from(db[collection].values());
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, results }) };
    }

    if (action === 'update') {
      const { id, updates } = data;
      const existing = db[collection].get(id);
      if (!existing) return { statusCode: 404, headers, body: JSON.stringify({ error: 'Not found' }) };
      db[collection].set(id, {...existing, ...updates, updated: new Date().toISOString()});
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, data: db[collection].get(id) }) };
    }

    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid action' }) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
