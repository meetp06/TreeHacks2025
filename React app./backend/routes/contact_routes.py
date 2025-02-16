from flask import Blueprint, jsonify, request
from models.contact import Contact

contact_bp = Blueprint('contact', __name__)
contact_model = Contact()

@contact_bp.route('/contacts', methods=['GET'])
def get_contacts():
    try:
        # Handle search query
        search_query = request.args.get('q', '')
        if search_query:
            contacts = contact_model.search(search_query)
        else:
            contacts = contact_model.get_all()

        # Handle connection degree filter
        degree = request.args.get('degree', type=int)
        if degree is not None:
            contacts = [c for c in contacts if c['connection_degree'] == degree]

        return jsonify({"contacts": contacts})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@contact_bp.route('/contacts', methods=['POST'])
def create_contact():
    try:
        contact_data = request.json
        if not contact_data:
            return jsonify({"error": "No data provided"}), 400

        # Validate required fields
        required_fields = ['name', 'phone', 'connection_degree']
        missing_fields = [field for field in required_fields if field not in contact_data]
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # Validate connection degree
        if not isinstance(contact_data['connection_degree'], int) or \
           not 1 <= contact_data['connection_degree'] <= 3:
            return jsonify({"error": "Connection degree must be an integer between 1 and 3"}), 400

        # Validate phone number format (basic validation)
        phone = contact_data['phone']
        if not phone.startswith('+') or not phone[1:].isdigit():
            return jsonify({"error": "Invalid phone number format. Must start with + followed by digits"}), 400

        result = contact_model.create(contact_data)
        return jsonify({
            "message": "Contact created successfully",
            "id": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@contact_bp.route('/contacts/<contact_id>', methods=['PUT'])
def update_contact(contact_id):
    try:
        contact_data = request.json
        if not contact_data:
            return jsonify({"error": "No data provided"}), 400

        # Validate connection degree if provided
        if 'connection_degree' in contact_data:
            if not isinstance(contact_data['connection_degree'], int) or \
               not 1 <= contact_data['connection_degree'] <= 3:
                return jsonify({"error": "Connection degree must be an integer between 1 and 3"}), 400

        result = contact_model.update(contact_id, contact_data)
        if result.modified_count:
            return jsonify({"message": "Contact updated successfully"})
        return jsonify({"message": "No changes made to contact"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@contact_bp.route('/contacts/<contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    try:
        result = contact_model.delete(contact_id)
        if result.deleted_count:
            return jsonify({"message": "Contact deleted successfully"})
        return jsonify({"error": "Contact not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@contact_bp.route('/contacts/degree/<int:degree>', methods=['GET'])
def get_contacts_by_degree(degree):
    try:
        if not 1 <= degree <= 3:
            return jsonify({"error": "Connection degree must be between 1 and 3"}), 400
            
        contacts = contact_model.get_by_connection_degree(degree)
        return jsonify({"contacts": contacts})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
