// ignore_for_file: library_private_types_in_public_api

import 'package:expense_tracker/view/expense_details_screen.dart';
import 'package:expense_tracker/view/home_screen.dart';
import 'package:expense_tracker/view/monthly_expenses_screen.dart';
import 'package:flutter/material.dart';

class HomeWrapper extends StatefulWidget {
  const HomeWrapper({super.key});

  @override
  _HomeWrapperState createState() => _HomeWrapperState();
}

class _HomeWrapperState extends State<HomeWrapper> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    final List<Widget> screens = [
      const HomeScreen(),
      const MonthlyExpensesScreen(),
      const ExpenseDetailsScreen(),
    ];

    return Scaffold(
      body: SafeArea(child: screens[_selectedIndex]),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        unselectedItemColor: Colors.grey,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.calendar_today),
            label: 'Monthly',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.info_outline),
            label: 'Details',
          ),
          // BottomNavigationBarItem(
          //   icon: Icon(Icons.person_outline),
          //   label: 'Profile',
          // ),
        ],
      ),
    );
  }
}
