import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field(() => String)
  address: string;

  @Field(() => String)
  addressDetail: string;

  @Field(() => String)
  zipCode: string;

  @Field(() => String)
  email: string;
}
