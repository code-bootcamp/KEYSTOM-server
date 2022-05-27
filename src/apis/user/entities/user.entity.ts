import { ObjectType, Field } from '@nestjs/graphql';
import { UserCoupon } from 'src/apis/UserCoupon/entities/userCoupon.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryColumn()
  @Field(() => String)
  email: string;

  @Column() //비밀번호는 보내면 안됨!!
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  nickName: string;

  @Column({
    default:
      'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
    nullable: true,
  })
  @Field(() => String)
  profileImage: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isAdmin: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => UserCoupon, (userCoupon) => userCoupon.email)
  userCoupons: UserCoupon;
}
