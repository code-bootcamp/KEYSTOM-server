import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QueryBuilder } from 'typeorm';
import { CreateOrderInput } from './dto/createOrder.input';
import { Order } from './entities/order.entity';
import { OrderService } from './orders.service';
import { User } from 'src/apis/user/entities/user.entity';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  fetchOrders() {
    return this.orderService.findAll();
  }

  @Query(() => String)
  fetchOrder(@Args('id') id: string) {
    return this.orderService.find({ id });
  }

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create({ createOrderInput });
  }
}
