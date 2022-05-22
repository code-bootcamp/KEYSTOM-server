import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductTag } from 'src/apis/productsTag/entities/productTag.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @Column({ default: '' })
  @Field(() => String)
  profileImage: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isAdmin: boolean;

  // @DeleteDateColumn()
  // deletedAt: Date;

  // @JoinTable()
  // @ManyToMany(() => Coupon, (coupon) => coupon.users, {
  //   onDelete: 'CASCADE',
  // })
  // coupon: Coupon[]
}
