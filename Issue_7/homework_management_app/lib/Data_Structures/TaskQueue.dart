class TaskQueue {
  static List<Map<String, String>> taskQueue = [];
  static void addQueueItem(String title, String description) {
    taskQueue.add({'title': title, 'description': description});
  }

  static void removeItem(index) {
    taskQueue.removeAt(index);
  }
}
