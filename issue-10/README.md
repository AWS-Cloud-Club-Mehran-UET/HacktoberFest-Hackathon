# Event Scheduler & Community Web Application

This is a full-stack web application that allows users to create and manage events, register for events, submit post-event reviews, participate in community discussions, and chat with other users in real-time. 

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Real-time Chat](#real-time-chat)
- [Future Improvements](#future-improvements)

## Features

### Event Scheduling and Management:
- Create public and private events.
- Event registration with capacity limits.
- Event dashboard for admins to manage upcoming events.

### Post-Event Review System:
- Submit reviews and ratings for attended events.
- Upvote/downvote reviews for helpfulness.
- Admins can moderate and delete inappropriate reviews.

### Community Discussion Board:
- Users can create and categorize posts for discussions related to events.
- Commenting and engagement on community posts.
- Admin moderation tools to manage inappropriate content.

### User-to-User Chat:
- Real-time messaging system for users.
- Basic chat interface with online/offline status.

### Additional Features:
- User authentication with secure login using JWT.
- Responsive design for mobile and desktop use.

## Tech Stack

### Frontend:
- **HTML**
- **CSS**
- **JavaScript**

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **Socket.io** (Real-time chat functionality)

### Authentication:
- **JWT (JSON Web Tokens)**

## Getting Started

### Prerequisites:
- **Node.js** installed on your system
- **MongoDB** instance (either locally or using a cloud provider like MongoDB Atlas)

### Installation:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/event-scheduler.git
    cd event-scheduler
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up a MongoDB database (either locally or using MongoDB Atlas).

4. Create a `.env` file in the root directory and add your environment variables (see [Environment Variables](#environment-variables)).

5. Start the server:

    ```bash
    npm start
    ```

6. The application will be running on `http://localhost:5000`.

## Environment Variables

The application requires the following environment variables to run properly. Create a `.env` file in the root of the project and add these values:

```env
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT Secret>
PORT=5000  # Optional, defaults to 5000
```

### Example `.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/event_scheduler
JWT_SECRET=myverysecuresecret
PORT=5000
```

## API Endpoints

### User Authentication:
- **Register**: `POST /api/users/register`
  - Request body: `{ "username": "user1", "email": "user1@example.com", "password": "password123" }`
  
- **Login**: `POST /api/users/login`
  - Request body: `{ "email": "user1@example.com", "password": "password123" }`
  
### Event Management:
- **Create Event**: `POST /api/events/create` (Requires JWT token in header)
  - Request body: `{ "title": "Event Title", "description": "Event description", "date": "2024-12-01T10:00:00", "capacity": 100 }`
  
- **Get All Events**: `GET /api/events`

### Community Posts:
- **Create Post**: `POST /api/posts/create` (Requires JWT token in header)
  - Request body: `{ "title": "Discussion Title", "content": "This is my post content", "category": "General" }`

- **Get All Posts**: `GET /api/posts`

## Real-time Chat

This application supports real-time chat using **Socket.io**. To see the chat in action:

1. Open multiple browser windows.
2. Use the chat input in the frontend to send messages.
3. Messages will appear in real-time across all connected clients.

## Future Improvements

- Implement notifications for event reminders and chat messages.
- Add search and filtering for events and posts.
- Improve real-time chat with user online/offline status and more sophisticated message delivery.
- Add features for image uploads in community posts and chat.
- Enhance review system with pagination and sorting.