# app/__init__.py
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app) # Enable CORS for all routes

    from app.routes.todos import todo_bp
    app.register_blueprint(todo_bp, url_prefix='/api')

    return app