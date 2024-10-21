

import 'package:expense_tracker/data/repositories/authentication/authentication_repository.dart';
import 'package:expense_tracker/data/repositories/expenses/expenses_repository.dart';
import 'package:expense_tracker/features/authentication/models/user_model.dart';
import 'package:expense_tracker/features/expense_tracker/controllers/expense/expense_controller.dart';
import 'package:expense_tracker/features/expense_tracker/models/expense_model.dart';
import 'package:expense_tracker/features/expense_tracker/screens/dashboard/dashboard.dart';
import 'package:expense_tracker/utils/helpers/helper_functions.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uuid/uuid.dart';

class AddExpenseController extends GetxController {
  static AddExpenseController get instance => Get.find();

  /// Variables
  final expenseRepository = Get.put(ExpenseRepository());
  final _authenticationRepository = Get.put(AuthenticationRepository());

  Rx<DateTime?> pickedDate = Rx(null);
  final formKey = GlobalKey<FormState>();
  final amount = TextEditingController();
  final category = TextEditingController();
  final description = TextEditingController();
  RxBool isLoading = false.obs;
  final Uuid uuid = const Uuid();

  /// Pick Date
  Future<void> selectDate(BuildContext context) async {
    DateTime? selectedDate = await showDatePicker(
      context: context, // Using Get.context for context

      firstDate: DateTime(2022), // Earliest selectable date
      lastDate: DateTime(2024), // Latest selectable date
    );

    if (selectedDate != null) {
      pickedDate.value = selectedDate;
    }
  }

  /// Store User Expenses
  Future<void> addExpense() async {
    try {
      // Start Loading
      isLoading.value = true;

      // Form Validation
      if (!formKey.currentState!.validate()) {
        return;
      }

      // Date Validation
      if (pickedDate.value == null) {
        HkHelperFunctions.errorSnackBar(title: 'Required', message: 'Please select date');
        return;
      }


      // create model
      ExpenseModel expense = ExpenseModel(
          id: DateTime.now().microsecondsSinceEpoch,
          userId: Get.put(AuthenticationRepository()).auth.currentUser!.uid,
          amount: amount.text.trim(),
          description: description.text.trim(),
          category: category.text.trim(),
          date: pickedDate.value!,
      );

      // Store User Expense
      await expenseRepository.storeExpense(expense);

      // calculate remaining budget
      await calculateRemainingBudget(amount.text.trim());

      // refresh list
      ExpenseController.instance.refreshList.toggle();

      // Show Message
      HkHelperFunctions.successSnackBar(title: 'Added', message: 'Your Expense has been added');

      // Redirect Back
      Get.offAll(() => const DashboardScreen());
    } catch (e) {
      debugPrint(e.toString());
      HkHelperFunctions.errorSnackBar(title: 'Error', message: e.toString());
    } finally {
      isLoading.value = false;
    }
  }

  /// calculate remaining budget
  Future<void> calculateRemainingBudget(String amount) async{
    try{

      UserModel user = _authenticationRepository.user.value;
      double totalBudget = double.parse(user.budget);
      double expense = double.parse(amount);
      double remainingBudget = double.parse(user.remainingBudget == '' ? user.budget : user.remainingBudget) - expense;

      if(remainingBudget < 0){
        String loss = ((remainingBudget / totalBudget) * 100).toStringAsFixed(2);
        user.loss = loss;
        user.remainingBudget = remainingBudget.toString();
    }

      if(remainingBudget > 0){
        double profit = ((remainingBudget / totalBudget) * 100);
        profit = 100 - profit;
        user.profit = profit.toStringAsFixed(2);
        user.remainingBudget = remainingBudget.toString();
      }

      await _authenticationRepository.storeUser(user);
    }catch(e){
      debugPrint(e.toString());

    }
  }
}
