import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findAll() {
    return await this.userRepository.find();
  }
  async findOne({ email }) {
    return await this.userRepository.findOne({ where: { email: email } });
  }
  async create({ bcryptUser }) {
    const { password, ...user } = bcryptUser;
    const user1 = await this.userRepository.findOne({ email: user.email });
    if (user1) throw new ConflictException('이미 등록된 이메일 입니다');
    const result = await this.userRepository.save({
      ...user,
      password,
    });
    return result;
  }
  async update({ email, updateUserInput }) {
    const user = await this.userRepository.findOne({ email: email });
    const newUser = { ...user, ...updateUserInput };
    const updateUser = await this.userRepository.save(newUser);
    return updateUser;
  }

  async delete({ nickName }) {
    const result = await this.userRepository.delete({ nickName });
    return result.affected ? true : false;
  }
}