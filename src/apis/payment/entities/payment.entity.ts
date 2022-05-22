import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/apis/order/entities/order.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

export enum PAYMENT_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}
//결제는 수정과 삭제가 없고 등록만 가능해야한다!
registerEnumType(PAYMENT_STATUS_ENUM, {
  name: 'PAYMENT_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => Int)
  discount: number;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column({ type: 'enum', enum: PAYMENT_STATUS_ENUM })
  @Field(() => PAYMENT_STATUS_ENUM)
  status: PAYMENT_STATUS_ENUM;

  @JoinColumn()
  @OneToOne(() => Order, { onDelete: 'CASCADE' })
  @Field(() => Order)
  order: Order;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
