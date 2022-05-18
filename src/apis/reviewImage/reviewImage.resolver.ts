import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReviewImage } from './entities/reviewImage.entity';
import { ReviewImageService } from './reviewImage.service';

@Resolver()
export class ReivewImageResolver {
  constructor(private readonly reviewImageService: ReviewImageService) {}
  @Query(() => [ReviewImage])
  fetchReviewImages() {
    return this.reviewImageService.findAll();
  }
  @Query(() => ReviewImage)
  fetchReviewImage(@Args('reviewImageId') reviewImageId: string) {
    return this.reviewImageService.findOne({ reviewImageId });
  }
  @Mutation(() => ReviewImage)
  createReivewImage(
    @Args('reviewImageUrl') reviewImageUrl: string,
    @Args('reviewId') reviewId: string,
  ) {
    return this.reviewImageService.create({ reviewImageUrl, reviewId });
  }
}
