import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QueryBuilder } from 'typeorm';
import { CartProductService } from './cartProduct.service';
import { CreateCartProdcutInput } from './dto/createCartProduct.input';
import { CartProduct } from './entities/cartProduct.entity';
@Resolver()
export class CartProductResolver {
  constructor(private readonly cartProductService: CartProductService) {}

  @Query(() => [CartProduct])
  fetchCartProducts() {
    return this.cartProductService.findAll();
  }

  @Query(() => CartProduct)
  fetchCartProduct(@Args('cartProductId') cartProductId: string) {
    return this.cartProductService.findOne({ cartProductId });
  }

  @Mutation(() => CartProduct)
  createCartProduct(
    @Args('createCartProductInput')
    createCartProductInput: CreateCartProdcutInput,
  ) {
    return this.cartProductService.create({ createCartProductInput });
  }
}
