import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, In } from 'typeorm';

@Entity()
@ObjectType()
export class Custom {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  space: number;

  @Column()
  @Field(() => Int)
  enter: number;

  @Column()
  @Field(() => Int)
  esc: number;

  @Column()
  @Field(() => Int)
  rest: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @Field(() => Product)
  product: Product;
}
