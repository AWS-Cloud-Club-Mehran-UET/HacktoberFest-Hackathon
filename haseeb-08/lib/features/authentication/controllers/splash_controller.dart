import 'dart:async';
import 'package:expense_tracker/features/authentication/screens/login/login.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import '../../expense_tracker/screens/dashboard/dashboard.dart';

class SplashController extends GetxController{
  static SplashController get instance => Get.find();


  /// Variables
  final _auth = FirebaseAuth.instance;

  @override
  void onInit() {
    Future.delayed(const Duration(seconds: 2),() {
      redirectScreen();
    });
    super.onInit();
  }

  redirectScreen(){
    if(_auth.currentUser != null){
      Get.offAll(() => const DashboardScreen());
    }else{
      Get.offAll(() => const LoginScreen());
    }
  }

}