import { Field, InputType, Int } from '@nestjs/graphql';
import { Address } from 'src/apis/address/entities/address.entity';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  count: number;

  @Field(() => Int)
  price: number;

  @Field(() => String)
  receiverName: string;

  @Field(() => String)
  receiverPhone: string;

  @Field(() => String)
  productId: string;
}
