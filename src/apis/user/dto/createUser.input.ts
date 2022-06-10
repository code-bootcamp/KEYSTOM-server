import { InputType, Field } from '@nestjs/graphql';
import { CreateAddressInput } from 'src/apis/address/dto/createAddress.input';

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

  @Field(() => CreateAddressInput)
  address: CreateAddressInput;
}
