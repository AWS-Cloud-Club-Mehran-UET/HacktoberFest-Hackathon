class UserModel {
  String id;
  String name;
  final String email;
  final String password;
  String income;
  String budget;
  String profit, loss;
  String remainingBudget;

  UserModel({
    required this.id,
    required this.name,
    required this.email,
    required this.password,
    required this.income,
    required this.budget,
    this.profit = '',
    this.loss = '',
    this.remainingBudget = ''
  });

  /// Empty Model
  static UserModel empty() => UserModel(
      id: '',
      name: '', email: '', password: '', income: '', budget: '', loss: '', profit: '');

  /// Convert Model to Json for pushing data
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'password': password,
      'income' : income,
      'budget': budget,
      'loss': loss,
      'profit': profit,
      'remainingBudget': remainingBudget
    };
  }


  /// Convert Json to Model for using data in program
  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      password: json['password'],
      income: json['income'].toString(),
      budget: json['budget'].toString(),
      profit: json['profit'].toString(),
      loss: json['loss'].toString(),
      remainingBudget: json['remainingBudget'] ?? ''
    );
  }
}
