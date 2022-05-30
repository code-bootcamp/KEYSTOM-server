import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { UserCoupon } from 'src/apis/UserCoupon/entities/userCoupon.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

// export enum USER_ROLE_ENUM {
//   USER = 'USER',
//   ADMIN = 'ADMIN',
// }

// registerEnumType(USER_ROLE_ENUM, {
//   name: 'USER_ROLE_ENUM',
// });

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
      'https://storage.googleapis.com/f12-bucket/KakaoTalk_Photo_2022-05-30-10-43-19.png',
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
