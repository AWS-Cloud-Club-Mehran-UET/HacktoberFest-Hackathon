import 'package:flutter/material.dart';
import 'package:homework_management/models/completed_tasks_stack.dart';

class CompletedTasksScreen extends StatelessWidget {
  final CompletedTasksStack completedTasksStack;

  CompletedTasksScreen({required this.completedTasksStack});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Completed Tasks',
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        backgroundColor: Colors.teal,
      ),
      body: completedTasksStack.completedTasks.isEmpty
          ? Center(
              child: Text(
                'No completed tasks yet!',
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.grey,
                ),
              ),
            )
          : ListView.builder(
              padding: const EdgeInsets.all(16.0),
              itemCount: completedTasksStack.completedTasks.length,
              itemBuilder: (context, index) {
                final task = completedTasksStack.completedTasks[index];
                return Padding(
                  padding: const EdgeInsets.symmetric(vertical: 8.0),
                  child: Card(
                    elevation: 3,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: ListTile(
                      contentPadding: EdgeInsets.all(12),
                      leading: Icon(Icons.check_circle, color: Colors.green),
                      title: Text(
                        task.title,
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
    );
  }
}
