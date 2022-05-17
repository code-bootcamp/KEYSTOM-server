import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';
import { Product } from '../products/entities/product.entity';
import { ProductImageResolver } from './productImage.resolver';
import { ProductImageService } from './productImage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage,Product])],
  providers: [ProductImageResolver,ProductImageService],
})
export class ProductImageModule {}
