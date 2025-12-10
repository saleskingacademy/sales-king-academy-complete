exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  const { buildType, specs } = JSON.parse(event.body);
  const templates = {
    website: `<!DOCTYPE html><html><head><title>${specs}</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-gray-900 text-white p-8"><h1 class="text-4xl font-bold mb-4">${specs}</h1><p>Built by Agent 20 - Sales King Academy AI</p></body></html>`,
    app: `// ${specs} Mobile App\nimport React from 'react';\nexport default function App() {\n  return <div><h1>${specs}</h1></div>;\n}`,
    api: `// ${specs} API\nconst express = require('express');\nconst app = express();\napp.get('/api', (req,res) => res.json({message:'${specs}'}));\napp.listen(3000);`
  };
  return { statusCode: 200, headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}, body: JSON.stringify({code: templates[buildType] || 'Invalid build type', agent: 'Agent 20', timestamp: new Date().toISOString()}) };
};
