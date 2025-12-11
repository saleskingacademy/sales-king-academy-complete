const Anthropic = require('@anthropic-ai/sdk');

const AGENTS = [
  {id:1,name:"Alex",role:"Lead Generation",auth:"L9"},
  {id:2,name:"Blake",role:"Email Outreach",auth:"L9"},
  {id:3,name:"Cameron",role:"SMS Campaigns",auth:"L9"},
  {id:4,name:"Dana",role:"Cold Calling",auth:"L9"},
  {id:5,name:"Emerson",role:"Social Media",auth:"L9"},
  {id:6,name:"Finley",role:"Content Creation",auth:"L9"},
  {id:7,name:"Grey",role:"SEO Optimization",auth:"L9"},
  {id:8,name:"Harper",role:"PPC Management",auth:"L9"},
  {id:9,name:"Indigo",role:"Analytics",auth:"L9"},
  {id:10,name:"Jordan",role:"CRM Management",auth:"L9"},
  {id:11,name:"Kennedy",role:"Deal Closing",auth:"L9"},
  {id:12,name:"London",role:"Customer Support",auth:"L9"},
  {id:13,name:"Morgan",role:"Retention",auth:"L9"},
  {id:14,name:"Nova",role:"Upselling",auth:"L9"},
  {id:15,name:"Ocean",role:"Cross-selling",auth:"L9"},
  {id:16,name:"Parker",role:"Market Research",auth:"L9"},
  {id:17,name:"Quinn",role:"Competitor Analysis",auth:"L9"},
  {id:18,name:"River",role:"Product Development",auth:"L9"},
  {id:19,name:"Sage",role:"Training Delivery",auth:"L9"},
  {id:20,name:"Taylor",role:"Quality Control",auth:"L9"},
  {id:21,name:"Unity",role:"Team Coordination",auth:"L9"},
  {id:22,name:"Valor",role:"Risk Management",auth:"L9"},
  {id:23,name:"West",role:"Financial Planning",auth:"L9"},
  {id:24,name:"Xen",role:"Innovation",auth:"L9"},
  {id:25,name:"Master CEO",role:"Supreme Strategy",auth:"L10",private:true}
];

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {statusCode: 200, headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST'}, body: ''};
  }

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
      body: JSON.stringify({agents: AGENTS.filter(a => !a.private), total: 25, master_ceo_active: true})
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const {agent_id, task} = JSON.parse(event.body);
      const anthropic = new Anthropic({apiKey: process.env.ANTHROPIC_API_KEY});
      
      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{role: 'user', content: `Agent ${agent_id}: ${task}`}]
      });

      return {
        statusCode: 200,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        body: JSON.stringify({agent: agent_id, result: message.content[0].text})
      };
    } catch (error) {
      return {statusCode: 500, body: JSON.stringify({error: error.message})};
    }
  }

  return {statusCode: 405, body: 'Method Not Allowed'};
};
