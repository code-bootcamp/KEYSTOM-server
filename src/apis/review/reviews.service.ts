import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
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
  ) {}

  async findAll() {
    return await this.reviewRepository.find({
      relations: ['product', 'user'],
    });
  }
  async findOne({ reviewId }) {
    return await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['product', 'user'],
    });
  }
  async create({ createReviewInput }) {
    const { productId, email, ...review } = createReviewInput;
    const result1 = await this.productRepository.findOne({
      id: productId,
    });
    const result3 = await this.userRepository.findOne({
      email: email,
    });
    const result2 = await this.reviewRepository.save({
      ...review,
      product: result1,
      user: result3,
    });
    return result2;
  }
  async delete({ reviewId }) {
    const result = await this.reviewRepository.softDelete({ id: reviewId });
    return result.affected ? true : false;
  }
}