import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from 'src/commons/auth/jwt-social-google.strategy';
import { JwtKakaoStrategy } from 'src/commons/auth/jwt-social-kakao.strategy';
import { JwtNaverStrategy } from 'src/commons/auth/jwt-social-naver.strategy';
import { AddressService } from '../address/address.service';
import { Address } from '../address/entities/address.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/users.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserCoupon } from '../UserCoupon/entities/userCoupon.entity';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User, Address, UserCoupon]),
  ],
  providers: [
    AuthResolver, //
    AuthService,
    UserService,
    AddressService,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtNaverStrategy,
    JwtKakaoStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
