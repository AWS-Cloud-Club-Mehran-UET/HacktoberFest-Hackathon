import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blueGrey,
      body: Column(
        children: [
          expenseIncome(),
          const SizedBox(
            height: 10,
          ),
          categories(),
          const SizedBox(
            height: 10,
          ),
          listViewContainer(),
        ],
      ),
    );
  }

  Widget addBudget() {
    return const Dialog(
      child: AlertDialog(),
    );
  }

  Widget categories() {
    return Padding(
      padding: const EdgeInsets.only(right: 8.0, left: 8),
      child: Container(
        height: 50,
        width: double.infinity,
        decoration: BoxDecoration(
          color: Colors.black,
          borderRadius: BorderRadius.circular(20),
        ),
        child: const Center(
          child: Text(
            "Categories",
            style: TextStyle(color: Colors.white, fontSize: 24),
          ),
        ),
      ),
    );
  }

  Widget expenseIncome() {
    return Card(
      color: Colors.white,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Container(
              width: 170,
              height: 100,
              decoration: BoxDecoration(
                color: Colors.blue,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Column(
                          children: [
                            Text(
                              "Budget",
                              style:
                                  TextStyle(color: Colors.white, fontSize: 24),
                            ),
                            Text(
                              "100 PKR",
                              style:
                                  TextStyle(color: Colors.white, fontSize: 24),
                            ),
                          ],
                        ),
                        Container(
                          width: 50,
                          height: 30,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Center(
                            child: Icon(
                              Icons.add,
                              size: 30,
                              color: Colors.black,
                            ),
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(
            width: 10,
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Container(
              width: 170,
              height: 100,
              decoration: BoxDecoration(
                color: Colors.blue,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Padding(
                padding: EdgeInsets.all(8.0),
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Expense",
                        style: TextStyle(color: Colors.white, fontSize: 24),
                      ),
                      Text(
                        "100 PKR",
                        style: TextStyle(color: Colors.white, fontSize: 24),
                      )
                    ]),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget listViewContainer() {
    return Padding(
      padding: const EdgeInsets.only(right: 8.0, left: 8),
      child: Container(
        height: 450,
        width: double.infinity,
        color: Colors.green,
        child: ListView.builder(
            itemCount: 2,
            itemBuilder: (context, index) {
              return const Card(
                child: ListTile(
                  title: Text("Vegetable"),
                  trailing: Icon(Icons.check_box),
                ),
              );
            }),
      ),
    );
  }
}
