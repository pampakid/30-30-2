// src/components/TodoList.js
/* 
CORE CONCEPTS
Let's pause here and discuss some key CS concepts we've just implemented:

- State Management: Using the useState hook, we're managing application state - a fundamental concept in CS. State represents the "memory" of our application.
- Data Structures: We're using an array to store our todos. Each todo is an object with properties - this is a practical application of data structures.
- Immutability: Notice how we update the todos using setTodos([...todos, newTodo]). This is an important concept in functional programming where we create new copies instead of modifying existing data.
- Event Handling: We're using event handlers to respond to user actions, demonstrating the event-driven programming paradigm.
*/
import React, { useState } from 'react';

const TodoList = () => {
    // Here we introduce the concept of "state"
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState([]);

    // Event handler - demonstrating function composition
    const handleAddTodo = () => {
        if (!newTodo.trim()) return;

        // Here we learn about immutable state updates
        setTodos([
            ...todos,
            {
                id: Date.now(), // Simple unique ID generation
                text: newTodo,
                completed: false
            }
        ]);
        setNewTodo('');
    };

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Todo List</h1>

            {/* Input selection */}
            <div className='flex gap-2 mb-4'>
                <input 
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className='flex-1 p-2 border rounded'
                    placeholder='Add a new todo'
                />
                <button
                    onClick={handleAddTodo}
                    className='bg-blue-500 text-white px-4 py-2 rounded'
                >
                    Add Todo
                </button>
            </div>

            {/* Todo list section */}
            <ul className="space-y-2">
            {todos.map(todo => (
                <li 
                    key={todo.id}
                    className="flex items-center gap-2 p-2 border rounded"
                >
                    <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => {
                        setTodos(todos.map(t => 
                        t.id === todo.id 
                            ? { ...t, completed: !t.completed }
                            : t
                        ));
                    }}
                    />
                    <span style={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none' 
                    }}>
                    {todo.text}
                    </span>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;


