from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
from config.database import db
from routes.user_routes import user_bp
from routes.profile_routes import profile_bp
from routes.alert_routes import alert_bp
from routes.contact_routes import contact_bp
from routes.calendar_routes import calendar_bp

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

print("MONGODB_URI:", os.getenv("MONGODB_URI"))
print("DB_NAME:", os.getenv("DB_NAME"))


# Initialize database
db.initialize()

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(profile_bp, url_prefix='/api')
app.register_blueprint(alert_bp, url_prefix='/api')
app.register_blueprint(contact_bp, url_prefix='/api')
app.register_blueprint(calendar_bp, url_prefix='/api')

# Test route
@app.route('/api/test', methods=['GET'])
def test():
    return {"message": "Backend is running!"}

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
