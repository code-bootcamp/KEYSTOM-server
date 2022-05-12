import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCouponInput {
  @Field(() => Int)
  discount_price: number;

  @Field(() => String)
  description: string;
}
