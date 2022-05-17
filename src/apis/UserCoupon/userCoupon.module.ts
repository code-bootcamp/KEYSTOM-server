import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import {UserCouponResolver} from './userCoupon.resolver';
import { UserCouponService, } from './uesrCoupon.service';
import {UserCoupon } from './entities/userCoupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCoupon,User])],
  providers: [UserCouponResolver,UserCouponService],
})
export class UserCouponModule {}
