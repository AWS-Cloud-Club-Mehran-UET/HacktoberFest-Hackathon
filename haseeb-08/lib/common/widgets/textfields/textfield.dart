import 'package:flutter/material.dart';

import '../../../utils/constants/colors.dart';

class HkTextField extends StatelessWidget {
  const HkTextField({
    super.key, this.labelText, this.prefixIcon, this.suffixIcon, required this.controller, this.onChanged, this.obscureText, this.validator, this.keyboardType,
  });

  final String? labelText;
  final Widget? prefixIcon;
  final Widget? suffixIcon;
  final TextEditingController controller;
  final Function(String)? onChanged;
  final bool? obscureText;
  final FormFieldValidator<String>? validator;
  final TextInputType? keyboardType;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      keyboardType: keyboardType,
      controller: controller,
      obscureText: obscureText != null ? obscureText! : false,
      onChanged: onChanged,
      validator: validator,
      decoration: InputDecoration(
        labelText: labelText,
        prefixIcon: prefixIcon,
        suffixIcon: suffixIcon,
        border: const OutlineInputBorder().copyWith(
          borderRadius: BorderRadius.circular(12.0),
          borderSide: const BorderSide(width: 1, color: HkColors.grey),
        ),
        enabledBorder: const OutlineInputBorder().copyWith(
          borderRadius: BorderRadius.circular(12.0),
          borderSide: const BorderSide(width: 1, color: HkColors.grey),
        ),
        focusedBorder:const OutlineInputBorder().copyWith(
          borderRadius: BorderRadius.circular(12.0),
          borderSide: const BorderSide(width: 1, color: HkColors.black),
        ),
        errorBorder: const OutlineInputBorder().copyWith(
          borderRadius: BorderRadius.circular(12.0),
          borderSide: const BorderSide(width: 1, color: HkColors.warning),
        ),
        focusedErrorBorder: const OutlineInputBorder().copyWith(
          borderRadius: BorderRadius.circular(12.0),
          borderSide: const BorderSide(width: 2, color: HkColors.warning),
        ),
      ),
    );
  }
}