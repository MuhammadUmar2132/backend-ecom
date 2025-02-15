import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cart } from './cart.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    TypeOrmModule.forFeature([cart]), MulterModule.register({
      dest: './carts', // Ensure this directory exists or is created
    }), ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'carts'),
      serveRoot: '/carts',  // This will serve files under /uploads path
    })
  ],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}