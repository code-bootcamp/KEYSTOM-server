import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateAddressInput } from '../../address/dto/createAddress.input';
import { Address } from '../../address/entities/address.entity';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  count: number;

  @Field(() => Int)
  price: number;

  @Field(() => CreateAddressInput)
  address: CreateAddressInput;

  @Field(() => String)
  receiverName: string;

  @Field(() => String)
  receiverPhone: string;

  @Field(() => String)
  productId: string;
}
