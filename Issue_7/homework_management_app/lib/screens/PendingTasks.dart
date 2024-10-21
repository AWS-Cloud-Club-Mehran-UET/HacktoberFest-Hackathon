import 'package:flutter/material.dart';
import 'package:homework_management_app/Data_Structures/TaskQueue.dart';
import 'package:homework_management_app/screens/add_tasks.dart';

class PendingTasks extends StatefulWidget {
  const PendingTasks({super.key});

  @override
  State<PendingTasks> createState() => _PendingTasksState();
}

class _PendingTasksState extends State<PendingTasks> {
  TaskQueue taskQueue = TaskQueue();

  @override
  Widget build(BuildContext context) {
    print(taskQueue.taskQueue);
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.only(right: 2.0, left: 2),
        child: ListView.builder(
            itemCount: taskQueue.taskQueue.length,
            itemBuilder: (context, index) {
              return Card(
                color: Colors.grey,
                child: ListTile(
                  title: Text(taskQueue.taskQueue[index]['title']!),
                  subtitle: Text(taskQueue.taskQueue[index]['description']!),
                  trailing: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        Icons.check,
                        color: Colors.green,
                        size: 30,
                      ),
                      SizedBox(
                        width: 10,
                      ),
                      Icon(
                        Icons.delete,
                        size: 30,
                        color: Colors.red,
                      ),
                    ],
                  ),
                ),
              );
            }),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.blue,
        onPressed: () {
          Navigator.push(context,
              MaterialPageRoute(builder: (context) => const AddTasks()));
        },
        child: const Icon(
          Icons.add,
          color: Colors.black,
          size: 34,
        ),
      ),
    );
  }
}
