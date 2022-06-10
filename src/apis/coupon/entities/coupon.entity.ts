import { ObjectType, Field, Int } from '@nestjs/graphql';
// import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';
import { ProductTag } from 'src/apis/productsTag/entities/productTag.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserCoupon } from '../../UserCoupon/entities/userCoupon.entity';

@Entity()
@ObjectType()
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  discountPrice: number;

  @Column()
  @Field(() => String)
  couponName: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => UserCoupon, (userCoupon) => userCoupon.coupon)
  userCoupons: UserCoupon[];
}
