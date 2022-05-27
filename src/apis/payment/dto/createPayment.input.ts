import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateOrderInput } from 'src/apis/order/dto/createOrder.input';

@InputType()
export class CreatePaymentInput {
  @Field(() => Int)
  price: number;

  @Field(() => CreateOrderInput)
  order: CreateOrderInput;
}
