import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Review } from '../review/entities/review.entity';
import { User } from '../user/entities/user.entity';
import { ReviewLike } from './entities/reviewLike.entity';

@Injectable()
export class ReviewLikeService {
  constructor(
    @InjectRepository(ReviewLike)
    private readonly reviewLikeRepository: Repository<ReviewLike>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUser({ email, reviewId }) {
    const review = await this.reviewRepository.findOne({ id: reviewId });
    const user = await this.userRepository.findOne({ email: email });
    const present = await this.reviewLikeRepository.findOne({
      where: { user: user, review: review },
    });
    return present;
  }

  async create({ email, reviewId }) {
    const review = await this.reviewRepository.findOne({ id: reviewId });
    const user = await this.userRepository.findOne({ email: email });
    const reviewLike = await this.reviewLikeRepository.save({
      user: user,
      review: review,
    });
    return reviewLike;
  }
  async delete({ email, reviewId }) {
    const review = await this.reviewRepository.findOne({ id: reviewId });
    const user = await this.userRepository.findOne({ email: email });
    const reviewLike = await this.reviewLikeRepository.findOne({
      where: { user: user, review: review },
    });
    const result = await this.reviewLikeRepository.delete({
      id: reviewLike.id,
    });
    return result;
  }

  async count({ reviewId }) {
    const review = await this.reviewRepository.findOne({ id: reviewId });
    const count = await this.reviewLikeRepository.count({
      where: { review: review },
    });  
    return count;
  }
}
