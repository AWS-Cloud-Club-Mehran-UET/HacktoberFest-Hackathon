import React, { useState } from 'react';
import './ReviewComponent.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function ReviewComponent({ event }) {
  const [reviews, setReviews] = useState(event.reviews || []);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = () => {
    if (!event.registeredUsers || !event.registeredUsers.includes('currentUser')) { // Replace 'currentUser' with actual user ID
      alert('You must register and attend the event to submit a review.');
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      text: reviewText,
      rating,
      votes: 0,
      user: 'currentUser', // Replace 'currentUser' with actual user ID
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setReviewText('');
    setRating(0);

    // Update the event with the new review
    const updatedEvent = {
      ...event,
      reviews: updatedReviews,
    };

    // Update the events in local storage
    const events = JSON.parse(localStorage.getItem('eventManager.events')) || [];
    const updatedEvents = events.map(e => (e.id === event.id ? updatedEvent : e));
    localStorage.setItem('eventManager.events', JSON.stringify(updatedEvents));
  };

  const handleVote = (reviewId, type) => {
    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          votes: type === 'upvote' ? review.votes + 1 : review.votes - 1,
        };
      }
      return review;
    });

    setReviews(updatedReviews);

    // Update the event with the updated reviews
    const updatedEvent = {
      ...event,
      reviews: updatedReviews,
    };

    // Update the events in local storage
    const events = JSON.parse(localStorage.getItem('eventManager.events')) || [];
    const updatedEvents = events.map(e => (e.id === event.id ? updatedEvent : e));
    localStorage.setItem('eventManager.events', JSON.stringify(updatedEvents));
  };

  return (
    <div className="review-component">
      <h4>Reviews</h4>
      {reviews.map(review => (
        <div key={review.id} className="review">
          <p>{review.text}</p>
          <p>
            Rating: {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                color={i < review.rating ? '#ffc107' : '#e4e5e9'}
              />
            ))}
          </p>
          <p>Votes: {review.votes}</p>
          <button onClick={() => handleVote(review.id, 'upvote')}>
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
          <button onClick={() => handleVote(review.id, 'downvote')}>
            <FontAwesomeIcon icon={faThumbsDown} />
          </button>
        </div>
      ))}
      <div className="review-form">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
        />
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              color={i < rating ? '#ffc107' : '#e4e5e9'}
              onClick={() => setRating(i + 1)}
            />
          ))}
        </div>
        <button onClick={handleReviewSubmit}>Submit Review</button>
      </div>
    </div>
  );
}

export default ReviewComponent;