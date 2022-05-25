import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Review } from './entities/review.entity';
import { ReviewResolver } from './reviews.resolver';
import { ReviewImage } from '../reviewImage/entities/reviewImage.entity';
import { ReviewService } from './reviews.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Product, User, Order, ReviewImage]),
  ],
  providers: [ReviewResolver, ReviewService],
})
export class ReviewModule {}
