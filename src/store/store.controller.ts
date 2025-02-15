import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/upload/upload.config';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  async findAll() {
    return await this.storeService.findAll();
  }
  @Post()
  @UseInterceptors(FileInterceptor('image',
    {storage: MulterConfigService.memoryStorageConfig()},)) 
  async createStore(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) { 
    console.log(file);  // Log the file object to check its structure

  if (!file || !file.buffer) {
    throw new Error('File buffer is undefined');
  }
    const { storename, email,contact,date,address,} = body;
    return this.storeService.createstore(
      storename,
      email,
      contact,
      date,
      address,
    file
    );
  }

  @Put(':id')
  async updateStore(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const { name, phone, image } = body;
    return await this.storeService.updateStore(+id, name, phone, image);
  }

  @Delete(':id')
  async deleteStore(@Param('id') id: string) {
    return await this.storeService.deleteStore(id);
  }
}
