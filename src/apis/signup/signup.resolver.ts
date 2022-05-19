import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignUpService } from './signup.service';
import { UnprocessableEntityException } from '@nestjs/common';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UserService } from '../user/users.service';

@Resolver()
export class SignUpResolver {
  constructor(
    private readonly singUpService: SignUpService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async sendToken(@Args('phone') phone: string) {
    const phoneNum = phone;
    //휴대폰 자릿수 맞는지 확인하기
    const isValid = this.singUpService.checkValidationPhone({ phoneNum });
    if (isValid) {
      //핸드폰 토큰 6자리 만들기
      const token = this.singUpService.getToken();
      //토큰 레디스에 저장
      const tokenCache = await this.cacheManager.get(`token:${token}`);
      if (tokenCache) return tokenCache;
      await this.cacheManager.set(`token:${token}`, token, { ttl: 300 });
      //핸드폰번호에 토큰 전송하기
      return this.singUpService.sendTokenToSMS({ phoneNum, token });
    }
  }
  @Mutation(() => String)
  async checkToken(@Args('token') token: string) {
    const tokenCache = await this.cacheManager.get(`token:${token}`);
    return tokenCache ? '인증이 완료 되었습니다!' : '잘못된 토큰 정보입니다';
  }

  @Mutation(() => Boolean)
  async checkEmail(@Args('email') email: string) {
    const isValid = this.singUpService.checkValidationEmail({ email });
    if (isValid) {
      const user = await this.userService.findOne({ email });
      if (user) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new UnprocessableEntityException(
        '에러발생!! 이메일을 제대로 입력해 주세요!!!!',
      );
    }
  }
}
