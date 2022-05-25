import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { AddressService } from '../address/address.service';
import { Address } from '../address/entities/address.entity';
import { User } from './entities/user.entity';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';
import { UserCoupon } from '../UserCoupon/entities/userCoupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, UserCoupon])],
  providers: [
    JwtAccessStrategy,
    UserResolver, //
    UserService,
    AddressService,
  ],
})
export class UserModule {}
