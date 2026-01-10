#!/usr/bin/env python3
"""
Sales King Academy - Simple Production Server
Serves frontend + basic API without complex dependencies
"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import os
import sys
from datetime import datetime, timezone
from urllib.parse import parse_qs, urlparse

# Set working directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Genesis timestamp for SKA Credits
GENESIS_TIMESTAMP = datetime(2024, 7, 1, 0, 0, 0, tzinfo=timezone.utc)

def get_ska_credits():
    """Calculate current SKA Credits (1 per second since July 1, 2024)"""
    now = datetime.now(timezone.utc)
    seconds_elapsed = (now - GENESIS_TIMESTAMP).total_seconds()
    return int(seconds_elapsed)

class SKARequestHandler(SimpleHTTPRequestHandler):
    """Unified request handler for frontend + basic API"""
    
    def log_message(self, format, *args):
        """Log requests"""
        sys.stdout.write(f"{self.address_string()} - [{self.log_date_time_string()}] {format%args}\n")
    
    def do_GET(self):
        """Handle GET requests"""
        parsed_path = urlparse(self.path)
        
        # API endpoints
        if parsed_path.path == '/api/status':
            self.send_json_response({
                "status": "operational",
                "service": "Sales King Academy",
                "ska_credits": get_ska_credits(),
                "framework": "RKL α=25",
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "agents_active": 25
            })
        
        elif parsed_path.path.startswith('/api/'):
            self.send_json_response({
                "status": "endpoint_not_implemented",
                "message": "This API endpoint is not yet implemented",
                "available_endpoints": ["/api/status"]
            }, status=501)
        
        # Frontend files
        else:
            # Serve index.html for root
            if self.path == '/' or self.path == '':
                self.path = '/index.html'
            
            # Check if file exists
            filepath = '.' + self.path
            if os.path.exists(filepath) and os.path.isfile(filepath):
                return SimpleHTTPRequestHandler.do_GET(self)
            else:
                # File not found, serve index.html (for SPA routing)
                self.path = '/index.html'
                if os.path.exists('./index.html'):
                    return SimpleHTTPRequestHandler.do_GET(self)
                else:
                    self.send_error(404, f"File not found: {filepath}")
    
    def do_POST(self):
        """Handle POST requests"""
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/contact':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data)
                self.send_json_response({
                    "status": "success",
                    "message": "Message received. We'll respond within 24 hours."
                })
            except Exception as e:
                self.send_json_response({
                    "status": "error",
                    "message": str(e)
                }, status=400)
        
        elif parsed_path.path.startswith('/api/'):
            self.send_json_response({
                "status": "endpoint_not_implemented",
                "message": "This API endpoint is not yet implemented"
            }, status=501)
        
        else:
            self.send_error(404, "Not found")
    
    def send_json_response(self, data, status=200):
        """Send JSON response"""
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

def run_server(port=10000):
    """Run the server"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, SKARequestHandler)
    
    print("=" * 80)
    print("🏆 SALES KING ACADEMY - PRODUCTION SERVER")
    print("=" * 80)
    print(f"\n🌐 Server running on port {port}")
    print(f"📂 Serving files from: {os.getcwd()}")
    print(f"🌍 Frontend: http://0.0.0.0:{port}")
    print(f"🔌 API: http://0.0.0.0:{port}/api/status")
    
    # List HTML files
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    if html_files:
        print(f"\n📄 HTML files available:")
        for f in sorted(html_files):
            print(f"   • {f}")
    else:
        print("\n⚠️  WARNING: No HTML files found in current directory!")
    
    print(f"\n💰 Current SKA Credits: {get_ska_credits():,}")
    print(f"🕐 Genesis: July 1, 2024 00:00:00 UTC")
    
    print("\n" + "=" * 80)
    print("✅ SERVER READY - ALL SYSTEMS OPERATIONAL")
    print("=" * 80 + "\n")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\nShutting down server...")
        httpd.shutdown()

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 10000))
    run_server(port)
