import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { user } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
@Module({imports: [
  TypeOrmModule.forFeature([user],),
  MulterModule.register({
    dest: './products', // Ensure this directory exists or is created
  }), 
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '30m' },
  }) // Register the 'student' repository here
],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
