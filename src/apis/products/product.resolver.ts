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
  async searchProducts(
    @Args('search', { nullable: true }) search: string,
    @Args('price', { nullable: true }) price: number,
  ) {
    //1.레디스에 캐시 되어있는지 확인하기

    //2.레디스에 캐시 되어있지 않다면 엘라스틱서치에서 조화하기(우저가 검색한 검색어로 조회하기)
    if (price === undefined) {
      const searchString = await this.productService.findString({ search });
      return searchString;
    } else {
      const searchPrice = await this.productService.findPrice({ price });
      console.log("-------------")
      console.log(searchPrice);
      return searchPrice;
    }

    //3.엘라스틱에서 조회결과가 있다면 ,레디스에 검색결과 캐싱해놓기

    //4.최종결과 브라우제에 리턴해주기
  }
  @Query(() => [Product])
  async fetchProducts(
    @Args('page', { nullable: true }) page: number, //
  ) {
    if (!page || page <= 0) page = 1;

    return await this.productService.findAll({ page });
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

  // @Query(() => [Product])
  // fetchBestProduct() {
  //   return this.productService.findBest();
  // }

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
