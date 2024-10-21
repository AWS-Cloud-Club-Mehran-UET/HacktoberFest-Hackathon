import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust as needed

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/users/register`, userData);
};

export const loginUser = async (userData) => {
    return await axios.post(`${API_URL}/users/login`, userData);
};

// Additional API methods can be defined here
export const createDepartment = async (departmentData) => {
    return await axios.post(`${API_URL}/departments`, departmentData);
};

export const getDepartments = async () => {
    return await axios.get(`${API_URL}/departments`);
};

// Add other API methods for employees, queries, onboarding, etc.
