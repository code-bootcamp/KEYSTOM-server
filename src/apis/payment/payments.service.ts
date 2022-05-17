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
    private readonly orderRepository: Repository<Order>
  ) {}
  async create({createPaymentInput}){
    const{order,...payment} = createPaymentInput
    const result1 = await this.orderRepository.save({
      ...order,
    })
    const paymentImp = this.paymentRepository.create({
          ...payment,
          status: PAYMENT_STATUS_ENUM.PAYMENT,
          discountAmount: 0,
          order:result1
        });
    return paymentImp
  }
  // async create({ impUid, price }) {
  //   const paymentImp = this.paymentRepository.create({
  //     impUid,
  //     price,
  //     status: PAYMENT_STATUS_ENUM.PAYMENT,
  //     discountAmount: 0,
  //   });
  //   await this.paymentRepository.save(paymentImp);

  //   return paymentImp;
  // }
}
