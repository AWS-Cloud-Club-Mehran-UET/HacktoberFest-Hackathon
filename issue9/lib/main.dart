// lib/main.dart
import 'package:flutter/material.dart';
import 'screens/login_screen.dart';
import 'screens/employee_list_screen.dart';
import 'screens/onboarding_screen.dart';
import 'screens/offboarding_screen.dart';
import 'screens/query_screen.dart';
import 'screens/employee_list_screen.dart';

void main() {
runApp(MyApp());
}

class MyApp extends StatelessWidget {
@override
Widget build(BuildContext context) {
return MaterialApp(
title: 'HR Management App',
initialRoute: '/',
routes: {
'/': (context) => LoginScreen(),
'/employees': (context) => EmployeeListScreen(),
'/onboarding': (context) => OnboardingScreen(),
'/offboarding': (context) => OffboardingScreen(),
'/queries': (context) => QueryScreen(),
},
);
}
}