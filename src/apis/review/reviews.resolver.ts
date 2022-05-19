import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { QueryBuilder } from 'typeorm';
import { CreateReviewInput } from './dto/createReview.input';
import { Review } from './entities/review.entity';
import { ReviewService } from './reviews.service';

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}
  @Query(() => Review)
  fetchReview(@Args('reviewId') reviewId: string) {
    return this.reviewService.findOne({ reviewId });
  }

  @Query(() => [Review])
  fetchBestReview() {
    return this.reviewService.findBest();
  }

  @Query(() => [Review])
  fetchReviews(
    @Args('page', { nullable: true }) page: number, //
  ) {
    if (!page) page = 1;
    return this.reviewService.findAll({ page });
  }

  @Query(() => Int)
  fetchReviewRowCount() {
    return this.reviewService.findCount();
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
