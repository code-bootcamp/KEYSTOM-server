import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Order } from './entities/order.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Address } from '../address/entities/address.entity';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  // async findUserOder({ email }) {
  //   const user = await this.userRepository.findOne({ email: email });
  //   return await this.orderRepository.find({ where: { user: user } });
  // }

  async find({ email, page }) {
    return await this.orderRepository
      .createQueryBuilder('order')
      .where('order.user = :user', { user: email })
      .leftJoinAndSelect('order.address', 'address')
      .leftJoinAndSelect('order.product', 'product')
      .leftJoinAndSelect('order.user', 'user')
      .orderBy('order.createdAt', 'DESC')
      .skip(0 + Number((page - 1) * 3))
      .take(3)
      .getMany();
  }

  async create({ createOrderInput, email }) {
    const { productId, address, ...order } = createOrderInput;

    const user = await this.userRepository.findOne({
      email,
    });
    if (!user) throw new BadRequestException('유저가 존재하지 않습니다.');

    const product = await this.productRepository.findOne({
      id: productId,
    });
    if (!product) throw new BadRequestException('상품이 존재하지 않습니다.');

    const receiveAddress = this.addressRepository.create({ ...address });

    console.log('배송 주소', receiveAddress);
    const result = await this.orderRepository.save({
      ...order,
      user: user,
      address: receiveAddress['id'],
      product: product,
    });

    return result;
  }
}
