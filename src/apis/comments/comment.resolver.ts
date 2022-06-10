import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/createComment.input';
import { Comment } from './entities/comment.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from '../../commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}
  @Query(() => [Comment])
  fetchComments() {
    return this.commentService.findAll();
  }
  @Query(() => Comment)
  fetchComment(@Args('commentId') commentId: string) {
    return this.commentService.findOne({ commentId });
  }

  @Query(() => [Comment])
  fetchReComments(
    @Args('reviewId') reviewId: string,
    @Args('commentId') commentId: number,
  ) {
    return this.commentService.findReComments({ reviewId, commentId });
  }

  @Query(() => [Comment])
  fetchUserComments(@Args('email') email: string) {
    return this.commentService.findUserComments({ email });
  }
  @Query(() => [Comment])
  fetchReviewComments(@Args('reviewId') reviewId: string) {
    return this.commentService.findReviewComments({ reviewId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.commentService.create({ createCommentInput, currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Comment)
  createReComment(
    @Args('commentId') commentId: number,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.commentService.createReComment({
      commentId,
      createCommentInput,
      currentUser,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  deleteComment(
    @Args('commentId') commentId: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.commentService.delete({ commentId, currentUser });
  }
}
