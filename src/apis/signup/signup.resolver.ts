import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignUpService } from './signup.service';
import * as bcrypt from 'bcrypt';
import {
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { IContext } from 'src/commons/types/context';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import * as jwt from 'jsonwebtoken';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UserService } from '../user/users.service';
import axios from 'axios';
import dotenv from 'dotenv'

@Resolver()
export class SignUpResolver {
  constructor(
    private readonly singUpService: SignUpService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  @Mutation(() => String)
  async signUp(@Args('phone') phone: string) {
    const phoneNum = phone;
    //휴대폰 자릿수 맞는지 확인하기
    const isValid = this.singUpService.checkValidationPhone({ phoneNum });
    if (isValid) {
      //핸드폰 토큰 6자리 만들기
      const token = this.singUpService.getToken();
      //핸드폰번호에 토큰 전송하기
      return this.singUpService.sendTokenToSMS({ phoneNum, token });
    }
  }
}
