import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserCouponInput } from './dto/createUserCoupon.input';
import { UserCoupon } from './entities/userCoupon.entity';
import { UserCouponService } from './userCoupon.service';

@Resolver()
export class UserCouponResolver {
  constructor(private readonly userCouponService: UserCouponService) {}
  @Mutation(() => UserCoupon)
  createUserCoupon(
    @Args('createUserCouponInput') createUserCouponInput: CreateUserCouponInput,
  ) {
    return this.userCouponService.create({ createUserCouponInput });
  }
}
