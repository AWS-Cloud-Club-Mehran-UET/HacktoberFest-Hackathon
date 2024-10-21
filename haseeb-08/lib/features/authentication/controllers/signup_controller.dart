import 'package:expense_tracker/data/repositories/authentication/authentication_repository.dart';
import 'package:expense_tracker/features/authentication/models/user_model.dart';
import 'package:expense_tracker/features/expense_tracker/screens/dashboard/dashboard.dart';
import 'package:expense_tracker/features/expense_tracker/screens/more_info/more_info.dart';
import 'package:expense_tracker/utils/helpers/helper_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';

class SignUpController extends GetxController {
  static SignUpController get instance => Get.find();

  /// Variables
  final _authenticationRepo = Get.put(AuthenticationRepository());

  final name = TextEditingController();
  final email = TextEditingController();
  final password = TextEditingController();
  final formKey = GlobalKey<FormState>();
  RxBool isLoading = false.obs;

  final income = TextEditingController();
  final budget = TextEditingController();

  /// SignUp The User
  Future<void> signUp() async {
    try {

      // start loading
      isLoading.value = true;

      // Form Validation
      if(!formKey.currentState!.validate()){
        return;
      }

      // register user
      UserCredential userCredential = await _authenticationRepo.signUp(email.text.trim(), password.text.trim());

      // create user model
      UserModel user = UserModel(
          id: userCredential.user!.uid,
          name: name.text.trim(),
          email: email.text.trim(),
          password: password.text.trim(),
        budget: '',
        income: ''
      );

      // store user data
      _authenticationRepo.storeUser(user);

      // Show success message
      HkHelperFunctions.successSnackBar(title: 'Congratulations, ${user.name}', message: 'Welcome to expense tracker');

      // Redirect
      Get.off(() => const MoreInfoScreen());

    } catch (e) {
      HkHelperFunctions.errorSnackBar(title: 'Error', message: e.toString());
    }finally{
      isLoading.value = false;
    }
  }

  /// Update user more data
  Future<void> addUserMoreData() async{
    try{

      UserModel user = await _authenticationRepo.getUserData();

      user.income = income.text.trim();
      user.budget = budget.text.trim();

      await _authenticationRepo.storeUser(user);
      Get.offAll(() => const DashboardScreen());
    }catch(e){
      debugPrint(e.toString());
    }
  }
}
