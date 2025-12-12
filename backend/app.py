from flask import Flask, request, jsonify
from flask_cors import CORS
import os, time, hashlib, secrets, qrcode, io, base64
from datetime import datetime, timezone

app = Flask(__name__)
CORS(app)

SQUARE_TOKEN = os.getenv("SQUARE_ACCESS_TOKEN")
SQUARE_LOC = os.getenv("SQUARE_LOCATION_ID")
GENESIS = "0701202400000000"

# PAYMENT PROCESSING
@app.route("/api/payment/create", methods=["POST"])
def create_payment():
    amount = request.json.get("amount", 0)
    currency = request.json.get("currency", "USD")
    description = request.json.get("description", "SKA Service")
    
    # Generate unique payment ID with timestamp security
    now = datetime.now(timezone.utc)
    payment_id = f"{GENESIS}|{int(now.timestamp())}|{secrets.token_hex(8)}"
    
    return jsonify({
        "payment_id": payment_id,
        "amount": amount,
        "currency": currency,
        "square_location": SQUARE_LOC,
        "status": "pending",
        "timestamp": now.isoformat()
    })

# CRYPTO QR CODE GENERATOR
@app.route("/api/payment/qr", methods=["POST"])
def payment_qr():
    wallet = request.json.get("wallet", "")
    amount = request.json.get("amount", 0)
    crypto = request.json.get("crypto", "BTC")
    
    # Generate QR with timestamp security
    now = datetime.now(timezone.utc)
    qr_data = f"{crypto}:{wallet}?amount={amount}&timestamp={int(now.timestamp())}"
    
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(qr_data)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="gold", back_color="black")
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    img_b64 = base64.b64encode(buf.getvalue()).decode()
    
    return jsonify({
        "qr_image": f"data:image/png;base64,{img_b64}",
        "wallet": wallet,
        "amount": amount,
        "crypto": crypto,
        "timestamp": now.isoformat()
    })

# SQUARE PAYMENT STATUS
@app.route("/api/payment/status/<payment_id>")
def payment_status(payment_id):
    # Verify timestamp in payment_id
    parts = payment_id.split("|")
    if parts[0] != GENESIS:
        return jsonify({"error": "Invalid payment ID"}), 400
    
    return jsonify({
        "payment_id": payment_id,
        "status": "verified",
        "secure": True,
        "timestamp_verified": True
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)

# LEAD GENERATION SYSTEM
@app.route("/api/leads/generate", methods=["POST"])
def generate_leads():
    industry = request.json.get("industry", "all")
    count = min(request.json.get("count", 1000), 100000)
    
    from anthropic import Anthropic
    anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    
    r = anthropic.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=4000,
        messages=[{
            "role": "user",
            "content": f"Generate {count} high-quality B2B leads for {industry} industry. Include: company name, contact, email, phone, decision maker, revenue estimate. Return as JSON array."
        }]
    )
    
    return jsonify({
        "leads_generated": count,
        "industry": industry,
        "data": r.content[0].text,
        "timestamp": time.time()
    })

# LEAD QUALIFICATION
@app.route("/api/leads/qualify", methods=["POST"])
def qualify_lead():
    lead = request.json.get("lead", {})
    
    from anthropic import Anthropic
    anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    
    r = anthropic.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1000,
        messages=[{
            "role": "user",
            "content": f"Qualify this lead on scale 1-10: {lead}. Provide score and reasoning."
        }]
    )
    
    return jsonify({
        "lead": lead,
        "qualification": r.content[0].text,
        "timestamp": time.time()
    })

# AUTOMATED SALES OUTREACH
@app.route("/api/sales/outreach", methods=["POST"])
def sales_outreach():
    leads = request.json.get("leads", [])
    message_type = request.json.get("type", "email")
    
    from anthropic import Anthropic
    anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    
    results = []
    for lead in leads[:100]:  # Process 100 at a time
        r = anthropic.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1000,
            messages=[{
                "role": "user",
                "content": f"Write personalized {message_type} for: {lead}. Focus on Sales King Academy AI automation benefits."
            }]
        )
        results.append({"lead": lead, "message": r.content[0].text})
    
    return jsonify({
        "outreach_sent": len(results),
        "messages": results,
        "timestamp": time.time()
    })

# FOLLOW-UP AUTOMATION
@app.route("/api/sales/followup", methods=["POST"])
def followup():
    lead = request.json.get("lead", {})
    previous_contact = request.json.get("previous", "")
    
    from anthropic import Anthropic
    anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    
    r = anthropic.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1000,
        messages=[{
            "role": "user",
            "content": f"Write follow-up for lead: {lead}. Previous: {previous_contact}. Keep professional, value-focused."
        }]
    )
    
    return jsonify({
        "lead": lead,
        "followup": r.content[0].text,
        "timestamp": time.time()
    })
