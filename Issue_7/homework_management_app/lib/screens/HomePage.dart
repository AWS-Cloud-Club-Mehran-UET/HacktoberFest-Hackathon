import 'package:flutter/material.dart';
import 'package:homework_management_app/screens/CompletedTask.dart';
import 'package:homework_management_app/screens/PendingTasks.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // this is initialized to control screens
  PageController pageController = PageController(initialPage: 0);

  int selectedScreen = 0;

  // this is list of screens

  List<Widget> screens = [
    const PendingTasks(),
    const CompletedTasks(),
  ];

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
        title: const Text("Work Management app"),
        centerTitle: true,
        backgroundColor: Colors.blue,
      ),
      backgroundColor: Colors.blue,
      body: PageView(
        controller: pageController,
        children: screens,
      ),
      bottomNavigationBar: BottomNavigationBar(
          currentIndex: selectedScreen,
          selectedItemColor: Colors.red,
          showSelectedLabels: true,
          showUnselectedLabels: true,
          onTap: nextScreen,
          items: const [
            BottomNavigationBarItem(
                icon: Icon(Icons.crop_square_sharp), label: "Pending"),
            BottomNavigationBarItem(icon: Icon(Icons.done), label: "Complete"),
          ]),
    );
  }
}
