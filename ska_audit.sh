#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 SALES KING ACADEMY - COMPLETE SYSTEM AUDIT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# GitHub Credentials
GITHUB_TOKEN="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"
GITHUB_REPO="saleskingacademy/sales-king-academy-complete"

# Render Credentials
RENDER_TOKEN="rnd_uEn4e244MHzJ6CDnlfqUXzQkHeyK"
RENDER_SERVICE="srv-d4tstv24d50c73b5gl6g"

# Cloudflare Credentials
CF_TOKEN="zQVoWuCyfidEF9LqPZfT0ti-KLF8OVyrXdvpd0M0"
CF_ZONE="bb56d6ffba21ccc0f582e2a0d502c5c3"
DOMAIN="saleskingacademy.com"

echo "1️⃣ GITHUB REPOSITORY STATUS"
echo "═══════════════════════════════════════════════"
python3 << PYEOF
import requests, json

headers = {"Authorization": "token $GITHUB_TOKEN"}
r = requests.get("https://api.github.com/repos/$GITHUB_REPO", headers=headers)

if r.status_code == 200:
    data = r.json()
    print(f"✅ Repo: {data['name']}")
    print(f"✅ Branch: {data['default_branch']}")
    print(f"✅ Last Updated: {data['updated_at']}")
    print(f"✅ Size: {data['size']} KB")
    
    # Get latest commit
    commits = requests.get(f"https://api.github.com/repos/$GITHUB_REPO/commits", headers=headers)
    if commits.status_code == 200:
        latest = commits.json()[0]
        print(f"✅ Latest Commit: {latest['commit']['message'][:50]}")
        print(f"   By: {latest['commit']['author']['name']}")
        print(f"   Date: {latest['commit']['author']['date']}")
else:
    print(f"❌ GitHub Error: {r.status_code}")
PYEOF

echo ""
echo "2️⃣ RENDER SERVICE STATUS"
echo "═══════════════════════════════════════════════"
python3 << PYEOF
import requests

headers = {"Authorization": "Bearer $RENDER_TOKEN"}
r = requests.get("https://api.render.com/v1/services/$RENDER_SERVICE", headers=headers)

if r.status_code == 200:
    data = r.json()
    print(f"✅ Service: {data.get('name', 'Unknown')}")
    print(f"✅ Status: {data.get('suspended', 'active')}")
    print(f"✅ Type: {data.get('type', 'Unknown')}")
    print(f"✅ Region: {data.get('region', 'Unknown')}")
    
    # Get service URL
    if 'serviceDetails' in data:
        url = data['serviceDetails'].get('url', 'Not configured')
        print(f"✅ URL: {url}")
else:
    print(f"❌ Render Error: {r.status_code}")
    print(f"Response: {r.text[:200]}")
PYEOF

echo ""
echo "3️⃣ CLOUDFLARE DNS CONFIGURATION"
echo "═══════════════════════════════════════════════"
python3 << PYEOF
import requests

headers = {
    "Authorization": "Bearer $CF_TOKEN",
    "Content-Type": "application/json"
}

r = requests.get(
    f"https://api.cloudflare.com/client/v4/zones/$CF_ZONE/dns_records",
    headers=headers
)

if r.status_code == 200:
    records = r.json().get('result', [])
    print(f"✅ Total DNS Records: {len(records)}")
    
    for record in records[:10]:
        print(f"\n   Type: {record['type']}")
        print(f"   Name: {record['name']}")
        print(f"   Content: {record['content']}")
        print(f"   Proxied: {record['proxied']}")
else:
    print(f"❌ Cloudflare Error: {r.status_code}")
PYEOF

echo ""
echo "4️⃣ LIVE ENDPOINT TESTS"
echo "═══════════════════════════════════════════════"

# Test main domain
echo -n "Testing https://$DOMAIN ... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" --max-time 10)
if [ "$STATUS" = "200" ]; then
    echo "✅ $STATUS"
else
    echo "❌ $STATUS"
fi

# Test Render direct
echo -n "Testing Render service ... "
RENDER_URL=$(curl -s -H "Authorization: Bearer $RENDER_TOKEN" \
    "https://api.render.com/v1/services/$RENDER_SERVICE" | \
    python3 -c "import sys,json; data=json.load(sys.stdin); print(data.get('serviceDetails',{}).get('url',''))" 2>/dev/null)

if [ ! -z "$RENDER_URL" ]; then
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$RENDER_URL" --max-time 10)
    echo "✅ $STATUS ($RENDER_URL)"
else
    echo "⚠️ URL not found"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ AUDIT COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

