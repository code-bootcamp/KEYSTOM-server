import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Address } from './entities/address.entity';
import { UpdateAddressInput } from './dto/updateAddress.input';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne({ email }) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return await this.addressRepository.findOne({
      where: { user: user },
      relations: ['user'],
    });
  }

  async findAll() {
    return await this.addressRepository.find();
  }

  async create({ createAddressInput }) {
    const { email, ...address } = createAddressInput;
    const user = await this.userRepository.findOne({
      email,
    });
    const result2 = await this.addressRepository.save({
      ...address,
      user,
    });
    return result2;
  }

  async update({ updateAddressInput }) {
    const { email, ...rest } = updateAddressInput;

    const user = await this.userRepository.findOne({ email });
    const target = await this.addressRepository.find({ user });
    return this.addressRepository.save({
      ...target,
      ...rest,
    });
  }
  async delete({ addressId }) {
    const result = await this.addressRepository.softDelete({ id: addressId });
    return result.affected ? true : false;
  }
}
