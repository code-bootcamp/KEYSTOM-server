import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QueryBuilder } from 'typeorm';
import { CreateReviewInput } from './dto/createReview.input';
import { Review } from './entities/review.entity';
import { ReviewService } from './reviews.service';

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}
  @Query(() => [Review])
  fetchReviews() {
    return this.reviewService.findAll();
  }
  @Query(() => Review)
  fetchReview(@Args('reviewId') reviewId: string) {
    return this.reviewService.findOne({ reviewId });
  }
  @Mutation(() => Review)
  createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ) {
    return this.reviewService.create({ createReviewInput });
  }

  @Mutation(() => String)
  deleteReview(@Args('reviewId') reviewId: string) {
    return this.reviewService.delete({ reviewId });
  }
}
