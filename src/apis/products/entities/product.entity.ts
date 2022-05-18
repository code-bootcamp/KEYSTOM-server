import { ObjectType, Field, Int } from '@nestjs/graphql';
// import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';
import { ProductTag } from 'src/apis/productsTag/entities/productTag.entity';
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
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column({ default: 0 })
  @Field(() => Int)
  price: number;

  @Column({ default: 0 })
  @Field(() => Int)
  like: number;

  @Column()
  @Field(() => String)
  image: string;

  @Column()
  @Field(() => String)
  thumbnailImage: string;

  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products, {
    onDelete: 'CASCADE',
  })
  @Field(()=>[ProductTag])
  productTags: ProductTag[];

}
