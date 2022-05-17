import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductTag } from '../productsTag/entities/productTag.entity';
import { Coupon } from './entities/coupon.entity';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}
  async findAll() {
    return await this.couponRepository.find();
  }
  async findOne({ couponId }) {
    return await this.couponRepository.findOne({ where: { id: couponId } });
  }
  async create({ createCouponInput }) {
    // 상품을 데이터베이스에 저장;
    return await this.couponRepository.save({
      ...createCouponInput
    });
  }

  // async delete({ productId }) {
  //   const result = await this.productRepository.softDelete({ id: productId });
  //   return result.affected ? true : false;
  // }
}
