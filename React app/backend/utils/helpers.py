from bson import ObjectId
from datetime import datetime

def format_mongodb_id(obj):
    """Convert MongoDB ObjectId to string in a dictionary"""
    if isinstance(obj, dict):
        for key, value in obj.items():
            if isinstance(value, ObjectId):
                obj[key] = str(value)
            elif isinstance(value, dict):
                format_mongodb_id(value)
            elif isinstance(value, list):
                for item in value:
                    if isinstance(item, dict):
                        format_mongodb_id(item)
    return obj

def get_timestamp():
    """Get current timestamp"""
    return datetime.utcnow()
