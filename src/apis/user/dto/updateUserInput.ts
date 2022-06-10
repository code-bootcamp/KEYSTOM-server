import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  nickName: string;
}
