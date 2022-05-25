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
    private readonly connection: Connection,
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
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 상품을 데이터베이스에 저장
      const { productTags, ...product } = rest;
      //productTags 저장
      const tags = [];
      const Tagslength = productTags ? productTags.length : 0;
      for (let i = 0; Tagslength > i; i++) {
        const tagname = productTags[i].replace('#', '');
        //이미 등록된 태그인지 확인
        const prevTag = await queryRunner.manager.findOne(ProductTag, {
          tag: tagname,
        });
        //기존에 존재
        if (prevTag) {
          tags.push(prevTag);
        }
        //기존에 태그가 없었다면
        else {
          const newTag = await this.productTagRepository.create({
            tag: tagname,
          });
          await queryRunner.manager.save(newTag);
          tags.push(newTag);
        }
      }
      const result = this.productRepository.create({
        ...product,
        thumbnail: imageUrls[0],
        productTags: tags,
      });
      await queryRunner.manager.save(Product, { ...result });

      // 이미지 등록!
      for (let i = 0; i < imageUrls.length; i++) {
        if (i === 0) {
          const image = this.productImageRepository.create({
            url: imageUrls[i],
            isThumbnail: true,
            product: result,
          });
          await queryRunner.manager.save(ProductImage, { ...image });
        } else {
          const image = this.productImageRepository.create({
            url: imageUrls[i],
            product: result,
          });
          await queryRunner.manager.save(ProductImage, { ...image });
        }
      }
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw '상품 생성 중:' + error;
    } finally {
      await queryRunner.release();
    }
  }

  async update({ imageUrls, ...rest }, productId) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 상품을 데이터베이스에 저장
      const { productTags, ...product } = rest;
      //productTags 저장
      const tags = [];
      const Tagslength = productTags ? productTags : 0;
      for (let i = 0; Tagslength > i; i++) {
        const tagname = productTags[i].replace('#', '');
        //이미 등록된 태그인지 확인
        const prevTag = await queryRunner.manager.findOne(ProductTag, {
          tag: tagname,
        });
        //기존에 존재
        if (prevTag) {
          tags.push(prevTag);
        }
        //기존에 태그가 없었다면
        else {
          const tag = await this.productTagRepository.create({
            tag: tagname,
          });
          const newTag = await queryRunner.manager.save(ProductTag, { ...tag });
          tags.push(newTag);
        }
      }
      const target = await queryRunner.manager.findOne(Product, {
        id: productId,
      });

      const result = this.productRepository.create({
        ...target,
        ...product,
        thumbnail: imageUrls[0],
        productTags: tags,
      });
      await queryRunner.manager.save(Product, { ...result });

      queryRunner.manager.delete(ProductImage, { product: target });

      // 이미지 등록!
      for (let i = 0; i < imageUrls.length; i++) {
        if (i === 0) {
          const image = await this.productImageRepository.create({
            url: imageUrls[i],
            isThumbnail: true,
            product: result,
          });
          await queryRunner.manager.save(ProductImage, { ...image });
        } else {
          const image = await this.productImageRepository.create({
            url: imageUrls[i],
            product: result,
          });
          await queryRunner.manager.save(ProductImage, { ...image });
        }
      }
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw '상품 생성 중:' + error;
    } finally {
      await queryRunner.release();
    }
  }

  async delete({ productId }) {
    await this.productImageRepository.delete({ product: productId });
    const result = await this.productRepository.delete({ id: productId });
    return result.affected ? true : false;
  }
}
