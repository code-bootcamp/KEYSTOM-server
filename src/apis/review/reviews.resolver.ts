import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { UpdateReviewInput } from './dto/updateReview.input';
import { CreateReviewInput } from './dto/createReview.input';
import { Review } from './entities/review.entity';
import { ReviewService } from './reviews.service';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { ReviewImage } from '../reviewImage/entities/reviewImage.entity';

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

  @Query(() => [ReviewImage])
  fetchReviewImages(@Args('reviewId') reviewId: string) {
    return this.reviewService.findImage({ reviewId });
  }

  @Query(() => Int)
  fetchReviewRowCount() {
    return this.reviewService.findCount();
  }

  @Query(() => [Review])
  fetchProductReview(@Args('productId') productId: string) {
    return this.reviewService.findProductReview({ productId });
  }
  @Query(() => [Review])
  fetchUserReview(@Args('email') email: string) {
    return this.reviewService.findUserReview({ email });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Review)
  createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.reviewService.create({ ...createReviewInput }, currentUser);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Review)
  updateReview(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.reviewService.update({ ...updateReviewInput }, currentUser);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  deleteReview(@Args('reviewId') reviewId: string) {
    return this.reviewService.delete({ reviewId });
  }
}
