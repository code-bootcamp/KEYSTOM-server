import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  price: number;

  @Field(() => [String])
  imageUrls: string[];

  @Field(() => [String], { nullable: true })
  productTags: string[];
}
