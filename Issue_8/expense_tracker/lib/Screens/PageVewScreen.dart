import 'package:expense_tracker/Screens/AddBudget.dart';
import 'package:expense_tracker/Screens/Details.dart';
import 'package:flutter/material.dart';

import 'HomeScreen.dart';

class PageViewScreen extends StatefulWidget {
  const PageViewScreen({super.key});

  @override
  State<PageViewScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<PageViewScreen> {
  PageController pageController = PageController(initialPage: 0);
  int selectedScreen = 0;
  List<Widget> screens = [const HomeScreen(), const Details()];
  void nextScreen(int index) {
    setState(() {
      selectedScreen = index;
      pageController.jumpToPage(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "EXPENSE TRACKER",
          style: TextStyle(color: Colors.white, fontSize: 24),
        ),
        centerTitle: true,
        backgroundColor: Colors.black,
      ),
      body: PageView(
        controller: pageController,
        children: screens,
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.blue,
        onPressed: () {
          Navigator.push(context,
              MaterialPageRoute(builder: (context) => const AddBudget()));
        },
        child: const Icon(
          Icons.add,
          size: 30,
          color: Colors.white,
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
          currentIndex: selectedScreen,
          showUnselectedLabels: true,
          showSelectedLabels: true,
          selectedItemColor: Colors.red,
          backgroundColor: Colors.blue,
          onTap: nextScreen,
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
            BottomNavigationBarItem(icon: Icon(Icons.details), label: "details")
          ]),
    );
  }
}
