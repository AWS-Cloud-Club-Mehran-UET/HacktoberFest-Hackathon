import React, { useState, useEffect } from 'react';
import './Hero.css'; // Import the CSS file for styling
import Calendar from 'react-calendar'; // Import the Calendar component
import 'react-calendar/dist/Calendar.css'; // Import the Calendar CSS
import FilterAndEvents from './FilterAndEvents'; // Import the combined component

const LOCAL_STORAGE_KEY = 'eventManager.events';

function Hero() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    const filtered = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === selectedDate.toDateString();
    });
    setFilteredEvents(filtered);
  }, [selectedDate, events]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="hero">
      <h1>Welcome Rafay <span role="img" aria-label="waving hand">👋</span></h1>
      <h2>Events from your groups</h2>
      <div className="hero-content">
        <Calendar className="calendar" onChange={handleDateChange} value={selectedDate} /> {/* Add the Calendar component */}
        <FilterAndEvents events={filteredEvents} /> {/* Add the combined component beside the calendar */}
      </div>
    </div>
  );
}

export default Hero;