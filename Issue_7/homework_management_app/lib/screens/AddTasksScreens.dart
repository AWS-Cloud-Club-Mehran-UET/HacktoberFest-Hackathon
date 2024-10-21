import 'package:flutter/material.dart';

class AddTasksScreens extends StatefulWidget {
  const AddTasksScreens({super.key});

  @override
  State<AddTasksScreens> createState() => _AddTasksScreensState();
}

class _AddTasksScreensState extends State<AddTasksScreens> {
  final title = TextEditingController();
  final description = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Form(
        child: Column(
          children: [],
        ),
      ),
    );
  }
}
