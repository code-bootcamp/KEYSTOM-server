import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.reviewRepository.find();
  }
  async findOne({ reviewId }) {
    return await this.reviewRepository.findOne({ where: { id: reviewId } });
  }
  async create({ createReviewInput }) {
    const { productId, ...review } = createReviewInput;
    const result1 = await this.productRepository.findOne({
      id: productId,
    });
    const result2 = await this.reviewRepository.save({
      ...review,
      product: result1,
    });
    return result2;
  }
}
