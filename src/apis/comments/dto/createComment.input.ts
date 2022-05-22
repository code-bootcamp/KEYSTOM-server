import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  commentContent: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  reviewId: string;
}
