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

  @Query(()=>[Comment])
  fetchReviewComments(
    @Args('reviewId') reviewId: string
  ){
    return this.commentService.find({reviewId})
  }

  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentService.create({ createCommentInput });
  }


  // @Mutation(()=>Comment)
  // createReComment(
  //   @Args('parentId') parentId: string ,
  //   @Args('createCommentInput') createCommentInput: CreateCommentInput
  // ){
    
  // }


}
