import { ConflictException, ConsoleLogger, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { CreateReviewLikeInput } from './dto/createReviewLike.input';
import { ReviewLike } from './entities/reviewLike.entity';
import { ReviewLikeService } from './reviewLike.service';

@Resolver()
export class ReviewLikeResolver {
  constructor(private readonly reviewLikeService: ReviewLikeService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Int)
  async likeUp(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('reviewId') reviewId: string,
  ) {
    const email = currentUser.email;
    //이미 좋아요 눌렀던 사람인지 확인
    const prevLike = await this.reviewLikeService.findUser({ email, reviewId });
    if (prevLike) {
      //좋아요 누른 사람 정보 db에 삭제
      const delLike = await this.reviewLikeService.delete({ email, reviewId });
    } else {
      //좋아요 누른 사람 정보 db에 저장
      const like = await this.reviewLikeService.create({ email, reviewId });
    }

    //리뷰 좋아요 갯수 뽑기
    const likeCount = await this.reviewLikeService.count({ reviewId });

    return likeCount;
  }
}
