import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateReviewLikeInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  reviewId: string;
}
