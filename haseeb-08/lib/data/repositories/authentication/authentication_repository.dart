import 'package:expense_tracker/features/authentication/models/user_model.dart';
import 'package:expense_tracker/features/authentication/screens/login/login.dart';
import 'package:expense_tracker/utils/constants/local_keys.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

class AuthenticationRepository extends GetxController{
  static AuthenticationRepository get instance => Get.find();

  /// Variables
  final _db = GetStorage();
  final auth = FirebaseAuth.instance;

  Rx<UserModel> user = UserModel.empty().obs;


  @override
  void onInit() {
    getUserData();
    super.onInit();
  }

  /// Function to Signup User
  Future<UserCredential> signUp (String email, String password) async{
    try{

      // sign-in user using firebase auth
      UserCredential user = await auth.createUserWithEmailAndPassword(email: email, password: password);
      return user;

    }catch(e){
      rethrow;
    }
  }

  /// Function to store user data
  Future<void> storeUser(UserModel user) async{
    try{

      // store user data in local storage
      await _db.write(HkLocalKeys.userData, user.toJson());

      // store user in Rx Variable for future use
      this.user.value = user;
    }catch(e){
      rethrow;
    }
  }

  /// Function to get user data and store in RX variable
  Future<UserModel> getUserData() async{
    try{

      // get user from local storage
      Map<String, dynamic>? user = _db.read(HkLocalKeys.userData);
      if(user == null){
        return UserModel.empty();
      }

      // convert user json to model
      this.user.value = UserModel.fromJson(user);
      debugPrint(this.user.value.toJson().toString());
      return UserModel.fromJson(user);

    }catch(e){
      rethrow;
    }
  }

  /// Function to login user
  Future<UserCredential> loginUser(String email, String password) async{
    try{

      UserCredential user = await auth.signInWithEmailAndPassword(email: email, password: password);
      return user;


    }catch(e){
      rethrow;
    }
  }

  /// Function to logout user
  Future<void> logoutUser() async{
    try{

      await auth.signOut();
      Get.offAll(() => const LoginScreen());

    }catch(e){
      rethrow;
    }
  }

}