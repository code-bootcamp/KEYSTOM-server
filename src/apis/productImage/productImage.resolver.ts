import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductImage } from './entities/productImage.entity';
import { ProductImageService } from './productImage.service';

@Resolver()
export class ProductImageResolver {
  constructor(private readonly productImageService: ProductImageService) {}
  @Query(() => [ProductImage])
  fetchProductImages() {
    return this.productImageService.findAll();
  }

  @Query(() => ProductImage)
  fetchProductImage(@Args('productImageId') productImageId: string) {
    return this.productImageService.findOne({ productImageId });
  }

  @Mutation(() => ProductImage)
  createProductImage(
    @Args('productImageUrl') productImageUrl: string,
    @Args('isThumbnail') isThumbnail: boolean,
    @Args('productId') productId: string,
  ) {
    return this.productImageService.create({
      productImageUrl,
      productId,
      isThumbnail,
    });
  }
}
