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
  fetchReviewComments(@Args('reviewId') reviewId: string) {
    return this.commentService.findReviewComments({ reviewId });
  }

  @Query(() => [Comment])
  fetchUserComments(@Args('email') email: string) {
    return this.commentService.findUserComments({ email });
  }

  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentService.create({ createCommentInput });
  }

  @Mutation(() => String)
  deleteComment(@Args('commentId') commentId: number) {
    return this.commentService.delete({ commentId });
  }
}
