import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]); // Ensure todos is initialized as an empty array

useEffect(() => {
    axios
    .get("/todos")
    .then((response) => {
        // Check if the response data is an array before setting it to the state
        if (Array.isArray(response.data)) {
            setTodos(response.data);
        } else {
            setTodos([]); // Set todos to an empty array if the response data is not an array
            console.error("Received data is not an array:", response.data);
        }
    })
    .catch((error) => console.error("Error fetching todos:", error));
}, []);

const deleteTodo = (id) => {
    axios
    .delete(`/todos/${id}`)
    .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
    })
    .catch((error) => console.error(`Error deleting todo: ${error}`));
};

return (
    <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">To-Do List</h1>
        <div className="flex justify-center mb-8">
            <Link to="/add" className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition duration-300">
                Add New Todo
            </Link>
            </div>
            <ul className="space-y-4">
                {todos.map((todo) => (
                <li key={todo._id} className="p-4 bg-white shadow rounded-lg">
                    <h2 className="text-2xl font-bold">{todo.title}</h2>
                    <p className="text-gray-700">{todo.description}</p>
                    <button
                    onClick={() => deleteTodo(todo._id)}
                    className="mt-2 bg-red-500 hover:bg-red-700"
                    >Delete</button>
                    <Link to={`/edit/${todo._id}`} className="ml-2 text-blue-500 hover:text-blue-700">
                        Edit
                    </Link>
                    </li>
                ))}
                </ul>
                </div>
                );
            };

export default TodoList;