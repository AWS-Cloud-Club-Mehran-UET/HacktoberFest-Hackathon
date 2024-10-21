import 'package:expense_tracker/widgets/expense_card.dart';
import 'package:expense_tracker/widgets/expenses_list.dart';
import 'package:expense_tracker/widgets/monthly_expenses.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    var tabIndex = 0;
    var standartCurrency = 'PKR';
    var currencyList = [
      'USD',
      'EUR',
      'PKR',
    ];

    // List<Widget> widgets = [MonthlyExpenses(), RecentExpenses()];
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 218, 214, 214),
      appBar: AppBar(
        title: const Text('Dashboard'),
        centerTitle: true,
        backgroundColor: const Color.fromARGB(255, 218, 214, 214),
        actions: [
          DropdownButton(
            items: currencyList.map((String value) {
              return DropdownMenuItem(
                value: value,
                child: Text(value),
              );
            }).toList(),
            onChanged: (value) {
              standartCurrency = value!;
            },
          ),
          const Icon(Icons.currency_exchange),
          const SizedBox(
            width: 5,
          ),
        ],
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          ExpenseCard(
            backgroundColor: Colors.black54,
            expenseType: 'Account Balance',
            expense: '9400000000',
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              ExpenseCard(
                backgroundColor: Colors.green,
                expense: '250000',
                expenseType: 'Income',
              ),
              ExpenseCard(
                  backgroundColor: Colors.red,
                  expenseType: 'Income',
                  expense: '11200'),
            ],
          ),
          const SizedBox(
            height: 10,
          ),
          Container(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height * 0.04,
            color: Colors.black,
            child: Center(
              child: Text(
                'Recent Expenses',
                style: TextStyle(color: Colors.white),
              ),
            ),
          ),
          ExpensesList(),
        ],
      ),
    );
  }
}
