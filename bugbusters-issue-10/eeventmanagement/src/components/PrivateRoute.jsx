import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children, role }) {
  const { isAuthenticated, role: userRole } = useAuth();
  return isAuthenticated && userRole === role ? children : <Navigate to="/" />;
}

export default PrivateRoute;