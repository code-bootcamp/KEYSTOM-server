import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => [String], { nullable: true })
  imageUrls: string[];

  @Field(() => String)
  productId: string;

  @Field(() => String)
  orderId: string;
}
