import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderResolver } from './orders.resolver';
import { OrderService } from './orders.service';
@Module({
  imports: [TypeOrmModule.forFeature([Order, User])],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
