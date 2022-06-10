import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamportService } from '../iamport/iamport.service';
import { Order } from '../order/entities/order.entity';
import { Payment } from './entities/payment.entity';
import { PaymentResolver } from './payments.resolver';
import { PaymentService } from './payments.service';
import { Address } from '../address/entities/address.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order, Address])],
  providers: [PaymentResolver, PaymentService, IamportService],
})
export class PaymentModule {}
