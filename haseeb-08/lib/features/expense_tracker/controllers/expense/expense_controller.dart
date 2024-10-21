import 'package:expense_tracker/data/repositories/expenses/expenses_repository.dart';
import 'package:expense_tracker/features/expense_tracker/models/expense_model.dart';
import 'package:expense_tracker/utils/helpers/helper_functions.dart';
import 'package:get/get.dart';

class ExpenseController extends GetxController{
  static ExpenseController get instance => Get.find();

  /// Variables
  final expenseRepository = Get.put(ExpenseRepository());
  final RxBool refreshList = false.obs;

  Future<List<ExpenseModel>> getAllExpenses() async{
   try{

     return expenseRepository.fetchAllExpenses();

   }catch(e){
     HkHelperFunctions.errorSnackBar(title: 'Error', message: e.toString());
     return [];
   }
  }
}