# Homework Management App

A mobile app developed with React Native and Expo for managing homework tasks using data structures (Stack and Queue). Users can add, complete, and view their homework tasks efficiently.

## Table of Contents

- [Modules Overview](#modules-overview)
- [Module 1: Initial Setup](#module-1-initial-setup)
- [Module 2: Implement Data Structures](#module-2-implement-data-structures)
- [Module 3: Implement Data Structures into Mobile App Interface](#module-3-implement-data-structures-into-mobile-app-interface)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Modules Overview

The project is divided into several modules that guide the implementation of the app's features and functionality.

### Module 1: Initial Setup

#### Task 1.1: Project Setup

- **Goal**: Initialize the mobile app project.
- **Actions**:
  - Created a new Mobile app project using Expo.
  - Set up a basic folder structure (components, screens, assets).
  - Pushed code to GitHub.
  - Created pull request for the issue.
- **Deliverable**: A running mobile app template.

### Module 2: Implement Data Structures

#### Task 2.1: Create Stack and Queue Classes

- **Goal**: Implement the stack and queue data structures.
- **Actions**:
  - Created a `TaskQueue` class for managing pending homework tasks (FIFO).
  - Created a `CompletedTasksStack` class for managing completed tasks (LIFO).
- **Deliverable**: Working stacks and queue implementations.

#### Task 2.2: Integrate Data Structures into the App

- **Goal**: Use the stack and queue classes in the mobile app.
- **Actions**:
  - Created instances of `TaskQueue` and `CompletedTasksStack`.
  - Implemented methods to add tasks to the queue and move them to the stack when completed.
  - Pushed code to GitHub.
  - Created pull request for the issue.
- **Deliverable**: The app can now manage tasks with the implemented data structures.

### Module 3: Implement Data Structures into Mobile App Interface

#### Task 3.1: Build Add Task Interface

- **Goal**: Develop a user interface for adding homework tasks.
- **Actions**:
  - Created a form with a text input and a button to submit the new task.
  - Connected the input to the `TaskQueue` to add tasks when the button is clicked.
- **Deliverable**: Users can input tasks to be added to the queue.

#### Task 4.1: Show Pending Tasks

- **Goal**: Create a list view to display tasks from the queue.
- **Actions**:
  - Used a `FlatList` component to render the tasks from the `TaskQueue`.
- **Deliverable**: The app displays a list of pending tasks.

#### Task 4.2: Implement Complete Task Functionality

- **Goal**: Allow users to mark tasks as complete.
- **Actions**:
  - Added a button next to each task in the list for completing it.
  - On button click, removed the task from the `TaskQueue` and added it to the `CompletedTasksStack`.
- **Deliverable**: Users can complete tasks, and they are removed from the pending list.

#### Task 5.1: Show Completed Tasks

- **Goal**: Create a separate view to display completed tasks.
- **Actions**:
  - Implemented a new screen or tab to show tasks from the `CompletedTasksStack`.
  - Pushed code to GitHub.
  - Created pull request for the issue.
- **Deliverable**: Users can view their completed tasks.



## About React Native and Expo

**React Native** is an open-source mobile application framework created by Facebook. It enables developers to build mobile apps using JavaScript and React, allowing for a seamless cross-platform experience on both iOS and Android. By leveraging native components, React Native provides a performance that is close to native applications while enabling rapid development.

**Expo** is a set of tools and services built around React Native that helps streamline the development process. It provides a managed workflow, allowing developers to focus on building their apps without dealing with native code. Some key features of Expo include:

- **Fast Development**: With features like hot reloading, developers can see the results of their changes instantly.
- **Rich Library of Components**: Expo comes with a wide range of pre-built components and APIs for accessing device functionalities like the camera, location services, and push notifications.
- **Cross-Platform Compatibility**: Build apps that work seamlessly on both iOS and Android without needing separate codebases.
- **Easier Deployment**: Expo simplifies the process of deploying apps to app stores, making it easier for developers to release their applications to users.


## Key Features

### AsyncStorage

In this app, **AsyncStorage** is used to persist user data locally on the device. This allows the app to store and retrieve homework tasks even after the app is closed or restarted. The benefits of using AsyncStorage include:

- **Local Storage**: Store user preferences and homework tasks without needing a backend server.
- **Simple API**: Easy to use for basic key-value storage, making it suitable for lightweight data management.

### Real-time Notifications

The app implements **real-time notifications** to keep users informed about important updates, such as task deadlines or completion confirmations. This feature enhances user engagement and ensures that users stay on top of their homework tasks.

- **Push Notifications**: Users receive notifications directly on their devices, reminding them of upcoming tasks and deadlines.
- **Instant Updates**: Notifications can be sent as tasks are added, completed, or modified, providing a dynamic user experience.

### Material UI Icons

The app utilizes **Material UI Icons** to enhance the visual appeal of the user interface. These icons provide a clean and modern look, making the app more user-friendly. Key benefits include:

- **Consistency**: Using Material UI icons ensures a consistent design language throughout the app.
- **Wide Variety**: A vast collection of icons is available, allowing for flexibility in design and functionality.
- **Easy Integration**: Icons can be easily added to buttons, lists, and other UI elements to improve usability.



## Usage

- Open the app on your mobile device or emulator.
- Add homework tasks using the input field and submit button.
- View pending tasks in the list.
- Mark tasks as complete to move them to the completed tasks section.

## APK File

The APK file for the Homework Management App can be found in the "issue 7" folder. You can download and install it on your Android device for direct access to the application.


## How to Install
`1)cd taskmanagerapp`
`2)npm install`
`3)npm start`
