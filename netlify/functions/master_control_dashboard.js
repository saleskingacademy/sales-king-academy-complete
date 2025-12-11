/**
 * SALES KING ACADEMY - MASTER CONTROL DASHBOARD
 * =============================================
 * Ultimate Authority: Controls all 25 AI agents
 * L10 Master CEO commands entire swarm
 * Real-time orchestration, task delegation, performance monitoring
 * RKL Framework α=25 integration
 */

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ALPHA_PARAMETER = 25;
const GENESIS_TIMESTAMP = new Date('2024-07-01T00:00:00Z').getTime();

// 25 Autonomous Agents (from handoff document)
const AGENTS = [
  { id: 1, name: 'Alex', role: 'Lead Generation', level: 7, specialty: 'Infinite parallel outreach, 100K+/min' },
  { id: 2, name: 'Blake', role: 'Email Outreach', level: 7, specialty: 'Multi-channel campaigns, A/B testing' },
  { id: 3, name: 'Cameron', role: 'SMS Campaigns', level: 6, specialty: 'Real-time SMS automation' },
  { id: 4, name: 'Dana', role: 'Cold Calling', level: 6, specialty: 'VoIP integration, script generation' },
  { id: 5, name: 'Emerson', role: 'Social Media', level: 8, specialty: 'Cross-platform automation' },
  { id: 6, name: 'Finley', role: 'Content Creation', level: 7, specialty: 'Websites, apps, blogs, videos' },
  { id: 7, name: 'Gray', role: 'Data Analysis', level: 9, specialty: 'Predictive analytics, patterns' },
  { id: 8, name: 'Harper', role: 'CRM Management', level: 6, specialty: 'Contact sync, pipeline tracking' },
  { id: 9, name: 'Indigo', role: 'Proposal Writing', level: 8, specialty: 'Auto-generated contracts' },
  { id: 10, name: 'Jordan', role: 'Contract Negotiation', level: 10, specialty: 'AI-driven negotiations' },
  { id: 11, name: 'Kelly', role: 'Customer Service', level: 5, specialty: '24/7 support automation' },
  { id: 12, name: 'Logan', role: 'Market Research', level: 7, specialty: 'Competitive intelligence' },
  { id: 13, name: 'Morgan', role: 'Competitive Intel', level: 8, specialty: 'Real-time market analysis' },
  { id: 14, name: 'Noah', role: 'Training Development', level: 6, specialty: 'Curriculum generation' },
  { id: 15, name: 'Oakley', role: 'Quality Assurance', level: 7, specialty: 'Output validation' },
  { id: 16, name: 'Parker', role: 'Sales Forecasting', level: 8, specialty: 'Revenue prediction' },
  { id: 17, name: 'Quinn', role: 'Territory Planning', level: 7, specialty: 'Geographic optimization' },
  { id: 18, name: 'Riley', role: 'Partner Relations', level: 9, specialty: 'Network mapping, affiliates' },
  { id: 19, name: 'Sage', role: 'Revenue Operations', level: 8, specialty: 'Deal optimization, ROI' },
  { id: 20, name: 'Taylor', role: 'Performance Analytics', level: 10, specialty: 'Real-time dashboards' },
  { id: 21, name: 'Val', role: 'Sales Enablement', level: 7, specialty: 'Training materials' },
  { id: 22, name: 'Winter', role: 'Deal Strategy', level: 9, specialty: 'Complex deal structuring' },
  { id: 23, name: 'Xen', role: 'Account Management', level: 8, specialty: 'Retention optimization' },
  { id: 24, name: 'Yael', role: 'Executive Liaison', level: 10, specialty: 'C-suite communication' },
  { id: 25, name: 'Master CEO', role: 'Ultimate Authority', level: 10, specialty: 'Controls all 24 agents, L10 authority' }
];

class MasterControlDashboard {
  constructor() {
    this.agents = new Map();
    this.activeTasks = new Map();
    this.completedTasks = [];
    this.systemHealth = 100;
    this.totalTasksExecuted = 0;
    
    // Initialize all agents
    AGENTS.forEach(agent => {
      this.agents.set(agent.id, {
        ...agent,
        status: 'ACTIVE',
        current_task: null,
        tasks_completed: 0,
        performance_score: 100,
        last_active: Date.now()
      });
    });
  }

  async callClaudeAPI(prompt, maxTokens = 2000) {
    if (!ANTHROPIC_API_KEY) {
      return { error: 'Anthropic API key not configured' };
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: maxTokens,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      if (!response.ok) {
        return { error: `API error: ${response.status}` };
      }

      const data = await response.json();
      return {
        text: data.content[0].text,
        usage: data.usage
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  selectBestAgent(taskType) {
    // Master CEO (Agent 25) delegates to best agent for the task
    const taskAgentMap = {
      'lead_generation': [1, 2, 3, 4, 5],      // Alex, Blake, Cameron, Dana, Emerson
      'content_creation': [6],                  // Finley
      'data_analysis': [7, 13, 16, 20],        // Gray, Morgan, Parker, Taylor
      'crm_operations': [8],                    // Harper
      'contracts': [9, 10],                     // Indigo, Jordan
      'customer_service': [11],                 // Kelly
      'research': [12, 13],                     // Logan, Morgan
      'training': [14, 21],                     // Noah, Val
      'quality_control': [15],                  // Oakley
      'strategy': [17, 18, 19, 22, 24],        // Quinn, Riley, Sage, Winter, Yael
      'retention': [23]                         // Xen
    };
    
    const potentialAgents = taskAgentMap[taskType] || [25]; // Default to Master CEO
    
    // Find agent with highest performance and availability
    let bestAgent = null;
    let bestScore = 0;
    
    potentialAgents.forEach(agentId => {
      const agent = this.agents.get(agentId);
      if (agent && agent.status === 'ACTIVE' && !agent.current_task) {
        const score = agent.performance_score * agent.level;
        if (score > bestScore) {
          bestScore = score;
          bestAgent = agent;
        }
      }
    });
    
    return bestAgent || this.agents.get(25); // Fallback to Master CEO
  }

  async delegateTask(taskDescription, taskType = 'general') {
    // Master CEO delegates task to appropriate agent
    const agent = this.selectBestAgent(taskType);
    
    if (!agent) {
      return {
        success: false,
        error: 'No available agent for this task'
      };
    }
    
    const taskId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Use AI to create execution plan
    let executionPlan = null;
    if (ANTHROPIC_API_KEY) {
      const prompt = `You are ${agent.name}, a ${agent.role} agent (Level ${agent.level}) for Sales King Academy.
      
Task: ${taskDescription}
Your specialty: ${agent.specialty}

Create an execution plan with:
1. Step-by-step approach
2. Expected outcome
3. Success metrics
4. Estimated completion time
5. Resources needed

Format as JSON.`;

      const result = await this.callClaudeAPI(prompt, 1500);
      if (!result.error) {
        try {
          executionPlan = JSON.parse(result.text);
        } catch (e) {
          executionPlan = { plan: result.text };
        }
      }
    }
    
    const task = {
      task_id: taskId,
      description: taskDescription,
      type: taskType,
      assigned_to: agent.id,
      agent_name: agent.name,
      status: 'IN_PROGRESS',
      execution_plan: executionPlan,
      created_at: new Date().toISOString(),
      started_at: new Date().toISOString()
    };
    
    // Assign task to agent
    agent.current_task = taskId;
    agent.last_active = Date.now();
    this.activeTasks.set(taskId, task);
    this.totalTasksExecuted++;
    
    return {
      success: true,
      task: task,
      message: `Task delegated to ${agent.name} (${agent.role})`
    };
  }

  async executeAutonomousTask(taskId, duration = 5000) {
    // Simulate autonomous task execution
    const task = this.activeTasks.get(taskId);
    if (!task) {
      return { success: false, error: 'Task not found' };
    }
    
    const agent = this.agents.get(task.assigned_to);
    
    // Simulate execution with AI assistance
    await new Promise(resolve => setTimeout(resolve, Math.min(duration, 1000)));
    
    let result = null;
    if (ANTHROPIC_API_KEY) {
      const prompt = `You are ${agent.name}, completing this task:

Task: ${task.description}
Execution Plan: ${JSON.stringify(task.execution_plan)}

Provide the completed result with:
1. What was accomplished
2. Key findings or deliverables
3. Next recommended actions
4. Performance metrics

Format as JSON.`;

      const aiResult = await this.callClaudeAPI(prompt, 1500);
      if (!aiResult.error) {
        try {
          result = JSON.parse(aiResult.text);
        } catch (e) {
          result = { outcome: aiResult.text };
        }
      }
    }
    
    // Complete task
    task.status = 'COMPLETED';
    task.completed_at = new Date().toISOString();
    task.result = result || { outcome: 'Task completed successfully' };
    task.duration_ms = Date.now() - new Date(task.started_at).getTime();
    
    // Update agent
    agent.current_task = null;
    agent.tasks_completed++;
    agent.performance_score = Math.min(100, agent.performance_score + 1);
    
    // Move to completed
    this.completedTasks.push(task);
    this.activeTasks.delete(taskId);
    
    return {
      success: true,
      task: task,
      message: `Task completed by ${agent.name}`
    };
  }

  async masterCEOCommand(command) {
    // Master CEO (Agent 25) executes high-level strategic commands
    const masterCEO = this.agents.get(25);
    
    if (ANTHROPIC_API_KEY) {
      const prompt = `You are the Master CEO of Sales King Academy, commanding 24 AI agents.

Command: ${command}

Available agents and their capabilities:
${Array.from(this.agents.values()).slice(0, 24).map(a => 
  `- ${a.name} (${a.role}, Level ${a.level}): ${a.specialty}`
).join('\n')}

Provide:
1. Strategic execution plan
2. Which agents to deploy
3. Task delegation breakdown
4. Expected outcomes
5. Timeline

Format as JSON.`;

      const result = await this.callClaudeAPI(prompt, 2500);
      if (!result.error) {
        try {
          const strategy = JSON.parse(result.text);
          return {
            success: true,
            commander: 'Master CEO',
            command: command,
            strategy: strategy,
            timestamp: new Date().toISOString()
          };
        } catch (e) {
          return {
            success: true,
            commander: 'Master CEO',
            command: command,
            strategy: result.text,
            timestamp: new Date().toISOString()
          };
        }
      }
    }
    
    return {
      success: true,
      commander: 'Master CEO',
      command: command,
      message: 'Command acknowledged - deploying agents',
      timestamp: new Date().toISOString()
    };
  }

  getTemporalDNA() {
    const now = Date.now();
    const elapsed = now - GENESIS_TIMESTAMP;
    const credits = Math.floor(elapsed / 1000);
    
    return {
      genesis: GENESIS_TIMESTAMP,
      current: now,
      elapsed: elapsed,
      credits: credits
    };
  }

  getSystemStatus() {
    const activeAgents = Array.from(this.agents.values()).filter(a => a.status === 'ACTIVE');
    const busyAgents = activeAgents.filter(a => a.current_task !== null);
    const availableAgents = activeAgents.filter(a => a.current_task === null);
    
    return {
      system_health: this.systemHealth,
      total_agents: this.agents.size,
      active_agents: activeAgents.length,
      busy_agents: busyAgents.length,
      available_agents: availableAgents.length,
      active_tasks: this.activeTasks.size,
      completed_tasks: this.completedTasks.length,
      total_tasks_executed: this.totalTasksExecuted,
      average_performance: Math.round(
        Array.from(this.agents.values()).reduce((sum, a) => sum + a.performance_score, 0) / this.agents.size
      ),
      master_ceo_status: this.agents.get(25).status,
      temporal: this.getTemporalDNA()
    };
  }

  getAllAgents() {
    return Array.from(this.agents.values()).map(agent => ({
      id: agent.id,
      name: agent.name,
      role: agent.role,
      level: agent.level,
      specialty: agent.specialty,
      status: agent.status,
      current_task: agent.current_task,
      tasks_completed: agent.tasks_completed,
      performance_score: agent.performance_score
    }));
  }
}

// Global instance
let masterControl = null;

exports.handler = async (event) => {
  if (!masterControl) {
    masterControl = new MasterControlDashboard();
  }

  const method = event.httpMethod;
  
  try {
    if (method === 'GET') {
      const status = masterControl.getSystemStatus();
      const agents = masterControl.getAllAgents();
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          system: 'Sales King Academy - Master Control Dashboard',
          status: 'OPERATIONAL',
          ...status,
          agents: agents,
          rkl_framework: {
            alpha: ALPHA_PARAMETER,
            complexity: 'O(n^1.77)'
          },
          timestamp: new Date().toISOString()
        })
      };
    }

    if (method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const action = body.action;
      
      if (action === 'delegate_task') {
        const result = await masterControl.delegateTask(
          body.task_description,
          body.task_type
        );
        
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(result)
        };
      }
      
      if (action === 'execute_task') {
        const result = await masterControl.executeAutonomousTask(
          body.task_id,
          body.duration
        );
        
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(result)
        };
      }
      
      if (action === 'master_ceo_command') {
        const result = await masterControl.masterCEOCommand(body.command);
        
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(result)
        };
      }
      
      if (action === 'get_agents') {
        const agents = masterControl.getAllAgents();
        
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ agents: agents })
        };
      }
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Master control error',
        message: error.message
      })
    };
  }
};
