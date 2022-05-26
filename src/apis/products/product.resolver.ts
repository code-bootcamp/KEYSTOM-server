import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UpdateProductInput } from './dto/updateProduct.input';
import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService, //
    private readonly elasticsearchService: ElasticsearchService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Product])
  async searchProducts(@Args('search') search: string) {
    const result = await this.elasticsearchService.search({
      index: 'myproduct',
      query: {
        match: {
          //myproduct안에 모든것 가지고 오기
          description: `${search}`,
        },
      },
    });
    console.log(JSON.stringify(result.hits.hits, null, '  ')); //null," "=> 깔끔하게 보기 위한거
  }
  @Query(() => [Product])
  async fetchProducts(@Args('page', { nullable: true }) page: number) {
    if (!page) page = 1;
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
