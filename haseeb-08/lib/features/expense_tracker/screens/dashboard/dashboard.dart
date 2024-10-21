import 'package:expense_tracker/common/widgets/appbar/appbar.dart';
import 'package:expense_tracker/data/repositories/authentication/authentication_repository.dart';
import 'package:expense_tracker/features/expense_tracker/controllers/expense/expense_controller.dart';
import 'package:expense_tracker/features/expense_tracker/screens/dashboard/widgets/data_cards.dart';
import 'package:expense_tracker/features/expense_tracker/screens/dashboard/widgets/expenses_list.dart';
import 'package:expense_tracker/utils/constants/colors.dart';
import 'package:expense_tracker/utils/constants/sizes.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:iconsax/iconsax.dart';

import '../add_expense/add_expense.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(ExpenseController());

    return Scaffold(
      /// App Bar
      appBar: HkAppBar(
          centerTitle: true,
          title: Text('Dashboard', style: Theme.of(context).textTheme.headlineSmall!.apply()),
          actions: [
            GestureDetector(
                onTap: () => Get.put(AuthenticationRepository()).logoutUser(), child: const Icon(Iconsax.logout, color: Colors.black)),
            const SizedBox(width: HkSizes.spaceBtwItems)
          ]),

      /// Body
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(HkSizes.defaultSpace),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
        
              /// Data Cards
              FutureBuilder(
                future: Get.put(AuthenticationRepository()).getUserData(),
                builder: (context, snapshot) {
                  if(snapshot.data == null){
                    return  const SizedBox();
                  }
                  return const DataCards();
                }
              ),
              const SizedBox(height: HkSizes.spaceBtwItems),
        
              /// ListView
              const Expanded(child: ExpensesList())
            ],
          ),
        ),
      ),

      /// Floating action button
      floatingActionButton: FloatingActionButton(
        onPressed: () => Get.to(() => const AddExpenseScreen()),
        backgroundColor: HkColors.primary,
        child: Text('+', style: Theme.of(context).textTheme.headlineSmall!.apply(color: Colors.white)),
      ),
    );
  }
}



