import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../review/entities/review.entity';
import { ReviewImage } from './entities/reviewImage.entity';
import { ReivewImageResolver } from './reviewImage.resolver';
import { ReviewImageService } from './reviewImage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewImage, Review])],
  providers: [ReivewImageResolver, ReviewImageService],
})
export class ReviewImageModule {}
