import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CartService } from './cart.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/upload/upload.config';
import { cart } from './cart.entity';
@Controller('cart')
export class CartController {
    constructor(private readonly cartservice: CartService) {}
    @Get(':productimage')
    async findAll(
      @Param('productimage') productimage: string,
      @Query() options: any,  // Optional query parameters for filtering, sorting, etc.
    ) {
      try {
        const products = await this.cartservice.findAll(productimage, options);
        if (products.length === 0) {
          return { message: 'No products found.' };  // Handle case where no products are found
        }
        return products;  // Return found products
      } catch (error) {
        console.error('Error finding products:', error);
        throw new Error('Failed to fetch products.');
      }
    }
  
    
    @Get(":id")
    async findSingle(@Param(":id")id:number){
      await this.cartservice.findOne(id);
    }
    @Post()
     @UseInterceptors(FileInterceptor('image',
        {storage: MulterConfigService.memoryStorageConfig()},))  
      async createProduct(
       @Body() body: any,
        // @UploadedFile() file: Express.Multer.File,
      ) { 
        const { productname, productdescription, product_price,email } = body;
        return this.cartservice.createproduct(
          productname,
          productdescription,
          product_price,          
          email
        );
      }
    @Delete(":id")
    async deleteuser(@Param('id')id:number){
    
      const result = await this.cartservice.deleteProduct(id);
      if (!result) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Product deleted successfully' };
      
    }

}
