import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UpdateProductInput } from './dto/updateProduct.input';
import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Product])
  fetchProducts(
    @Args('page', { nullable: true }) page: number, //
  ) {
    if (!page || page <= 0) page = 1;
    return this.productService.findAll({ page });
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.findOne({ productId });
  }

  @Query(() => [ProductImage])
  async fetchProductImages(@Args('productId') productId: string) {
    return this.productService.findImage({ productId });
  }

  @Query(() => [Product])
  fetchBestProduct() {
    return this.productService.findBest();
  }

  @Query(() => Int)
  fetchProductRowCount() {
    return this.productService.findCount();
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create({ ...createProductInput });
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update({ ...updateProductInput }, productId);
  }

  @Mutation(() => String)
  deleteProduct(@Args('productId') productId: string) {
    return this.productService.delete({ productId });
  }
}
