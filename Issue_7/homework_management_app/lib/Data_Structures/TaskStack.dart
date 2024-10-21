class TaskStack {
  static  List<Map<String, String>> list = [];

  static void push(String title , String descritpion) => list.add({'title' : title , 'description' : descritpion});

  static Map<String, String> pop() => list.removeLast();

  @override
  String toString() => list.toString();
}


