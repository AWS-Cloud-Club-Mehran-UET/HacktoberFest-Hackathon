import 'package:flutter/material.dart';

class TaskStack<T> {
  final List<T> _items = [];
  void push(T item) {
    _items.add(item);
  }

  T? pop() {
    if (_items.isNotEmpty) {
      return _items.removeLast();
    }
    return null;
  }
}

class HomePage extends StatefulWidget {

  HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  TaskStack<int> taskStack = TaskStack();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("This is "),
      ),
      body: Center(
        child: Text(
          "${taskStack._items}"
        ),
      ),
      floatingActionButton: FloatingActionButton(onPressed: (){
        setState(() {
          taskStack.push(taskStack._items.length+1);
        });
      } , child: const Icon(Icons.add),),
    );
  }
}

