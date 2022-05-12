import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}
  async create({ impUid, price }) {
    const paymentImp = this.paymentRepository.create({
      impUid,
      price,
      status: PAYMENT_STATUS_ENUM.PAYMENT,
      discountAmount: 0,
    });
    await this.paymentRepository.save(paymentImp);

    return paymentImp;
  }
}
