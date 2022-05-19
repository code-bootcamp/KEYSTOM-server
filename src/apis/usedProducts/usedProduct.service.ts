import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsedProductTag } from '../usedProductsTag/entities/usedProductTag.entity';
import {UsedProduct } from './entities/usedProduct.entity';

@Injectable()
export class UsedProductService {
  constructor(
    @InjectRepository(UsedProduct)
    private readonly usedProductRepository: Repository<UsedProduct>,
    @InjectRepository(UsedProductTag)
    private readonly usedproductTagRepository: Repository<UsedProductTag>,
  ) {}
  async findAll() {
    return await this.usedProductRepository.find({
      relations: ['usedProductTags'],
    });
  }
  async findOne({ usedProductId }) {
    return await this.usedProductRepository.findOne({ where: { id: usedProductId } });
  }

  async findRowCount() {
    return await this.usedProductRepository.count();
  }

  async findBest() {
    return await this.usedProductRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 10,
    });
  }

  async create({ createUsedProductInput }) {
    // 상품을 데이터베이스에 저장
    const { usedProductTags, ...usedProduct } = createUsedProductInput;
    //productTags 저장
    const result2 = [];
    for (let i = 0; usedProductTags.length > i; i++) {
      const tagname = usedProductTags[i].replace('#', '');
      //이미 등록된 태그인지 확인
      const prevTag = await this.usedproductTagRepository.findOne({
        tag: tagname,
      });
      //기존에 존재
      if (prevTag) {
        result2.push(prevTag);
        //기존에 태그가 없었다면
      } else {
        const newTag = await this.usedproductTagRepository.save({ tag: tagname });
        result2.push(newTag);
      }
      
    }
    return await this.usedProductRepository.save({
      ...usedProduct,
      usedProductTags: result2,
    });
  }

  // async update({ updateProductInput }) {
  //   // 상품을 데이터베이스에 저장
  //   const { productTags, ...product } = updateProductInput;
  //   //productTags 저장
  //   const result2 = [];
  //   for (let i = 0; productTags.length > i; i++) {
  //     const tagname = productTags[i].replace('#', '');
  //     console.log(tagname);
  //     //이미 등록된 태그인지 확인
  //     const prevTag = await this.productTagRepository.findOne({
  //       tag: tagname,
  //     });
  //     //기존에 존재
  //     if (prevTag) {
  //       result2.push(prevTag);
  //       //기존에 태그가 없었다면
  //     } else {
  //       const newTag = await this.productTagRepository.save({ tag: tagname });
  //       result2.push(newTag);
  //     }
  //   }
  //   return await this.productRepository.save({
  //     ...product,
  //     productTags: result2,
  //   });
  // }
  async delete({ usedProductId }) {
    const result = await this.usedProductRepository.softDelete({ id: usedProductId });
    return result.affected ? true : false;
  }
}
