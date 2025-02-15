import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { store } from './store.entity'; // Updated to PascalCase
import { join } from 'path';
// import { fstat } from 'fs';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { emit } from 'process';


@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(store)
    private readonly storeRepository: Repository<store>,
  ) {}

  async findAll() {
    try {
      const stores = await this.storeRepository.find();
      return stores;
    } catch (error) {
      throw new Error(`Could not retrieve stores: ${error.message}`);
    }
  }
  async createstore(
    Name: string,
    Email: string,
    contact: number,
    date: Date,
    address: string,
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    console.log('File:', file);  // Log to inspect file details
    if (!file.buffer || file.buffer.length === 0) {
      throw new Error('File buffer is empty or undefined');
    }
    const projectRoot = process.cwd()
    const uploadsDir = join(projectRoot, 'stores');
    console.log('Uploads Directory:', uploadsDir);  // Debugging the directory

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Use UUID for a unique filename
    const uniqueFilename = `${uuidv4()}_${file.originalname}`;
    const targetPath = join(uploadsDir, uniqueFilename);

    try {
      // Write the file to the file system
      fs.writeFileSync(targetPath, file.buffer);
      console.log('File successfully saved at:', targetPath);  // Log success
    } catch (error) {
      console.error('Error saving file:', error);
      throw new Error('Error saving file');
    }
    const imagePath = `/stores/${uniqueFilename}`;  // URL to access the image; 
    const newstore= this.storeRepository.create({
      storename: Name,
      Email: Email,
      contact: contact,
      date: date,
      address: address,
      image: imagePath,  // Store relative path in DB
    });
    return await this.storeRepository.save(newstore);
  }
  async updateStore(
    id: number,
    name: string,
    phone: number,
    image: string,
  ){
    try {
      const result = await this.storeRepository.update(
        { id },
        { storename: name, contact: phone, image },
      );

      if (result.affected === 0) {
        throw new NotFoundException(`No store found with ID: ${id}`);
      }

      return 'Store updated successfully';
    } catch (error) {
      throw new Error(`Could not update store: ${error.message}`);
    }
  }

  async deleteStore(email: string): Promise<string> {
    try {
      const result = await this.storeRepository.delete({ Email: email });

      if (result.affected === 0) {
        throw new NotFoundException(
          `No store found with the provided email: ${email}`,
        );
      }

      return 'Store deleted successfully';
    } catch (error) {
      throw new Error(`Could not delete store: ${error.message}`);
    }
  }
}