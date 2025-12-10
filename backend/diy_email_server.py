"""
SALES KING ACADEMY - DIY EMAIL SERVER
Complete SMTP email system - NO external dependencies
"""

import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import uuid
from datetime import datetime
from typing import List, Dict, Optional
import asyncio
import json

class DIYEmailServer:
    """Your own SMTP email server - unlimited sending"""
    
    def __init__(self, smtp_host: str, smtp_port: int, username: str, password: str, from_email: str, from_name: str):
        self.smtp_host = smtp_host
        self.smtp_port = smtp_port
        self.username = username
        self.password = password
        self.from_email = from_email
        self.from_name = from_name
        self.emails_sent = 0
        
    def create_email(self, to_email: str, subject: str, body_html: str, body_text: str = None) -> MIMEMultipart:
        """Create email message with full headers"""
        msg = MIMEMultipart('alternative')
        msg['From'] = f"{self.from_name} <{self.from_email}>"
        msg['To'] = to_email
        msg['Subject'] = subject
        msg['Message-ID'] = f"<{uuid.uuid4().hex}@{self.smtp_host}>"
        msg['Date'] = datetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S +0000')
        msg['List-Unsubscribe'] = f"<https://saleskingacademy.com/unsubscribe?email={to_email}>"
        
        if not body_text:
            body_text = "Please view this email in HTML format."
        
        part1 = MIMEText(body_text, 'plain')
        part2 = MIMEText(body_html, 'html')
        msg.attach(part1)
        msg.attach(part2)
        
        return msg
    
    def send_email(self, to_email: str, subject: str, body_html: str, body_text: str = None) -> Dict:
        """Send single email via YOUR SMTP server"""
        try:
            msg = self.create_email(to_email, subject, body_html, body_text)
            
            context = ssl.create_default_context()
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls(context=context)
                server.login(self.username, self.password)
                server.send_message(msg)
            
            self.emails_sent += 1
            return {"success": True, "recipient": to_email, "message_id": msg['Message-ID']}
            
        except Exception as e:
            return {"success": False, "recipient": to_email, "error": str(e)}
    
    async def send_email_async(self, to_email: str, subject: str, body_html: str, body_text: str = None) -> Dict:
        """Async email sending"""
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, self.send_email, to_email, subject, body_html, body_text)
    
    async def send_bulk(self, recipients: List[str], subject: str, body_html: str, body_text: str = None) -> Dict:
        """Send to multiple recipients concurrently"""
        tasks = [self.send_email_async(email, subject, body_html, body_text) for email in recipients]
        results = await asyncio.gather(*tasks)
        
        successful = sum(1 for r in results if r['success'])
        failed = len(results) - successful
        
        return {
            'total': len(recipients),
            'successful': successful,
            'failed': failed,
            'results': results
        }

# Email templates for autonomous campaigns
EMAIL_TEMPLATES = {
    'cold_outreach': {
        'subject': 'Transform Your Business with AI Automation',
        'html': '''
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #7c3aed;">Sales King Academy</h1>
            <p>Hi {name},</p>
            <p>I noticed your business could benefit from AI-powered automation that generates revenue 24/7.</p>
            <p><strong>Our clients have seen:</strong></p>
            <ul>
                <li>400% increase in qualified leads</li>
                <li>60% reduction in operational costs</li>
                <li>100% autonomous revenue generation</li>
            </ul>
            <p>Can we schedule 15 minutes to discuss how we can help?</p>
            <a href="https://saleskingacademy.com/book" style="background: #7c3aed; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Book a Call</a>
            <p>Best regards,<br>Sales King Academy AI Team</p>
        </body>
        </html>
        '''
    },
    'follow_up': {
        'subject': 'Quick follow-up: AI Automation Demo',
        'html': '''
        <html>
        <body style="font-family: Arial, sans-serif;">
            <p>Hi {name},</p>
            <p>I wanted to follow up on our AI automation solution.</p>
            <p>We have a limited-time offer: <strong>First month free</strong> for businesses that sign up this week.</p>
            <p>Ready to get started?</p>
            <a href="https://saleskingacademy.com/signup">Start Free Trial</a>
            <p>- Sales King Academy</p>
        </body>
        </html>
        '''
    },
    'proposal': {
        'subject': 'Your Custom AI Automation Proposal',
        'html': '''
        <html>
        <body style="font-family: Arial, sans-serif;">
            <h2>Custom Proposal for {company}</h2>
            <p>Based on our conversation, here's what we recommend:</p>
            <h3>Investment: {price}</h3>
            <h4>What's Included:</h4>
            <ul>
                <li>25 AI agents for complete automation</li>
                <li>Email, SMS, and voice outreach</li>
                <li>Autonomous lead generation</li>
                <li>CRM integration</li>
                <li>24/7 support</li>
            </ul>
            <a href="https://saleskingacademy.com/checkout/{proposal_id}">Accept Proposal & Get Started</a>
        </body>
        </html>
        '''
    }
}

if __name__ == '__main__':
    # Test configuration
    server = DIYEmailServer(
        smtp_host=os.getenv('SMTP_HOST', 'mail.saleskingacademy.com'),
        smtp_port=int(os.getenv('SMTP_PORT', 587)),
        username=os.getenv('SMTP_USER', 'robot@saleskingacademy.com'),
        password=os.getenv('SMTP_PASS', ''),
        from_email='robot@saleskingacademy.com',
        from_name='Sales King Academy'
    )
    
    print(f"DIY Email Server configured: {server.smtp_host}")
    print(f"Ready to send unlimited emails")
