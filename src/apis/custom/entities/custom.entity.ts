import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Custom {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  key: string;

  @Column()
  @Field(() => String)
  color: string;

  @ManyToOne(() => Product)
  @Field(()=>Product)
  product: Product;
}
