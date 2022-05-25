import { InputType, Field, Int } from '@nestjs/graphql';
import { CreateAddressInput } from 'src/apis/address/dto/createAddress.input';
import { CreateUserAddressInput } from 'src/apis/address/dto/createUserAddress.input';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String) //비밀번호는 보내면 안됨!!
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  nickName: string;

  @Field(() => CreateUserAddressInput)
  address: CreateUserAddressInput;
  // @Field(()=>[String])
  // coupons: string[]
}
