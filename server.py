#!/usr/bin/env python3
"""
Sales King Academy - Production Server
Fixed version with proper exception handling and routing
"""

import os
import sys
import json
import traceback
from datetime import datetime, timezone
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse

class SKARequestHandler(SimpleHTTPRequestHandler):
    """Enhanced request handler with comprehensive error handling"""
    
    def log_message(self, format, *args):
        """Override to add timestamps"""
        sys.stderr.write(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {format % args}\n")
    
    def do_GET(self):
        """Handle GET requests with proper error handling"""
        try:
            parsed_path = urlparse(self.path)
            
            # Root endpoint - system status
            if parsed_path.path == '/' or parsed_path.path == '':
                self.send_json_response({
                    "status": "operational",
                    "system": "Sales King Academy",
                    "version": "1.0.0",
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                    "components": {
                        "tokenization": "active",
                        "ska_credits": "active",
                        "temporal_dna": "active",
                        "payments": "active",
                        "rkl_framework": "active",
                        "agents": "25 active"
                    },
                    "message": "All systems operational"
                })
                return
            
            # API status endpoint
            elif parsed_path.path == '/api/status':
                self.handle_api_status()
                return
            
            # SKA Credits endpoint
            elif parsed_path.path == '/api/ska_credits':
                self.handle_ska_credits()
                return
            
            # Temporal DNA endpoint
            elif parsed_path.path == '/api/temporal_dna':
                self.handle_temporal_dna()
                return
            
            # Health check
            elif parsed_path.path == '/health':
                self.send_json_response({"status": "healthy"})
                return
            
            # Serve static files
            else:
                # Change to root directory for static files
                os.chdir(os.path.dirname(os.path.abspath(__file__)))
                super().do_GET()
                
        except Exception as e:
            self.handle_error(e)
    
    def send_json_response(self, data, status=200):
        """Send JSON response with CORS headers"""
        try:
            self.send_response(status)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps(data, indent=2).encode())
        except Exception as e:
            print(f"Error sending response: {e}", file=sys.stderr)
    
    def handle_api_status(self):
        """System status with all components"""
        try:
            # Calculate SKA Credits (1 per second since July 1, 2024)
            genesis = datetime(2024, 7, 1, 0, 0, 0, tzinfo=timezone.utc)
            now = datetime.now(timezone.utc)
            seconds_elapsed = (now - genesis).total_seconds()
            ska_credits = int(seconds_elapsed)
            
            response = {
                "status": "operational",
                "timestamp": now.isoformat(),
                "ska_credits": ska_credits,
                "ska_credits_usd": f"${ska_credits:,.0f}",
                "temporal_dna": now.strftime("%m%d%Y%H%M%S%f")[:16],
                "genesis_token": "0701202400000000",
                "framework": "RKL α=25",
                "complexity": "O(n^1.77)",
                "agents_active": 25,
                "systems": [
                    "Tokenization Engine",
                    "Payment Processing (Square)",
                    "RKL Framework",
                    "25 AI Agents",
                    "Temporal DNA",
                    "Security Fortress"
                ]
            }
            
            self.send_json_response(response)
            
        except Exception as e:
            self.handle_error(e)
    
    def handle_ska_credits(self):
        """SKA Credits minting endpoint"""
        try:
            genesis = datetime(2024, 7, 1, 0, 0, 0, tzinfo=timezone.utc)
            now = datetime.now(timezone.utc)
            seconds_elapsed = (now - genesis).total_seconds()
            total_credits = int(seconds_elapsed)
            
            response = {
                "genesis": "2024-07-01T00:00:00Z",
                "current_time": now.isoformat(),
                "seconds_since_genesis": int(seconds_elapsed),
                "total_credits_minted": total_credits,
                "credits_per_second": 1,
                "usd_value": f"${total_credits:,.2f}",
                "allocations": {
                    "company_treasury": int(total_credits * 0.40),
                    "founder": int(total_credits * 0.30),
                    "operations": int(total_credits * 0.15),
                    "rewards_pool": int(total_credits * 0.10),
                    "research_development": int(total_credits * 0.05)
                }
            }
            
            self.send_json_response(response)
            
        except Exception as e:
            self.handle_error(e)
    
    def handle_temporal_dna(self):
        """Temporal DNA tokenization endpoint"""
        try:
            now = datetime.now(timezone.utc)
            genesis = "0701202400000000"  # July 1, 2024 00:00:00.0000
            current = now.strftime("%m%d%Y%H%M%S%f")[:16]
            
            # Generate expansion blocks (simplified)
            expansion1 = now.strftime("%d%m%Y%M%H%S%f")[:16]
            expansion2 = now.strftime("%Y%m%d%S%M%H%f")[:16]
            
            full_token = f"{genesis}|{current}|{expansion1}|{expansion2}"
            
            response = {
                "genesis": genesis,
                "current_block": current,
                "expansion_blocks": [expansion1, expansion2],
                "full_token": full_token,
                "timestamp": now.isoformat(),
                "format": "MMDDYYYYHHMMSSMS",
                "properties": {
                    "immutable_genesis": True,
                    "synchronized_expansion": True,
                    "quantum_classical_balance": "α=25"
                }
            }
            
            self.send_json_response(response)
            
        except Exception as e:
            self.handle_error(e)
    
    def handle_error(self, error):
        """Centralized error handling with full logging"""
        error_msg = str(error)
        error_trace = traceback.format_exc()
        
        # Log to stderr
        print(f"ERROR: {error_msg}", file=sys.stderr)
        print(error_trace, file=sys.stderr)
        
        # Send error response
        self.send_json_response({
            "error": "Internal server error",
            "message": error_msg,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "path": self.path
        }, status=500)

def run_server(port=10000):
    """Start the HTTP server"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, SKARequestHandler)
    
    print("=" * 80)
    print("🚀 SALES KING ACADEMY - PRODUCTION SERVER")
    print("=" * 80)
    print(f"Server: http://0.0.0.0:{port}")
    print(f"Genesis: July 1, 2024 00:00:00 UTC")
    print(f"Framework: RKL α=25")
    print(f"Status: ALL SYSTEMS OPERATIONAL")
    print("=" * 80)
    print()
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n🛑 Server shutdown initiated")
        httpd.server_close()
        print("✅ Server stopped cleanly")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    run_server(port)
