import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { UsedProduct } from './entities/usedProduct.entity';
import { UsedProductService } from './usedProduct.service';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CreateUsedProductInput } from './dto/createProduct.input';

@Resolver()
export class UsedProductResolver {
  constructor(
    private readonly usedProductService: UsedProductService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [UsedProduct])
  fetchUsedProducts() {
    return this.usedProductService.findAll();
  }
  @Query(() => UsedProduct)
  async fetchUsedProduct(
    @Args('usedProductId') usedProductId: string, //
  ) {
    return this.usedProductService.findOne({ usedProductId });
  }
  @Query(() => [UsedProduct])
  fetchBestUsedProduct() {
    return this.usedProductService.findBest();
  }

  @Query(() => Int)
  fetchUsedRowCount() {
    return this.usedProductService.findRowCount();
  }

  @Mutation(() => UsedProduct)
  async createUsedProduct(
    @Args('createUsedProductInput') createUsedProductInput: CreateUsedProductInput,
  ) {
    return this.usedProductService.create({ createUsedProductInput });
  }
  // @Mutation(() => UsedProduct)
  // async updateProduct(
  //   @Args('productId') productId: string,
  //   @Args('updateProductInput') updateProductInput: UpdateProductInput,
  // ) {
  //   this.usedProductService.delete({ productId });
  //   return this.usedProductService.update({ updateProductInput });
  // }

  @Mutation(() => String)
  deleteUsedProduct(@Args('usedProductId') usedProductId: string) {
    return this.usedProductService.delete({ usedProductId });
  }
}
