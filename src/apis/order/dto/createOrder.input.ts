import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  count: number;

  @Field(() => Int)
  price: number;

  @Field(() => String)
  address: string;

  @Field(() => String)
  receiverName: string;

  @Field(() => String)
  receiverPhone: string;

  // @Field(() => String)
  // email: string;

  @Field(() => String)
  productId: string;
}
