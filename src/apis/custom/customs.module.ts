import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { CustomResolver } from './customs.resolver';
import { CustomService } from './customs.service';
import { Custom } from './entities/custom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Custom, Product])],
  providers: [CustomResolver, CustomService],
})
export class CustomModule {}
