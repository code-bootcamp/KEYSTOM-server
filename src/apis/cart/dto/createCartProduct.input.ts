import { Field, InputType , Int } from '@nestjs/graphql';

@InputType()
export class CreateCartProdcutInput {
  @Field(() => Int )
  count: number;

  @Field(() => Int)
  priceAll: number;


  @Field(() => String)
  productId: string;
}
