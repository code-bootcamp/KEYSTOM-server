import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  reviewTitle: string;

  @Column()
  @Field(() => String)
  reviewContent: string;

  @Column({ default: 0 })
  @Field(() => Int)
  like: number;

  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;
}
