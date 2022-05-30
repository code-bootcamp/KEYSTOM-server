import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Address } from '../../address/entities/address.entity';
import { Review } from '../../review/entities/review.entity';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  count: number;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  receiverName: string;

  @Column()
  @Field(() => String)
  receiverPhone: string;

  @JoinColumn()
  @OneToOne(() => Address)
  @Field(() => Address)
  address: Address;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @Field(() => String)
  user: string;

  @ManyToOne(() => Product, {
    onDelete: 'CASCADE',
  })
  @Field(() => Product)
  product: Product;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @Column({ default: false })
  @Field(() => Boolean)
  isReview: boolean;
}
