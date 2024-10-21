Event Scheduling and Community Engagement Application

This web application allows users to schedule and register for events, post reviews, and engage in community discussions. Built from the ground up using Next.js and Supabase, it provides a seamless experience for event management and community interaction. Throughout the development, I encountered several challenges, which I solved step-by-step to ensure a smooth user experience.

Objective

My goal was to build a web application that enables users to:

    •	Schedule events.
    •	Register for events.
    •	Post reviews after attending events.
    •	Engage in community discussions with features like upvoting/downvoting reviews and a basic user chat system.

Features

Event Scheduling and Management

Event Creation

    •	Users with specific permissions (e.g., event managers) can create events.
    •	Details include:
    •	Title
    •	Description
    •	Date
    •	Time
    •	Location (physical or virtual)
    •	Capacity
    •	Supports both public and private events.

Event Registration

    •	Users can browse upcoming events and register.
    •	Registrations are limited based on event capacity.
    •	A countdown timer is displayed for events close to their start time.

Event Dashboard

    •	An event dashboard for admins provides control over:
    •	Managing upcoming events.
    •	Viewing registrations.
    •	Editing event details.
    •	Canceling events.

Post-Event Review System

Review Submission

    •	Only users who registered and attended can submit a review.
    •	Reviews include:
    •	A text field for review content.
    •	An optional rating system (e.g., 1-5 stars).

Upvote/Downvote Reviews

    •	Other users can upvote or downvote reviews to highlight helpful ones.
    •	A vote tally is displayed next to each review.

Review Moderation

    •	Event admins can moderate reviews by deleting inappropriate content.

Community Posts Page

Community Discussions

    •	A separate page for users to post about events, give feedback, or engage in general conversations.
    •	Users can create new posts or comment on existing ones.

Basic User Chat System

User-to-User Chat

    •	A basic real-time messaging system allows users to chat with each other.
    •	Users’ online/offline status is displayed.

Additional Functional Requirements

User Authentication

    •	Secure login system, allowing account creation and login with email.

Search & Filters

    •	Users can search for events by name, date, category, or location.
    •	Filters allow searching community posts based on categories, popularity, or recency.

Responsive Design

    •	The app is fully functional across devices with mobile-friendly designs.

What is Next.js?

Next.js is a React framework that was ideal for this project due to features like:

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

`npm install`

### 3 then run this command to start the pojrect

`npm run dev`

Admin User
email: `admin@admin.com`
password: `adminadmin`
