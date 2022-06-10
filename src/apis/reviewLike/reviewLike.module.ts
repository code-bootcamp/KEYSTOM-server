import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../review/entities/review.entity';
import { User } from '../user/entities/user.entity';

import { ReviewLike } from './entities/reviewLike.entity';
import { ReviewLikeResolver } from './reviewLike.resolver';
import { ReviewLikeService } from './reviewLike.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewLike, Review, User])],
  providers: [ReviewLikeResolver, ReviewLikeService],
})
export class ReviewLikeModule {}
