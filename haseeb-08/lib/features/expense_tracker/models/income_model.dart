class IncomeModel {
  int? id;
  final double amount;
  final String sourceOfIncome;
  final DateTime date;
  final String? description;

  IncomeModel({
    this.id,
    required this.amount,
    required this.sourceOfIncome,
    required this.date,
    this.description,
  });


  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'amount': amount,
      'sourceOfIncome': sourceOfIncome,
      'date': date.toIso8601String(),
      'description': description,
    };
  }


  factory IncomeModel.fromJson(Map<String, dynamic> json) {
    return IncomeModel(
      id: json['id'],
      amount: json['amount'].toDouble(),
      sourceOfIncome: json['sourceOfIncome'],
      date: DateTime.parse(json['date']),
      description: json['description'],
    );
  }
}
