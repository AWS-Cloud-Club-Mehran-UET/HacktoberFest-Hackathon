A React Native application for managing homework tasks, utilizing Firebase for stack and queue operations. This app effectively manages tasks using FIFO (First In, First Out) and LIFO (Last In, First Out) data structures.

*Features*

1-Add Tasks: Users can add tasks to a pending list (Queue) stored in Firebase.
2-View Pending Tasks: Displays tasks that need completion, fetched from Firebase.
3-Complete Tasks: Users can mark tasks as complete, moving them from the pending list to a completed tasks list (Stack) in Firebase.
4-View Completed Tasks: Users can view all completed tasks stored in Firebase.

*Technologies Used*
React Native: Framework for building cross-platform mobile applications.
Firebase: Provides real-time database services for managing stack and queue operations.
Firebase Implementation
Task Queue: Implemented using Firebase Realtime Database to manage pending homework tasks in a FIFO manner.
Completed Tasks Stack: Implemented using Firebase to manage completed tasks in a LIFO manner.
