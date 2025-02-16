from config.database import db
from utils.helpers import format_mongodb_id
from datetime import datetime

class Alert:
    def __init__(self):
        self.collection = db.get_db().alerts

    def create(self, alert_data):
        # Ensure timestamp is in ISO format
        if 'timestamp' not in alert_data:
            alert_data['timestamp'] = datetime.utcnow().isoformat() + 'Z'
        
        return self.collection.insert_one(alert_data)

    def get_all(self, limit=100, sort_by_timestamp=True):
        # Get alerts sorted by timestamp in descending order (newest first)
        cursor = self.collection.find({})
        if sort_by_timestamp:
            cursor = cursor.sort('timestamp', -1)
        if limit:
            cursor = cursor.limit(limit)
        
        alerts = list(cursor)
        return [format_mongodb_id(alert) for alert in alerts]

    def delete_all(self):
        result = self.collection.delete_many({})
        return result.deleted_count

    def get_by_type(self, alert_type):
        alerts = list(self.collection.find({'alert_type': alert_type}))
        return [format_mongodb_id(alert) for alert in alerts]

    def delete_old_alerts(self, days=30):
        """Delete alerts older than specified days"""
        cutoff_date = datetime.utcnow() - timedelta(days=days)
        result = self.collection.delete_many({
            'timestamp': {'$lt': cutoff_date.isoformat() + 'Z'}
        })
        return result.deleted_count
