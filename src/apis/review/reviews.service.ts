import { Injectable, BadRequestException } from '@nestjs/common';
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
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(ReviewImage)
    private readonly reviewImageRepository: Repository<ReviewImage>,
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

  async findImage({ reviewId }) {
    return await this.reviewImageRepository.find({
      where: { review: reviewId },
      relations: ['review'],
    });
  }

  async findProductReview({ page, productId }) {
    return await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .leftJoinAndSelect('review.user', 'user')
      .where('review.Product = :Product', { id: productId })
      .orderBy('review.createdAt', 'DESC')
      .skip(0 + Number((page - 1) * 10))
      .take(10)
      .getMany();
  }

  findCount() {
    return this.productRepository.count();
  }

  // async findProductReview({ productId }) {
  //   return await this.reviewRepository.find({
  //     where: { productId },
  //     relations: ['product', 'userId'],
  //   });
  // }

  async findUserReview({ email }) {
    const user = await this.userRepository.findOne({
      email,
    });
    return await this.reviewRepository.find({
      where: { user: user },
      relations: ['user, product'],
    });
  }

  async create({ imageUrls, orderId, ...rest }, currentUser) {
    // 어떠한 상품을 누가 구매했는지 불러오기
    const user = await this.userRepository.findOne({
      email: currentUser.email,
    });
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['product'],
    });

    const product = await this.productRepository.findOne({
      id: order.product.id,
    });
    console.log('주문 내역', order);
    console.log(order.product.id);
    // 리뷰 저장
    const result = await this.reviewRepository.save({
      ...rest,
      thumbnail: imageUrls ? imageUrls[0] : ' ',
      user: user,
      order: order,
      product: product,
    });
    console.log('리뷰', result);
    // 리뷰 이미지 저장
    if (imageUrls) {
      for (let i = 0; i < imageUrls.length; i++) {
        //썸네일 저장
        if (i === 0) {
          await this.reviewImageRepository.save({
            url: imageUrls[i],
            isThumbnail: true,
            review: result,
          });
        }
        // 이미지 저장
        else {
          await this.reviewImageRepository.save({
            url: imageUrls[i],
            review: result,
          });
        }
      }
    }

    // 리뷰를 작성했으므로 상태 변경!
    await this.orderRepository.save({
      ...order,
      isReview: true,
    });

    //리뷰를 작성하면 주문 내역에 작성 여부 변경
    return result;
  }

  async update({ imageUrls, reviewId, ...rest }, currentUser) {
    // 업데이트 할 리뷰가 존재하는 지 확인
    const target = await this.reviewRepository.findOne({ id: reviewId });
    if (!target)
      throw new BadRequestException('업데이트할 리뷰가 존재하지 않습니다.');

    // 유저, 주문 내역 찾아오기
    const user = await this.userRepository.findOne({
      email: currentUser.email,
    });
    if (!user) throw new BadRequestException('유저 정보가 존재하지 않습니다.');

    //업데이트 된 상품과 연관된 이미지 삭제!!
    const result = await this.reviewRepository.save({
      ...target,
      ...rest,
    });

    await this.reviewImageRepository.delete({ review: result });
    if (imageUrls) {
      for (let i = 0; i < imageUrls.length; i++) {
        if (i === 0) {
          this.reviewImageRepository.create({
            url: imageUrls[i],
            isThumbnail: true,
            review: result,
          });
          // await queryRunner.manager.save(ReviewImage, { ...image });
        } else {
          this.reviewImageRepository.create({
            url: imageUrls[i],
            review: result,
          });
          // await queryRunner.manager.save(ReviewImage, { ...image });
        }
      }
    }
    return result;
  }
  async delete({ reviewId }) {
    const result = await this.reviewRepository.delete({ id: reviewId });
    return result.affected ? true : false;
  }
}
