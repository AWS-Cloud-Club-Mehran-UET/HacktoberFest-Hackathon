import React from 'react';
import './Event.css'; // Import the CSS file for styling

function Event({ title, description }) {
  return (
    <div className="event">
      <div className="event-content">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <button className="register-button">Register</button>
      </div>
    </div>
  );
}

export default Event;