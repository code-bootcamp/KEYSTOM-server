import { Field, InputType, Int } from '@nestjs/graphql';
import { In } from 'typeorm';

@InputType()
export class CreateCustomInput {
  @Field(() => Int)
  space: number;

  @Field(() => Int)
  enter: number;

  @Field(() => Int)
  esc: number;

  @Field(() => Int)
  rest: number;

  @Field(() => String)
  productId: string;
}
