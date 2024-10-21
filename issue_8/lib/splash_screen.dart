import 'dart:async';
import 'package:flutter/material.dart';
import 'package:issue_8/mainscreen.dart';

import 'package:shared_preferences/shared_preferences.dart';

import 'login_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {


  @override

  void initState() {
    // TODO: implement initState
    super.initState();

   login();

  }

  void login() async{
    SharedPreferences sp = await SharedPreferences.getInstance();
    bool isLogin = sp.getBool('isLogin') ?? false;

    if(isLogin == true){


        Future.delayed(const Duration(seconds: 2), () {
          Navigator.push(
              context, MaterialPageRoute(builder: (context) => const Mainscreen()));
        });
      }
    else{
      Future.delayed(const Duration(seconds: 2), () {
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => const LoginScreen()));
      });
    }
    setState(() {

    });
  }

  @override
  Widget build(BuildContext context) {

    return const Scaffold(
      backgroundColor: Colors.white,
      body: Image(
          fit: BoxFit.fill,
          height: double.infinity,
          image: NetworkImage('https://www.shutterstock.com/image-vector/finance-control-hand-drawn-composition-260nw-2382150379.jpg')),
    );
  }

}
