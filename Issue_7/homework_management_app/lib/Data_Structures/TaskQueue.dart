class TaskQueue {
  List<Map<String, String>> taskQueue = [];
  void _addQueueItem(String title, String description) {
    taskQueue.add({'title': title ,'description' : description});
  }


}
