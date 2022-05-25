import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/updateUserInput';
import { UserCoupon } from '../UserCoupon/entities/userCoupon.entity';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}
  @Query(() => [User])
  fetchUsers() {
    return this.userService.findAll();
  }
  @Query(() => User)
  fetchUser(
    @Args('email') email: string, //
  ) {
    return this.userService.findOne({ email });
  }

  @Query(() => [UserCoupon])
  fetchUserCoupons(
    @Args('email') email: string, //
  ) {
    return this.userService.findCoupons({ email });
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const bcryptUser = {
      ...createUserInput,
      password: hashedPassword,
    };
    return this.userService.create({
      bcryptUser,
    });
  }

  @Mutation(() => String)
  deleteUser(@Args('email') email: string) {
    return this.userService.delete({ email });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('email') email: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update({ email, updateUserInput });
  }
}
