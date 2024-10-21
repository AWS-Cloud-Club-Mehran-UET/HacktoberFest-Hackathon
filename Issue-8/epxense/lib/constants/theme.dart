import 'package:epxense/constants/colors.dart';
import 'package:flutter/material.dart';

class Themes {
  static final lightTheme = ThemeData(
    primarySwatch: Colors.grey,
    brightness: Brightness.light,
    scaffoldBackgroundColor: lightModeScaffoldBgCle,
    appBarTheme: AppBarTheme(
      backgroundColor: Colors.transparent,
      elevation: 0,
    ),
  );
  static final darkTheme = ThemeData(
    primarySwatch: Colors.grey,
    brightness: Brightness.dark,
    scaffoldBackgroundColor: darkModeScaffoldBgClr,
    appBarTheme: AppBarTheme(
      backgroundColor: Colors.transparent,
      elevation: 0,
    ),
  );

  TextStyle get subHeadingTextStyle => TextStyle(
        fontSize: 15,
        fontWeight: FontWeight.bold,
        );

  TextStyle get headingTextStyle => TextStyle(
        fontSize: 18,
        fontWeight: FontWeight.bold,
      );

  TextStyle get titleStyle => TextStyle(
        fontWeight: FontWeight.w400,
      );
  TextStyle get subTitleStyle => TextStyle(
        fontWeight: FontWeight.w400,
       );

  TextStyle get labelStyle => TextStyle(
      );
}
