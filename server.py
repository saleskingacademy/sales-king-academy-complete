#!/usr/bin/env python3
"""
Sales King Academy - Unified Production Server
Serves both frontend website and backend API from single Render instance
"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import os
import sys
from urllib.parse import parse_qs, urlparse

# Import backend
from ska_complete_backend import SKABackend
import asyncio

# Initialize backend
backend = SKABackend()

class SKARequestHandler(SimpleHTTPRequestHandler):
    """Unified request handler for frontend + API"""
    
    def do_GET(self):
        """Handle GET requests"""
        parsed_path = urlparse(self.path)
        
        # API endpoints
        if parsed_path.path.startswith('/api/'):
            self.handle_api_request(parsed_path)
        # Frontend files
        else:
            # Serve index.html for root
            if self.path == '/':
                self.path = '/index.html'
            return SimpleHTTPRequestHandler.do_GET(self)
    
    def do_POST(self):
        """Handle POST requests"""
        parsed_path = urlparse(self.path)
        
        if parsed_path.path.startswith('/api/'):
            self.handle_api_request(parsed_path)
        else:
            self.send_error(404, "Not found")
    
    def handle_api_request(self, parsed_path):
        """Handle API requests"""
        try:
            # Get system status
            if parsed_path.path == '/api/status':
                status = backend.get_system_status()
                self.send_json_response(status)
            
            # Process payment
            elif parsed_path.path == '/api/checkout' and self.command == 'POST':
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data)
                
                # Process payment
                result = asyncio.run(backend.process_payment(
                    data.get('email'),
                    data.get('name'),
                    data.get('tier'),
                    backend.rkl_core.alpha * 1000  # Amount based on tier
                ))
                self.send_json_response(result)
            
            # Contact form
            elif parsed_path.path == '/api/contact' and self.command == 'POST':
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data)
                
                self.send_json_response({
                    "status": "success",
                    "message": "Message received. We'll respond within 24 hours."
                })
            
            # Agent status
            elif parsed_path.path.startswith('/api/agent/'):
                agent_id = int(parsed_path.path.split('/')[-1])
                agent_status = backend.agent_orchestrator.get_agent_status(agent_id)
                self.send_json_response(agent_status)
            
            else:
                self.send_error(404, "API endpoint not found")
        
        except Exception as e:
            self.send_json_response({"error": str(e)}, status=500)
    
    def send_json_response(self, data, status=200):
        """Send JSON response"""
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

def run_server(port=10000):
    """Run the unified server"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, SKARequestHandler)
    
    print("=" * 80)
    print("SALES KING ACADEMY - UNIFIED SERVER STARTING")
    print("=" * 80)
    print(f"\n🌐 Server running on port {port}")
    print(f"🌍 Frontend: http://0.0.0.0:{port}")
    print(f"🔌 API: http://0.0.0.0:{port}/api/status")
    print("\n" + "=" * 80)
    print("✅ ALL SYSTEMS OPERATIONAL")
    print("=" * 80 + "\n")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\nShutting down server...")
        httpd.shutdown()

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 10000))
    run_server(port)
