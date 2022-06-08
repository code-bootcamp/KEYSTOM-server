import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne({ currentUser }) {
    const user = await this.userRepository.findOne({
      where: { email: currentUser.email },
    });
    return await this.addressRepository.findOne({
      where: { user: user },
      relations: ['user'],
    });
  }

  async findAll() {
    return await this.addressRepository.find();
  }

  async create({ createAddressInput, currentUser }) {
    const address = createAddressInput;
    const user = await this.userRepository.findOne({
      email: currentUser.email,
    });
    const result = await this.addressRepository.save({
      ...address,
      user,
    });
    return result;
  }

  async update({ createAddressInput, currentUser }) {
    const user = await this.userRepository.findOne({
      email: currentUser.email,
    });
    const target = await this.addressRepository.find({ user });
    return this.addressRepository.save({
      ...target,
      ...createAddressInput,
    });
  }

  async delete({ addressId }) {
    const result = await this.addressRepository.softDelete({
      id: addressId,
    });
    return result.affected ? true : false;
  }
}
