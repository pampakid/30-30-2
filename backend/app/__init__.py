# backend/app/__init__.py
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # This enables CORS for all routes
    
    # Import and register the blueprint
    from app.routes.todos import todo_bp
    app.register_blueprint(todo_bp, url_prefix='/api')
    
    return app