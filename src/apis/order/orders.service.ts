import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Order } from './entities/order.entity';
import { User } from 'src/apis/user/entities/user.entity';
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

  // async findUserOder({ email }) {
  //   const user = await this.userRepository.findOne({ email: email });
  //   return await this.orderRepository.find({ where: { user: user } });
  // }

  async find({ email, page }) {
    return await this.orderRepository
      .createQueryBuilder('order')
      .where('order.user = :user', { user: email })
      .orderBy('order.createdAt', 'DESC')
      .skip(0 + Number((page - 1) * 3))
      .take(3)
      .getMany();
  }

  async create({ createOrderInput, email }) {
    const { productId, ...order } = createOrderInput;

    const user = await this.userRepository.findOne({
      email,
    });
    if (!user) throw new BadRequestException('유저가 존재하지 않습니다.');

    const product = await this.productRepository.findOne({
      id: productId,
    });
    if (!product) throw new BadRequestException('상품이 존재하지 않습니다.');

    const result = await this.orderRepository.save({
      ...order,
      user: user,
      product: product,
    });

    return result;
  }
}
