from config.database import db
from utils.helpers import format_mongodb_id
from datetime import datetime

class Profile:
    def __init__(self):
        self.collection = db.get_db().profiles

    def create(self, profile_data):
        profile_data['created_at'] = datetime.utcnow()
        profile_data['updated_at'] = datetime.utcnow()
        return self.collection.insert_one(profile_data)

    def get_all(self):
        profiles = list(self.collection.find({}))
        return [format_mongodb_id(profile) for profile in profiles]

    def delete_all(self):
        result = self.collection.delete_many({})
        return result.deleted_count

    def get_by_email(self, email):
        profile = self.collection.find_one({'email': email})
        return format_mongodb_id(profile) if profile else None

    def update(self, email, profile_data):
        profile_data['updated_at'] = datetime.utcnow()
        return self.collection.update_one(
            {'email': email}, 
            {'$set': profile_data}
        )
