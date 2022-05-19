import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUsedProductInput {

  @Field(() => String)
  sellTitle: string;

  @Field(() => Int)
  hopePrice: number;

  @Field(() => String)
  method: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  seller: string;

  @Field(() => [String])
  usedProductTags: string[];
}
