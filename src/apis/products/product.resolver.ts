import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

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
  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    // //캐시 매니저 연습
    // await this.cacheManager.set('aaa', createProductInput, {
    //   ttl: 0,
    // });
    // const mycache = await this.cacheManager.get('aaa')
    // console.log(mycache)
    // return '캐시 테스트중!'
    return this.productService.create({ createProductInput });
  }
}
