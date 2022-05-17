import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../review/entities/review.entity';
import {ReviewImage } from './entities/reviewImage.entity';

@Injectable()
export class ReviewImageService {
  constructor(
    @InjectRepository(ReviewImage)
    private readonly reviewImageRepository: Repository<ReviewImage>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async findAll() {
    return await this.reviewImageRepository.find();
  }
  async findOne({ reviewImageId }) {
    return await this.reviewImageRepository.findOne({ where: { id: reviewImageId } });
  }
  async create({reviewImageUrl,reviewId}) {
    const result1 = await this.reviewRepository.findOne({
      id: reviewId,
    });
    const result2 = await this.reviewImageRepository.save({
      reviewImageUrl:reviewImageUrl,
      review: result1,
    });
    return result2;
  }
}
