import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Hero from './Hero';
import AdminDashboard from './AdminDashboard';
import EventManagerDashboard from './EventManagerDashboard';
import EventsPage from './EventsPage';
import CommunityPosts from './CommunityPosts';
import PrivateRoute from './PrivateRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
      <Route path="/eventmanager" element={<PrivateRoute role="eventmanager"><EventManagerDashboard /></PrivateRoute>} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/community" element={<CommunityPosts />} />
    </Routes>
  );
}

export default AppRoutes;