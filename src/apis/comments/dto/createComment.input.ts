import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {

  @Field(() => String)
  commentContent: string;

  @Field(() => String)
  ParentId: string;

  @Field(()=>String)
  reviewId:string;

}
