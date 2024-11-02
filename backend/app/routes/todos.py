from flask import Blueprint, jsonify, request

# Create blueprint
todo_bp = Blueprint('todos', __name__)

# Debug route
@todo_bp.route('/debug', methods=['GET'])
def debug_route():
    return jsonify({"message": "Routes are working!"})

# In-memory storage
todos = []

@todo_bp.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@todo_bp.route('/todos', methods=['POST'])
def create_todo():
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400
    
    data = request.get_json()
    if 'text' not in data:
        return jsonify({"error": "Missing text field"}), 400
    
    todo = {
        'id': len(todos) + 1,
        'text': data['text'],
        'completed': False
    }
    todos.append(todo)
    return jsonify(todo), 201
