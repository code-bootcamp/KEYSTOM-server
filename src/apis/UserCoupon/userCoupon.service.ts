import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from '../coupon/entities/coupon.entity';
import { User } from '../user/entities/user.entity';
import { UserCoupon } from './entities/userCoupon.entity';

@Injectable()
export class UserCouponService {
  constructor(
    @InjectRepository(UserCoupon)
    private readonly userCouponRepository: Repository<UserCoupon>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  async create({ createUserCouponInput }) {
    const { email, couponId, ...userCoupon } = createUserCouponInput;
    const user = await this.userRepository.findOne({
      email: email,
    });
    const coupon = await this.couponRepository.findOne({
      id: couponId,
    });
    const result2 = await this.userCouponRepository.save({
      ...userCoupon,
      user: user,
      coupon: coupon,
    });
    return result2;
  }
}
