import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  price: number;

  @Field(() => [String], { nullable: true })
  imageUrls: string[];

  @Field(() => [String], { nullable: true })
  productTags: string[];
}
