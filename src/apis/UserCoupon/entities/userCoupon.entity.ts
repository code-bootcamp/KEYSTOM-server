import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne, CreateDateColumn, } from 'typeorm';
import { Review } from 'src/apis/review/entities/review.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Coupon } from 'src/apis/coupon/entities/coupon.entity';

@Entity()
@ObjectType()
export class UserCoupon {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(()=>Coupon)
  coupon:Coupon


}
