import 'package:flutter/material.dart';
import 'package:issue_8/login_screen.dart';
class Registerscreen extends StatelessWidget {
  const Registerscreen({super.key});

  @override
  Widget build(BuildContext context) {
    final emailController = TextEditingController();
    final passController = TextEditingController();
    final nameController = TextEditingController();
    return  Scaffold(
      appBar: AppBar(
        title: const Text('Register'),
        centerTitle: true,
        automaticallyImplyLeading: false,
        actions: const [Icon(Icons.app_registration)],
        backgroundColor: Colors.teal,
        ),
      body: Padding(
        padding: const EdgeInsets.only(top:20.0),
        child: Column(
          children: [
            Image.network('https://www.slideteam.net/media/catalog/product/cache/1280x720/i/n/income_expenses_and_profit_financial_graphs_slide01.jpg'),
           const SizedBox(
              height: 20,
            ),
            Material(
              elevation: 10.0,
              shadowColor: Colors.grey.shade200,
              child: TextFormField(
                controller: nameController,
                keyboardType: TextInputType.name,
                decoration:  InputDecoration(
                  hintText: 'Enter your name',
                  hintStyle: TextStyle(color: Colors.grey.shade700, fontFamily: 'Roboto'),
                  prefixIcon:  Icon(Icons.drive_file_rename_outline, color: Colors.grey.shade700,),
                  contentPadding: const EdgeInsets.symmetric(vertical: 15),
                  border: InputBorder.none,
                ),
              ),
            ),
          const  SizedBox(
              height: 15,
            ),
            Material(
              elevation: 10.0,
              shadowColor: Colors.grey.shade200,
              child: TextFormField(
                controller: emailController,
                keyboardType: TextInputType.emailAddress,
                decoration:  InputDecoration(
                  hintText: 'Enter your email',
                  hintStyle: TextStyle(color: Colors.grey.shade700, fontFamily: 'Roboto'),
                  prefixIcon:  Icon(Icons.drive_file_rename_outline, color: Colors.grey.shade700,),
                  contentPadding: const EdgeInsets.symmetric(vertical: 15),
                  border: InputBorder.none,
                ),
              ),
            ),
            const  SizedBox(
              height: 15,
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
              onTap: () {
                Navigator.push(
                    context, MaterialPageRoute(builder: (context) => const LoginScreen()));
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
          ],
        ),
      ),
      ) ;
  }
}
