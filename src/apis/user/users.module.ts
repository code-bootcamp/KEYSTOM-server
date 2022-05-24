import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { AddressService } from '../address/address.service';
import { Address } from '../address/entities/address.entity';
import { AuthModule } from '../auth/auth.module';
import { CartProductService } from '../cart/cartProduct.service';
import { CartProduct } from '../cart/entities/cartProduct.entity';
import { User } from './entities/user.entity';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, CartProduct, Address])],
  providers: [
    JwtAccessStrategy,
    UserResolver, //
    UserService,
    AddressService,
  ],
})
export class UserModule {}
