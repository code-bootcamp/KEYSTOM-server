import { ObjectType, Field, Int } from '@nestjs/graphql';
// import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';
import { ProductTag } from 'src/apis/productsTag/entities/productTag.entity';
import { UsedProductTag } from 'src/apis/usedProductsTag/entities/usedProductTag.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class UsedProduct {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  sellTitle: string;

  @Column({ default: 0 })
  @Field(() => Int)
  hopePrice: number;

  @Column()
  @Field(() => String)
  method: string;

  @Column()
  @Field(() => String)
  description: string;

  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  @Field(() => String)
  seller: string;

  @JoinTable()
  @ManyToMany(() => UsedProductTag, (usedProductTags) => usedProductTags.usedProducts, {
    onDelete: 'CASCADE',
  })
  @Field(()=>[UsedProductTag])
  usedProductTags: UsedProductTag[];

}
