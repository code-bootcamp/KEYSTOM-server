import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly reviewRepository: Repository<Address>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne({ email }) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return await this.reviewRepository.findOne({
      where: { user: user },
      relations: ['user'],
    });
  }

  async findAll() {
    return await this.reviewRepository.find();
  }

  async create({ createAddressInput }) {
    const { email, ...address } = createAddressInput;
    const result1 = await this.userRepository.findOne({
      email: email,
    });
    const result2 = await this.reviewRepository.save({
      ...address,
      user: result1,
    });
    return result2;
  }
  async delete({ addressId }) {
    const result = await this.reviewRepository.softDelete({ id: addressId });
    return result.affected ? true : false;
  }
}
