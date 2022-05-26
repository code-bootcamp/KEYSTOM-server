import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserCoupon } from './entities/userCoupon.entity';
import { UserCouponService } from './userCoupon.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from '../../commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from '../../commons/auth/gql-user.param';
import { CreateUserCouponInput } from './dto/createUserCoupon.input';

@Resolver()
export class UserCouponResolver {
  constructor(private readonly userCouponService: UserCouponService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => UserCoupon)
  async createEventCoupon(@CurrentUser() currentUser: ICurrentUser) {
    return await this.userCouponService.createEventCoupon({ currentUser });
  }

  @Mutation(() => UserCoupon)
  async createUserCoupon(
    @Args('createUserCouponInput') createUserCouponInput: CreateUserCouponInput,
  ) {
    return await this.userCouponService.create({ createUserCouponInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async useCoupon(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('couponId') couponId: string,
  ) {
    return await this.userCouponService.delete({ currentUser, couponId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [UserCoupon])
  async fetchUserHaveCoupons(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    return await this.userCouponService.findCoupons({ currentUser });
  }

  // @Query(() => [UserCoupon])
  // async fetchUserCoupons() {
  //   return await this.userCouponService.findAll();
  // }
}
