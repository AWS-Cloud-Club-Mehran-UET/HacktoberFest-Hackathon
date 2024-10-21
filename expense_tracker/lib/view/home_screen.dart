import 'package:expense_tracker/widgets/expense_card.dart';
import 'package:expense_tracker/widgets/monthly_expenses.dart';
import 'package:expense_tracker/widgets/recent_expenses.dart';
import 'package:expense_tracker/widgets/tab_button.dart';
import 'package:expense_tracker/widgets/transaction_tile.dart';
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

    changeIndex() {
      setState(() {
        if (tabIndex == 0) {
          tabIndex = 1;
        } else {
          tabIndex = 0;
        }
      });
    }

    List<Widget> widgets = [MonthlyExpenses(), RecentExpenses()];
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
          Container(
            width: MediaQuery.of(context).size.width * 0.80,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: Colors.white),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // TabButton(
                //   buttonText: 'Recent',
                //   onTap: () {
                //     setState(() {
                //       tabIndex = 0;
                //     });
                //   },
                // ),
                // TabButton(
                //   buttonText: 'Monthly',
                //   onTap: changeIndex,
                // ),
                ElevatedButton(
                  onPressed: changeIndex(),
                  child: Text('Recent'),
                ),
                ElevatedButton(
                  onPressed: changeIndex(),
                  child: Text('Monthly'),
                ),
              ],
            ),
          ),
          Expanded(child: widgets[tabIndex]),
        ],
      ),
    );
  }
}
