import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

import 'transaction_tile.dart';

class ExpensesList extends StatelessWidget {
  const ExpensesList({super.key});

  @override
  Widget build(BuildContext context) {
    final Stream<QuerySnapshot> _usersStream =
        FirebaseFirestore.instance.collection('expenses').snapshots();
    return Expanded(
      child: StreamBuilder(
        stream: _usersStream,
        builder: (context, AsyncSnapshot<QuerySnapshot> snapshot) {
          if (!snapshot.hasData) {
            return const CircularProgressIndicator();
          } else {
            return ListView.builder(
                itemCount: snapshot.data!.docs.length,
                itemBuilder: (context, index) {
                  var doc = snapshot.data!.docs[index];
                  return TransactionTile(
                    leadingIcon: Icon(Icons.arrow_downward),
                    amount: doc['amount'],
                    transactionType: doc['expenseType'],
                  );
                });
          }
        },
      ),
    );
    ;
  }
}
