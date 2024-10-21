import 'package:flutter/material.dart';
import 'package:pie_chart/pie_chart.dart';

class ExpenseDetailsScreen extends StatelessWidget {
  const ExpenseDetailsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    Map<String, double> dataMap = {
      "Grocery": 5000,
      "Fuel": 2000,
      "Vegetables": 100,
    };
    final colorList = <Color>[
      Colors.greenAccent,
      Colors.blue,
      Colors.red,
      Colors.green,
      Colors.yellow
    ];
    return Scaffold(
      body: Column(
        children: [
          PieChart(
            dataMap: dataMap,
            animationDuration: Duration(milliseconds: 800),
            chartLegendSpacing: 32,
            chartRadius: MediaQuery.of(context).size.width / 3.2,
            colorList: colorList,
            initialAngleInDegree: 0,
            chartType: ChartType.ring,
            ringStrokeWidth: 32,
            centerText: "HYBRID",
            legendOptions: LegendOptions(
              showLegendsInRow: false,
              legendPosition: LegendPosition.right,
              showLegends: true,
              legendTextStyle: TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
            chartValuesOptions: ChartValuesOptions(
              showChartValueBackground: true,
              showChartValues: true,
              showChartValuesInPercentage: false,
              showChartValuesOutside: false,
              decimalPlaces: 1,
            ),
          )
        ],
      ),
    );
  }
}
