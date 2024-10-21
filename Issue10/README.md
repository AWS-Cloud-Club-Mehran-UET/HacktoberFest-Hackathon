# Event Scheduling and Community Engagement Application

This web application allows users to schedule and register for events, post reviews, and engage in community discussions. Built with Next.js and Supabase, it provides a seamless experience for event management and community interaction.

## Objective

Participants are tasked with building a web application that allows users to:

- Schedule events.
- Register for events.
- Post reviews after attending events.
- Participate in a community space with additional features like upvoting/downvoting reviews and a basic user chat system.

## Features

### Event Scheduling and Management

#### Event Creation

- Allow users with specific permissions (e.g., event managers) to create events.
- Details include:
  - Title
  - Description
  - Date
  - Time
  - Location (physical or virtual)
  - Capacity
- Support for both public and private events.

#### Event Registration

- Users can view a list of upcoming events and register for them.
- Limit registrations based on event capacity.
- Show a countdown timer for events about to start.

#### Event Dashboard

- Provide an event dashboard for admins to:
  - Manage upcoming events.
  - View registrations.
  - Edit event details.
  - Cancel events.

### Post-Event Review System

#### Review Submission

- Only users who registered and attended an event can submit a review.
- Reviews include:
  - A text field for review content.
  - An optional rating system (e.g., 1-5 stars).

#### Upvote/Downvote Reviews

- Other users can upvote or downvote reviews, pushing helpful reviews to the top.
- Display a tally of votes next to each review.

#### Review Moderation

- Event admins can moderate reviews by deleting inappropriate content.

### Community Posts Page

#### Community Discussions

- Create a separate page for community posts related to event discussions, suggestions, or general conversations.
- Users can create new posts and comment on existing ones to engage in discussions.

#### Post Categories

- Categorize community posts (General Discussions, Event Feedback, Suggestions).

#### Moderation Tools

- Admins can delete inappropriate posts or comments.

### Basic User Chat System (Optional)

#### User-to-User Chat

- Implement a basic real-time messaging system where users can chat with each other.
- Show online/offline status of users.

### Additional Functional Requirements

#### User Authentication

- Secure login system, allowing users to create accounts and log in using email or social media OAuth.

#### Event Reminder Notifications (Optional)

- Send email or push notifications to remind users of upcoming events they’ve registered for.

#### Search & Filters

- Search for events by name, date, category, or location.
- Filter community posts based on categories, popularity, or recency.

#### Responsive Design

- Ensure the app is mobile-friendly and fully functional across devices.


## What is Next.js?

**Next.js** is an open-source React framework that enables developers to build server-rendered applications and static websites using React. Some key features of Next.js include:

- **Server-Side Rendering (SSR)**: Automatically pre-renders pages on the server for better performance and SEO.
- **Static Site Generation (SSG)**: Pre-renders pages at build time, delivering them as static files for optimal speed.
- **API Routes**: Allows developers to create API endpoints within the application, simplifying data handling.
- **File-Based Routing**: Simplifies navigation with a built-in routing system based on the file structure.
- **Built-in CSS and Sass support**: Facilitates styling of components directly within the application.

Next.js is ideal for building fast, user-friendly web applications, making it a perfect choice for our event scheduling and community engagement application.

## What is Supabase?

**Supabase** is an open-source alternative to Firebase that provides a powerful backend as a service (BaaS). It offers a range of features that simplify the development of applications, including:

- **Database Management**: Supabase uses PostgreSQL, enabling developers to work with a robust relational database.
- **Real-time Capabilities**: It allows for real-time updates, making it suitable for applications that require instant data synchronization, such as chat applications.
- **User Authentication**: Supabase provides easy-to-use authentication methods, including email/password login and social media OAuth.
- **Storage**: Supabase offers file storage capabilities, enabling developers to manage user uploads efficiently.
- **APIs**: Automatically generates RESTful APIs based on the database schema, making it easy to interact with data.

### Real-time Chat Application

Using Supabase, we can implement a real-time chat system within our application, allowing users to communicate effectively. Key features of the chat system include:

- **Real-time Messaging**: Users can send and receive messages instantly, enhancing the communication experience.
- **Online/Offline Status**: The system can display whether users are online or offline, providing visibility into user availability.
- **Chat History**: Messages can be stored in the database, allowing users to access previous conversations.
- **Moderation Tools**: Admins can manage chat content, ensuring a safe and friendly environment for users.


## User Authentication

The application features a secure login system that supports two types of users:

1. **Normal Users**: 
   - Have limited control within the application.
   - Can register for events, submit reviews, and participate in community discussions.
   - Can view and engage with content but cannot create or manage events.

2. **Admin Users**: 
   - Have full control over the application.
   - Can create, edit, and delete events.
   - Can moderate user-generated content, including reviews and community posts.
   - Have access to the event dashboard for managing registrations and event details.


   ## How to use
### 1
    
`go to the project directiory`

### 2 run this command in terminal
` npm install `
       
### 3 then run this command to start the pojrect
` npm run dev `
