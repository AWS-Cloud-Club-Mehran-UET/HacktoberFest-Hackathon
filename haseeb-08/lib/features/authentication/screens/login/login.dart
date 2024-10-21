import 'package:expense_tracker/features/authentication/controllers/login_controller.dart';
import 'package:expense_tracker/features/authentication/screens/login/widgets/login_form.dart';
import 'package:expense_tracker/features/authentication/screens/signup/signup.dart';
import 'package:expense_tracker/utils/constants/colors.dart';
import 'package:expense_tracker/utils/constants/sizes.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../../common/widgets/buttons/elevated_button.dart';

class LoginScreen extends StatelessWidget { 
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(LoginController());
    return Scaffold(
      resizeToAvoidBottomInset: false,
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
                    Text('Welcome Back!', style: Theme.of(context).textTheme.headlineSmall),

                    /// Subtitle
                    Text('Log in to manage and track your expenses effortlessly.',
                        style: Theme.of(context).textTheme.titleMedium)
                  ],
                ),
              ),
            ),

            /// Login Form
            const Expanded(child: Align(
              alignment: Alignment.center,
                child: LoginForm())),

            /// Login Button & [Text] Don't have an account
            Expanded(child: Center(child: Column(
              children: [
                Obx(() => HkElevatedButton(onPressed: () => controller.loginUser(), child: const Text('Login'), isLoading: controller.isLoading.value,)),
                const SizedBox(height: HkSizes.spaceBtwItems),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text("Don't have an account? ", style: Theme.of(context).textTheme.titleMedium),
                    GestureDetector(
                        onTap: () => Get.off(() => const SignupScreen()),
                        child: Text("Sign Up", style: Theme.of(context).textTheme.titleMedium!.apply(color: HkColors.primary, fontWeightDelta: 2)))
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
