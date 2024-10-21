import 'package:flutter/material.dart';

import '../../../utils/constants/colors.dart';
import '../../../utils/constants/sizes.dart';

class HkElevatedButton extends StatelessWidget {
  const HkElevatedButton({super.key, required this.onPressed, required this.child, this.isLoading = false});

  final VoidCallback onPressed;
  final Widget child;
  final bool isLoading;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: isLoading ? (){} : onPressed,

        style: ElevatedButton.styleFrom(
          elevation: 0,
          foregroundColor: HkColors.white,
          backgroundColor: HkColors.primary,
          disabledForegroundColor: HkColors.darkGrey,
          disabledBackgroundColor: HkColors.grey,
          side: const BorderSide(color: HkColors.white),
          padding: const EdgeInsets.symmetric(vertical: HkSizes.buttonHeight),
          textStyle: const TextStyle(fontSize: 16, color: HkColors.textWhite, fontWeight: FontWeight.w600),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(HkSizes.buttonRadius)),
        ),
        child: isLoading ?  circularLoading() : child,
      )
    );
  }

  Widget circularLoading() {
    return const SizedBox(
        height: 19.0,
        width: 19.0,
        child: CircularProgressIndicator(strokeWidth: 3.0, color: Colors.white,)
    );
  }
}
