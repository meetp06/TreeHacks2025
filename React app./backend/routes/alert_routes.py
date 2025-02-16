from flask import Blueprint, jsonify, request
from models.alert import Alert
from datetime import datetime

alert_bp = Blueprint('alert', __name__)
alert_model = Alert()

@alert_bp.route('/alerts', methods=['POST'])
def create_alert():
    try:
        alert_data = request.json
        if not alert_data:
            return jsonify({"error": "No data provided"}), 400

        # Validate required fields
        required_fields = ['alert_type', 'message']
        missing_fields = [field for field in required_fields if field not in alert_data]
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # Validate alert_type
        valid_types = ['Info', 'Warning', 'Critical']
        if alert_data['alert_type'] not in valid_types:
            return jsonify({"error": f"Invalid alert_type. Must be one of: {', '.join(valid_types)}"}), 400

        result = alert_model.create(alert_data)
        return jsonify({
            "message": "Alert created successfully",
            "id": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@alert_bp.route('/alerts', methods=['GET'])
def get_alerts():
    try:
        # Get query parameters
        alert_type = request.args.get('type')
        limit = request.args.get('limit', default=100, type=int)

        if alert_type:
            alerts = alert_model.get_by_type(alert_type)
        else:
            alerts = alert_model.get_all(limit=limit)

        return jsonify({"alerts": alerts})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@alert_bp.route('/alerts', methods=['DELETE'])
def delete_alerts():
    try:
        deleted_count = alert_model.delete_all()
        return jsonify({
            "message": f"Successfully deleted {deleted_count} alerts",
            "deleted_count": deleted_count
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@alert_bp.route('/alerts/cleanup', methods=['POST'])
def cleanup_old_alerts():
    try:
        days = request.json.get('days', 30)
        deleted_count = alert_model.delete_old_alerts(days)
        return jsonify({
            "message": f"Successfully deleted {deleted_count} old alerts",
            "deleted_count": deleted_count
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
