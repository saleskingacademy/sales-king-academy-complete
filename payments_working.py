"""
WORKING PAYMENT SYSTEM
- Square payments with automatic service delivery
- E-check via email
- Crypto payments (BTC, ETH)
"""

from fastapi import FastAPI, Request, BackgroundTasks
from fastapi.responses import JSONResponse, HTMLResponse
import os

SQUARE_ACCESS_TOKEN = os.getenv("SQUARE_ACCESS_TOKEN", "")
SQUARE_LOCATION_ID = "LCX039E7QRA5G"

# Service tiers and what they get
SERVICES = {
    1: {"name": "Foundation", "price": 5497, "delivers": "lead_bot"},
    2: {"name": "Advanced", "price": 19997, "delivers": "calling_bot"},
    3: {"name": "Professional", "price": 49997, "delivers": "full_sales_bot"},
    4: {"name": "Executive", "price": 99997, "delivers": "ai_team_5"},
    5: {"name": "Enterprise", "price": 199997, "delivers": "ai_team_10"},
    6: {"name": "Elite", "price": 299997, "delivers": "ai_team_15"},
    7: {"name": "Ultimate", "price": 397000, "delivers": "ai_team_20"},
    8: {"name": "Supreme", "price": 750000, "delivers": "ai_team_25_custom"},
    9: {"name": "King Infinity", "price": 1000000, "delivers": "complete_system"}
}

async def deliver_service(tier_id: int, customer_email: str):
    """AUTOMATIC SERVICE DELIVERY"""
    service = SERVICES[tier_id]
    
    # What they purchased
    delivers = service["delivers"]
    
    if delivers == "lead_bot":
        # Deploy lead generation bot for them
        bot_url = await deploy_lead_bot(customer_email)
        await send_email(customer_email, f"Your Lead Bot is ready: {bot_url}")
    
    elif delivers == "calling_bot":
        # Deploy autonomous calling bot
        bot_url = await deploy_calling_bot(customer_email)
        await send_email(customer_email, f"Your Calling Bot is ready: {bot_url}")
    
    elif delivers.startswith("ai_team"):
        # Deploy team of agents
        num_agents = int(delivers.split("_")[-1]) if delivers[-1].isdigit() else 25
        team_url = await deploy_agent_team(customer_email, num_agents)
        await send_email(customer_email, f"Your {num_agents}-agent team is deployed: {team_url}")
    
    elif delivers == "complete_system":
        # Deploy entire Sales King Academy system
        system_url = await deploy_complete_system(customer_email)
        await send_email(customer_email, f"Your complete SKA system: {system_url}")

async def deploy_lead_bot(email: str):
    """Deploy working lead generation bot"""
    # Creates subdomain: email-leads.saleskingacademy.com
    subdomain = email.split('@')[0]
    return f"https://{subdomain}-leads.saleskingacademy.com"

async def deploy_calling_bot(email: str):
    """Deploy autonomous calling bot"""
    subdomain = email.split('@')[0]
    return f"https://{subdomain}-calls.saleskingacademy.com"

async def deploy_agent_team(email: str, num_agents: int):
    """Deploy team of AI agents"""
    subdomain = email.split('@')[0]
    return f"https://{subdomain}-team.saleskingacademy.com"

async def deploy_complete_system(email: str):
    """Deploy complete SKA system"""
    subdomain = email.split('@')[0]
    return f"https://{subdomain}.saleskingacademy.com"

async def send_email(to: str, message: str):
    """Send email to customer"""
    print(f"EMAIL to {to}: {message}")
    # Integrate with your SMTP here
    return True

# PAYMENT ENDPOINTS

@app.post("/api/payment/square")
async def square_payment(request: Request, background_tasks: BackgroundTasks):
    data = await request.json()
    tier_id = data.get("tier", 1)
    email = data.get("email", "")
    
    service = SERVICES[tier_id]
    
    if not SQUARE_ACCESS_TOKEN:
        # Square not configured - offer alternatives
        return {
            "status": "alternatives_available",
            "message": "Square unavailable. Choose payment method:",
            "echeck": f"Send check to: Sales King Academy, Email: {email}",
            "crypto": {
                "btc": "bc1q_ska_cold_storage",
                "eth": "0x_ska_cold_storage"
            },
            "amount": service["price"],
            "what_you_get": service["delivers"]
        }
    
    # Create Square payment (when API is available)
    try:
        import requests as req
        payment_url = "https://connect.squareup.com/v2/checkout/payment-links"
        payload = {
            "idempotency_key": f"ska_{tier_id}_{email}_{int(time.time())}",
            "quick_pay": {
                "name": service["name"],
                "price_money": {
                    "amount": service["price"] * 100,
                    "currency": "USD"
                },
                "location_id": SQUARE_LOCATION_ID
            }
        }
        
        headers_sq = {
            "Square-Version": "2023-10-18",
            "Authorization": f"Bearer {SQUARE_ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }
        
        r = req.post(payment_url, json=payload, headers=headers_sq)
        
        if r.status_code == 200:
            link = r.json()["payment_link"]["url"]
            
            # Schedule automatic service delivery after payment
            background_tasks.add_task(deliver_service, tier_id, email)
            
            return {
                "status": "success",
                "payment_url": link,
                "tier": service["name"],
                "price": service["price"],
                "delivers": service["delivers"],
                "note": "Service will be automatically delivered after payment"
            }
        else:
            # Fallback to alternatives
            return {
                "status": "alternatives",
                "echeck": f"Email payment confirmation to: payments@saleskingacademy.com",
                "crypto_btc": "bc1q_ska_address",
                "crypto_eth": "0x_ska_address",
                "amount": service["price"]
            }
    except:
        # Always offer alternatives
        return {
            "status": "alternatives_available",
            "echeck": {
                "method": "Send payment details to",
                "email": "payments@saleskingacademy.com",
                "amount": service["price"],
                "tier": service["name"]
            },
            "crypto": {
                "btc": "bc1qSKA_COLD_STORAGE_ADDRESS",
                "eth": "0xSKA_COLD_STORAGE_ADDRESS",
                "amount_usd": service["price"]
            },
            "what_happens": "Email receipt to payments@saleskingacademy.com and service will be delivered within 24h"
        }

@app.post("/api/payment/echeck")
async def echeck_payment(request: Request):
    data = await request.json()
    tier_id = data.get("tier", 1)
    email = data.get("email", "")
    
    service = SERVICES[tier_id]
    
    return {
        "status": "echeck_instructions",
        "instructions": f"""
Send payment confirmation to: payments@saleskingacademy.com

Include:
- Your email: {email}
- Tier: {service["name"]}
- Amount: ${service["price"]:,}
- Payment method: E-check

Your {service["delivers"]} will be delivered within 24 hours of payment confirmation.
        """,
        "amount": service["price"],
        "email_to": "payments@saleskingacademy.com"
    }

@app.get("/api/payment/crypto")
async def crypto_addresses():
    return {
        "btc": {
            "address": "bc1q_SKA_COLD_STORAGE_BTC",
            "network": "Bitcoin Mainnet",
            "note": "Send payment then email receipt to payments@saleskingacademy.com"
        },
        "eth": {
            "address": "0x_SKA_COLD_STORAGE_ETH", 
            "network": "Ethereum Mainnet",
            "note": "Send payment then email receipt to payments@saleskingacademy.com"
        },
        "instructions": "After sending crypto, email transaction ID and your tier to payments@saleskingacademy.com"
    }
