import 'package:expense_tracker/common/widgets/appbar/appbar.dart';
import 'package:expense_tracker/common/widgets/buttons/elevated_button.dart';
import 'package:expense_tracker/common/widgets/textfields/textfield.dart';
import 'package:expense_tracker/features/authentication/controllers/signup_controller.dart';
import 'package:expense_tracker/utils/constants/sizes.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class MoreInfoScreen extends StatelessWidget {
  const MoreInfoScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(SignUpController());
    return Scaffold(
      appBar: HkAppBar(centerTitle: true, title: Text('More Info', style: Theme.of(context).textTheme.headlineSmall)),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(HkSizes.defaultSpace),
          child: Column(
            children: [
              SizedBox(height: Get.height * 0.1),
              Text('Kindly add more information of yours', style: Theme.of(context).textTheme.headlineSmall),
              SizedBox(height: Get.height * 0.1),

              /// Income Field
              HkTextField(controller: controller.income, keyboardType: TextInputType.number, labelText: 'Your Income'),
              const SizedBox(height: HkSizes.spaceBtwFields),

              /// Budget Field
              HkTextField(
                  controller: controller.budget, keyboardType: TextInputType.number, labelText: 'Your monthly budget'),
              const SizedBox(height: HkSizes.spaceBtwItems),
              HkElevatedButton(onPressed: () => controller.addUserMoreData(), child: const Text('Next'))
            ],
          ),
        ),
      ),
    );
  }
}
