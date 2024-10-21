import 'package:expense_tracker/common/widgets/buttons/elevated_button.dart';
import 'package:expense_tracker/common/widgets/textfields/textfield.dart';
import 'package:expense_tracker/features/expense_tracker/controllers/expense/add_expense_controller.dart';
import 'package:expense_tracker/utils/constants/sizes.dart';
import 'package:expense_tracker/utils/validators/validation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../../../common/widgets/appbar/appbar.dart';

class AddExpenseScreen extends StatelessWidget {
  const AddExpenseScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(AddExpenseController());
    return Scaffold(
      appBar: HkAppBar(
        showBackArrow: true,
          centerTitle: true, title: Text('Add Your Expenses', style: Theme.of(context).textTheme.headlineSmall)),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(HkSizes.defaultSpace),
          child: Form(
            key: controller.formKey,
            child: Column(
              children: [
                /// Amount
                HkTextField(
                    validator: (value) => HkValidator.validateEmptyText('Amount', value),
                    keyboardType: TextInputType.phone,
                    controller: controller.amount,
                    labelText: 'Amount'),
                const SizedBox(height: HkSizes.spaceBtwFields),

                /// Category
                HkTextField(
                    validator: (value) => HkValidator.validateEmptyText('Category', value),
                    controller: controller.category,
                    labelText: 'Category'),
                const SizedBox(height: HkSizes.spaceBtwFields),

                /// Description
                HkTextField(controller: controller.description, labelText: 'Description (Optional)'),
                const SizedBox(height: HkSizes.spaceBtwFields),

                /// Date
                HkElevatedButton(onPressed: () => controller.selectDate(context), child: const Text('Pick Date')),
                const SizedBox(height: HkSizes.spaceBtwItems / 2),

                Obx((){
                  if(controller.pickedDate.value != null){
                    return Text('${controller.pickedDate.value!.day}/${controller.pickedDate.value!.month}/${controller.pickedDate.value!.year}');
                  }
                  return const SizedBox();
                }),
                const SizedBox(height: HkSizes.spaceBtwItems * 2),
                /// Add Button
                Obx(
                  () => HkElevatedButton(
                      onPressed: () => controller.addExpense(),
                    isLoading: controller.isLoading.value, child: const Text('Add'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
