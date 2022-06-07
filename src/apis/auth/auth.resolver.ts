import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import {
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { IContext } from 'src/commons/types/context';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import * as jwt from 'jsonwebtoken';
import { CACHE_MANAGER, Inject, BadRequestException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UserService } from '../user/users.service';
import { Address } from '../address/entities/address.entity';
import { AddressService } from '../address/address.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly addressService: AddressService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: IContext,
  ) {
    const user = await this.userService.findOne({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다!!');
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated)
      throw new UnprocessableEntityException('암호가 틀렸습니다!!');

    this.authService.setRefreshToken({
      user,
      res: context.res,
    });
    const accessToken = this.authService.getAccessToken({ user });
    return accessToken;
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  async restoreAccessToken(@CurrentUser() currentUser: ICurrentUser) {
    const accessToken = this.authService.getAccessToken({ user: currentUser });
    return accessToken;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async logout(@Context() context: IContext) {
    //토큰 검증
    try {
      const accessToken = context.req.headers.authorization.split(' ')[1];
      const refreshToken = context.req.headers.cookie.split('refreshToken=')[1];

      if (!accessToken) throw new BadRequestException('잘못된 요청');
      if (!refreshToken) throw new BadRequestException('잘못된 요청');

      context.res.clearCookie('refreshToken', {
        path: '/',
        domain: '.delifarm.site',
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        maxAge: 0,
      });

      jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
      jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

      await this.cacheManager.set(
        `refreshToken:${refreshToken}`,
        `refreshToken`,
        {
          ttl: 3600,
        },
      );
      await this.cacheManager.set(`accessToken:${accessToken}`, 'accessToken', {
        ttl: 300,
      });
      return '로그아웃 성공!!';
    } catch (err) {
      console.log(err.message, '!!!');
      throw new UnauthorizedException('로그아웃 실패');
    }
  }
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Address)
  async fetchUserLoggedIn(@CurrentUser() currentUser: ICurrentUser) {
    const user = await this.addressService.findOne({ currentUser });
    console.log(user);
    return user;
  }
}
