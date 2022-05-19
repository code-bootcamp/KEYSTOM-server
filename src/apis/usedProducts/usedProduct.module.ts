import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTag } from '../productsTag/entities/productTag.entity';
import { UsedProductTag } from '../usedProductsTag/entities/usedProductTag.entity';
import { UsedProduct } from './entities/usedProduct.entity';
import { UsedProductResolver } from './usedProduct.resolver';
import { UsedProductService } from './usedProduct.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsedProduct,UsedProductTag])],
  providers: [
    UsedProductResolver, //
    UsedProductService,
  ],
})
export class UsedProductModule {}
