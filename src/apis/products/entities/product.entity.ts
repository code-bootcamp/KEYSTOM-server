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
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTag) => productTag.products, {
    onDelete: 'CASCADE',
  })
  productTag: ProductTag[];

  // @ManyToOne(() => ProductImage, { onDelete: 'CASCADE' })
  // @Field(() => ProductImage)
  // productImage: ProductImage;
}
