import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderResolver } from './orders.resolver';
import { OrderService } from './orders.service';
@Module({
  imports: [TypeOrmModule.forFeature([Order, Product])],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
