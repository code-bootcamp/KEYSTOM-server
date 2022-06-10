import {
  ConflictException,
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class IamportService {
  //아임포트를 사용하기 위해 토큰을 발급 받아야함!
  async getToken() {
    try {
      const getToken = await axios.post(
        'https://api.iamport.kr/users/getToken',
        {
          imp_key: process.env.IAMPORT_API_KEY, // REST API키
          imp_secret: process.env.IAMPORT_SECRETKEY, // REST API Secret
        },
      );

      return getToken.data.response.access_token; // 인증 토큰
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }

  async checkPaid({ impUid, token, price }) {
    try {
      const result = await axios({
        url: `https://api.iamport.kr/payments/${impUid}`,
        method: 'get', // GET method
        headers: { Authorization: token },
      });

      // 결제 내역이 존재하지 않거나 결제 금액이 일치하지 않으면 에러 발생!!
      if (result.data.response.status !== 'paid')
        throw new ConflictException('결제 내역이 존재하지 않습니다.');
      if (result.data.response.amount !== price)
        throw new UnprocessableEntityException(
          '결제 금액이 일치하지 않습니다.',
        );
      return result;
    } catch (error) {
      // 아임포트로 잘못된 요청을 보냈을 때!
      if (error?.response?.data?.message) {
        throw new HttpException(
          error.response.data.message,
          error.response.status,
        );
      } else {
        // 백엔드 서버 내에서 발생한 오류!
        // 분기를 하는 이유?
        // 위에서 throw를 하게 되면 바로 오류가 발생하는 것이 아니라 throw 구문이 작동하기 때문에 error를 발생시켜줘야 함!
        throw error;
      }
    }
  }

  async cancelPayment({ impUid, token }) {
    try {
      const result = await axios({
        url: 'https://api.iamport.kr/payments/cancel',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token, // 아임포트 서버로부터 발급받은 엑세스 토큰
        },
        data: {
          imp_uid: impUid, // impUid를 환불 `unique key`로 입력
        },
      });
      return result.data.response.cancel_amount;
    } catch (error) {
      console.log('환불 에러', error);
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }
}
