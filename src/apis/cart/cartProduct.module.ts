import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { CartProductResolver } from './cartProduct.resolver';
import { CartProductService } from './cartProduct.service';
import { CartProduct } from './entities/cartProduct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartProduct, Product, Order, User])],
  providers: [CartProductResolver, CartProductService],
})
export class CartProductModule {}
