import 'package:flutter/material.dart';
import 'package:issue_8/login_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';
class Mainscreen extends StatelessWidget {
  const Mainscreen({super.key});

  @override
  Widget build(BuildContext context) {
    final incomeController = TextEditingController();
    final expenseController = TextEditingController();
    return  Scaffold (
      appBar: AppBar(
        title: const Text('Expenses and management'),
        centerTitle: true,
        backgroundColor: Colors.teal,
        automaticallyImplyLeading: true,
      ),
      body:  Padding(
        padding:  EdgeInsets.only(top: 20.0),
        child: Column(
          children: [
            TextFormField(
              controller: incomeController,
              keyboardType: TextInputType.visiblePassword,
              decoration: const InputDecoration(
                hintText:  'Enter Income',
                enabledBorder:  OutlineInputBorder(
                  // width: 0.0 produces a thin "hairline" border
                  borderSide:  BorderSide(color: Colors.grey, width: 0.0),
                ),
              ),
            ),
           const SizedBox(
              height:20,
            ),
            TextFormField(
              controller: expenseController,
              keyboardType: TextInputType.visiblePassword,
              decoration: const InputDecoration(
                hintText:  'Enter Expenses',
                enabledBorder:  OutlineInputBorder(
                  // width: 0.0 produces a thin "hairline" border
                  borderSide:  BorderSide(color: Colors.grey, width: 0.0),
                ),
              ),
            ),
                const SizedBox(
              height: 20,
            ),
            Row(
              children: [
                Image.network(
                  width: 250,
                    height: 200,
                    'https://c8.alamy.com/comp/2J1Y87C/income-growth-concept-wooden-block-bar-chart-graph-with-text-and-upward-trend-line-drawn-on-background-copy-space-2J1Y87C.jpg'),
                Image.network(
                    width: 200,
                    height: 200,
                    'https://img.freepik.com/free-vector/illustration-data-analysis-graph_53876-18118.jpg'),
              ],
            ),
           const SizedBox(
              height: 10,
            ),
            Image.network('https://c8.alamy.com/comp/G5M409/expenses-concept-with-pie-chart-3d-rendering-isolated-on-white-background-G5M409.jpg'),
const SizedBox(
  height: 30,
),
            InkWell(
              onTap: () async {
                SharedPreferences sp = await SharedPreferences.getInstance();
                sp.clear();
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
                child: const Center(child:  Text('Logout', style: TextStyle(fontSize: 25),)),
              ),
            ),
         ],
        ),
      ),
    );
  }
}
