import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TodoForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        if (id) {
            axios.get(`/todos/${id}`)
            .then(response => {
                setTitle(response.data.title);
                setDescription(response.data.description);
            })
            .catch(error => console.error(`Error fetching to-do: ${error}`));
        }
    }, [id]);

const handleSubmit = (e) => {
    e.preventDefault();
    const todo = { title, description };

    if (id) {
        axios.put(`/todos/${id}`, todo)
        .then(() => {
            navigate('/');
        })
        .catch(error => console.error(`Error updating to-do: ${error}`));
    } else {
        axios.post('/todos', todo)
        .then(() => {
            navigate('/');
        })
        .catch(error => console.error(`Error creating to-do: ${error}`));
    }
};

return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded-lg mt-4">
        <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Todo' : 'Add Todo'}</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700">Title:</label>
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
                required
                />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description:</label>
                    <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded w-full"
                    required
                    ></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                        {id ? 'Update' : 'Add'} Todo
                        </button>
                        </form>
                        </div>
                        );
                };

export default TodoForm;
