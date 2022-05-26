import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { ProductTag } from '../productsTag/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
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

  async findImage({ productId }) {
    return await this.productImageRepository.find({
      where: { product: productId },
      relations: ['product'],
    });
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

  async create({ imageUrls, ...rest }) {
    // 상품을 데이터베이스에 저장
    const { productTags, ...product } = rest;

    //productTags 저장
    const tags = [];
    const Tagslength = productTags ? productTags.length : 0;
    for (let i = 0; Tagslength > i; i++) {
      const tagname = productTags[i].replace('#', '');
      //이미 등록된 태그인지 확인
      const prevTag = await this.productTagRepository.findOne({ tag: tagname });

      //기존에 존재
      if (prevTag) {
        tags.push(prevTag);
      }
      //기존에 태그가 없었다면
      else {
        this.productTagRepository.save({ tag: tagname });
      }
    }

    const result = this.productRepository.save({
      ...product,
      thumbnail: imageUrls[0],
      productTags: tags,
    });

    // 이미지 등록!
    const imagelength = productTags ? productTags.length : 0;
    for (let i = 0; i < imagelength; i++) {
      if (i === 0) {
        this.productImageRepository.save({
          url: imageUrls[i],
          isThumbnail: true,
          product: result,
        });
      } else {
        this.productImageRepository.save({
          url: imageUrls[i],
          product: result,
        });
      }
    }
    return result;
  }

  async update({ imageUrls, ...rest }, productId) {
    // 상품을 데이터베이스에 저장
    const { productTags, ...product } = rest;
    //productTags 저장
    const tags = [];
    const Tagslength = productTags ? productTags : 0;
    for (let i = 0; Tagslength > i; i++) {
      const tagname = productTags[i].replace('#', '');
      //이미 등록된 태그인지 확인
      const prevTag = await this.productTagRepository.findOne({ tag: tagname });

      //기존에 존재
      if (prevTag) {
        tags.push(prevTag);
      }
      //기존에 태그가 없었다면
      else {
        const tag = this.productTagRepository.create({
          tag: tagname,
        });
        tags.push(tag);
      }
    }
    const target = await this.productRepository.findOne({ id: productId });

    const result = this.productRepository.save({
      ...target,
      ...product,
      thumbnail: imageUrls[0],
      productTags: tags,
    });

    // 기존에 저장된 이미지 삭제
    this.productImageRepository.delete({ product: target });

    // 이미지 등록!
    for (let i = 0; i < imageUrls.length; i++) {
      if (i === 0) {
        this.productImageRepository.save({
          url: imageUrls[i],
          isThumbnail: true,
          product: result,
        });
      } else {
        this.productImageRepository.save({
          url: imageUrls[i],
          product: result,
        });
      }
    }
    return result;
  }

  async delete({ productId }) {
    await this.productImageRepository.delete({ product: productId });
    const result = await this.productRepository.delete({ id: productId });
    return result.affected ? true : false;
  }
}
