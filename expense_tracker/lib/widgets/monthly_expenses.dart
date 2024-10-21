import 'package:flutter/material.dart';

import 'transaction_tile.dart';

class MonthlyExpenses extends StatelessWidget {
  const MonthlyExpenses({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: 10,
      itemBuilder: (context, index) {
        return TransactionTile(
          leadingIcon: Icon(Icons.arrow_upward),
          amount: '150000',
          transactionType: 'abc',
        );
      },
    );
    ;
  }
}
