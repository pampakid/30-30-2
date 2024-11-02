# backend/app/routes/todos.py
from flask import Blueprint, jsonify, request

todo_bp = Blueprint('todos', __name__)

# In-memory storage
todos = []

@todo_bp.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@todo_bp.route('/todos', methods=['POST'])
def create_todo():
    data = request.get_json()
    
    if not data or 'text' not in data:
        return jsonify({"error": "Missing todo text"}), 400
        
    new_todo = {
        'id': len(todos) + 1,
        'text': data['text'],
        'completed': False
    }
    todos.append(new_todo)
    return jsonify(new_todo), 201