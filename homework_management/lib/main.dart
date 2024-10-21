import 'package:flutter/material.dart';
import 'package:homework_management/models/completed_tasks_stack.dart';
import 'package:homework_management/models/task_queue.dart';
import 'package:homework_management/screens/pending_tasks_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({super.key});

  // This widget is the root of your application.
  final TaskQueue taskQueue = TaskQueue();
  final CompletedTasksStack completedTasksStack = CompletedTasksStack();
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(),
      home: PendingTasksScreen(
          taskQueue: taskQueue, completedTasksStack: completedTasksStack),
    );
  }
}
