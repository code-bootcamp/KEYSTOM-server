import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddressService } from './address.service';
import { CreateAddressInput } from './dto/createAddress.input';
import { Address } from './entities/address.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Address)
  fetchUserAddress(@CurrentUser() currentUser: ICurrentUser) {
    return this.addressService.findOne({ currentUser });
  }

  @Query(() => [Address])
  fetchAddresses() {
    return this.addressService.findAll();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Address)
  createAddress(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
  ) {
    return this.addressService.create({ createAddressInput, currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Address)
  updateAddress(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
  ) {
    return this.addressService.update({ createAddressInput, currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  deleteAddress(@Args('addressId') addressId: string) {
    return this.addressService.delete({ addressId });
  }
}
