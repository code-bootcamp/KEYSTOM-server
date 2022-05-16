// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class ProductImageService {
//   constructor(
//     @InjectRepository(ProductImage)
//     private readonly productImageRepository: Repository<ProductImage>,
//   ) {}

//   async create({ createProductImageInput }){
//     return await this.productImageRepository.save({
//       ...createProductImageInput,
//     });
//   }
  
// }
