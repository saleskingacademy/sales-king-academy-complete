#!/usr/bin/env python3
import requests
import json
from datetime import datetime

print("═" * 100)
print("🔍 SALES KING ACADEMY - COMPLETE INFRASTRUCTURE AUDIT")
print("═" * 100)
print(f"Audit Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')}")
print("═" * 100)
print()

# MOST RECENT CREDENTIALS FROM LAST SESSION
GITHUB_TOKEN = "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"
GITHUB_REPO = "saleskingacademy/sales-king-academy-complete"

RENDER_TOKEN = "rnd_N9Pc30dX1ENpHMKjr2waC66ACF2q"  # Most recent token
RENDER_SERVICE_ID = "srv-d4tstv24d50c73b5gl6g"

CLOUDFLARE_TOKEN = "zQVoWuCyfidEF9LqPZfT0ti-KLF8OVyrXdvpd0M0"
CLOUDFLARE_ZONE_ID = "bb56d6ffba21ccc0f582e2a0d502c5c3"
CLOUDFLARE_ACCOUNT_ID = "4805739a8727b990e254f754d1b795b7"
DOMAIN = "saleskingacademy.com"

SQUARE_ACCESS_TOKEN = "EAAAl-swRUlg58R-PB33iXSwbL3vqgOv-KxNqLyWJqJlSZ7lV5c6FkmK1K4NHpYh"
SQUARE_LOCATION_ID = "LCX039E7QRA5G"

ANTHROPIC_API_KEY = "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"

# Headers
gh_headers = {"Authorization": f"token {GITHUB_TOKEN}"}
render_headers = {"Authorization": f"Bearer {RENDER_TOKEN}"}
cf_headers = {"Authorization": f"Bearer {CLOUDFLARE_TOKEN}", "Content-Type": "application/json"}

print("1️⃣ GITHUB REPOSITORY STATUS")
print("─" * 100)
try:
    r = requests.get(f"https://api.github.com/repos/{GITHUB_REPO}", headers=gh_headers)
    if r.status_code == 200:
        repo = r.json()
        print(f"✅ Repository: {repo['full_name']}")
        print(f"   Default Branch: {repo['default_branch']}")
        print(f"   Private: {repo['private']}")
        print(f"   Last Updated: {repo['updated_at']}")
        print(f"   Size: {repo['size']} KB")
        
        # Get latest commit
        commits_r = requests.get(
            f"https://api.github.com/repos/{GITHUB_REPO}/commits/{repo['default_branch']}", 
            headers=gh_headers
        )
        if commits_r.status_code == 200:
            commit = commits_r.json()
            print(f"   Latest Commit: {commit['commit']['message'][:80]}")
            print(f"   Author: {commit['commit']['author']['name']}")
            print(f"   Date: {commit['commit']['author']['date']}")
            
        # Check critical files
        print(f"\n   📁 Critical Files:")
        critical_files = ['main.py', 'requirements.txt', 'render.yaml', 'backend/main.py']
        for file in critical_files:
            check = requests.get(
                f"https://api.github.com/repos/{GITHUB_REPO}/contents/{file}",
                headers=gh_headers
            )
            status = "✅" if check.status_code == 200 else "❌"
            print(f"      {status} {file}")
    else:
        print(f"❌ GitHub API Error: {r.status_code}")
        print(f"   Response: {r.text[:200]}")
except Exception as e:
    print(f"❌ GitHub Exception: {str(e)}")

print("\n" + "─" * 100)
print("2️⃣ RENDER DEPLOYMENT STATUS")
print("─" * 100)
try:
    # Get specific service
    r = requests.get(
        f"https://api.render.com/v1/services/{RENDER_SERVICE_ID}",
        headers=render_headers
    )
    if r.status_code == 200:
        service = r.json()
        print(f"✅ Service Name: {service.get('name', 'N/A')}")
        print(f"   Service ID: {service.get('id', 'N/A')}")
        print(f"   Type: {service.get('type', 'N/A')}")
        print(f"   Status: {service.get('suspended', 'Unknown')}")
        
        # Get service details
        if 'serviceDetails' in service:
            details = service['serviceDetails']
            print(f"   URL: {details.get('url', 'N/A')}")
            print(f"   Region: {details.get('region', 'N/A')}")
            
        # Get latest deploy
        deploys_r = requests.get(
            f"https://api.render.com/v1/services/{RENDER_SERVICE_ID}/deploys",
            headers=render_headers
        )
        if deploys_r.status_code == 200:
            deploys = deploys_r.json()
            if deploys and len(deploys) > 0:
                latest = deploys[0]
                print(f"\n   📦 Latest Deploy:")
                print(f"      Status: {latest.get('status', 'N/A')}")
                print(f"      Created: {latest.get('createdAt', 'N/A')}")
                print(f"      Finished: {latest.get('finishedAt', 'N/A')}")
    else:
        print(f"❌ Render API Error: {r.status_code}")
        print(f"   Response: {r.text[:200]}")
except Exception as e:
    print(f"❌ Render Exception: {str(e)}")

print("\n" + "─" * 100)
print("3️⃣ CLOUDFLARE DNS CONFIGURATION")
print("─" * 100)
try:
    r = requests.get(
        f"https://api.cloudflare.com/client/v4/zones/{CLOUDFLARE_ZONE_ID}/dns_records",
        headers=cf_headers
    )
    if r.status_code == 200:
        data = r.json()
        if data.get('success'):
            records = data.get('result', [])
            print(f"✅ Total DNS Records: {len(records)}")
            
            # Show main records
            main_records = [r for r in records if r['name'] in [DOMAIN, f'www.{DOMAIN}']]
            if main_records:
                print(f"\n   🌐 Main Domain Records:")
                for rec in main_records:
                    print(f"      {rec['type']:6} {rec['name']:30} → {rec['content']}")
                    print(f"             Proxied: {rec['proxied']} | TTL: {rec['ttl']}")
        else:
            print(f"❌ Cloudflare API returned success=false")
            print(f"   Errors: {data.get('errors', [])}")
    else:
        print(f"❌ Cloudflare API Error: {r.status_code}")
        print(f"   Response: {r.text[:200]}")
except Exception as e:
    print(f"❌ Cloudflare Exception: {str(e)}")

print("\n" + "─" * 100)
print("4️⃣ LIVE ENDPOINT TESTS")
print("─" * 100)

# Test main domain
try:
    print(f"Testing https://{DOMAIN} ...")
    r = requests.get(f"https://{DOMAIN}", timeout=10)
    print(f"   {'✅' if r.status_code == 200 else '❌'} Status: {r.status_code}")
    print(f"   Response Time: {r.elapsed.total_seconds():.2f}s")
except Exception as e:
    print(f"   ❌ Error: {str(e)}")

print()
print("═" * 100)
print("✅ AUDIT COMPLETE")
print("═" * 100)
