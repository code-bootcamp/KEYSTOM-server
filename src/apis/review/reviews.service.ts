import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Order } from '../order/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { ReviewImage } from '../reviewImage/entities/reviewImage.entity';
import { User } from '../user/entities/user.entity';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly connection: Connection,
  ) {}

  async findOne({ reviewId }) {
    return await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['product', 'user'],
    });
  }

  async findBest() {
    return await this.reviewRepository.find({
      order: {
        like: 'DESC',
      },
      take: 3,
    });
  }

  async findAll({ page }) {
    return await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .leftJoinAndSelect('review.user', 'user')
      .orderBy('review.createdAt', 'DESC')
      .skip(0 + Number((page - 1) * 10))
      .take(10)
      .getMany();
  }

  findCount() {
    return this.productRepository.count();
  }

  async findProductReview({ productId }) {
    const product = await this.productRepository.findOne({
      id: productId,
    });
    return await this.reviewRepository.find({ where: { product: product } });
  }

  async findUserReview({ email }) {
    const user = await this.userRepository.findOne({
      email: email,
    });
    return await this.reviewRepository.find({ where: { user: user } });
  }

  async create({ imageUrls, productId, orderId, ...rest }, currentUser) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const product = await queryRunner.manager.findOne(Product, {
        id: productId,
      });
      const user = await queryRunner.manager.findOne(User, {
        email: currentUser.email,
      });
      const order = await queryRunner.manager.findOne(Order, {
        id: orderId,
      });

      const result = await queryRunner.manager.save(Review, {
        ...rest,
        product: product,
        user: user,
        order: order,
      });

      for (let i = 0; i < imageUrls.length; i++) {
        if (i === 0) {
          await queryRunner.manager.save(ReviewImage, {
            url: imageUrls[i],
            isThumbnail: true,
            product: result,
          });
        } else {
          await queryRunner.manager.save(ReviewImage, {
            url: imageUrls[i],
            product: result,
          });
        }
      }
      return result;
    } catch {
    } finally {
    }
  }

  async update(
    { imageUrls, productId, orderId, reviewId, ...rest },
    currentUser,
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const review = await queryRunner.manager.findOne(Review, {
        id: reviewId,
      });

      const product = await queryRunner.manager.findOne(Product, {
        id: productId,
      });

      const user = await queryRunner.manager.findOne(User, {
        email: currentUser.email,
      });

      const order = await queryRunner.manager.findOne(Order, {
        id: orderId,
      });

      //업데이트 된 상품과 연관된 이미지 삭제!!
      const result = await queryRunner.manager.save(Review, {
        ...review,
        ...rest,
        product: product,
        user: user,
        order: order,
      });

      await queryRunner.manager.delete(ReviewImage, {
        review: result,
      });

      for (let i = 0; i < imageUrls.length; i++) {
        if (i === 0) {
          await queryRunner.manager.save(ReviewImage, {
            url: imageUrls[i],
            isThumbnail: true,
            product: result,
          });
        } else {
          await queryRunner.manager.save(ReviewImage, {
            url: imageUrls[i],
            review: result,
          });
        }
      }
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw '리뷰 업데이트 중:' + error;
    } finally {
      await queryRunner.release();
    }
  }
  async delete({ reviewId }) {
    const result = await this.reviewRepository.delete({ id: reviewId });
    return result.affected ? true : false;
  }
}
