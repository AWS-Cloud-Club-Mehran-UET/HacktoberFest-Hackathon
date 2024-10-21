// src/components/CompletedTasks.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../redux/homeworkSlice';
import { useNavigate } from 'react-router-dom';

const CompletedTasks = () => {
    const completedTasks = useSelector((state) => state.completedTasks);
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/')
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4">
            <h2 className="text-3xl font-bold text-center mb-4">Completed Tasks</h2>
            {completedTasks.length > 0 ? (
                <div className="space-y-4 mb-4">
                    {completedTasks.map(tasks => (
                        <div
                            key={tasks.id}
                            className="bg-green-100 p-4 rounded-lg shadow-md border border-green-200 hover:shadow-lg transition flex justify-between items-center"
                        >
                            <p className="text-gray-600 line-through">{tasks.task}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No completed tasks found.</p>
            )}
            <div className='w-full flex justify-center'>
            <span className='cursor-pointer mx-auto bg-blue-950 border-2 mt-4 px-4 py-1 rounded-sm text-white' onClick={handleBackToHome}>Back to Home</span>
            </div>
        </div>
    );
};

export default CompletedTasks;
