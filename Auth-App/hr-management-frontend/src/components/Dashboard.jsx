import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user?.name}</p>
            <button onClick={logout}>Logout</button>
            {/* Additional components for department, employee, queries, and onboarding */}
        </div>
    );
};

export default Dashboard;
