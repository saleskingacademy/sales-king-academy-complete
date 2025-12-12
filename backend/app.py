
from flask import Flask, request, jsonify
from flask_cors import CORS
from anthropic import Anthropic
import os, time, hashlib
from datetime import datetime, timezone

app = Flask(__name__)
CORS(app)

# Initialize
anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
GENESIS = "0701202400000000"
START = 1719792000

# SKA Credits - 1/second
@app.route("/api/credits")
def credits():
    now = time.time()
    credits = int(now - START)
    return jsonify({"credits": credits, "rate": 1, "timestamp": now})

# All 25 Agents
@app.route("/api/agent/<int:id>", methods=["POST"])
def agent(id):
    msg = request.json.get("message", "")
    r = anthropic.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2000,
        messages=[{"role": "user", "content": f"Agent {id}: {msg}"}]
    )
    return jsonify({"agent": id, "response": r.content[0].text})

# QR Code Generator
@app.route("/api/qr", methods=["POST"])
def qr():
    data = request.json.get("data", "")
    return jsonify({"qr": f"QR:{data}", "format": "svg"})

# Code Converter
@app.route("/api/convert", methods=["POST"])
def convert():
    code = request.json.get("code", "")
    from_lang = request.json.get("from", "python")
    to_lang = request.json.get("to", "javascript")
    
    prompt = f"Convert from {from_lang} to {to_lang}:\n{code}"
    r = anthropic.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=3000,
        messages=[{"role": "user", "content": prompt}]
    )
    return jsonify({"converted": r.content[0].text})

# Code Executor
@app.route("/api/execute", methods=["POST"])
def execute():
    code = request.json.get("code", "")
    try:
        result = eval(code) if len(code) < 100 else exec(code)
        return jsonify({"status": "success", "result": str(result)})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 10000)))
