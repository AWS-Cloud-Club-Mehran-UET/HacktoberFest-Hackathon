import 'package:expense_tracker/widgets/expense_card.dart';
import 'package:expense_tracker/widgets/tab_button.dart';
import 'package:expense_tracker/widgets/transaction_tile.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 218, 214, 214),
      appBar: AppBar(
        title: const Text('Dashboard'),
        centerTitle: true,
        backgroundColor: const Color.fromARGB(255, 218, 214, 214),
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
                TabButton(buttonText: 'Recent'),
                TabButton(buttonText: 'Monthly'),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: 10,
              itemBuilder: (context, index) {
                return TransactionTile(
                  leadingIcon: Icon(Icons.arrow_upward),
                  amount: '150000',
                  transactionType: 'Income',
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
