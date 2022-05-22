import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductTag } from '../productsTag/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}
  // async findAll() {
  //   return await this.productRepository.find({
  //     relations: ['productTags'],
  //     order: {
  //       createdAt: 'DESC',
  //     },
  //   });
  // }
  async findAll({ page }) {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productTags', 'tags')
      .orderBy('product.createdAt', 'DESC')
      .skip(0 + Number((page - 1) * 10))
      .take(10)
      .getMany();
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({ where: { id: productId } });
  }

  async findCount() {
    return await this.productRepository.count();
  }

  async findBest() {
    return await this.productRepository.find({
      order: {
        like: 'DESC',
      },
      take: 3,
    });
  }

  async create({ createProductInput }) {
    // 상품을 데이터베이스에 저장
    const { productTags, ...product } = createProductInput;
    //productTags 저장
    const result2 = [];
    const length = productTags ? productTags : 0;
    for (let i = 0; length > i; i++) {
      const tagname = productTags[i].replace('#', '');
      //이미 등록된 태그인지 확인
      const prevTag = await this.productTagRepository.findOne({
        tag: tagname,
      });
      //기존에 존재
      if (prevTag) {
        result2.push(prevTag);
        //기존에 태그가 없었다면
      } else {
        const newTag = await this.productTagRepository.save({ tag: tagname });
        result2.push(newTag);
      }
    }
    return await this.productRepository.save({
      ...product,
      productTags: result2,
    });
  }

  async update({ updateProductInput }) {
    // 상품을 데이터베이스에 저장
    const { productTags, ...product } = updateProductInput;
    //productTags 저장
    const result2 = [];
    for (let i = 0; productTags.length > i; i++) {
      const tagname = productTags[i].replace('#', '');
      //이미 등록된 태그인지 확인
      const prevTag = await this.productTagRepository.findOne({
        tag: tagname,
      });
      //기존에 존재
      if (prevTag) {
        result2.push(prevTag);
        //기존에 태그가 없었다면
      } else {
        const newTag = await this.productTagRepository.save({ tag: tagname });
        result2.push(newTag);
      }
    }
    return await this.productRepository.save({
      ...product,
      productTags: result2,
    });
  }

  async delete({ productId }) {
    const result = await this.productRepository.delete({ id: productId });
    return result.affected ? true : false;
  }
}
