import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { AuthModule } from '../auth/auth.module';
import { CartProductService } from '../cart/cartProduct.service';
import { CartProduct } from '../cart/entities/cartProduct.entity';
import { User } from './entities/user.entity';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, CartProduct])],
  providers: [
    JwtAccessStrategy,
    UserResolver, //
    UserService,
  ],
})
export class UserModule {}
