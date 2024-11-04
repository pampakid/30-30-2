# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Todo
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/api/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.order_by(Todo.created_at.desc()).all()
    return jsonify([todo.to_dict() for todo in todos])

@app.route('/api/todos', methods=['POST'])
def create_todo():
    data = request.get_json()

    if not data or 'text' not in data:
        return jsonify({ 'error': 'Text is required.' }), 400
    
    todo = Todo(
        text=data['text'],
        completed=data.get('completed', False)
    )
    db.session.add(todo)
    db.session.commit()

    return jsonify(todo.to_dict()), 201

@app.route('/api/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    todo = Todo.query.get_or_404(todo_id)
    data = request.get_json()

    if 'text' in data: 
        todo.text = data['text']
    if 'completed' in data:
        todo.completed = data['completed']

    db.session.commit()
    return jsonify(todo.to_dict())

@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    todo = Todo.query.get_or_404(todo_id)
    db.session.delete(todo)
    db.session.commit()
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)