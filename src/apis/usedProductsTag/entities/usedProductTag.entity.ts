import { ObjectType, Field } from '@nestjs/graphql';
import { UsedProduct } from 'src/apis/usedProducts/entities/usedProduct.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class UsedProductTag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  tag: string;

  @ManyToMany(() => UsedProduct, (usedProducts) => usedProducts.usedProductTags)
  @Field(() => [UsedProduct])
  usedProducts: UsedProduct[];
}
