import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateReviewInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => [String], { nullable: true })
  imageUrls: string[];

  @Field(() => String)
  reviewId: string;
}
