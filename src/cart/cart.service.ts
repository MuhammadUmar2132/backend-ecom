import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { cart } from './cart.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CartService {
    constructor(
        @InjectRepository(cart) private productRepository: Repository<cart>,
      ) {}
    
      async findAll(productimage: string, options?: any) {
        return await this.productRepository.find({
          where: { productimage },
          ...options, // Optionally pass extra query options like relations, order, etc.
        });
      }
    
      async findOne(id: number) {
        const product = await this.productRepository.findOneBy({ id });
    
        if (!product) {
            throw new Error("Product with this id doesn't exist.");
        }
    
        return product;
    }
    
    
      // Create a new product with an image upload
      async createproduct(
        Name: string,
        description: string,
        price: number,
        email:string
      ) {
        const newProduct = this.productRepository.create({
          productname: Name,
          productdescription: description,
          product_price: price,
          productimage: email, // Store relative path in DB
        });
    
        return await this.productRepository.save(newProduct);
      }
       async deleteProduct(id:number) {
        try {
          const result = await this.productRepository.delete({ id });
          if (result.affected === 0) {
            throw new Error('No product found with the provided id.');
          }
          return 'Product deleted successfully';
        } catch (error) {
          throw new Error(`Could not delete product: ${error.message}`);
        }
      }

}
