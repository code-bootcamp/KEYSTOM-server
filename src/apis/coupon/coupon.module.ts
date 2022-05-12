import { Module } from '@nestjs/common';
import { Coupon } from './entities/coupon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponResolver } from './coupon.resolver';
import { CouponService } from './coupon.service';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  providers: [CouponResolver, CouponService],
})
export class CouponModule {}
