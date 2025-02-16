from pymongo import MongoClient
import os
from dotenv import load_dotenv
import ssl

# Load environment variables
load_dotenv()

class Database:
    def __init__(self):
        self.client = None
        self.db = None
        self._initialized = False

    def initialize(self):
        if self._initialized:
            return

        mongodb_uri = os.getenv('MONGODB_URI')
        db_name = os.getenv('DB_NAME')

        if not mongodb_uri or not db_name:
            raise ValueError("Missing required environment variables MONGODB_URI or DB_NAME")

        try:
            # Add SSL configuration
            self.client = MongoClient(mongodb_uri, 
                                    tls=True,
                                    tlsAllowInvalidCertificates=True,
                                    serverSelectionTimeoutMS=5000)
            self.db = self.client[db_name]
            # Test connection
            self.client.admin.command('ping')
            print("Successfully connected to MongoDB!")
            self._initialized = True
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
            raise e

    def get_db(self):
        if not self._initialized:
            self.initialize()
        return self.db

# Create a singleton instance
db = Database()
