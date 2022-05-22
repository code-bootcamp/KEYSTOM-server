import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateOrderInput } from 'src/apis/order/dto/createOrder.input';
import { CreateProductInput } from 'src/apis/products/dto/createProduct.input';

@InputType()
export class CreatePaymentInput {
  @Field(() => Int)
  price: number;

  @Field(() => String)
  impUid: string;

  @Field(() => CreateOrderInput)
  order: CreateOrderInput;
}
