// lib/screens/offboarding_screen.dart
import 'package:flutter/material.dart';

class OffboardingScreen extends StatefulWidget {
  @override
  _OffboardingScreenState createState() => _OffboardingScreenState();
}

class _OffboardingScreenState extends State<OffboardingScreen> {
  final TextEditingController _employeeIdController = TextEditingController();
  final TextEditingController _reasonController = TextEditingController();
  String? _selectedReason;

  final List<String> _reasons = [
    'Resignation',
    'Termination',
    'Retirement',
    'Other',
  ];

  void _submitOffboarding() {
    // Handle offboarding submission logic
    String employeeId = _employeeIdController.text;
    String reason = _selectedReason ?? 'Not specified';

    // Here you would typically send this data to your backend API
    print('Offboarding submitted for Employee ID: $employeeId, Reason: $reason');

    // Clear the fields after submission
    _employeeIdController.clear();
    setState(() {
      _selectedReason = null;
    });

    // Show a confirmation message
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Offboarding submitted successfully!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Offboarding')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _employeeIdController,
              decoration: InputDecoration(labelText: 'Employee ID'),
            ),
            SizedBox(height: 16.0),
            DropdownButtonFormField<String>(
              value: _selectedReason,
              hint: Text('Select Reason for Offboarding'),
              items: _reasons.map((String reason) {
                return DropdownMenuItem<String>(
                  value: reason,
                  child: Text(reason),
                );
              }).toList(),
              onChanged: (String? newValue) {
                setState(() {
                  _selectedReason = newValue;
                });
              },
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: _submitOffboarding,
              child: Text('Submit Offboarding'),
            ),
          ],
        ),
      ),
    );
  }
}