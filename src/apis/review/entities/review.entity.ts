import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  reviewContent: string;

  @Column()
  @Field(() => Boolean)
  like: boolean;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(()=>User)
  user: User
}
