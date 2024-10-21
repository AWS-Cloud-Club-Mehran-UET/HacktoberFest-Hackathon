import React from 'react'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-purple-300 text-black flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center w-[90%] mx-auto md:w-full items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Homework Management App</h1>
        <p className="text-lg mb-8">
          Organize, track, and manage your homework effortlessly with our app.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/add-task"
            className="bg-white text-blue-950 py-2 px-4 rounded-full shadow-md hover:bg-gray-100 "
          >
            Add Task
          </Link>
          <Link
            to="/view-pending-tasks"
            className="bg-white text-blue-950 py-2 px-4 rounded-full shadow-md hover:bg-gray-100"
          >
            View Pending Tasks
          </Link>
          <Link
            to="/view-completed-tasks"
            className="bg-white text-blue-950 py-2 px-4 rounded-full shadow-md hover:bg-gray-100"
          >
            View Completed Tasks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home