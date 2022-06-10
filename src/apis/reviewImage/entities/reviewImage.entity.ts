import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Review } from 'src/apis/review/entities/review.entity';

@Entity()
@ObjectType()
export class ReviewImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  url: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isThumbnail: boolean;

  @ManyToOne(() => Review)
  review: Review;
}
