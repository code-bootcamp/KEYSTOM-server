import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Order } from './entities/order.entity';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.orderRepository.find();
  }
  // async findOne({ reviewId }) {
  //   return await this.reviewRepository.findOne({ where: { id: reviewId } });
  // }
  async create({ createOrderInput }) {
    const { email, ...order } = createOrderInput;
    const result1 = await this.userRepository.findOne({
      email: email,
    });
    const result2 = await this.orderRepository.save({
      ...order,
      user: result1,
    });
    return result2;
  }
}
