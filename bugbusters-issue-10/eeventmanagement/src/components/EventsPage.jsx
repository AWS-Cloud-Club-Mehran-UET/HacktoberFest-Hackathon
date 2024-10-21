import React, { useState, useEffect } from 'react';
import './EventsPage.css'; // Import the CSS file for styling
import ReviewComponent from './ReviewComponent'; // Import the ReviewComponent

const LOCAL_STORAGE_KEY = 'eventManager.events';

function EventsPage() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

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
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          registeredUsers: [...(event.registeredUsers || []), 'currentUser'], // Replace 'currentUser' with actual user ID
        };
      }
      return event;
    });
    setEvents(updatedEvents);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEvents));
    alert(`Registered for event with id: ${eventId}`);
  };

  return (
    <div className="events-page">
      <h2>All Events</h2>
      <div className="events-list">
        {events.map((event, index) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Capacity:</strong> {event.capacity}</p>
            <div className="countdown">
              <p><strong>Starts in:</strong> {timeLeft[index]?.days}d {timeLeft[index]?.hours}h {timeLeft[index]?.minutes}m {timeLeft[index]?.seconds}s</p>
            </div>
            <button onClick={() => handleRegister(event.id)} className="register-button">Register</button>
            <ReviewComponent event={event} /> {/* Add the ReviewComponent */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;