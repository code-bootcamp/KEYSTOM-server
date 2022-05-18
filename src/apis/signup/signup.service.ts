import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SignUpService {
  checkValidationPhone({ phoneNum }) {
    if (phoneNum.length !== 10 && phoneNum.length !== 11) {
      console.log('에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!');
      return false;
    } else {
      return true;
    }
  }

  getToken() {
    const result = String(Math.floor(Math.random() * 10 ** 6)).padStart(4, '0');
    return result;
  }

  async sendTokenToSMS({ phoneNum, token }) {
    const appKey = process.env.SMS_APP_KEY;
    const XSecretKey = process.env.SMS_X_SECRETE_KEY;
    const sender = process.env.SMS_SENDER;
    const result = await axios.post(
      `https://api-sms.cloud.toast.com/sms/v3.0/appKeys/${appKey}/sender/sms`,
      {
        body: `안녕하세요. 인증번호는 [${token}]입니다.`,
        sendNo: sender,
        recipientList: [{ internationalRecipientNo: phoneNum }],
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Secret-Key': XSecretKey,
        },
      },
    );
    return '전송 완료!';
  }
  
  checkValidationEmail({email}){
    if(email === undefined || !email.includes("@")){
      console.log("에러발생!! 이메일을 제대로 입력해 주세요!!!!")
      return false
    } else {
      return true
    }
  }


}
