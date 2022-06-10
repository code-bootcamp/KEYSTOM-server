import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QueryBuilder } from 'typeorm';
import { CreateOrderInput } from './dto/createOrder.input';
import { Order } from './entities/order.entity';
import { OrderService } from './orders.service';
import { User } from 'src/apis/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Order]) //본인이 산 목록
  async fetchOrders(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('page', { nullable: true }) page: number, //
  ) {
    const email = currentUser.email;
    if (!page) page = 1;
    const order = await this.orderService.findall({ email, page });
    return order;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Order) //본인이 산 목록
  async fetchOrder(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('orderId') orderId: string,
  ) {
    const email = currentUser.email;
    const order = await this.orderService.findOne({ email, orderId });
    return order;
  }

  // @UseGuards(GqlAuthAccessGuard)
  // @Mutation(() => Order)
  // createOrder(
  //   @Args('createOrderInput') createOrderInput: CreateOrderInput,
  //   @CurrentUser() currentUser: ICurrentUser,
  // ) {
  //   return this.orderService.create({
  //     createOrderInput,
  //     email: currentUser.email,
  //   });
  // }
}
