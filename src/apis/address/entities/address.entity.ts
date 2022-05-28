import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity()
@ObjectType()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  @Column()
  @Field(() => String)
  zipCode: string;

  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  @Field(() => String)
  impUid: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;
}
