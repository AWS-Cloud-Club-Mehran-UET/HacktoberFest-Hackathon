import 'package:flutter/material.dart';

class PendingTasks extends StatefulWidget {
  const PendingTasks({super.key});

  @override
  State<PendingTasks> createState() => _PendingTasksState();
}

class _PendingTasksState extends State<PendingTasks> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.only(right: 2.0, left: 2),
        child: ListView.builder(
            itemCount: 4,
            itemBuilder: (context, index) {
              return const Card(
                color: Colors.grey,
                child: ListTile(
                  title: Text("Title"),
                  subtitle: Text("Description"),
                  trailing: Row(
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
        onPressed: () {},
        child: const Icon(
          Icons.add,
          color: Colors.black,
          size: 34,
        ),
      ),
    );
  }
}
