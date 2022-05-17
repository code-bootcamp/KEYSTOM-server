import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePaymentInput } from './dto/createPayment.input';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payments.service';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  async Payment(
    @Args('createPaymentInput')createPaymentInput: CreatePaymentInput
    ) {
    return await this.paymentService.create({ createPaymentInput});
  }
}
  