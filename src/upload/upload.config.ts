import { Injectable } from '@nestjs/common';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class MulterConfigService {
  static memoryStorageConfig() {
    return memoryStorage(); // Using memory storage to store file in memory
  }
}
