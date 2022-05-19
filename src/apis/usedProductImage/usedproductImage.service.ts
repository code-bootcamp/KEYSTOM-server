import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { UsedProduct } from '../usedProducts/entities/usedProduct.entity';
import { UsedProductImage } from './entities/usedproductImage.entity';

@Injectable()
export class UsedProductImageService {
  constructor(
    @InjectRepository(UsedProductImage)
    private readonly usedProductImageRepository: Repository<UsedProductImage>,
    @InjectRepository(UsedProduct)
    private readonly usedProductRepository: Repository<UsedProduct>,
  ) {}

  async findAll() {
    return await this.usedProductImageRepository.find();
  }
  async findOne({ usedProductImageId }) {
    return await this.usedProductImageRepository.findOne({ where: { id: usedProductImageId } });
  }
  async create({usedProductImageUrl,usedProductId,isThumbnail}) {
    const result1 = await this.usedProductRepository.findOne({
      id: usedProductId,
    });
    console.log("---------------------------")
    console.log("---------------------------")
    console.log("---------------------------")
    console.log("---------------------------")
    console.log(result1)
    const result2 = await this.usedProductImageRepository.save({
      isThumbnail:isThumbnail,
      usedProductImageUrl:usedProductImageUrl,
      usedProduct: result1,
    });
    console.log("---------------------------")
    console.log("---------------------------")
    console.log("---------------------------")
    console.log("---------------------------")
    console.log(result2)
    return result2;
  }
}
