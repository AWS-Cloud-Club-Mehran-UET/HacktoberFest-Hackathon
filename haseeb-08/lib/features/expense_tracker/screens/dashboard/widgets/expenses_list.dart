import 'package:expense_tracker/utils/constants/colors.dart';
import 'package:expense_tracker/utils/helpers/helper_functions.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../../../utils/constants/images.dart';
import '../../../../../utils/helpers/cloud_helper_functions.dart';
import '../../../controllers/expense/expense_controller.dart';

class ExpensesList extends StatelessWidget {
  const ExpensesList({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = ExpenseController.instance;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [

        /// [Text] Your Expenses
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('Your Expenses', style: Theme.of(context).textTheme.headlineSmall),
            InkWell(
              onTap: (){},
                child: Text('View all', style: Theme.of(context).textTheme.bodyMedium!.apply(color: HkColors.primary))),
          ],
        ),

        /// List Of Expenses
        Expanded(
            child: Obx(
        () => FutureBuilder(
          key: Key(controller.refreshList.value.toString()),
                future: controller.getAllExpenses(),
                builder: (context, snapshot) {

                  final widget = HkCloudHelperFunctions.checkMultiRecordState(snapshot: snapshot);
                  if(widget != null) return widget;

                  /// Data Found!
                  final expenses = snapshot.data!;


                  return ListView.builder(
                    shrinkWrap: true,
                    itemCount: expenses.length,
                    itemBuilder: (context, index) {
                      final expense = expenses[index];
                      return Card(

                        child: ListTile(
                          leading: Image.asset(HkImages.logo),
                          title: Text(expense.category.toString()),
                          subtitle: Text(expense.description.toString()),
                          trailing: Column(
                            mainAxisSize: MainAxisSize.min,
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text('${expense.amount} Rs', style: Theme.of(context).textTheme.titleLarge),
                              Text('${expense.date.day}/${expense.date.month}/${expense.date.year}', style: Theme.of(context).textTheme.labelMedium),
                        
                            ],
                          ),
                        ),
                      );
                    },);
                },
              ),
            )
        )
      ],
    );
  }

}