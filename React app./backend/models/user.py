from config.database import db

class User:
    def __init__(self):
        self.collection = db.get_db().users

    def get_all(self):
        return list(self.collection.find({}, {'_id': 0}))

    def create(self, user_data):
        return self.collection.insert_one(user_data)

    def get_by_id(self, user_id):
        return self.collection.find_one({'_id': user_id})

    def update(self, user_id, user_data):
        return self.collection.update_one({'_id': user_id}, {'$set': user_data})

    def delete(self, user_id):
        return self.collection.delete_one({'_id': user_id})
