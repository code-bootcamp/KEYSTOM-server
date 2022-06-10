import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserCouponResolver } from './userCoupon.resolver';
import { UserCouponService } from './userCoupon.service';
import { UserCoupon } from './entities/userCoupon.entity';
import { Coupon } from 'src/apis/coupon/entities/coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCoupon, User, Coupon])],
  providers: [UserCouponResolver, UserCouponService],
})
export class UserCouponModule {}
