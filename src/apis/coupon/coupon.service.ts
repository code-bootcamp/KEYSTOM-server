import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  async create({ createCouponInput }) {
    return await this.couponRepository.save({ ...createCouponInput });
  }

  async delete({ couponId }) {
    const result = await this.couponRepository.softDelete({ id: couponId });
    return result.affected ? true : false;
  }

  async findAll() {
    const result = await this.couponRepository.find();
    return result;
  }

  async findOne({ couponId }) {
    const result = await this.couponRepository.findOne({
      where: { id: couponId },
    });
    return result;
  }
}
