import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Review } from 'src/apis/review/entities/review.entity';
import { User } from 'src/apis/user/entities/user.entity';

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
}
