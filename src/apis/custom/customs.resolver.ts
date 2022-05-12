import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QueryBuilder } from 'typeorm';
import { CustomService } from './customs.service';
import { CreateCustomInput } from './dto/createCustom.input';
import { Custom } from './entities/custom.entity';
@Resolver()
export class CustomResolver {
  constructor(private readonly customService: CustomService) {}
  @Query(() => [Custom])
  fetchCustoms() {
    return this.customService.findAll();
  }
  @Query(() => Custom)
  fetchCustom(@Args('customId') customId: string) {
    return this.customService.findOne({ customId });
  }
  @Mutation(() => Custom)
  createCustom(
    @Args('createCustomInput') createCustomInput: CreateCustomInput,
  ) {
    return this.customService.create({ createCustomInput });
  }
}
