import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from './apis/productsCategory/productCategory.module';
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
import { CouponModule } from './apis/coupon/coupon.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    CouponModule,
    CustomModule,
    OrderModule,
    PaymentModule,
    ProductCategoryModule,
    ProductModule,
    ReviewModule,
    UserModule,
    SignUpModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }), //이게 있어야 setheader가능하다
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my-database',
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
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
