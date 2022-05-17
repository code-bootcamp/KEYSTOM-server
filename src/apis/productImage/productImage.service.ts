import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductImage } from './entities/productImage.entity';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productImageRepository.find();
  }
  async findOne({ productImageId }) {
    return await this.productImageRepository.findOne({ where: { id: productImageId } });
  }
  async create({productImageUrl,productId}) {
    const result1 = await this.productRepository.findOne({
      id: productId,
    });
    const result2 = await this.productImageRepository.save({
      productImageUrl:productImageUrl,
      product: result1,
    });
    return result2;
  }
}
