import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserCouponInput } from './dto/createUserCoupon.input';
import { UserCoupon } from './entities/userCoupon.entity';
import { UserCouponService } from './uesrCoupon.service';

@Resolver()
export class UserCouponResolver {
  constructor(private readonly userCouponService: UserCouponService) {}
  @Query(() => [UserCoupon])
  fetchCoupons() {
    return this.userCouponService.findAll();
  }
  @Query(() => UserCoupon)
  fetchCoupon(@Args('userCouponId') userCouponId: string) {
    return this.userCouponService.findOne({ userCouponId });
  }
  @Mutation(() => UserCoupon)
  createCoupon(
    @Args('createUserCouponInput') createUserCouponInput: CreateUserCouponInput,
  ) {
    return this.userCouponService.create({ createUserCouponInput });
  }
}
