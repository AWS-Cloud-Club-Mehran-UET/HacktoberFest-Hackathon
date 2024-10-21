import React, { useState, useEffect } from 'react';
import './EventManagerDashboard.css'; // Import the CSS file for styling

const LOCAL_STORAGE_KEY = 'eventManager.events';

function EventManagerDashboard() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: events.length + 1,
      title,
      description,
      date,
      time,
      location,
      capacity,
    };
    setEvents([...events, newEvent]);
    setFilteredEvents([...events, newEvent]);
    // Reset form fields
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setCapacity('');
  };

  const handleDelete = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  };

  return (
    <div className="event-manager-dashboard">
      <div className="form-container">
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              id="capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="create-event-button">Create Event</button>
        </form>
      </div>
      <div className="events-container">
        <h2>Events</h2>
        <div className="events-list">
          {filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Capacity:</strong> {event.capacity}</p>
                <button onClick={() => handleDelete(event.id)} className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventManagerDashboard;