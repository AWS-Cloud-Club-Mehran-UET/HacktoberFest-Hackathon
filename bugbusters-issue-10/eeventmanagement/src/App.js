import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CustomNavbar from './components/navbar';
import AppRoutes from './components/AppRoutes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <CustomNavbar />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;