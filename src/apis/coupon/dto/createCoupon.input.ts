import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCouponInput {
  @Field(() => Int)
  discountPrice: number;

  @Field(() => String)
  couponName: string;
}
