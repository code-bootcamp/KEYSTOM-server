import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressService } from '../address/address.service';
import { Address } from '../address/entities/address.entity';
import { CartProduct } from '../cart/entities/cartProduct.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<CartProduct>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    private readonly addressService: AddressService, //
  ) {}
  async findAll() {
    return await this.userRepository.find();
  }
  async findOne({ email }) {
    return await this.userRepository.findOne({ where: { email: email } });
  }
  async create({ bcryptUser }) {
    // const { cartProduct, password, ...user } = bcryptUser;
    const { password, address, ...user } = bcryptUser;
    const createAddressInput = { ...address, email: user.email };
    const user1 = await this.userRepository.findOne({ email: user.email });
    // const result1 = await this.cartProductRepository.save({
    //   ...cartProduct,
    // });
    if (user1) throw new ConflictException('이미 등록된 이메일 입니다');
    const result = await this.userRepository.save({
      ...user,
      password,
    });
    //주소도 저장하기
    const address1 = await this.addressService.create({ createAddressInput });
    return result;
  }
  async update({ email, updateUserInput }) {
    const user = await this.userRepository.findOne({ email: email });
    const newUser = { ...user, ...updateUserInput };
    const updateUser = await this.userRepository.save(newUser);
    return updateUser;
  }

  async delete({ email }) {
    const result = await this.userRepository.delete({ email });
    return result.affected ? true : false;
  }
}
