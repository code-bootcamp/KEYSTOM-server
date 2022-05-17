import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductTag } from 'src/apis/productsTag/entities/productTag.entity';
import {
  Column,
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
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column() //비밀번호는 보내면 안됨!!
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  identify: string;

  @Column()
  @Field(() => String)
  profileImage: string;

  @Column()
  @Field(() => Boolean)
  isAdmin: boolean;

  @Column()
  @Field(() => String)
  address: string;

  // @JoinTable()
  // @ManyToMany(() => Coupon, (coupon) => coupon.users, {
  //   onDelete: 'CASCADE',
  // })
  // coupon: Coupon[]
  
}
