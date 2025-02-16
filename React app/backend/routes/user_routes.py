from flask import Blueprint, jsonify, request
from models.user import User

user_bp = Blueprint('user', __name__)
user_model = User()

@user_bp.route('/users', methods=['GET'])
def get_users():
    try:
        users = user_model.get_all()
        return jsonify(users)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@user_bp.route('/users', methods=['POST'])
def create_user():
    try:
        user_data = request.json
        if not user_data:
            return jsonify({"error": "No data provided"}), 400
        
        result = user_model.create(user_data)
        return jsonify({"message": "User created successfully", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
