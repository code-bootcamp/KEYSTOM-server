import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../address/entities/address.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  async findAll() {
    return await this.userRepository.find();
  }
  async findOne({ email }) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async create({ createUserInput, hashedPassword }) {
    const { address, email, ...rest } = createUserInput;
    const user = await this.userRepository.findOne({ email });

    if (user) throw new ConflictException('이미 등록된 이메일 입니다');
    const result = await this.userRepository.save({
      email,
      ...rest,
      password: hashedPassword,
    });

    // 소셜로그인 시 주소를 받지 못하므로 null인 경우 처리!
    if (address) {
      const createAddressInput = { ...address, user: result };

      //주소 저장하기
      await this.addressRepository.save({ ...createAddressInput });
    }

    return result;
  }

  async update({ email, updateUserInput }) {
    const user = await this.userRepository.findOne({ email: email });
    const updateUser = await this.userRepository.save({
      ...user,
      ...updateUserInput,
    });
    return updateUser;
  }

  async delete({ email }) {
    const result = await this.userRepository.delete({ email });
    return result.affected ? true : false;
  }
}
