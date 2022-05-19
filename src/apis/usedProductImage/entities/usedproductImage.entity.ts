import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne  } from 'typeorm';
import { Product } from 'src/apis/products/entities/product.entity';
import { UsedProduct } from 'src/apis/usedProducts/entities/usedProduct.entity';

@Entity()
@ObjectType()
export class UsedProductImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  usedProductImageUrl: string;

  @Column()
  @Field(()=>Boolean)
  isThumbnail: boolean

  @ManyToOne(() => UsedProduct)
  usedProduct: UsedProduct;
}
