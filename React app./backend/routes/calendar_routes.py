from flask import Blueprint, jsonify, request
from models.calendar import Calendar
from datetime import datetime, timedelta

calendar_bp = Blueprint('calendar', __name__)
calendar_model = Calendar()

@calendar_bp.route('/calendar', methods=['GET'])
def get_calendar_events():
    try:
        # Get query parameters
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        upcoming = request.args.get('upcoming', type=int)

        if upcoming:
            # Get upcoming events for the next N days
            events = calendar_model.get_upcoming_events(upcoming)
        elif start_date:
            # Get events for date range
            events = calendar_model.get_events_by_date_range(start_date, end_date)
        else:
            # Default to upcoming 7 days
            events = calendar_model.get_upcoming_events(7)

        # Group events by date as required by frontend
        days = calendar_model.group_events_by_date(events)
        return jsonify({"days": days})

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@calendar_bp.route('/calendar/events', methods=['POST'])
def create_event():
    try:
        event_data = request.json
        if not event_data:
            return jsonify({"error": "No data provided"}), 400

        # Validate required fields
        required_fields = ['date', 'event_time', 'name']
        missing_fields = [field for field in required_fields if field not in event_data]
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        result = calendar_model.create_event(event_data)
        return jsonify({
            "message": "Event created successfully",
            "id": str(result.inserted_id)
        }), 201

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@calendar_bp.route('/calendar/events/<event_id>', methods=['PUT'])
def update_event(event_id):
    try:
        event_data = request.json
        if not event_data:
            return jsonify({"error": "No data provided"}), 400

        result = calendar_model.update_event(event_id, event_data)
        if result.modified_count:
            return jsonify({"message": "Event updated successfully"})
        return jsonify({"message": "No changes made to event"})

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@calendar_bp.route('/calendar/events/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    try:
        result = calendar_model.delete_event(event_id)
        if result.deleted_count:
            return jsonify({"message": "Event deleted successfully"})
        return jsonify({"error": "Event not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@calendar_bp.route('/calendar/upcoming', methods=['GET'])
def get_upcoming_events():
    try:
        days = request.args.get('days', default=7, type=int)
        events = calendar_model.get_upcoming_events(days)
        days = calendar_model.group_events_by_date(events)
        return jsonify({"days": days})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
