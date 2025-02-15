import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from './product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({ imports: [
  TypeOrmModule.forFeature([product]), MulterModule.register({
    dest: './products', // Ensure this directory exists or is created
  }), ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'products'),
    serveRoot: '/products',  // This will serve files under /uploads path
  })
],  // Register the 'student' repository here
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
