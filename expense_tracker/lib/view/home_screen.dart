import 'package:expense_tracker/view/monthly_expenses_screen.dart';
import 'package:expense_tracker/widgets/expense_card.dart';
import 'package:expense_tracker/widgets/expenses_list.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;
  static const List<Widget> _widgetOptions = <Widget>[
    MonthlyExpensesScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    var tabIndex = 0;
    var standartCurrency = 'PKR';
    var currencyList = [
      'USD',
      'EUR',
      'PKR',
    ];

    changeIndex() {
      setState(() {
        if (tabIndex == 0) {
          tabIndex = 1;
        } else {
          tabIndex = 0;
        }
      });
    }

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
            height: MediaQuery.of(context).size.height * 0.05,
            width: MediaQuery.of(context).size.width,
            color: Colors.black87,
            child: const Center(
              child: Text(
                'Recent Expenses',
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold),
              ),
            ),
          ),
          ExpensesList(),
        ],
      ),
    );
  }
}
