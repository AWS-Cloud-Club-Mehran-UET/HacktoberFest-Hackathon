import { useState } from 'react'
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import './App.css'
import Home from '../pages/Home';
import Navbar from '../components/Navbar';
import Dashboard from '../pages/Dashboard';


function App() {
  const location=useLocation();
  

  return (
    <>
    {location.pathname !== "/login" && location.pathname !== "/" && location.pathname !== "/dashboard" && <Navbar />}
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
