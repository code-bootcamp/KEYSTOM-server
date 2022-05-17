import { ObjectType, Field, Int } from '@nestjs/graphql';
// import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';
import { ProductTag } from 'src/apis/productsTag/entities/productTag.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(()=>Int)
  discountPrice: number

  @Column()
  @Field(()=>String)
  couponName: string

  @DeleteDateColumn()
  deletedAt: Date;

  // @ManyToOne(() => ProductImage, { onDelete: 'CASCADE' })
  // @Field(() => ProductImage)
  // productImage: ProductImage;
}
