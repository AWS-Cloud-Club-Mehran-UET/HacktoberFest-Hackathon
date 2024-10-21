import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:iconsax/iconsax.dart';
import 'package:intl/intl.dart';

import '../constants/colors.dart';

class HkHelperFunctions{

  /// Success SnackBar
  static successSnackBar({required title, message = '', duration = 3}){
    Get.snackbar(
        title,
        message,
        isDismissible: true,
        shouldIconPulse: true,
        colorText: HkColors.white,
        backgroundColor: HkColors.success,
        snackPosition: SnackPosition.BOTTOM,
        duration: Duration(seconds: duration),
        margin: const EdgeInsets.all(10),
        icon: const Icon(Iconsax.check,color: HkColors.white,)
    );
  }

  /// Error SnackBar
  static errorSnackBar({required title, message = ''}){
    Get.snackbar(
        title,
        message,
        isDismissible: true,
        shouldIconPulse: true,
        colorText: HkColors.white,
        backgroundColor: Colors.red.shade600,
        snackPosition: SnackPosition.BOTTOM,
        duration: const Duration(seconds: 3),
        margin: const EdgeInsets.all(20),
        icon: const Icon(Iconsax.warning_2, color: HkColors.white,)
    );
  }


  static String formattedDate(String date) {
    DateTime dateTime = DateTime.parse(date);
    DateFormat dateFormat = DateFormat('MMM d, yyyy');
    String formattedDateTime = dateFormat.format(dateTime);
    return formattedDateTime;
  }
}