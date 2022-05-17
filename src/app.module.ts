import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './apis/products/product.module';
import { CustomModule } from './apis/custom/customs.module';
import { ReviewModule } from './apis/review/reviews.module';
import { OrderModule } from './apis/order/orders.module';
import { PaymentModule } from './apis/payment/payments.module';
import { UserModule } from './apis/user/users.module';
import { AuthModule } from './apis/auth/auth.module';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { SignUpModule } from './apis/signup/signup.module';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import 'dotenv/config';
import { ProductImageModule } from './apis/productImage/productImage.module';
import { ReviewImageModule } from './apis/reviewImage/reviewImage.module';
import { CommentModule } from './apis/comments/comment.module';
import { CartProductModule } from './apis/cart/cartProduct.module';
import { UserCoupon } from './apis/UserCoupon/entities/userCoupon.entity';
import { Coupon } from './apis/coupon/entities/coupon.entity';
import { CouponModule } from './apis/coupon/coupon.module';

@Module({
  imports: [
    AuthModule,
    CartProductModule,
    CommentModule,
    CouponModule,
    CustomModule,
    OrderModule,
    PaymentModule,
    ProductImageModule,
    ProductModule,
    ReviewModule,
    ReviewImageModule,
    UserModule,
    UserCoupon,
    SignUpModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }), //이게 있어야 setheader가능하다
      cors: {
        credential: true,
        origin: [' http://localhost:3000', 'http://localhost:3000/signup'],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '10.51.0.4',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mydocker02',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
      retryAttempts: 20,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my-redis:6379',
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      ignoreEnvFile: true,
      isGlobal: true,
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
