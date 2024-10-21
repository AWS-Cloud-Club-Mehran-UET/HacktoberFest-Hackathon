class TaskQueue {
  List<Map<String, String>> taskQueue = [];
  void addQueueItem(String title, String description) {
    taskQueue.add({'title': title, 'description': description});
  }

  void removeItem() {
    taskQueue.removeAt(0);
  }
}
