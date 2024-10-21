// Event Creation and Listing
const eventForm = document.getElementById('create-event-form');
const eventList = document.getElementById('event-list');

eventForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('event-title').value;
  const description = document.getElementById('event-description').value;
  const date = document.getElementById('event-date').value;
  const capacity = document.getElementById('event-capacity').value;

  const eventCard = document.createElement('div');
  eventCard.className = 'event-card';
  eventCard.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
    <p><strong>Date:</strong> ${new Date(date).toLocaleString()}</p>
    <p><strong>Capacity:</strong> ${capacity}</p>
    <button>Register</button>
  `;
  eventList.appendChild(eventCard);

  // Clear form
  eventForm.reset();
});

// Community Post Creation and Listing
const postForm = document.getElementById('create-post-form');
const postList = document.getElementById('post-list');

postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('post-title').value;
  const content = document.getElementById('post-content').value;

  const postCard = document.createElement('div');
  postCard.className = 'post-card';
  postCard.innerHTML = `
    <h3>${title}</h3>
    <p>${content}</p>
    <button>Comment</button>
  `;
  postList.appendChild(postCard);

  // Clear form
  postForm.reset();
});

// Placeholder Chat System
const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = document.getElementById('chat-message').value;

  const chatMessage = document.createElement('div');
  chatMessage.innerHTML = `<p>${message}</p>`;
  chatBox.appendChild(chatMessage);

  // Clear chat input
  chatForm.reset();
});
