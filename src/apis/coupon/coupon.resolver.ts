import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { CouponService } from './coupon.service';
import { CreateCouponInput } from './dto/createCoupon.input';
import { Coupon } from './entities/coupon.entity';

@Resolver()
export class CouponResolver {
  constructor(private readonly couponService: CouponService) {}
  @Query(() => [Coupon])
  fetchCoupons() {
    return this.couponService.findAll();
  }

  @Query(() => Coupon)
  fecthCoupon(@Args('couponId') couponId: string) {
    return this.couponService.findOne({ couponId });
  }
  @Mutation(() => Coupon)
  createCoupon(
    @Args('createCouponInput') createCouponInput: CreateCouponInput,
  ) {
    return this.couponService.create({ createCouponInput });
  }

  @Mutation(() => Boolean)
  deleteCoupon(@Args('couponId') couponId: string) {
    return this.couponService.delete({ couponId });
  }
}
