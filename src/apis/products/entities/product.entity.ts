import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';
import { ProductTag } from 'src/apis/productsTag/entities/productTag.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  @Column({
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  thumbnail: string;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTag) => productTag.products, {
    nullable: true,
  })
  @Field(() => [ProductTag])
  productTags: ProductTag[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    nullable: true,
  })
  productImages: ProductImage[];

  @UpdateDateColumn()
  updatedAt: Date;
}
