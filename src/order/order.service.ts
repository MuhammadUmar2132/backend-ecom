import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { order } from './order.entity';
@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(order) private productRepository: Repository<order>,
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
        productimage:string,
        price: number,
        City:string,
        area:string,
        street:string
        // file: Express.Multer.File,
      ) {
        const newProduct = this.productRepository.create({
          productname: Name,
          productdescription: description,
          productimage:productimage,
          product_price: price,
           city:City,
           area:area,
           post:street
        });
    
        return await this.productRepository.save(newProduct);
      }
    
      // Update product details
    //   async updateName(
    //     id: number,
    //     name: string,
    //     price: number,
    //     productdescription: string,
    //   ) {
    //     await this.productRepository.update(
    //       { id },
    //       {
    //         productname: name,
    //         product_price: price,
    //         productdescription: productdescription,
    //       },
    //     );
    //   }
    
      // Delete a product
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
