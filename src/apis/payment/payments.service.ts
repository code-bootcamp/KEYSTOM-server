import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { IamportService } from '../iamport/iamport.service';
import { Order } from '../order/entities/order.entity';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly iamportService: IamportService,
    private readonly connection: Connection,
  ) {}
  // async checkDuplicate({ impUid }) {
  //   const result = await this.paymentRepository.findOne({ impUid: impUid });
  //   if (result) throw new ConflictException('결제 이력이 존재합니다.');
  // }

  async payment({ createPaymentInput, currentUser }) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const { impUid, order, price } = createPaymentInput;

      // 1. 아임포트 액세스 토큰 발급
      const token = await this.iamportService.getToken();
      console.log(token);
      // 결제 내역과 올바른 금액으로 결제 했는지 확인!
      await this.iamportService.checkPaid({
        impUid,
        token,
        price,
      });

      // 2. 이미 결제한 내역인지 확인!
      // 중복 방지를 위해 결제 테이블에 존재하는 지 확인!
      const checkAlreadyPayment = await queryRunner.manager.findOne(
        Payment,
        {
          impUid: impUid,
        },
        {
          lock: { mode: 'pessimistic_write' },
        },
      );

      if (checkAlreadyPayment)
        throw new ConflictException('이미 처리된 결제 요청입니다.');

      // 3. 주문 내역 생성
      const orderResult = this.orderRepository.save({
        ...order,
      });

      await queryRunner.manager.save(orderResult);

      // 4. 결제 내역 생성
      const paymentImp = this.paymentRepository.save({
        price: price,
        impUid: impUid,
        status: PAYMENT_STATUS_ENUM.PAYMENT,
        user: currentUser.email,
        order: order.id,
      });

      await queryRunner.manager.save(paymentImp);

      await queryRunner.commitTransaction();
      console.log(paymentImp);
      return paymentImp;
    } catch (error) {
      console.log(error.message);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // 잠시 생각!!
  async cancel({ createPaymentInput, currentUser }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const { impUid, order } = createPaymentInput;

      // 1. 아임포트 액세스 토큰 발급
      const token = await this.iamportService.getToken();
      console.log(token);

      // 2. 이미 결제한 내역인지 확인!
      // 중복 방지를 위해 결제 테이블에 존재하는 지 확인!
      const checkAlreadyCanceled = await queryRunner.manager.findOne(
        Payment,
        {
          impUid: impUid,
          user: currentUser.email,
          status: PAYMENT_STATUS_ENUM.CANCEL,
        },
        {
          lock: { mode: 'pessimistic_write' },
        },
      );

      if (checkAlreadyCanceled)
        throw new ConflictException('이미 환불 처리된 결제 요청입니다.');

      // 3. 아임포트에 환불 요청
      const canceldAmount = await this.iamportService.cancelPayment({
        impUid,
        token,
      });

      // 3. 주문 내역 생성
      const orderResult = this.orderRepository.save({
        ...order,
      });

      await queryRunner.manager.save(orderResult);

      // 4. 결제 내역 생성
      const paymentImp = this.paymentRepository.save({
        price: canceldAmount,
        impUid: impUid,
        status: PAYMENT_STATUS_ENUM.CANCEL,
        user: currentUser.email,
        order: order.id,
      });

      await queryRunner.manager.save(paymentImp);

      await queryRunner.commitTransaction();
      console.log(paymentImp);
      return paymentImp;
    } catch (error) {
      console.log(error.message);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
