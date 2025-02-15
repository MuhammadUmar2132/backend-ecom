import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { store } from './store.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([store])  // Register the 'student' repository here
  ],
  providers: [StoreService],
  controllers: [StoreController]
})
export class StoreModule {}
