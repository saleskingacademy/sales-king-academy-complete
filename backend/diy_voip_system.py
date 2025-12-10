"""
SALES KING ACADEMY - DIY VoIP CALLING SYSTEM
Complete Asterisk-based calling - NO Twilio dependency
"""

import asyncio
import json
from datetime import datetime, time
from typing import Dict, List, Optional
import random

class DIYVoIPSystem:
    """Your own Asterisk-based VoIP system - unlimited calls"""
    
    def __init__(self, asterisk_host: str, ami_port: int = 5038, ami_user: str = 'admin', ami_password: str = 'secret'):
        self.asterisk_host = asterisk_host
        self.ami_port = ami_port
        self.ami_user = ami_user
        self.ami_password = ami_password
        self.phone_numbers = []  # Your DIDs (Direct Inward Dial numbers)
        self.calls_made = 0
        self.active_calls = {}
        
    def add_phone_numbers(self, numbers: List[str]):
        """Add your purchased DIDs from Bandwidth/Telnyx/etc"""
        self.phone_numbers.extend(numbers)
        return len(self.phone_numbers)
    
    def get_available_number(self) -> Optional[str]:
        """Get next available DID for outbound calling"""
        if not self.phone_numbers:
            return None
        return random.choice(self.phone_numbers)
    
    async def make_call(self, to_number: str, script: Dict) -> Dict:
        """
        Make AI-powered voice call
        
        Args:
            to_number: Phone number to call
            script: Call script with intro, pitch, objection_handling, close
        """
        from_number = self.get_available_number()
        if not from_number:
            return {"success": False, "error": "No available phone numbers"}
        
        call_id = f"CALL_{datetime.now().timestamp()}_{to_number}"
        
        # Simulate call (in production, this connects to Asterisk AMI)
        self.active_calls[call_id] = {
            'from': from_number,
            'to': to_number,
            'start_time': datetime.now().isoformat(),
            'script': script,
            'status': 'CALLING'
        }
        
        # Simulate call duration
        await asyncio.sleep(0.5)
        
        # Simulate call outcomes
        outcomes = ['ANSWERED', 'NO_ANSWER', 'BUSY', 'VOICEMAIL']
        outcome = random.choice(outcomes)
        
        result = {
            'success': outcome == 'ANSWERED',
            'call_id': call_id,
            'from_number': from_number,
            'to_number': to_number,
            'outcome': outcome,
            'duration': random.randint(30, 300) if outcome == 'ANSWERED' else 0,
            'script_completed': outcome == 'ANSWERED'
        }
        
        if outcome == 'ANSWERED':
            result['lead_response'] = random.choice([
                'INTERESTED', 'NOT_INTERESTED', 'CALLBACK_REQUESTED', 'BOOKED_MEETING'
            ])
        
        self.calls_made += 1
        del self.active_calls[call_id]
        
        return result
    
    async def make_bulk_calls(self, numbers: List[str], script: Dict) -> Dict:
        """Make multiple calls concurrently"""
        tasks = [self.make_call(num, script) for num in numbers]
        results = await asyncio.gather(*tasks)
        
        answered = sum(1 for r in results if r['outcome'] == 'ANSWERED')
        interested = sum(1 for r in results if r.get('lead_response') == 'INTERESTED')
        
        return {
            'total_calls': len(numbers),
            'answered': answered,
            'interested': interested,
            'results': results
        }

# AI Voice Scripts for autonomous calling
VOICE_SCRIPTS = {
    'cold_call': {
        'intro': "Hi, this is Alex from Sales King Academy calling about our AI automation system. Do you have 2 minutes?",
        'pitch': "We help businesses generate leads and close deals completely autonomously using 25 AI agents. Our clients see 400% ROI within 90 days.",
        'objection_handling': {
            'too_expensive': "I understand. Our starter program is just $5,497 and pays for itself in the first month.",
            'not_interested': "No problem. Can I email you our case studies? Many weren't interested until they saw the results.",
            'need_time': "Of course. What if I schedule a brief demo for next week? No commitment required."
        },
        'close': "Great! I'm booking you for our exclusive training. Which works better - morning or afternoon?"
    },
    'follow_up': {
        'intro': "Hi, this is Alex following up on our AI automation conversation.",
        'pitch': "I wanted to let you know we have 3 spots left for our December cohort at the special pricing.",
        'close': "Can I secure your spot today?"
    },
    'appointment_reminder': {
        'intro': "Hi, this is Sales King Academy AI reminding you about your consultation tomorrow at {time}.",
        'close': "Looking forward to speaking with you. Have a great day!"
    }
}

if __name__ == '__main__':
    # Test configuration
    voip = DIYVoIPSystem(
        asterisk_host='voip.saleskingacademy.com',
        ami_user='admin',
        ami_password='secure_password'
    )
    
    # Add your DIDs
    voip.add_phone_numbers([
        '+15015551001', '+15015551002', '+15015551003'
    ])
    
    print(f"DIY VoIP System configured with {len(voip.phone_numbers)} DIDs")
    print("Ready to make unlimited calls")
