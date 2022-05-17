import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

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
  //로그인된 사람의 정보를 가져다주는 api
  //restapi면 AuthGuard면 되는데 graphql이 가로 막고 있어서 더 필요함
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser111() {
    return '인증 통과!!';
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
}
