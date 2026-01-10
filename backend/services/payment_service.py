"""
Payment Service - Pure business logic
"""
from typing import Dict, Any, Optional
from datetime import datetime, timezone

class PaymentService:
    def __init__(self, square_token: Optional[str] = None, location_id: Optional[str] = None):
        self.square_token = square_token
        self.location_id = location_id
    
    def process_payment(self, amount: float, currency: str = 'USD') -> Dict[str, Any]:
        if amount <= 0:
            return {'success': False, 'error': 'Invalid amount'}
        
        payment_id = f"pay_{int(datetime.now(timezone.utc).timestamp() * 1000)}"
        return {
            'success': True,
            'payment_id': payment_id,
            'amount': amount,
            'currency': currency,
            'status': 'completed'
        }
