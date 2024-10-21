import 'dart:io';

import 'package:expense_tracker/features/expense_tracker/models/expense_model.dart';
import 'package:get/get.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

class ExpenseRepository extends GetxController {
  static ExpenseRepository get instance => Get.find();

  /// Variables
  final String tableName = 'Expense1';

  Database? _database;

  /// Initialize Expense Database
  Future<Database?> get initDatabase async {

    if(_database != null){
      return _database;
    }

    final Directory tempDir = await getTemporaryDirectory();
    _database = await openDatabase(
      '${tempDir.path}/expense1.db',
      version: 1,
      onCreate: (db, version) {
        db.execute('''
        CREATE TABLE $tableName (
         id INTEGER PRIMARY KEY AUTOINCREMENT,        
         userId TEXT NOT NULL,                     
         amount TEXT NOT NULL,          
         category TEXT NOT NULL,        
         date TEXT NOT NULL,
         description TEXT NOT NULL 
          )
        ''');
      },
    );

    return _database;
  }




  /// function to store user expenses
  Future<void> storeExpense(ExpenseModel expense) async {
    try {

      // get expense database
      Database? db = await initDatabase;
      if(db == null){
        throw 'Database is null';
      }

      // insert expense
      await db.insert(tableName, expense.toJson());

    } catch (e) {
      rethrow;
    }
  }


  /// Function fetch all expenses
  Future<List<ExpenseModel>> fetchAllExpenses() async{
    try{

      Database? db = await initDatabase;
      if(db == null){
        return [];
      }

      // get all expenses list
      List<Map<String, dynamic>> query = await db.query(tableName);

      // convert to model
      List<ExpenseModel> expenses = query.map((e) => ExpenseModel.fromJson(e)).toList();

      return expenses;

    }catch(e){
      rethrow;
    }
  }
}
