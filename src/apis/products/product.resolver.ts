import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UpdateProductInput } from './dto/updateProduct.input';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Product])
  fetchProducts() {
    return this.productService.findAll();
  }
  @Query(() => Product)
  async fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.findOne({ productId });
  }
  @Query(() => [Product])
  fetchBestProduct() {
    return this.productService.findBest();
  }

  @Query(() => Int)
  fetchRowCount() {
    return this.productService.findRowCount();
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create({ createProductInput });
  }
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    this.productService.delete({ productId });
    return this.productService.update({ updateProductInput });
  }

  @Mutation(() => String)
  deleteProduct(@Args('productId') productId: string) {
    return this.productService.delete({ productId });
  }
}
