import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { QueryBuilder } from 'typeorm';
import { AddressService } from './address.service';
import { CreateAddressInput } from './dto/createAddress.input';
import { Address } from './entities/address.entity';

@Resolver()
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Query(() => Address)
  fetchUserAddress(@Args('email') email: string) {
    return this.addressService.findOne({ email });
  }

  @Query(() => [Address])
  fetchAddresses() {
    return this.addressService.findAll();
  }

  @Mutation(() => Address)
  createAddress(
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
  ) {
    return this.addressService.create({ createAddressInput });
  }

  @Mutation(() => String)
  deleteAddress(@Args('addressId') addressId: string) {
    return this.addressService.delete({ addressId });
  }
}
