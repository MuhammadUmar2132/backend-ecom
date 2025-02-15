import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
constructor(private readonly cartservice: OrderService) {}
    @Get(":productimage'")
    async finadAll( @Param('productimage') productimage: string,
    @Query() options: any, ){
      try {
        const products = await this.cartservice.findAll(productimage, options);
        if (products.length === 0) {
          return { message: 'No products found.' };  // Handle case where no products are found
        }
        return products;  // Return found products
      } catch (error) {
        console.error('Error finding products:', error);
        throw new Error('Failed to fetch products.');
      }    }
    @Get(":id")
    async findSingle(@Param(":id")id:number){
      await this.cartservice.findOne(id);
    }
    @Post()
      async createProduct(
       @Body() body: any,
        // @UploadedFile() file: Express.Multer.File,
      ) { 
        // console.log(file);  // Log the file object to check its structure
    
    //   if (!file || !file.buffer) {
    //     throw new Error('File buffer is undefined');
    //   }
        const { productname, productdescription,producimage, product_price,city,area,post, } = body;
        return this.cartservice.createproduct(
          productname,
          productdescription,
          producimage,
          product_price,          
          city,
          area,post
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
