import 'package:expense_tracker/data/repositories/authentication/authentication_repository.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../../../utils/constants/colors.dart';
import '../../../../../utils/constants/sizes.dart';
import '../../../../authentication/models/user_model.dart';
import 'data_card.dart';

class DataCards extends StatelessWidget {
  const DataCards({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    UserModel user = AuthenticationRepository.instance.user.value;
    return SizedBox(
      height: Get.height * 0.3,
      width: double.infinity,
      child: Row(
        children: [
          /// White Card
          Expanded(
              child: Padding(
            padding: const EdgeInsets.only(right: HkSizes.spaceBtwItems / 2),
            child: DataCard(
                color: HkColors.white,
                child: Padding(
                  padding: const EdgeInsets.all(HkSizes.spaceBtwItems / 2),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [

                      /// Income
                      Text('Income', style: Theme.of(context).textTheme.bodyLarge),
                      Text(user.income, style: Theme.of(context).textTheme.titleLarge),
                      const SizedBox(height: HkSizes.spaceBtwItems),

                      /// Total Budget
                      Text('Total Budget', style: Theme.of(context).textTheme.bodyLarge),
                      Text(user.budget, style: Theme.of(context).textTheme.titleLarge),
                      const SizedBox(height: HkSizes.spaceBtwItems),

                      /// Remaining Budget
                      Text('Budget', style: Theme.of(context).textTheme.bodyLarge),
                      Text(user.remainingBudget, style: Theme.of(context).textTheme.titleLarge),
                      const SizedBox(height: HkSizes.spaceBtwItems),
                    ],
                  ),
                )),
          )),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.only(left: HkSizes.spaceBtwItems / 2),
              child: Column(
                children: [
                  /// Green Card
                  Expanded(child: DataCard(
                      color: HkColors.primary,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        /// Profit
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Text('-' ,style: Theme.of(context).textTheme.bodyLarge!.apply(color: Colors.white)),
                            Text(user.profit.isNotEmpty ? "${user.profit}%" : 'No Spend', style: Theme.of(context).textTheme.titleLarge!.apply(color: Colors.white)),
                          ],
                        ),
                        Text('Spend/month', style: Theme.of(context).textTheme.bodyLarge),
                      ],
                    ),
                  )),
                  const SizedBox(height: HkSizes.spaceBtwItems / 2),

                  /// Blue Card
                  Expanded(child: DataCard(
                      color: Colors.blue,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [

                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(user.loss.isNotEmpty ? '${user.loss}%' : 'No Earn', style: Theme.of(context).textTheme.titleLarge!.apply(color: Colors.white)),
                          ],
                        ),

                        /// Profit
                        Text('Earn/month', style: Theme.of(context).textTheme.bodyLarge),
                      ],
                    ),
                  )),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
