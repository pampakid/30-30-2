# backend/app/routes/todos.py
from flask import Blueprint, jsonify, request

todo_bp = Blueprint('todos', __name__)
todos = []

# Test route in blueprint
@todo_bp.route('/test')
def test_blueprint():
    return jsonify({
        "message": "Blueprint test working!",
        "route": "/api/test"
    })

@todo_bp.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@todo_bp.route('/todos', methods=['POST'])
def create_todo():
    data = request.get_json()
    new_todo = {
        'id': len(todos) + 1,
        'text': data.get('text', ''),
        'completed': False
    }
    todos.append(new_todo)
    return jsonify(new_todo), 201