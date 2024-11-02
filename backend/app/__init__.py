# backend/app/__init__.py
from flask import Flask, jsonify
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    # Enable CORS for entire app
    CORS(app, resources={
        r"/*": {
            "origins": ["http://localhost:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    @app.route('/test')
    def test_main():
        return jsonify({
            "message": "Main app test working!",
            "route": "/test"
        })
    
    # Register blueprint
    from .routes.todos import todo_bp
    app.register_blueprint(todo_bp, url_prefix='/api')
    
    return app