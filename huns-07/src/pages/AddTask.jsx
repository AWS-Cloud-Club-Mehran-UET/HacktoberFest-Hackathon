// src/components/AddTask.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/homeworkSlice.js';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    let [task, setTask] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setTask(e.target.value);
    };
    const handleBackToHome = () => {
        navigate('/')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task) {
            dispatch(addTask({ id: Date.now(), task, completed: false}));
            localStorage.setItem('tasks', JSON.stringify({ id: Date.now(), task, completed: false}))
            setTask('');
            navigate('/view-pending-tasks')
        }
    };

    return (
        <div className="w-[90%] md:w-full max-w-md mx-auto mt-10 p-4 bg-purple-200 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
                <input 
                    type="text" 
                    value={task} 
                    onChange={handleChange} 
                    placeholder="Add a task" 
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Add Task
                </button>
            </form>
            <span className='cursor-pointer bg-blue-950 border-2 px-4 py-1 rounded-sm text-white' onClick={handleBackToHome}>Back to Home</span>

        </div>
    );
};

export default AddTask;

