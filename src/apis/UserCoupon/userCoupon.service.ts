import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserCoupon } from './entities/userCoupon.entity';
import { Coupon } from 'src/apis/coupon/entities/coupon.entity';

@Injectable()
export class UserCouponService {
  constructor(
    @InjectRepository(UserCoupon)
    private readonly userCouponRepository: Repository<UserCoupon>,
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createEventCoupon({ currentUser }) {
    // 이달의 쿠폰을 발급 받은 적 있는지 확인
    const { ...check } = await this.userCouponRepository.findOne({
      email: currentUser.email,
    });

    if (check['isEvent'])
      throw new BadRequestException('이미 이달의 쿠폰을 발급하였습니다.');

    const coupon = await this.couponRepository.save({
      discountPrice: 5000,
      couponName: '5월의 할인',
    });

    const user = await this.userRepository.findOne({
      email: currentUser.email,
    });
    const result = await this.userCouponRepository.save({
      email: user,
      coupon,
      isEvent: true,
    });
    return result;
  }

  async create({ createUserCouponInput }) {
    const result = await this.userCouponRepository.save({
      ...createUserCouponInput,
    });
    return result;
  }

  async delete({ currentUser, couponId }) {
    const coupon = await this.couponRepository.findOne({ id: couponId });

    const flag = await this.userCouponRepository.findOne({
      email: currentUser.email,
      coupon: coupon,
    });

    await this.userCouponRepository.delete({ ...flag });

    return couponId + '사용완료';
  }

  async findCoupons({ currentUser }) {
    const user = await this.userRepository.findOne({
      email: currentUser.email,
    });
    const result = await this.userCouponRepository.find({
      where: { email: user },
      relations: ['coupon', 'email'],
    });
    return result;
  }

  // async findAll() {
  //   const result = await this.userCouponRepository.find({
  //     relations: ['coupon'],
  //   });
  //   return result;
  // }
}
