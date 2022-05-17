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
    return await this.reviewRepository.find();
  }
  async findOne({ reviewId }) {
    return await this.reviewRepository.findOne({ where: { id: reviewId } });
  }
  async create({ createReviewInput }) {
    const { productId, userId,...review } = createReviewInput;
    const result1 = await this.productRepository.findOne({
      id: productId,
    });
    const result3 = await this.userRepository.findOne({
      id:userId
    })
    const result2 = await this.reviewRepository.save({
      ...review,
      product: result1,
      user:result3
    });
    return result2;
  }
}
