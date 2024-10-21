import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'features/authentication/screens/splash/splash.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {

    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: 'Poppins',
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.green), useMaterial3: false),
      home: const SplashScreen(),
    );
  }
}
