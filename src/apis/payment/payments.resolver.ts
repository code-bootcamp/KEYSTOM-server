import { UseGuards, Req } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePaymentInput } from './dto/createPayment.input';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payments.service';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async payment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.paymentService.payment({
      createPaymentInput,
      currentUser,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async refund(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.paymentService.cancel({
      createPaymentInput,
      currentUser,
    });
  }
}
