// lib/screens/query_screen.dart
import 'package:flutter/material.dart';

class QueryScreen extends StatelessWidget {
  final TextEditingController _queryController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Submit HR Query')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _queryController,
              decoration: InputDecoration(labelText: 'Enter your query'),
              maxLines: 5,
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () {
                // Handle query submission logic
              },
              child: Text('Submit Query'),
            ),
          ],
        ),
      ),
    );
  }
}