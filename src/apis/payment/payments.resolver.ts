import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payments.service';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { CreateOrderInput } from 'src/apis/order/dto/createOrder.input';
import { CreateAddressInput } from 'src/apis/address/dto/createAddress.input';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async payment(
    @Args('price') price: number,
    @Args('impUid') impUid: string,
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.paymentService.payment({
      price,
      createAddressInput,
      createOrderInput,
      currentUser,
      impUid,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async refund(
    @Args('impUid') impUid: string,
    @Args('paymentId') paymentId: string,
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.paymentService.cancel({
      paymentId,
      currentUser,
      impUid,
      createOrderInput,
      createAddressInput,
    });
  }
}
