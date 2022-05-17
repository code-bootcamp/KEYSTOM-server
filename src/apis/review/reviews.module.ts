import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Review } from './entities/review.entity';
import { ReviewResolver } from './reviews.resolver';
import { ReviewService } from './reviews.service';
@Module({
  imports: [TypeOrmModule.forFeature([Review, Product,User])],
  providers: [ReviewResolver, ReviewService],
})
export class ReviewModule {}
