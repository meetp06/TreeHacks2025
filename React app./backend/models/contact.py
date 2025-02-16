from config.database import db
from utils.helpers import format_mongodb_id
from datetime import datetime

class Contact:
    def __init__(self):
        self.collection = db.get_db().contacts

    def create(self, contact_data):
        contact_data['created_at'] = datetime.utcnow()
        contact_data['updated_at'] = datetime.utcnow()
        return self.collection.insert_one(contact_data)

    def get_all(self, sort_by_connection=True):
        cursor = self.collection.find({})
        if sort_by_connection:
            cursor = cursor.sort('connection_degree', 1)  # 1 for ascending order
        contacts = list(cursor)
        return [format_mongodb_id(contact) for contact in contacts]

    def search(self, query):
        # Search by name or phone number using case-insensitive regex
        regex_query = {
            '$or': [
                {'name': {'$regex': query, '$options': 'i'}},
                {'phone': {'$regex': query, '$options': 'i'}}
            ]
        }
        contacts = list(self.collection.find(regex_query).sort('connection_degree', 1))
        return [format_mongodb_id(contact) for contact in contacts]

    def get_by_id(self, contact_id):
        contact = self.collection.find_one({'_id': contact_id})
        return format_mongodb_id(contact) if contact else None

    def update(self, contact_id, contact_data):
        contact_data['updated_at'] = datetime.utcnow()
        return self.collection.update_one(
            {'_id': contact_id},
            {'$set': contact_data}
        )

    def delete(self, contact_id):
        return self.collection.delete_one({'_id': contact_id})

    def delete_all(self):
        result = self.collection.delete_many({})
        return result.deleted_count

    def get_by_connection_degree(self, degree):
        contacts = list(self.collection.find({'connection_degree': degree}))
        return [format_mongodb_id(contact) for contact in contacts]
