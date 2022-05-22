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
          const newTag = await queryRunner.manager.save(ProductTag, {
            tag: tagname,
          });
          tags.push(newTag);
        }
      }
      const result = await queryRunner.manager.save(Product, {
        ...product,
        productTags: tags,
      });

      // 이미지 등록!
      for (let i = 0; i < imageUrls.length; i++) {
        if (i === 0) {
          await queryRunner.manager.save(ProductImage, {
            url: imageUrls[i],
            isThumbnail: true,
            product: result,
          });
        } else {
          await queryRunner.manager.save(ProductImage, {
            url: imageUrls[i],
            product: result,
          });
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
          const newTag = await queryRunner.manager.save(ProductTag, {
            tag: tagname,
          });
          tags.push(newTag);
        }
      }
      const target = await queryRunner.manager.findOne(Product, {
        id: productId,
      });

      const result = await queryRunner.manager.save(Product, {
        ...target,
        ...product,
        productTags: tags,
      });

      queryRunner.manager.delete(ProductImage, { product: target });

      // 이미지 등록!
      for (let i = 0; i < imageUrls.length; i++) {
        if (i === 0) {
          await queryRunner.manager.save(ProductImage, {
            url: imageUrls[i],
            isThumbnail: true,
            product: result,
          });
        } else {
          await queryRunner.manager.save(ProductImage, {
            url: imageUrls[i],
            product: result,
          });
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
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
