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
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UserService } from '../user/users.service';
import { User } from '../user/entities/user.entity';
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

  //test
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

  @Mutation(() => String)
  async logintest(
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
    const accessToken = this.authService.getTestToken({ user });
    return accessToken;
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  async restoreAccessToken(
    @CurrentUser() currentUser: ICurrentUser,
    // @Context() context: IContext,
  ) {
    // this.authService.setRefreshToken({ user, res: context.res });
    const accessToken = this.authService.getAccessToken({ user: currentUser });
    return accessToken;
    // return this.authService.getAccessToken({ user: currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async logout(@Context() context: IContext) {
    console.log(
      'accesstoken는',
      context.req.rawHeaders[13].replace('Bearer ', ''),
    );
    //accessToken
    const accessToken = context.req.rawHeaders[13].replace('Bearer ', '');
    console.log(
      'refreshtoken는',
      context.req.rawHeaders[context.req.rawHeaders.length - 1].replace(
        'refreshToken=',
        '',
      ),
    );
    //refreshToken
    const refreshToken = context.req.headers.cookie.replace(
      'refreshToken=',
      '',
    );
    // //토큰 검증
    try {
      const decoded1 = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
      const decoded2 = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
      console.log(decoded1, decoded2);
    } catch (err) {
      throw new UnauthorizedException('토큰 검증 실패!!');
    }
    //레디스에 저장
    try {
      await this.cacheManager.set(`accessToken:${accessToken}`, 'accessToken', {
        ttl: 300,
      });
      await this.cacheManager.set(
        `refreshToken:${refreshToken}`,
        `refreshToken`,
        {
          ttl: 300,
        },
      );
    } catch (err) {
      throw new UnauthorizedException('레디스 저장 실패');
    }
    // const res = context.res;
    // res.setHeader('Set-Cookie', `refreshToken=${0}; path=/;`);
    return '로그아웃 성공!!';
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Address)
  async fetchUserLoggedIn(@CurrentUser() currentUser: ICurrentUser) {
    const email = currentUser.email;
    const user = await this.addressService.findOne({ email });
    console.log('==============');
    console.log('==============');
    console.log('==============');
    console.log('==============');
    console.log('==============');
    console.log(user);
    return user;
  }
}
