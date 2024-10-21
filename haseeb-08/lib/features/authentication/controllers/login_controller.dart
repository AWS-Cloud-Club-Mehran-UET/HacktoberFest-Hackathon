import 'package:expense_tracker/data/repositories/authentication/authentication_repository.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';

import '../../../utils/helpers/helper_functions.dart';
import '../../expense_tracker/screens/dashboard/dashboard.dart';
import '../models/user_model.dart';

class LoginController extends GetxController{
  static LoginController get instance => Get.find();


  /// Variables
  final _authenticationRepo = Get.put(AuthenticationRepository());

  final name = TextEditingController();
  final email = TextEditingController();
  final password = TextEditingController();
  final formKey = GlobalKey<FormState>();
  RxBool isLoading = false.obs;


  Future<void> loginUser() async{
    try{

      // start loading
      isLoading.value = true;

      // Form Validation
      if(!formKey.currentState!.validate()){
        return;
      }

      // login user
      await _authenticationRepo.loginUser(email.text.trim(), password.text.trim());

      // get user data
      UserModel user = await _authenticationRepo.getUserData();

      // store user data
      await _authenticationRepo.storeUser(user);

      // Show success message
      HkHelperFunctions.successSnackBar(title: 'Congratulations, ${user.name}', message: 'Welcome to expense tracker');

      // Redirect
      Get.off(() => const DashboardScreen());
    }catch(e){
      HkHelperFunctions.errorSnackBar(title: 'Error', message: e.toString());
    }finally{
      isLoading.value = false;
    }
  }

}