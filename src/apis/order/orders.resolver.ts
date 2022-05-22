import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QueryBuilder } from 'typeorm';
import { CreateOrderInput } from './dto/createOrder.input';
import { Order } from './entities/order.entity';
import { OrderService } from './orders.service';
import { User } from 'src/apis/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { UserService } from '../user/users.service';

@Resolver()
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}

  // @Query(() => [Order])
  // fetchOrders() {
  //   return this.orderService.findAll({ email, page });
  // }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Order]) //본인이 산 목록
  async fetchUserOrder(@CurrentUser() currentUser: ICurrentUser) {
    const email = currentUser.email;
    const order = await this.orderService.findUserOder({ email });
    return order;
  }

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create({ createOrderInput });
  }
}
