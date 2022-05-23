import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/createComment.input';
import { Comment } from './entities/comment.entity';

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

  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentService.create({ createCommentInput });
  }

  @Mutation(() => Comment)
  createReComment(
    @Args('commentId') commentId: number,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentService.createReComment({
      commentId,
      createCommentInput,
    });
  }

  @Mutation(() => String)
  deleteComment(@Args('commentId') commentId: number) {
    return this.commentService.delete({ commentId });
  }
}
