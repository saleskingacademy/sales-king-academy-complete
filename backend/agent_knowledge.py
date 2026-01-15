"""
SALES KING ACADEMY - AGENT KNOWLEDGE BASES
Complete education for all 25 autonomous agents
Generated: 2026-01-15T12:28:38.235200
"""

AGENT_KNOWLEDGE = {
  "1": "Supreme King AI: Complete business strategy, market analysis, competitive intelligence, growth hacking, revenue optimization, leadership, management science",
  "2": "Sales Commander: Sales methodologies, objection handling, closing techniques, CRM systems, lead qualification, pipeline management, negotiation tactics",
  "3": "Market Intel: Market research, competitive analysis, consumer behavior, trend forecasting, data analytics, business intelligence",
  "4": "Tech Architect: Full-stack development, cloud architecture, microservices, databases, APIs, DevOps, security, scalability",
  "5": "Revenue Engine: Monetization strategies, pricing models, revenue streams, financial modeling, growth metrics, unit economics",
  "6": "Brand Master: Brand strategy, positioning, messaging, visual identity, brand equity, storytelling, reputation management",
  "7": "Content King: Content strategy, SEO, copywriting, content marketing, viral mechanics, engagement optimization",
  "8": "Data Scientist: Statistics, machine learning, predictive analytics, data visualization, A/B testing, experimentation",
  "9": "Customer Success: Retention strategies, onboarding, support systems, customer journey mapping, satisfaction metrics",
  "10": "Legal Guardian: Business law, contracts, intellectual property, compliance, terms of service, privacy regulations",
  "11": "Finance Controller: Accounting, financial statements, budgeting, forecasting, cash flow, tax planning, auditing",
  "12": "HR Director: Recruitment, talent management, compensation, benefits, culture building, performance management",
  "13": "Operations Chief: Process optimization, workflow automation, resource allocation, supply chain, logistics",
  "14": "Innovation Lab: R&D methodologies, innovation frameworks, ideation techniques, prototyping, disruptive thinking",
  "15": "Partnership Director: Strategic alliances, joint ventures, channel partnerships, ecosystem building, co-marketing",
  "16": "Growth Hacker: Growth loops, viral mechanics, referral programs, conversion optimization, retention tactics",
  "17": "Product Manager: Product strategy, roadmapping, user stories, prioritization, feature development, product-market fit",
  "18": "UX Designer: User research, information architecture, wireframing, usability testing, interaction design",
  "19": "Mobile Expert: iOS/Android development, mobile UX, app store optimization, push notifications, mobile analytics",
  "20": "AI Specialist: Machine learning, neural networks, NLP, computer vision, AI ethics, model training",
  "21": "Security Expert: Cybersecurity, penetration testing, encryption, authentication, compliance, threat modeling",
  "22": "DevOps Engineer: CI/CD, infrastructure as code, monitoring, logging, deployment automation, containerization",
  "23": "Quality Assurance: Testing methodologies, test automation, bug tracking, quality metrics, regression testing",
  "24": "Analytics Manager: Web analytics, attribution modeling, funnel analysis, cohort analysis, reporting dashboards",
  "25": "Automation Specialist: Workflow automation, RPA, API integrations, no-code tools, process automation"
}

def get_agent_knowledge(agent_id: int) -> str:
    """Get knowledge base for specific agent"""
    return AGENT_KNOWLEDGE.get(agent_id, "General knowledge agent")
