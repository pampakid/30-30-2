// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for todos and new todo input
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch todos from backend
  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      // In a real app, we'd handle this error appropriately
    }
  };

  // Function to add new todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create todo');
      }
      
      const createdTodo = await response.json();
      setTodos([...todos, createdTodo]);
      setNewTodo(''); // Clear input
    } catch (error) {
      console.error('Error creating todo:', error);
      // In a real app, we'd handle this error appropriately
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      
      {/* Todo Creation Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          required
        />
        <button type="submit">Add Todo</button>
      </form>

      {/* Todo List */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;