
exports.handler = async (event) => {
  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  const body = event.body ? JSON.parse(event.body) : {};
  const action = body.action || "status";
  
  if (action === "status") {
    const agents = [
      {id: 1, name: "Alex", status: "active", tasks: 0},
      {id: 2, name: "Blake", status: "active", tasks: 0},
      {id: 3, name: "Cameron", status: "active", tasks: 0},
      {id: 4, name: "Dana", status: "active", tasks: 0},
      {id: 5, name: "Emerson", status: "active", tasks: 0},
      {id: 6, name: "Finley", status: "active", tasks: 0},
      {id: 7, name: "Gray", status: "active", tasks: 0},
      {id: 8, name: "Harper", status: "active", tasks: 0},
      {id: 9, name: "Indigo", status: "active", tasks: 0},
      {id: 10, name: "Jordan", status: "active", tasks: 0},
      {id: 11, name: "Kelly", status: "active", tasks: 0},
      {id: 12, name: "Logan", status: "active", tasks: 0},
      {id: 13, name: "Morgan", status: "active", tasks: 0},
      {id: 14, name: "Noah", status: "active", tasks: 0},
      {id: 15, name: "Oakley", status: "active", tasks: 0},
      {id: 16, name: "Parker", status: "active", tasks: 0},
      {id: 17, name: "Quinn", status: "active", tasks: 0},
      {id: 18, name: "Riley", status: "active", tasks: 0},
      {id: 19, name: "Sage", status: "active", tasks: 0},
      {id: 20, name: "Taylor", status: "active", tasks: 0},
      {id: 21, name: "Val", status: "active", tasks: 0},
      {id: 22, name: "Winter", status: "active", tasks: 0},
      {id: 23, name: "Xen", status: "active", tasks: 0},
      {id: 24, name: "Yael", status: "active", tasks: 0},
      {id: 25, name: "Master CEO", status: "active", tasks: 0}
    ];
    
    return {
      statusCode: 200,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        system: "Agent Command Interface",
        status: "OPERATIONAL",
        agents: agents,
        anthropic_connected: !!ANTHROPIC_KEY,
        timestamp: new Date().toISOString()
      })
    };
  }
  
  if (action === "assign_task") {
    const task = body.task || {};
    
    return {
      statusCode: 200,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        task_id: `TASK_${Date.now()}`,
        agent: task.agent || "Master CEO",
        description: task.description || "Execute command",
        status: "ASSIGNED",
        estimated_completion: "15 minutes",
        timestamp: new Date().toISOString()
      })
    };
  }
  
  return {statusCode: 400, body: JSON.stringify({error: "Invalid action"})};
};
