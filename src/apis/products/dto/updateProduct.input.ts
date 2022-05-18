import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  like: number;

  @Field(() => String)
  image: string;

  @Field(() => String)
  thumbnailImage: string;

  @Field(() => [String])
  productTags: string[];
}
