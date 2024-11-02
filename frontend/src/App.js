// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState(null);
  const [testMessage, setTestMessage] = useState('');

  // Test both endpoints when component mounts
  useEffect(() => {
    // Test main app route
    fetch('http://localhost:5000/test')
      .then(response => response.json())
      .then(data => {
        console.log('Main test response:', data);
        setTestMessage(data.message);
      })
      .catch(error => {
        console.error('Main test error:', error);
      });

    // Test blueprint route
    fetch('http://localhost:5000/api/test')
      .then(response => response.json())
      .then(data => {
        console.log('Blueprint test response:', data);
        // If blueprint test works, fetch todos
        fetchTodos();
      })
      .catch(error => {
        console.error('Blueprint test error:', error);
        setError('Failed to connect to API');
      });
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todos');
      console.log('Todos response:', response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Todos data:', data);
      setTodos(data);
    } catch (error) {
      console.error('Fetch todos error:', error);
      setError('Failed to fetch todos');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo }),
      });

      console.log('Create todo response:', response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Created todo:', data);
      setTodos([...todos, data]);
      setNewTodo('');
      setError(null);
    } catch (error) {
      console.error('Create todo error:', error);
      setError('Failed to create todo');
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      
      {testMessage && (
        <div style={{ margin: '1rem 0', padding: '0.5rem', backgroundColor: '#e3f2fd' }}>
          {testMessage}
        </div>
      )}
      
      {error && (
        <div style={{ color: 'red', margin: '1rem 0', padding: '0.5rem', backgroundColor: '#ffebee' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          required
        />
        <button type="submit">Add Todo</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>

      <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#666' }}>
        Status: {testMessage ? 'Connected to server' : 'Not connected'}
      </div>
    </div>
  );
}

export default App;