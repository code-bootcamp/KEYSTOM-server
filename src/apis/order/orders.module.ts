import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from '../address/address.service';
import { Address } from '../address/entities/address.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/users.service';
import { Order } from './entities/order.entity';
import { OrderResolver } from './orders.resolver';
import { OrderService } from './orders.service';
import { UserCoupon } from '../UserCoupon/entities/userCoupon.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, Product, Address, UserCoupon]),
  ],
  providers: [OrderResolver, OrderService, UserService, AddressService],
})
export class OrderModule {}
