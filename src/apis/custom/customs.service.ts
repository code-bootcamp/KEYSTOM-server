import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Custom } from './entities/custom.entity';

@Injectable()
export class CustomService {
  constructor(
    @InjectRepository(Custom)
    private readonly customRepository: Repository<Custom>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.customRepository.find();
  }
  async findOne({ customId }) {
    return await this.customRepository.findOne({ where: { id: customId } });
  }
  async create({ createCustomInput }) {
    const { productId, ...custom } = createCustomInput;
    const result1 = await this.productRepository.findOne({
      id: productId,
    });
    const result2 = await this.customRepository.save({
      ...custom,
      product: result1,
    });
    return result2;
  }
}
