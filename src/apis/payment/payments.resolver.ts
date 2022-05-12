import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payments.service';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  async Payment(@Args('impUid') impUid: string, @Args('price') price: number) {
    return await this.paymentService.create({ price, impUid });
  }
}
