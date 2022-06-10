import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserCouponInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  couponId: string;
}
