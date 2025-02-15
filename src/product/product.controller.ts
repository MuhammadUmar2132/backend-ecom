import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfigService } from '../upload/upload.config';
import { AuthGuard } from 'src/user/auth.gaurd';
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
@UseGuards(AuthGuard)
    @Get()
async finadAll(){
    const findproduct= this.productService.findAll()
    if(findproduct)
    {
    return findproduct;  }  
      return"no found"
}

@Get(":id")
async findSingle(@Param(":id")id:number){
  await this.productService.findOne(id);
}


@Post()
 @UseInterceptors(FileInterceptor('image',
    {storage: MulterConfigService.memoryStorageConfig()},))  
  async createProduct(
   @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) { 
    console.log(file);  // Log the file object to check its structure

  if (!file || !file.buffer) {
    throw new Error('File buffer is undefined');
  }
    const { productname, productdescription, product_price, date, storename, } = body;
    return this.productService.createproduct(
      productname,
      productdescription,
      product_price,
      date,
      storename,
      file
    );
  }
  @Put(":id")
async updatedata(@Param(':id')
id:number,@Body('productname')name:string,@Body('productdescription') description:string,@Body('product_price') price:number, @Body('productimage') photo:string)
{
return this.productService.updateName(id,name
    ,price
    ,description
    )
}
@Delete(":id")
async deleteuser(@Param('id')id:number){

  const result = await this.productService.deleteProduct(id);
  if (!result) {
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }
  return { message: 'Product deleted successfully' };
  
}
}