// lib/models/query.dart
class Query {
  final String id;
  final String employeeId;
  final String content;
  final String status;

  Query({
    required this.id,
    required this.employeeId,
    required this.content,
    required this.status,
  });

  factory Query.fromJson(Map<String, dynamic> json) {
    return Query(
      id: json['id'],
      employeeId: json['employeeId'],
      content: json['content'],
      status: json['status'],
    );
  }
}