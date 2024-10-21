import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import './FilterAndEvents.css'; // Import the CSS file for styling

function FilterAndEvents({ events }) {
  const calculateTimeLeft = (eventDate) => {
    const difference = +new Date(eventDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(events.map(event => calculateTimeLeft(event.date)));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(events.map(event => calculateTimeLeft(event.date)));
    }, 1000);

    return () => clearTimeout(timer);
  }, [events]);

  const handleRegister = (eventId) => {
    console.log(`Registering for event with id: ${eventId}`);
    // Implement the registration logic here
    alert(`Registered for event with id: ${eventId}`);
  };

  return (
    <div className="filter-and-events">
      <div className="filter-container">
        <DropdownButton id="dropdown-basic-button" title="Any Type" className="filter-dropdown">
          <Dropdown.Item href="#/action-1">Type 1</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Type 2</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Type 3</Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Any Distance" className="filter-dropdown">
          <Dropdown.Item href="#/action-1">Distance 1</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Distance 2</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Distance 3</Dropdown.Item>
        </DropdownButton>
        <Button variant="outline-secondary" className="filter-reset">Reset Filters</Button>
      </div>
      <div className="events">
        {events.map((event, index) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Capacity:</strong> {event.capacity}</p>
            <div className="countdown">
              <p><strong>Starts in:</strong> {timeLeft[index]?.days}d {timeLeft[index]?.hours}h {timeLeft[index]?.minutes}m {timeLeft[index]?.seconds}s</p>
            </div>
            <button onClick={() => handleRegister(event.id)} className="register-button">Register</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterAndEvents;