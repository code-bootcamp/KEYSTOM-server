import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne  } from 'typeorm';
import { Product } from 'src/apis/products/entities/product.entity';

@Entity()
@ObjectType()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  productImageUrl: string;

  @ManyToOne(() => Product)
  product: Product;
}
