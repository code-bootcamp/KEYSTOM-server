import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTag } from '../productsTag/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductTag, ProductImage])],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}
