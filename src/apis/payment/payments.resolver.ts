import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePaymentInput } from './dto/createPayment.input';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payments.service';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async Payment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ) {
    return await this.paymentService.payment({ createPaymentInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async Refund(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ) {
    return await this.paymentService.refund({ createPaymentInput });
  }
}
