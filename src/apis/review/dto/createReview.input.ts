import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {

  @Field(() => String)
  reviewTitle: string;

  @Field(() => String)
  reviewContent: string;

  @Field(() => String)
  productId: string;

  @Field(()=>String)
  email: string
}
