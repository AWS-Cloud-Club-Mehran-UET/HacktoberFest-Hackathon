import 'package:flutter/material.dart';

class TransactionTile extends StatelessWidget {
  final Icon leadingIcon;
  final String amount;
  final String transactionType;
  const TransactionTile(
      {required this.amount,
      required this.transactionType,
      required this.leadingIcon,
      super.key});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: leadingIcon,
      title: Text('\$$amount'),
      trailing: Text(transactionType),
    );
  }
}
