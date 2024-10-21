### Hackathon Report: Event Scheduling Web Application - Team Lappucodes

*Project Overview:*
For the Hacktoberfest hackathon, our team Lappucodes was tasked with building a web application that allowed users to schedule and register for events, post reviews, and engage in community discussions. The application had multiple interactive features such as upvoting/downvoting reviews, community posts, and a basic user chat system.

*Challenges Faced:*

1. *Complex Feature Integration:*
   The project required integrating several features, such as event scheduling, registration, reviews, community engagement, and a chat system. Balancing the complexity of each feature without overwhelming the UI or increasing the development time was a major challenge.

2. *Scalability of Event Registrations:*
   Managing registrations, especially limiting them based on event capacity, required careful database structuring. We had to design an efficient system to track user registrations in real-time and prevent overbooking.

3. *Real-Time Features (Chat & Notifications):*
   Building a real-time chat system and providing countdown timers for events pushed us to work with real-time technologies like WebSockets. This presented a challenge as it added complexity in terms of concurrency management and ensuring the user experience remained smooth.

4. *Moderation and Review System:*
   Implementing the upvote/downvote feature, along with moderation tools for reviews and posts, required building a robust system to prevent spam and handle inappropriate content, all while allowing users to engage meaningfully.

5. *Ensuring Security:*
   With features like user authentication and real-time chat, ensuring the security of data was paramount. We had to design a secure login system (with OAuth support) and ensure that chat messages and sensitive user data were handled securely.

*Technology Stack:*
- *Frontend:* React.js for dynamic user interfaces, combined with Bootstrap for a responsive design.
- *Backend:* Node.js with Express.js for building APIs, and MongoDB for managing event and user data.
- *Real-Time Messaging:* WebSockets for the chat system and countdown timer features.
- *Authentication:* JWT-based secure login, with support for OAuth for social media logins.
- *Deployment:* Dockerized containers hosted on AWS, ensuring scalability and reliability.

### Key Features Developed:

1. *Event Scheduling and Management:*
   - *Event Creation:* We implemented a form for users with administrative permissions to create new events. Event managers could add details like title, description, date, time, location, and capacity. The system supported both public and private events.
   
   - *Event Registration:* A list of upcoming events was presented to users, who could register for the event based on availability. Registrations were automatically limited by the event's capacity, and once full, the event would display as unavailable.

   - *Event Dashboard for Admins:* Admins were provided with a dashboard to manage upcoming events. They could view registrations, edit event details, and cancel events if necessary.

   - *Countdown Timer:* For events nearing their start time, we integrated a real-time countdown timer to help users keep track.

2. *Post-Event Review System:*
   - *Review Submission:* We allowed only registered and attended users to submit reviews. The review system featured a text input field and an optional star rating (1-5). This ensured that feedback was genuine.
   
   - *Upvote/Downvote Mechanism:* Users could upvote or downvote reviews, allowing the most helpful reviews to rise to the top. Each review showed the total votes it had accumulated, giving prominence to insightful reviews.
   
   - *Review Moderation:* Event admins could delete inappropriate reviews, ensuring the system remained clean and respectful.

3. *Community Posts Page:*
   - *Community Discussions:* We created a separate page for event-related discussions and general conversations. Users could start new discussion threads, comment on existing posts, and engage with the community.
   
   - *Post Categories:* Posts were categorized under General Discussions to streamline the flow of conversations, with plans to expand categories later.

   - *Moderation Tools:* Admins were equipped with tools to delete inappropriate posts or comments to maintain a healthy community environment.

4. *Basic User Chat System:*
   - *Real-Time Chat:* Implementing a basic user-to-user chat system, we used WebSockets to enable real-time communication between users. It also displayed the online/offline status of users.
   
   - *Chat Moderation:* We designed it in such a way that inappropriate chat messages could be reported, although more advanced moderation features are planned for future development.

5. *Additional Functionalities:*
   - *User Authentication:* Implementing a secure login system using JWT for authentication and optional OAuth for social media logins allowed users to create accounts and access the platform securely.
   
   - *Event Reminder Notifications (optional):* Although not fully implemented, we planned an email notification system to remind users of upcoming events.
   
   - *Search & Filters:* We added a search bar to filter events based on name, date, or category, and community posts based on popularity or recency.

6. *Responsive Design:* Using Bootstrap ensured the application was mobile-friendly, functioning well across devices.
