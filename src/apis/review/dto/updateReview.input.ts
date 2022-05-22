import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateReviewInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => [String])
  imageUrls: string[];

  @Field(() => String)
  productId: string;

  @Field(() => String)
  orderId: string;

  @Field(() => String)
  reviewId: string;
}
