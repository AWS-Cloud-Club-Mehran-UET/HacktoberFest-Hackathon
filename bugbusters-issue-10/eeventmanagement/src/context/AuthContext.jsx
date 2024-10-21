import React, { createContext, useContext, useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../components/FirebaseConfig'; // Update the import path

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      setIsAuthenticated(true);
      setRole(user.role);
    } else {
      alert('Invalid credentials');
    }
  };

  const register = (email, password, role) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      alert('User already exists');
    } else {
      const newUser = { email, password, role };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful');
    }
  };

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setIsAuthenticated(true);
      setRole('user'); // Default role for Google sign-in
      console.log('Google sign-in successful:', user);
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setRole(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, register, googleSignIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};