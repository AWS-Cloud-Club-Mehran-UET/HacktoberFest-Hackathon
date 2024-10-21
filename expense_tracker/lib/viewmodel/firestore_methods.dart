import 'package:cloud_firestore/cloud_firestore.dart';

class FirestoreService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;
  final String collection = 'expenses';

  Future<void> createExpense(String expenseType, double amount) async {
    try {
      await _db.collection(collection).add({
        'expenseType': expenseType,
        'amount': amount,
      });
      print('expense added');
    } catch (e) {
      print(e);
    }
  }

  Future<void> deleteExpense(String docId) async {
    try {
      await _db.collection(collection).doc(docId).delete();
      print('expense deleted');
    } catch (e) {
      print(e);
    }
  }

  Future<void> updateExpense(
      String docId, String newExpenseType, double newAmount) async {
    try {
      await _db.collection(collection).doc(docId).update({
        'expenseType': newExpenseType,
        'amount': newAmount,
      });
      print('expense updated');
    } catch (e) {
      print(e);
    }
  }

  Future<void> getExpenses() async {
    await _db.collection(collection).get();
  }
}
