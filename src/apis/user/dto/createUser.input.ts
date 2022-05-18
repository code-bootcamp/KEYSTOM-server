import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String) //비밀번호는 보내면 안됨!!
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  address: string;

  // @Field(()=>[String])
  // coupons: string[]
  
}
