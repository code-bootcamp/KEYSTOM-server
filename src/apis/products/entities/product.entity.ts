import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductTag } from 'src/apis/productsTag/entities/productTag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column({ default: 0 })
  @Field(() => Int)
  price: number;

  @Column({ default: 0 })
  @Field(() => Int)
  like: number;

  @Column()
  @Field(() => String)
  image: string;

  @Column()
  @Field(() => String)
  thumbnailImage: string;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTag) => productTag.products)
  productTag: ProductTag[];
}
