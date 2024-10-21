import 'package:expense_tracker/features/authentication/controllers/signup_controller.dart';
import 'package:expense_tracker/utils/validators/validation.dart';
import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';

import '../../../../../common/widgets/textfields/textfield.dart';
import '../../../../../utils/constants/sizes.dart';

class SignupForm extends StatelessWidget {
  const SignupForm({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = SignUpController.instance;
    return Form(
      key: controller.formKey,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          /// Name Field
          HkTextField(
            validator: (value) => HkValidator.validateEmptyText('Name', value),
              controller: controller.name,
              labelText: 'Name',
              prefixIcon: const Icon(Iconsax.user),

          ),
          const SizedBox(height: HkSizes.spaceBtwFields),

          /// Email Field
          HkTextField(
              validator: (value) => HkValidator.validateEmail(value),
              controller: controller.email, labelText: 'Email', prefixIcon: const Icon(Iconsax.direct_right)),
          const SizedBox(height: HkSizes.spaceBtwFields),

          /// Password Field
          HkTextField(
              validator: (value) => HkValidator.validatePassword(value),
              controller: controller.password,
              labelText: 'Password',
              prefixIcon: const Icon(Iconsax.password_check),
              suffixIcon: const Icon(Icons.visibility_outlined)),
        ],
      ),
    );
  }
}
