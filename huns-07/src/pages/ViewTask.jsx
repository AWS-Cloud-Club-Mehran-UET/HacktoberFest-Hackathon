import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { completeTask, deleteTask } from '../redux/homeworkSlice.js';
import { useNavigate } from 'react-router-dom';

const ViewTasks = () => {
    const taskQueue = useSelector((state) => state.taskQueue);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCompletedTask = () => {
        navigate('/view-completed-tasks')
    }
    const handleBackToHome = () => {
        navigate('/')
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4">
            <h2 className="text-3xl font-bold text-center mb-4">Your Tasks</h2>
            {taskQueue.length > 0 ? (
                <div className="space-y-4">
                    {taskQueue.map(tasks => (
                        <div
                            key={tasks.id}
                            className={`bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition flex justify-between items-center ${tasks.completed ? 'bg-green-100' : ''
                                }`}
                        >
                            <p className={`text-gray-600 ${tasks.completed ? 'line-through' : ''}`}>
                                {tasks.task}
                            </p>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => dispatch(completeTask(tasks.id))}
                                    className={`px-3 py-1 text-white rounded-md transition duration-300 ${tasks.completed ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                        }`}
                                    disabled={tasks.completed}           >
                                    Complete
                                </button>
                                <button
                                    onClick={() => dispatch(deleteTask(tasks.id))}
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <p className="text-center text-gray-500">No tasks found.</p>
                </>
            )}
            <div className='flex flex-col w-full md:flex-row gap-2'>
                <span className='cursor-pointer mx-auto bg-blue-950 mt-4 border-2 px-4 py-1 rounded-sm text-white' onClick={handleBackToHome}>Back to Home</span>
            </div>
        </div>
    );
};

export default ViewTasks;
