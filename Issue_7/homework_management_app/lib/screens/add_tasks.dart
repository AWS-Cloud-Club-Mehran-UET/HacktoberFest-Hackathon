import 'package:flutter/material.dart';
import 'package:homework_management_app/Data_Structures/TaskQueue.dart';

class AddTasks extends StatefulWidget {
  const AddTasks({super.key});

  @override
  State<AddTasks> createState() => _AddTasksState();
}

class _AddTasksState extends State<AddTasks> {
  final title = TextEditingController();
  final description = TextEditingController();
  final formKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Add Tasks"),
        backgroundColor: Colors.deepPurple,
        centerTitle: true,
      ),
      body: Form(
        key: formKey,
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
              child: TextFormField(
                controller: title,
                validator: (value) {
                  if (value!.isEmpty) {
                    return "Fill it";
                  }
                  return null;
                },
                decoration: const InputDecoration(
                    hintText: 'Enter title', border: OutlineInputBorder()),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
              child: TextFormField(
                controller: description,
                validator: (value) {
                  if (value!.isEmpty) {
                    return "Fill it";
                  }
                  return null;
                },
                decoration: const InputDecoration(
                    hintText: 'Enter description',
                    border: OutlineInputBorder()),
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            ElevatedButton(
                onPressed: () {
                  if (formKey.currentState!.validate()) {
                    setState(() {
                      TaskQueue.addQueueItem(title.text , description.text);
                    });

                    if (context.mounted) {
                      Navigator.of(context).pop();
                    }
                  }
                },
                child: const Text("Add Task"))
          ],
        ),
      ),
    );
  }
}
