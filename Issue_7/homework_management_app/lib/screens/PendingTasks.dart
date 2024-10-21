import 'package:flutter/material.dart';
import 'package:homework_management_app/Data_Structures/TaskQueue.dart';
import 'package:homework_management_app/Data_Structures/TaskStack.dart';
import 'package:homework_management_app/screens/add_tasks.dart';

class PendingTasks extends StatefulWidget {
  const PendingTasks({super.key});

  @override
  State<PendingTasks> createState() => _PendingTasksState();
}

class _PendingTasksState extends State<PendingTasks> {
  @override
  Widget build(BuildContext context) {
    print(TaskQueue.taskQueue);
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.only(right: 2.0, left: 2),
        child: ListView.builder(
            itemCount: TaskQueue.taskQueue.length,
            itemBuilder: (context, index) {
              return Card(
                color: Colors.grey,
                child: ListTile(
                  title: Text(TaskQueue.taskQueue[index]['title']!),
                  subtitle: Text(TaskQueue.taskQueue[index]['description']!),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      InkWell(
                        child: const Icon(
                          Icons.check,
                          color: Colors.green,
                          size: 30,
                        ),
                        onTap: (){
                          setState(() {
                            TaskStack.push(TaskQueue.taskQueue[index]['title']!, TaskQueue.taskQueue[index]['description']!);
                            TaskQueue.removeItem(index);
                          });
                        },
                      ),
                      const SizedBox(
                        width: 10,
                      ),
                      InkWell(
                        child: const Icon(
                          Icons.delete,
                          size: 30,
                          color: Colors.red,
                        ),
                        onTap: () {
                          setState(() {
                            TaskQueue.removeItem(index);
                          });
                        },
                      )
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
          setState(() {
          });
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
