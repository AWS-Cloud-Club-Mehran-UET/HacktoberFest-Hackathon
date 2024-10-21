class ExpenseModel {
  int id;
  final String userId;
  final String amount;
  final String category;
  final String description;
  final DateTime date;

  ExpenseModel({
    required this.id,
    required this.userId,
    required this.amount,
    required this.category,
    required this.date,
    required this.description
  });

  // Convert an ExpenseModel object to a JSON map
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'amount': amount,
      'category': category,
      'date': date.toIso8601String(),
      'description': description
    };
  }

  // Create an ExpenseModel object from a JSON map
  factory ExpenseModel.fromJson(Map<String, dynamic> json) {
    return ExpenseModel(
      id: json['id'],
      userId: json['userId'],
      amount: json['amount'].toString(),
      category: json['category'],
      date: DateTime.parse(json['date']),
      description: json['description']
    );
  }
}
