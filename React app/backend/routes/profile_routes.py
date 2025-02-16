from flask import Blueprint, jsonify, request
from models.profile import Profile

profile_bp = Blueprint('profile', __name__)
profile_model = Profile()

@profile_bp.route('/profiles', methods=['POST'])
def create_profile():
    try:
        profile_data = request.json
        if not profile_data:
            return jsonify({"error": "No data provided"}), 400

        # Check if required fields are present
        required_fields = ['name', 'email', 'dob', 'address', 'phone']
        missing_fields = [field for field in required_fields if field not in profile_data]
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # Check if profile with email already exists
        existing_profile = profile_model.get_by_email(profile_data['email'])
        if existing_profile:
            return jsonify({"error": "Profile with this email already exists"}), 409

        result = profile_model.create(profile_data)
        return jsonify({
            "message": "Profile created successfully",
            "id": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@profile_bp.route('/profiles', methods=['GET'])
def get_all_profiles():
    try:
        profiles = profile_model.get_all()
        return jsonify(profiles)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@profile_bp.route('/profiles', methods=['DELETE'])
def delete_all_profiles():
    try:
        deleted_count = profile_model.delete_all()
        return jsonify({
            "message": f"Successfully deleted {deleted_count} profiles",
            "deleted_count": deleted_count
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@profile_bp.route('/profiles/<email>', methods=['GET'])
def get_profile(email):
    try:
        profile = profile_model.get_by_email(email)
        if not profile:
            return jsonify({"error": "Profile not found"}), 404
        return jsonify(profile)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@profile_bp.route('/profiles/<email>', methods=['PUT'])
def update_profile(email):
    try:
        profile_data = request.json
        if not profile_data:
            return jsonify({"error": "No data provided"}), 400

        existing_profile = profile_model.get_by_email(email)
        if not existing_profile:
            return jsonify({"error": "Profile not found"}), 404

        result = profile_model.update(email, profile_data)
        if result.modified_count:
            return jsonify({"message": "Profile updated successfully"})
        return jsonify({"message": "No changes made to profile"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
