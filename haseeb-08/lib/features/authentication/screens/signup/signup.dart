import 'package:expense_tracker/features/authentication/controllers/signup_controller.dart';
import 'package:expense_tracker/features/authentication/screens/login/login.dart';
import 'package:expense_tracker/features/authentication/screens/signup/widgets/signup_form.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../../common/widgets/buttons/elevated_button.dart';
import '../../../../utils/constants/colors.dart';
import '../../../../utils/constants/sizes.dart';

class SignupScreen extends StatelessWidget {
  const SignupScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(SignUpController());
    return Scaffold(
      resizeToAvoidBottomInset:  false,
      body: Padding(
        padding: const EdgeInsets.all(HkSizes.defaultSpace),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Align(
                alignment: Alignment.bottomLeft,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    /// Title
                    Text('Create an Account', style: Theme.of(context).textTheme.headlineSmall),

                    /// Subtitle
                    Text('Join us today and take control of your finances.',
                        style: Theme.of(context).textTheme.titleMedium)
                  ],
                ),
              ),
            ),

            /// Login Form
            const Expanded(child: Align(alignment: Alignment.center, child: SignupForm())),

            Expanded(
                child: Center(
                    child: Column(
              children: [
                /// Login Button
                Obx(
                        () => HkElevatedButton(
                    onPressed: () => controller.signUp(),
                    child: const Text('Sign Up'),
                    isLoading: controller.isLoading.value,
                  ),
                ),
                const SizedBox(height: HkSizes.spaceBtwItems),

                /// [Text] Don't have an account
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text("Already have an account? ", style: Theme.of(context).textTheme.titleMedium),
                    GestureDetector(
                      onTap: () => Get.off(() => const LoginScreen()),
                      child: Text(
                        "Login",
                        style:
                            Theme.of(context).textTheme.titleMedium!.apply(color: HkColors.primary, fontWeightDelta: 2),
                      ),
                    )
                  ],
                )
              ],
            ))),
          ],
        ),
      ),
    );
  }
}
