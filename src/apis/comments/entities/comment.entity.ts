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
import { User } from 'src/apis/user/entities/user.entity';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  content: string;

  @Column({ default: null })
  @Field(() => String)
  parentId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Review, { onDelete: 'CASCADE' })
  review: Review;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
