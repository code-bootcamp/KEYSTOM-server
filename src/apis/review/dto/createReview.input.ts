import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => String)
  reviewContent: string;

  @Field(() => Boolean)
  like: boolean;

  @Field(() => String)
  productId: string;

  @Field(()=>String)
  userId: string
}
