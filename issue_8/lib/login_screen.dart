import 'package:flutter/material.dart';
import 'package:issue_8/mainscreen.dart';
import 'package:issue_8/registerscreen.dart';
import 'package:shared_preferences/shared_preferences.dart';
class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final emailController = TextEditingController();
    final passController = TextEditingController();
    return  Scaffold(
   appBar: AppBar(
     title: const Text('Expense Tracker App'),
     centerTitle: true,
     backgroundColor: Colors.teal,
   ),
      body: Padding(
        padding: const EdgeInsets.only(top: 40),
        child: SingleChildScrollView(
          child: Column(
               children: [
                 Image.network('https://www.mindinventory.com/blog/wp-content/uploads/2021/06/expense-tracking-app.webp'),
                const SizedBox(
                   height: 25,
                 ),
                 Material(
                   elevation: 10.0,
                   shadowColor: Colors.grey.shade200,
                   child: TextFormField(
                     controller: emailController,
                     keyboardType: TextInputType.visiblePassword,
                     decoration:  InputDecoration(
                       hintText: 'Enter your Email',
                       hintStyle: TextStyle(color: Colors.grey.shade700, fontFamily: 'Roboto'),
                       prefixIcon:  Icon(Icons.drive_file_rename_outline, color: Colors.grey.shade700,),
                       contentPadding: const EdgeInsets.symmetric(vertical: 15),
                       border: InputBorder.none,
                     ),
                   ),
                 ),
                const SizedBox(
                   height: 20,
                 ),
                 Material(
                   elevation: 10.0,
                   shadowColor: Colors.grey.shade200,
                   child: TextFormField(
                     controller: passController,
                     keyboardType: TextInputType.visiblePassword,
                     decoration:  InputDecoration(
                       hintText: 'Enter your Password',
                       hintStyle: TextStyle(color: Colors.grey.shade700, fontFamily: 'Roboto'),
                       prefixIcon:  Icon(Icons.drive_file_rename_outline, color: Colors.grey.shade700,),
                       contentPadding: const EdgeInsets.symmetric(vertical: 15),
                       border: InputBorder.none,
                     ),
                   ),
                 ),
                const SizedBox(
                   height: 50,
                 ),
                 InkWell(
                   onTap: () async{
                     SharedPreferences sp = await SharedPreferences.getInstance();
                     sp.setString('email', emailController.text.toString());
                     Navigator.push(
                         context, MaterialPageRoute(builder: (context) => const Mainscreen()));
                   },
                   child: Container(
                     width: 120,
                     height: 50,
                     decoration: BoxDecoration(
                       color: Colors.teal,
                       borderRadius: BorderRadius.circular(20),
                     ),
                     child: const Center(child:  Text('Login', style: TextStyle(fontSize: 25),)),
                   ),
                 ),
               const SizedBox(
                  height: 30,
                ),
                 const Divider(
                   height: 20,
                 ),
               const SizedBox(
                 height: 10,
               ),
               const  Text('Do you want to register?'),
                 const SizedBox(
                   height: 30,
                 ),
                 InkWell(
                   onTap: () {
                     Navigator.push(
                         context, MaterialPageRoute(builder: (context) => const Registerscreen()));
                    },
                   child: Container(
                     width: 120,
                     height: 50,
                     decoration: BoxDecoration(
                       color: Colors.teal,
                       borderRadius: BorderRadius.circular(20),
                     ),
                     child: const Center(child:  Text('Register', style: TextStyle(fontSize: 25),)),
                   ),
                 ),
               ]
          ),
        ),
      ),
    );
  }
}
