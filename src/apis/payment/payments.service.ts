import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';
import { CreatePaymentInput } from './dto/createPayment.input';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async payment({ createPaymentInput }) {
    const { order, ...payment } = createPaymentInput;
    const orderResult = await this.orderRepository.save({
      ...order,
    });
    const paymentImp = this.paymentRepository.create({
      ...payment,
      status: PAYMENT_STATUS_ENUM.PAYMENT,
      discountAmount: 0,
      order: orderResult,
    });
    return paymentImp;
  }

  // 잠시 생각!!
  async refund({ createPaymentInput }) {
    const { order, ...payment } = createPaymentInput;
    const orderResult = await this.orderRepository.save({
      ...order,
    });
    const paymentImp = this.paymentRepository.create({
      ...payment,
      status: PAYMENT_STATUS_ENUM.CANCEL,
      discountAmount: 0,
      order: orderResult,
    });
    return paymentImp;
  }
}
