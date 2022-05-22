import { InputType, Field, Int } from '@nestjs/graphql';
import { CreateCartProdcutInput } from 'src/apis/cart/dto/createCartProduct.input';

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

  @Field(() => CreateCartProdcutInput)
  cartProdudt: CreateCartProdcutInput;
  // @Field(()=>[String])
  // coupons: string[]
}
