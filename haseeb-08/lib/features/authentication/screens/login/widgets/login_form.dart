import 'package:expense_tracker/features/authentication/controllers/login_controller.dart';
import 'package:expense_tracker/utils/validators/validation.dart';
import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';
import '../../../../../common/widgets/textfields/textfield.dart';
import '../../../../../utils/constants/sizes.dart';

class LoginForm extends StatelessWidget {
  const LoginForm({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = LoginController.instance;
    return Form(
      key: controller.formKey,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [

          /// Email Field
          HkTextField(
              controller: controller.email,
            labelText: 'Email',
            prefixIcon: const Icon(Icons.email_outlined),
            validator: (value) => HkValidator.validateEmail(value),
          ),
          const SizedBox(height: HkSizes.spaceBtwFields),

          /// Password Field
          HkTextField(
            controller: controller.password,
            labelText: 'Password',
            prefixIcon: const Icon(Iconsax.password_check),
            suffixIcon: const Icon(Icons.visibility_outlined),
            validator: (value) => HkValidator.validatePassword(value),
          ),
        ],
      ),
    );
  }
}


