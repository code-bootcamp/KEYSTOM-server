import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { CartProduct } from './entities/cartProduct.entity';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<CartProduct>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.cartProductRepository.find();
  }

  async findOne({ cartProductId }) {
    return await this.cartProductRepository.findOne({
      where: { id: cartProductId },
    });
  }

  async create({ createCartProductInput }) {
    const { productId, ...cartProduct } = createCartProductInput;
    const result1 = await this.productRepository.findOne({
      id: productId,
    });
    const result2 = await this.cartProductRepository.save({
      ...cartProduct,
      product: result1,
    });
    return result2;
  }
}
