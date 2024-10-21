import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:iconsax/iconsax.dart';

import '../../../utils/constants/colors.dart';

class HkAppBar extends StatelessWidget implements PreferredSizeWidget {
  final Widget? title;
  final bool showBackArrow;
  final IconData? leadingIcon;
  final List<Widget>? actions;
  final VoidCallback? leadingOnPressed;
  final Color? backgroundColor;
  final String? titleText;
  final bool? centerTitle;

  const HkAppBar(
      {super.key,
        this.title,
        this.showBackArrow = false,
        this.leadingIcon,
        this.actions,
        this.leadingOnPressed, this.backgroundColor,
        this.titleText, this.centerTitle,
      });

  @override
  Widget build(BuildContext context) {

    return Padding(padding: const EdgeInsets.symmetric(horizontal: 0),
      child: AppBar(
        centerTitle: centerTitle,
        elevation: 0,
        backgroundColor: backgroundColor ?? Colors.transparent,
          automaticallyImplyLeading: false,
          leading: showBackArrow ? IconButton(
            onPressed: () => Get.back(), icon: const Icon(Iconsax.arrow_left),color: HkColors.black) :
            leadingIcon != null ? IconButton(onPressed: leadingOnPressed, icon: Icon(leadingIcon)) : null,

          title: titleText != null ? Text(titleText!, style: Theme.of(context).textTheme.headlineSmall!.apply(color: HkColors.black) ) : title,

        actions: actions,
      ),
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(Get.statusBarHeight);
}
