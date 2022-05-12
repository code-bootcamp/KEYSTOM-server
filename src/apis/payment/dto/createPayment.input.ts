import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field(() => Int)
  count: number;

  @Field(() => Int)
  price: number;

  @Field(() => String)
  address: string;

  @Field(() => String)
  recieverName: string;

  @Field(() => String)
  recieverPhone: string;

  @Field(() => String)
  productId: string;
}
