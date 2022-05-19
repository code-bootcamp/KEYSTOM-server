import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Review } from 'src/apis/review/entities/review.entity';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  commentContent: string;

  @Column({ default: null })
  @Field(() => String)
  ParentId: string;

  @ManyToOne(() => Review)
  review: Review;

  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;
}
