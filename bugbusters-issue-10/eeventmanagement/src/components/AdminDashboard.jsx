import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'; // Import the CSS file for styling
import EditEventModal from './EditEventModal'; // Import the EditEventModal component

const LOCAL_STORAGE_KEY = 'eventManager.events';

function AdminDashboard() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleSave = (updatedEvent) => {
    const updatedEvents = events.map(event =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEvents));
  };

  const handleCancel = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEvents));
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Capacity:</strong> {event.capacity}</p>
            <button onClick={() => handleEdit(event)} className="edit-button">Edit</button>
            <button onClick={() => handleCancel(event.id)} className="cancel-button">Cancel</button>
          </div>
        ))}
      </div>
      <EditEventModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        event={selectedEvent}
        handleSave={handleSave}
      />
    </div>
  );
}

export default AdminDashboard;