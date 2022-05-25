import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { AddressService } from '../address/address.service';
import { Address } from '../address/entities/address.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/users.service';
import { SignUpResolver } from './signup.resolver';
import { SignUpService } from './signup.service';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User, Address]),
  ],
  providers: [
    SignUpResolver, //
    SignUpService,
    UserService,
    AddressService,
    JwtRefreshStrategy,
  ],
})
export class SignUpModule {}
