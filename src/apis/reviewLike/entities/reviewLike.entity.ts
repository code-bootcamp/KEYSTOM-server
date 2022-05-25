import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Review } from 'src/apis/review/entities/review.entity';
import { MIN } from 'class-validator';
import { User } from 'src/apis/user/entities/user.entity';
import { Product } from 'src/apis/products/entities/product.entity';

@Entity()
@ObjectType()
export class ReviewLike {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Review, { onDelete: 'CASCADE' })
  review: Review;

  // @CreateDateColumn()
  // @Field(() => String)
  // createdAt: Date;

  // @DeleteDateColumn()
  // deletedAt: Date;
}
