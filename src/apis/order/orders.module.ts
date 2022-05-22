import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProduct } from '../cart/entities/cartProduct.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/users.service';
import { Order } from './entities/order.entity';
import { OrderResolver } from './orders.resolver';
import { OrderService } from './orders.service';
@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product, CartProduct])],
  providers: [OrderResolver, OrderService, UserService],
})
export class OrderModule {}
