import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';
import { Product } from '../products/entities/product.entity';
import { UsedProduct } from '../usedProducts/entities/usedProduct.entity';
import { UsedProductImage } from './entities/usedproductImage.entity';
import { UsedProductImageResolver } from './usedproductImage.resolver';
import { UsedProductImageService } from './usedproductImage.service';


@Module({
  imports: [TypeOrmModule.forFeature([UsedProductImage,UsedProduct])],
  providers: [UsedProductImageResolver,UsedProductImageService],
})
export class UsedProductImageModule {}
