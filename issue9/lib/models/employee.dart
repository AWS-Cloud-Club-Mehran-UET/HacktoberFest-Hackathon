// lib/models/employee.dart
class Employee {
  final String employeeNumber;
  final String name;
  final String designation;
  final String department;
  final double salary;
  final String personalEmail;
  final String organizationEmail;
  final String phoneNumber;
  final String address;

  Employee({
    required this.employeeNumber,
    required this.name,
    required this.designation,
    required this.department,
    required this.salary,
    required this.personalEmail,
    required this.organizationEmail,
    required this.phoneNumber,
    required this.address,
  });

  factory Employee.fromJson(Map<String, dynamic> json) {
    return Employee(
      employeeNumber: json['employeeNumber'],
      name: json['name'],
      designation: json['designation'],
      department: json['department'],
      salary: json['salary'],
      personalEmail: json['personalEmail'],
      organizationEmail: json['organizationEmail'],
      phoneNumber: json['phoneNumber'],
      address: json['address'],
    );
  }
}