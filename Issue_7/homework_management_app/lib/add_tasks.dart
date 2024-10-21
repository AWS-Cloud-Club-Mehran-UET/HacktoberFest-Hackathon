import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class AddTasks extends StatelessWidget {
  const AddTasks({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Add Tasks"),
        backgroundColor:  Colors.deepPurple,
        centerTitle:  true,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
            child: TextFormField(
              decoration: InputDecoration(
                  hintText: 'Enter title', border: OutlineInputBorder()),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
            child: TextFormField(
              decoration: InputDecoration(
                  hintText: 'Enter description', border: OutlineInputBorder()),
            ),
          ),
          SizedBox(height: 20,),
          ElevatedButton(onPressed: (){}, child: Text("Add Task"))
        ],
      ),
    );
    
  }
}
