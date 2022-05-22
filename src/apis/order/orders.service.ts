import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadPreference, Repository } from 'typeorm';
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
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findUserOder({ email }) {
    const user = await this.userRepository.findOne({ email: email });
    return await this.orderRepository.find({ where: { user: user } });
  }

  async findAll({ email, page }) {
    return await this.orderRepository
      .createQueryBuilder('order')
      .orderBy('order.createdAt', 'DESC')
      .skip(0 + Number((page - 1) * 3))
      .take(3)
      .getMany();
  }

  async create({ createOrderInput }) {
    const { productId, email, ...order } = createOrderInput;
    const result1 = await this.userRepository.findOne({
      email: email,
    });
    const result2 = await this.productRepository.findOne({
      id: productId,
    });
    const result3 = await this.orderRepository.save({
      ...order,
      user: result1,
      product: result2,
    });
    return result3;
  }
}
