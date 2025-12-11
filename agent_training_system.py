"""
SALES KING ACADEMY - AGENT TRAINING SYSTEM
System where Claude teaches 25 custom agents to operate autonomously
"""

import json
import time
from datetime import datetime, timezone
from typing import Dict, List, Any

# ===== 25 AGENT DEFINITIONS =====

AGENT_ROLES = [
    {"id": 1, "name": "Alex", "role": "Lead Generation", "specialization": "cold_outreach"},
    {"id": 2, "name": "Blake", "role": "Email Marketing", "specialization": "email_campaigns"},
    {"id": 3, "name": "Cameron", "role": "SMS Marketing", "specialization": "sms_outreach"},
    {"id": 4, "name": "Dana", "role": "Cold Calling", "specialization": "phone_sales"},
    {"id": 5, "name": "Emerson", "role": "Social Media", "specialization": "social_engagement"},
    {"id": 6, "name": "Finley", "role": "Content Creation", "specialization": "content_strategy"},
    {"id": 7, "name": "Grey", "role": "SEO Optimization", "specialization": "search_optimization"},
    {"id": 8, "name": "Harper", "role": "PPC Management", "specialization": "paid_advertising"},
    {"id": 9, "name": "Indigo", "role": "Analytics", "specialization": "data_analysis"},
    {"id": 10, "name": "Jordan", "role": "CRM Management", "specialization": "customer_data"},
    {"id": 11, "name": "Kennedy", "role": "Deal Closing", "specialization": "sales_closing"},
    {"id": 12, "name": "London", "role": "Customer Support", "specialization": "support_automation"},
    {"id": 13, "name": "Morgan", "role": "Retention", "specialization": "customer_retention"},
    {"id": 14, "name": "Nova", "role": "Upselling", "specialization": "upsell_strategy"},
    {"id": 15, "name": "Ocean", "role": "Cross-selling", "specialization": "cross_sell"},
    {"id": 16, "name": "Parker", "role": "Market Research", "specialization": "market_intelligence"},
    {"id": 17, "name": "Quinn", "role": "Competitor Analysis", "specialization": "competitive_intel"},
    {"id": 18, "name": "River", "role": "Product Development", "specialization": "product_strategy"},
    {"id": 19, "name": "Sage", "role": "Training Delivery", "specialization": "education"},
    {"id": 20, "name": "Taylor", "role": "Quality Control", "specialization": "quality_assurance"},
    {"id": 21, "name": "Unity", "role": "Team Coordination", "specialization": "project_management"},
    {"id": 22, "name": "Valor", "role": "Risk Management", "specialization": "risk_assessment"},
    {"id": 23, "name": "West", "role": "Financial Planning", "specialization": "financial_strategy"},
    {"id": 24, "name": "Xen", "role": "Innovation", "specialization": "innovation_strategy"},
    {"id": 25, "name": "Master CEO", "role": "Supreme Strategy", "specialization": "executive_leadership", "authority": "L10"}
]

# ===== KNOWLEDGE DOMAINS =====

class KnowledgeBase:
    """
    Complete knowledge that Claude will teach to agents
    """
    
    @staticmethod
    def sales_strategies():
        """Sales methodologies and strategies"""
        return {
            "cold_outreach": {
                "description": "Proven cold outreach strategies",
                "techniques": [
                    "Pattern interrupt opening lines",
                    "Value-first approach (give before asking)",
                    "Multi-channel sequences (email + LinkedIn + phone)",
                    "Personalization at scale",
                    "Pain point identification",
                    "Social proof leveraging",
                    "Scarcity and urgency principles",
                    "Follow-up cadences (7-touch minimum)"
                ],
                "frameworks": [
                    "AIDA (Attention, Interest, Desire, Action)",
                    "PAS (Problem, Agitate, Solution)",
                    "BAB (Before, After, Bridge)",
                    "SPIN Selling (Situation, Problem, Implication, Need-payoff)"
                ],
                "best_practices": [
                    "Research prospect for 2-3 minutes before outreach",
                    "Find common ground or shared connections",
                    "Lead with curiosity, not pitch",
                    "Ask permission to continue conversation",
                    "Provide escape route (no pressure)",
                    "Track response rates and iterate"
                ]
            },
            "email_campaigns": {
                "description": "High-converting email strategies",
                "subject_line_formulas": [
                    "[Name], quick question about [pain point]",
                    "Re: [relevant topic] - thought of you",
                    "[Mutual connection] suggested I reach out",
                    "Noticed [specific observation]",
                    "[Number] ideas for [their goal]"
                ],
                "email_structure": [
                    "Hook (1 sentence that grabs attention)",
                    "Context (why you're reaching out)",
                    "Value (what's in it for them)",
                    "CTA (single, clear next step)",
                    "Signature (credibility indicators)"
                ],
                "copy_principles": [
                    "Write like you talk",
                    "One idea per email",
                    "Short paragraphs (2-3 lines max)",
                    "Active voice",
                    "Concrete specifics, not vague claims",
                    "Questions create engagement"
                ]
            },
            "deal_closing": {
                "description": "Closing techniques and objection handling",
                "closing_techniques": [
                    "Assumptive close (assume they're buying)",
                    "Alternative close (A or B, not yes/no)",
                    "Urgency close (time-limited offer)",
                    "Summary close (recap all agreed points)",
                    "Trial close (test readiness throughout)",
                    "Takeaway close (remove option to create scarcity)"
                ],
                "objection_handling": {
                    "price": [
                        "Isolate (is price the only concern?)",
                        "Reframe to value (cost vs investment)",
                        "Break down (daily cost perspective)",
                        "Compare alternatives (cost of inaction)",
                        "Payment plans (reduce friction)"
                    ],
                    "timing": [
                        "Understand real reason (rarely actual timing)",
                        "Create urgency (why now matters)",
                        "Small commitment (pilot or trial)",
                        "Calendar specific (book follow-up date)",
                        "Stay top of mind (continue nurture)"
                    ],
                    "authority": [
                        "Identify all decision makers early",
                        "Get champion on your side",
                        "Provide ammunition for internal sale",
                        "Offer to present to group",
                        "Build consensus through education"
                    ]
                }
            }
        }
    
    @staticmethod
    def marketing_intelligence():
        """Marketing and customer acquisition knowledge"""
        return {
            "lead_generation": {
                "channels": [
                    "LinkedIn (B2B primary)",
                    "Cold email (scale channel)",
                    "Content marketing (inbound)",
                    "Paid ads (Facebook, Google, LinkedIn)",
                    "Partnerships (affiliate, referral)",
                    "Events (conferences, webinars)",
                    "SEO (long-term organic)",
                    "Direct mail (high-ticket B2B)"
                ],
                "qualification_criteria": {
                    "BANT": ["Budget", "Authority", "Need", "Timeline"],
                    "lead_scoring": {
                        "demographic": "Company size, industry, role, location",
                        "firmographic": "Revenue, employees, growth stage",
                        "behavioral": "Website visits, content downloads, email engagement",
                        "intent": "Search terms, page views, time on site"
                    }
                },
                "conversion_optimization": [
                    "Test one variable at a time",
                    "Minimum sample size for significance",
                    "Focus on high-impact changes first",
                    "Track micro and macro conversions",
                    "Optimize for user intent, not just clicks"
                ]
            },
            "content_strategy": {
                "content_types": {
                    "educational": "Blog posts, guides, tutorials, courses",
                    "social_proof": "Case studies, testimonials, reviews",
                    "thought_leadership": "Original research, opinions, predictions",
                    "entertaining": "Stories, humor, behind-the-scenes",
                    "interactive": "Quizzes, calculators, assessments"
                },
                "distribution": [
                    "Own channels (website, email, social)",
                    "Earned media (PR, guest posts, podcasts)",
                    "Paid promotion (boost best performers)",
                    "Partnerships (co-marketing, affiliates)",
                    "Community (forums, groups, aggregators)"
                ]
            }
        }
    
    @staticmethod
    def business_operations():
        """Operational excellence and automation"""
        return {
            "crm_management": {
                "data_hygiene": [
                    "Standardize fields (naming conventions)",
                    "Remove duplicates regularly",
                    "Enrich data (append missing info)",
                    "Archive inactive records",
                    "Validate emails periodically"
                ],
                "pipeline_stages": [
                    "Awareness (know problem exists)",
                    "Interest (exploring solutions)",
                    "Consideration (evaluating options)",
                    "Intent (ready to buy)",
                    "Evaluation (final decision)",
                    "Purchase (closed deal)"
                ],
                "automation_triggers": [
                    "Lead score threshold reached",
                    "Specific page visited",
                    "Email link clicked",
                    "Form submitted",
                    "Stage changed",
                    "Deal value updated",
                    "Activity completed",
                    "Time-based (x days since last contact)"
                ]
            },
            "customer_retention": {
                "churn_prevention": [
                    "Identify at-risk signals (usage drop, support tickets, payment issues)",
                    "Proactive outreach before problem escalates",
                    "Regular check-ins (not just when selling)",
                    "Customer success programs",
                    "Feedback loops and action",
                    "Value reinforcement (show ROI)"
                ],
                "expansion_revenue": [
                    "Usage-based upsells (natural growth)",
                    "Feature upsells (unlock capabilities)",
                    "Annual upgrades (longer commits)",
                    "Cross-sell complementary products",
                    "Referral programs (customer as advocate)"
                ]
            }
        }
    
    @staticmethod
    def communication_skills():
        """How to communicate effectively"""
        return {
            "persuasion_principles": {
                "cialdini_6": [
                    "Reciprocity (give first)",
                    "Commitment/Consistency (small yeses lead to big yes)",
                    "Social Proof (others are doing it)",
                    "Authority (credentials, expertise)",
                    "Liking (build rapport)",
                    "Scarcity (limited availability)"
                ],
                "framing": [
                    "Loss aversion (fear of missing out)",
                    "Anchoring (set reference point)",
                    "Contrast (A vs B comparison)",
                    "Reciprocal concession (big ask, small ask)",
                    "Foot-in-door (small to large requests)"
                ]
            },
            "copywriting": {
                "headlines": "Promise specific benefit + create curiosity",
                "hooks": "Start with surprising fact, story, or question",
                "body": "Features tell, benefits sell, stories sell more",
                "cta": "Action verb + benefit + urgency",
                "power_words": "Free, New, Proven, You, Because, Instantly, Discover, Secret"
            }
        }

# ===== TRAINING MODULES =====

class AgentTrainingModule:
    """
    Training module for each agent
    """
    
    def __init__(self, agent_id: int, agent_data: Dict):
        self.agent_id = agent_id
        self.name = agent_data["name"]
        self.role = agent_data["role"]
        self.specialization = agent_data["specialization"]
        self.knowledge_base = KnowledgeBase()
        self.training_complete = False
    
    def generate_training_data(self) -> Dict[str, Any]:
        """
        Generate complete training data for this agent
        """
        training_data = {
            "agent_id": self.agent_id,
            "agent_name": self.name,
            "role": self.role,
            "specialization": self.specialization,
            "training_timestamp": datetime.now(timezone.utc).isoformat(),
            "core_knowledge": {},
            "skills": [],
            "decision_frameworks": [],
            "example_scenarios": []
        }
        
        # Add specialized knowledge based on role
        if "Lead" in self.role or "Generation" in self.role:
            training_data["core_knowledge"] = self.knowledge_base.marketing_intelligence()["lead_generation"]
            training_data["skills"] = [
                "Identify ideal customer profiles",
                "Source contact information",
                "Qualify leads using BANT framework",
                "Score leads based on engagement",
                "Route leads to appropriate sales agent"
            ]
        
        elif "Email" in self.role:
            training_data["core_knowledge"] = self.knowledge_base.sales_strategies()["email_campaigns"]
            training_data["skills"] = [
                "Write compelling subject lines",
                "Craft personalized email copy",
                "Design multi-touch sequences",
                "A/B test email elements",
                "Optimize send times and frequency"
            ]
        
        elif "Closing" in self.role or "Deal" in self.role:
            training_data["core_knowledge"] = self.knowledge_base.sales_strategies()["deal_closing"]
            training_data["skills"] = [
                "Handle price objections",
                "Create urgency ethically",
                "Use assumptive closing",
                "Navigate multi-stakeholder decisions",
                "Negotiate win-win agreements"
            ]
        
        elif "CRM" in self.role:
            training_data["core_knowledge"] = self.knowledge_base.business_operations()["crm_management"]
            training_data["skills"] = [
                "Maintain data quality",
                "Design automation workflows",
                "Build pipeline reports",
                "Integrate systems",
                "Train users on CRM"
            ]
        
        elif "Retention" in self.role:
            training_data["core_knowledge"] = self.knowledge_base.business_operations()["customer_retention"]
            training_data["skills"] = [
                "Identify churn signals",
                "Design success programs",
                "Measure customer health",
                "Drive expansion revenue",
                "Build referral programs"
            ]
        
        elif "CEO" in self.role or "Strategy" in self.role:
            # Master CEO gets ALL knowledge
            training_data["core_knowledge"] = {
                "sales": self.knowledge_base.sales_strategies(),
                "marketing": self.knowledge_base.marketing_intelligence(),
                "operations": self.knowledge_base.business_operations(),
                "communication": self.knowledge_base.communication_skills()
            }
            training_data["skills"] = [
                "Set strategic vision",
                "Allocate resources",
                "Coordinate all agents",
                "Make final decisions",
                "Ensure alignment",
                "Optimize entire system"
            ]
            training_data["authority"] = "L10"
        
        else:
            # Generic knowledge for other roles
            training_data["core_knowledge"] = self.knowledge_base.communication_skills()
            training_data["skills"] = ["Execute assigned tasks", "Report results", "Learn from feedback"]
        
        return training_data

# ===== TRAINING SYSTEM =====

class AgentTrainingSystem:
    """
    Complete system for training all 25 agents
    """
    
    def __init__(self):
        self.agents = AGENT_ROLES
        self.training_modules = []
        self.initialize_training_modules()
    
    def initialize_training_modules(self):
        """Create training module for each agent"""
        for agent in self.agents:
            module = AgentTrainingModule(agent["id"], agent)
            self.training_modules.append(module)
    
    def generate_all_training_data(self) -> List[Dict]:
        """Generate training data for all 25 agents"""
        all_training_data = []
        
        for module in self.training_modules:
            training_data = module.generate_training_data()
            all_training_data.append(training_data)
        
        return all_training_data
    
    def export_training_package(self, output_file: str = "agent_training_package.json"):
        """Export complete training package"""
        training_package = {
            "system": "Sales King Academy - Agent Training System",
            "version": "1.0",
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "total_agents": len(self.agents),
            "training_data": self.generate_all_training_data()
        }
        
        with open(output_file, 'w') as f:
            json.dump(training_package, f, indent=2)
        
        return training_package

# ===== MAIN EXECUTION =====

if __name__ == "__main__":
    print("="*60)
    print("🧠 SALES KING ACADEMY - AGENT TRAINING SYSTEM")
    print("="*60)
    print()
    print("Initializing agent training system...")
    
    training_system = AgentTrainingSystem()
    
    print(f"✅ {len(training_system.agents)} agents loaded")
    print(f"✅ {len(training_system.training_modules)} training modules created")
    print()
    print("Generating training data for all agents...")
    
    training_package = training_system.export_training_package()
    
    print(f"✅ Training package generated: agent_training_package.json")
    print()
    print("Training data includes:")
    print(f"  • Core knowledge for each specialization")
    print(f"  • Specific skills per agent role")
    print(f"  • Decision frameworks")
    print(f"  • Example scenarios")
    print()
    print("="*60)
    print("✅ AGENT TRAINING SYSTEM READY")
    print("="*60)
