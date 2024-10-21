
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'data/repositories/authentication/authentication_repository.dart';
import 'firebase_options.dart';
import 'my_app.dart';

Future<void> main() async {

  /// Initialize Flutter Widgets Binding
  WidgetsFlutterBinding.ensureInitialized();

  /// Initialize Firebase
  await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
  ).then((value) {
    Get.put(AuthenticationRepository());
  },);


  /// Run App
  runApp(const MyApp());
}
