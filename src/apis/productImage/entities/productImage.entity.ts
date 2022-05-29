import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from 'src/apis/products/entities/product.entity';

@Entity()
@ObjectType()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: null })
  @Field(() => String)
  url: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isThumbnail: boolean;

  @ManyToOne(() => Product)
  product: Product;
}
