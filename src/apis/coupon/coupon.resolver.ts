import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateCouponInput } from './dto/createCoupon.input';
import { Coupon } from './entities/coupon.entity';
import { CouponService } from './coupon.service';

@Resolver()
export class CouponResolver {
  constructor(
    private readonly couponService: CouponService, //
  ) {}

  @Query(() => [Coupon])
  fetchCoupons() {
    return this.couponService.findAll();
  }
  @Query(() => Coupon)
  async fetchCoupon(
    @Args('couponId') couponId: string, //
  ) {
    return this.couponService.findOne({ couponId });
  }
  @Mutation(() => Coupon)
  async createCoupon(
    @Args('createCouponInput') createCouponInput: CreateCouponInput,
  ) {
    return this.couponService.create({ createCouponInput });
  }
  @Mutation(() => String)
  async deleteCoupon(
    @Args('couponId') couponId: string, //
  ) {
    return this.couponService.delete({ couponId });
  }
}
