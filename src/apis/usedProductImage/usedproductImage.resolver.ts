import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsedProductImage } from './entities/usedproductImage.entity';
import {UsedProductImageService } from './usedproductImage.service';

@Resolver()
export class UsedProductImageResolver {
  constructor(private readonly usedproductImageService: UsedProductImageService) {}
  @Query(() => [UsedProductImage])
  fetchUsedProductImages() {
    return this.usedproductImageService.findAll();
  }
  @Query(() => UsedProductImage)
  fetchUsedProductImage(@Args('usedProductImageId') usedProductImageId: string) {
    return this.usedproductImageService.findOne({ usedProductImageId });
  }
  @Mutation(() => UsedProductImage)
  createUsedProductImage(
    @Args('usedProductImageUrl') usedProductImageUrl: string,
    @Args('usedProductId') usedProductId: string,
    @Args('isThumbnail') isThumbnail: boolean
  ) {
    return this.usedproductImageService.create({ usedProductImageUrl,usedProductId,isThumbnail });
  }
}
