# backend/app/__init__.py
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    # Configure CORS specifically for your React app
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    from app.routes.todos import todo_bp
    app.register_blueprint(todo_bp, url_prefix='/api')
    
    return app