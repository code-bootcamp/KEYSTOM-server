import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomInput {
  @Field(() => String)
  key: string;

  @Field(() => String)
  color: string;

  @Field(() => String)
  productId: string;
}
