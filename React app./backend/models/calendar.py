from config.database import db
from utils.helpers import format_mongodb_id
from datetime import datetime, timedelta

class Calendar:
    def __init__(self):
        self.collection = db.get_db().calendar_events

    def create_event(self, event_data):
        """Create a new calendar event"""
        # Ensure date is in YYYY-MM-DD format
        try:
            datetime.strptime(event_data['date'], '%Y-%m-%d')
        except (ValueError, KeyError):
            raise ValueError("Invalid date format. Use YYYY-MM-DD")

        # Validate event time format (HH:MM AM/PM)
        try:
            datetime.strptime(event_data['event_time'], '%I:%M %p')
        except (ValueError, KeyError):
            raise ValueError("Invalid time format. Use HH:MM AM/PM")

        event_data['created_at'] = datetime.utcnow()
        event_data['updated_at'] = datetime.utcnow()
        return self.collection.insert_one(event_data)

    def get_events_by_date_range(self, start_date, end_date=None):
        """Get events within a date range"""
        try:
            start = datetime.strptime(start_date, '%Y-%m-%d')
            if end_date:
                end = datetime.strptime(end_date, '%Y-%m-%d')
            else:
                end = start + timedelta(days=1)
        except ValueError:
            raise ValueError("Invalid date format. Use YYYY-MM-DD")

        events = list(self.collection.find({
            'date': {
                '$gte': start.strftime('%Y-%m-%d'),
                '$lt': end.strftime('%Y-%m-%d')
            }
        }).sort([('date', 1), ('event_time', 1)]))

        return [format_mongodb_id(event) for event in events]

    def get_events_by_date(self, date):
        """Get all events for a specific date"""
        events = list(self.collection.find({'date': date}).sort('event_time', 1))
        return [format_mongodb_id(event) for event in events]

    def update_event(self, event_id, event_data):
        """Update an existing event"""
        event_data['updated_at'] = datetime.utcnow()
        return self.collection.update_one(
            {'_id': event_id},
            {'$set': event_data}
        )

    def delete_event(self, event_id):
        """Delete an event"""
        return self.collection.delete_one({'_id': event_id})

    def get_upcoming_events(self, days=7):
        """Get upcoming events for the next N days"""
        today = datetime.now().strftime('%Y-%m-%d')
        end_date = (datetime.now() + timedelta(days=days)).strftime('%Y-%m-%d')
        
        events = list(self.collection.find({
            'date': {
                '$gte': today,
                '$lt': end_date
            }
        }).sort([('date', 1), ('event_time', 1)]))

        return [format_mongodb_id(event) for event in events]

    def group_events_by_date(self, events):
        """Group events by date in the format required by the frontend"""
        grouped_events = {}
        for event in events:
            date = event['date']
            if date not in grouped_events:
                grouped_events[date] = {
                    'date': date,
                    'events': []
                }
            grouped_events[date]['events'].append({
                'event_time': event['event_time'],
                'event_details': {
                    'name': event['name'],
                    'description': event.get('description', '')
                }
            })
        
        return list(grouped_events.values())
