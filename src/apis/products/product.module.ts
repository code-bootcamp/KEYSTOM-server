import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTag } from '../productsTag/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductTag])],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}
