import 'package:flutter/material.dart';

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
            itemCount: 0,
            itemBuilder: (context, index) {
              return const Card(
                color: Colors.blueGrey,
                child: ListTile(
                  title: Text("Title"),
                  subtitle: Text("Description"),
                  trailing: Icon(Icons.check),
                ),
              );
            }));
  }
}
