

import 'package:homework_management/models/task.dart';

class CompletedTasksStack {
  List<Task> _completedTasks = [];

  void push(Task task) {
    _completedTasks.add(task);
  }

  Task? pop() {
    return _completedTasks.isNotEmpty ? _completedTasks.removeLast() : null;
  }

  List<Task> get completedTasks => _completedTasks;
}
