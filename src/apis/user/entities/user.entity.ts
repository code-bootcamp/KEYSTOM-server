import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductTag } from 'src/apis/productsTag/entities/productTag.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  nickName: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column() //비밀번호는 보내면 안됨!!
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ default: '' })
  @Field(() => String)
  profileImage: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isAdmin: boolean;

  @Column()
  @Field(() => String)
  address: string;

  @DeleteDateColumn()
  deletedAt: Date;

  // @JoinTable()
  // @ManyToMany(() => Coupon, (coupon) => coupon.users, {
  //   onDelete: 'CASCADE',
  // })
  // coupon: Coupon[]
}
