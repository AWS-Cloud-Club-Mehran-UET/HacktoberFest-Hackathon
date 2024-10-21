import 'package:flutter/material.dart';
import 'package:homework_management_app/Data_Structures/TaskStack.dart';

class CompletedTasks extends StatefulWidget {
  const CompletedTasks({super.key});

  @override
  State<CompletedTasks> createState() => _CompletedTasksState();
}

class _CompletedTasksState extends State<CompletedTasks> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: ListView.builder(
            itemCount: TaskStack.list.length,
            itemBuilder: (context, index) {
              return Card(
                color: Colors.blueGrey,
                child: ListTile(
                  title: Text(TaskStack.list[index]['title']!),
                  subtitle: Text(TaskStack.list[index]['description']!),
                ),
              );
            }));
  }
}
