import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { user } from './user/user.entity';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';
import { store } from './store/store.entity';
import { product } from './product/product.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import {join} from 'path';
// import { AuthModule } from './auth/auth.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { cart } from './cart/cart.entity';
import { OrderModule } from './order/order.module';
import { order } from './order/order.entity';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'ecommerece',
    entities: [user,store,product,cart,order],
    synchronize: true,
  }),UserModule, ProductModule, StoreModule,
  ServeStaticModule.forRoot(
    {
      rootPath: join(__dirname, '..', 'uploads'), // Directory 1
      serveRoot: '/uploads',
    },
    {
      rootPath: join(__dirname, '..', 'products'), // Directory 2
      serveRoot: '/products',
    },
    {
      rootPath: join(__dirname, '..', 'stores'), // Directory 3
      serveRoot: '/stores',
    },
  ),
  AuthModule,
  CartModule,
  OrderModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}