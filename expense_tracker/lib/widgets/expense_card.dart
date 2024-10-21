import 'package:flutter/material.dart';

class ExpenseCard extends StatelessWidget {
  final String expenseType;
  final String expense;
  final Color backgroundColor;

  const ExpenseCard(
      {required this.backgroundColor,
      required this.expenseType,
      required this.expense,
      super.key});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(
        height: MediaQuery.of(context).size.height * 0.10,
        width: MediaQuery.of(context).size.width * 0.43,
        decoration: BoxDecoration(
          color: backgroundColor,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              expenseType,
              style: const TextStyle(
                  color: Colors.white, fontWeight: FontWeight.normal),
            ),
            Text(
              expense,
              style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 20),
            ),
          ],
        ),
      ),
    );
  }
}
