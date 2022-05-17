import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QueryBuilder } from 'typeorm';
import { CreateOrderInput } from './dto/createOrder.input';
import { Order } from './entities/order.entity';
import { OrderService } from './orders.service';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}
  @Query(() => [Order])
  fetchOrder() {
    return this.orderService.findAll();
  }
  @Query(() => String)
  fetchOrders() {
    return 'hello';
  }
  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create({ createOrderInput });
  }
}
