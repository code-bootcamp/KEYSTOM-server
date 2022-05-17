import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { CartProductResolver} from './cartProduct.resolver';
import { CartProductService} from './cartProduct.service';
import { CartProduct } from './entities/cartProduct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartProduct,Product])],
  providers: [CartProductResolver, CartProductService],
})
export class CartProductModule {}
