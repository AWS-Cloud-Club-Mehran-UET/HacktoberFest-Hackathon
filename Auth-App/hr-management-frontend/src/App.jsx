import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Make sure this path is correct
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import DepartmentForm from './components/Departments/DepartmentForm';
import DepartmentList from './components/Departments/DepartmentList';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/departments/new" element={<DepartmentForm />} />
                    <Route path="/departments" element={<DepartmentList />} />
                    {/* Add more routes as needed */}
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
