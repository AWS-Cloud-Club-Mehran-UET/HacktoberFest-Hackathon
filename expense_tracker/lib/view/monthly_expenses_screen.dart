import 'package:expense_tracker/widgets/expenses_list.dart';
import 'package:flutter/material.dart';

class MonthlyExpensesScreen extends StatelessWidget {
  const MonthlyExpensesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Monthly Expenses'),
        centerTitle: true,
      ),
      body: Column(
        children: [
          ExpensesList(),
        ],
      ),
    );
  }
}
