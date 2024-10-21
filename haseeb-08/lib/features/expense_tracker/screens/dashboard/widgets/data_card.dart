import 'package:flutter/material.dart';

import '../../../../../utils/constants/sizes.dart';


class DataCard extends StatelessWidget {
  const DataCard({super.key, required this.color, this.child});

  final Color color;
  final Widget? child;
  @override
  Widget build(BuildContext context) {
    return Container(

      decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(HkSizes.borderRadius / 2),
          boxShadow: [
            BoxShadow(
                offset: Offset(1, 0),
                blurRadius: 2,
                color: Colors.black.withOpacity(0.2)
            )
          ],

      ),
      child: child,
    );
  }
}
