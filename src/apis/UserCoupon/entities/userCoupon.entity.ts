import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { User } from 'src/apis/user/entities/user.entity';
import { Coupon } from 'src/apis/coupon/entities/coupon.entity';

@Entity()
@ObjectType()
export class UserCoupon {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => User, (user) => user.userCoupons)
  @Field(() => User)
  email: User;

  @ManyToOne(() => Coupon, (coupon) => coupon.userCoupons)
  @Field(() => Coupon)
  coupon: Coupon;

  @Column({ default: false })
  @Field(() => Boolean)
  isEvent: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
