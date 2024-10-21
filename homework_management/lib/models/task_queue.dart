

import 'package:homework_management/models/task.dart';

class TaskQueue {
  List<Task> _tasks = [];

  void addTask(Task task) {
    _tasks.add(task);
  }

  Task? removeTask() {
    return _tasks.isNotEmpty ? _tasks.removeAt(0) : null;
  }

  List<Task> get tasks => _tasks;
}
