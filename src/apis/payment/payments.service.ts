import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { IamportService } from '../iamport/iamport.service';
import { Order } from '../order/entities/order.entity';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';
import { Address } from '../address/entities/address.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    private readonly iamportService: IamportService,
    private readonly connection: Connection,
  ) {}
  async payment({
    price,
    createOrderInput,
    currentUser,
    impUid,
    createAddressInput,
  }) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      // 1. 아임포트 액세스 토큰 발급
      const token = await this.iamportService.getToken();
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
          impUid,
        },
        {
          lock: { mode: 'pessimistic_write' },
        },
      );

      if (checkAlreadyPayment)
        throw new ConflictException('이미 처리된 결제 요청입니다.');

      // 2.5 배송지 생성
      const addressResult = this.addressRepository.create({
        ...createAddressInput,
        user: currentUser.email,
      });
      await queryRunner.manager.save(addressResult);

      // 2.7 상품 찾아오기
      const { productId, ...rest } = createOrderInput;
      const product = await queryRunner.manager.findOne(Product, {
        id: productId,
      });

      // 3. 주문 내역 생성
      const order = this.orderRepository.create({
        ...rest,
        address: addressResult,
        user: currentUser.email,
        product,
      });
      await queryRunner.manager.save(order);

      // 4. 결제 내역 생성
      const paymentImp = this.paymentRepository.create({
        price: price,
        impUid,
        status: PAYMENT_STATUS_ENUM.PAYMENT,
        user: currentUser.email,
        order: order['id'],
      });

      await queryRunner.manager.save(paymentImp);

      await queryRunner.commitTransaction();
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
  async cancel({
    paymentId,
    currentUser,
    impUid,
    createOrderInput,
    createAddressInput,
  }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      // 1. 아임포트 액세스 토큰 발급
      const token = await this.iamportService.getToken();

      // 2. 이미 결제한 내역인지 확인!
      // 중복 방지를 위해 결제 테이블에 존재하는 지 확인!
      const checkAlreadyCanceled = await queryRunner.manager.findOne(
        Payment,
        {
          id: paymentId,
          status: PAYMENT_STATUS_ENUM.CANCEL,
        },
        {
          lock: { mode: 'pessimistic_write' },
        },
      );

      if (checkAlreadyCanceled)
        throw new ConflictException('이미 환불 처리된 결제 요청입니다.');

      // 2.3 아임포트에 환불 요청
      const canceldAmount = await this.iamportService.cancelPayment({
        impUid,
        token,
      });

      // 2.5 배송지 생성
      const addressResult = this.addressRepository.create({
        ...createAddressInput,
        user: currentUser.email,
      });
      await queryRunner.manager.save(addressResult);

      // 2.7 상품 찾아오기
      const { productId, ...rest } = createOrderInput;
      const product = await queryRunner.manager.findOne(Product, {
        id: productId,
      });
      // 3. 주문 내역 생성
      const order = this.orderRepository.create({
        ...rest,
        address: addressResult,
        user: currentUser.email,
        product,
      });
      await queryRunner.manager.save(order);

      // 4. 결제 내역 생성
      const paymentImp = this.paymentRepository.create({
        price: canceldAmount,
        impUid,
        status: PAYMENT_STATUS_ENUM.CANCEL,
        user: currentUser.email,
        order: order['id'],
      });

      await queryRunner.manager.save(paymentImp);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error.message);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
