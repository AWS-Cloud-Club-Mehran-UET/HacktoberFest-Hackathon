// Event Scheduling Functionality
document.getElementById('event-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get values from the event form
  const title = document.getElementById('event-title').value;
  const description = document.getElementById('event-description').value;
  const date = document.getElementById('event-date').value;
  const location = document.getElementById('event-location').value;
  const capacity = document.getElementById('event-capacity').value;

  // Create a new event object
  const eventItem = {
      title,
      description,
      date,
      location,
      capacity,
      registered: 0 // To track how many users registered
  };

  // Add event to the list
  addEventToList(eventItem);

  // Clear the form
  document.getElementById('event-form').reset();
});

// Function to add event to the list
function addEventToList(eventItem) {
  const eventsList = document.getElementById('events');
  const listItem = document.createElement('li');

  listItem.innerHTML = `
      <h3>${eventItem.title}</h3>
      <p>${eventItem.description}</p>
      <p><strong>Date:</strong> ${new Date(eventItem.date).toLocaleString()}</p>
      <p><strong>Location:</strong> ${eventItem.location}</p>
      <p><strong>Capacity:</strong> ${eventItem.capacity}</p>
      <p><strong>Registered:</strong> ${eventItem.registered}</p>
      <button onclick="registerForEvent(this, ${eventItem.capacity})">Register</button>
      <div class="countdown" data-date="${eventItem.date}"></div>
      <div class="review-section">
          <h4>Submit a Review</h4>
          <form class="review-form" onsubmit="submitReview(event, this)">
              <textarea placeholder="Write your review..." required></textarea>
              <button type="submit">Submit Review</button>
          </form>
          <ul class="reviews"></ul>
      </div>
  `;
  eventsList.appendChild(listItem);

  // Initialize countdown timer
  startCountdownTimer(listItem.querySelector('.countdown'), eventItem.date);
}

// Function to register for an event
function registerForEvent(button, capacity) {
  const listItem = button.closest('li');
  const registeredText = listItem.querySelector('p strong:nth-child(5)');
  let registeredCount = parseInt(registeredText.innerText.split(': ')[1]);

  if (registeredCount < capacity) {
      registeredCount++;
      registeredText.innerText = `Registered: ${registeredCount}`;
      alert('You have successfully registered for the event!');
  } else {
      alert('Sorry, the event is full.');
  }
}

// Countdown Timer Functionality
function startCountdownTimer(countdownElement, eventDate) {
  const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(eventDate).getTime() - now;

      if (distance < 0) {
          clearInterval(countdownInterval);
          countdownElement.innerHTML = "Event has started!";
          return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownElement.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

// Community Posts Functionality
document.getElementById('post-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get values from the post form
  const title = document.getElementById('post-title').value;
  const content = document.getElementById('post-content').value;

  // Create a new post object
  const postItem = {
      title,
      content,
      comments: []
  };

  // Add post to the list
  addPostToList(postItem);

  // Clear the form
  document.getElementById('post-form').reset();
});

// Function to add a community post to the list
function addPostToList(postItem) {
  const postsList = document.getElementById('posts');
  const listItem = document.createElement('li');

  listItem.innerHTML = `
      <h3>${postItem.title}</h3>
      <p>${postItem.content}</p>
      <div class="comment-section">
          <h4>Comments</h4>
          <form class="comment-form" onsubmit="addComment(event, this)">
              <textarea placeholder="Write a comment..." required></textarea>
              <button type="submit" class="comment-button">Comment</button>
          </form>
          <ul class="comments"></ul>
      </div>
  `;

  postsList.appendChild(listItem);
}

// Function to add a comment to a post
function addComment(event, commentForm) {
  event.preventDefault();
  
  const commentText = commentForm.querySelector('textarea').value;
  const commentsList = commentForm.nextElementSibling;

  const commentItem = document.createElement('li');
  commentItem.innerHTML = `<p>${commentText}</p>`;
  
  commentsList.appendChild(commentItem);

  // Clear the comment form
  commentForm.reset();
}

// Function to submit a review
function submitReview(event, reviewForm) {
  event.preventDefault();
  
  const reviewText = reviewForm.querySelector('textarea').value;
  const reviewsList = reviewForm.nextElementSibling;

  const reviewItem = document.createElement('li');
  reviewItem.innerHTML = `<p>${reviewText}</p>`;
  
  reviewsList.appendChild(reviewItem);

  // Clear the review form
  reviewForm.reset();
}

// WebSocket setup for chat
const socket = new WebSocket('ws://your-websocket-server-url');

socket.onopen = () => {
  console.log('Connected to chat server');
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  displayMessage(message);
};

document.getElementById('chat-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;

  // Send message to WebSocket server
  socket.send(JSON.stringify({ message }));

  // Clear input
  messageInput.value = '';
});

function displayMessage(message) {
  const messagesList = document.getElementById('messages');
  const listItem = document.createElement('li');
  listItem.textContent = message.message; // Customize the display as needed
  messagesList.appendChild(listItem);
}

// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

// User login function
function login(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userCredential => {
          // User signed in
          console.log('User logged in:', userCredential.user);
      })
      .catch(error => {
          console.error('Error logging in:', error);
      });
}

// In your service worker (for web push notifications)
self.addEventListener('push', function(event) {
  const options = {
      body: event.data.text(),
      icon: 'images/icon.png',
      vibrate: [100, 50, 100],
      data: { url: '/' }
  };

  event.waitUntil(
      self.registration.showNotification('Event Reminder', options)
  );
});

// Function to filter posts
function filterPosts(criteria) {
  const posts = document.querySelectorAll('#posts li');
  posts.forEach(post => {
      const title = post.querySelector('h3').textContent.toLowerCase();
      if (title.includes(criteria.toLowerCase())) {
          post.style.display = 'block'; // Show post
      } else {
          post.style.display = 'none'; // Hide post
      }
  });
}
