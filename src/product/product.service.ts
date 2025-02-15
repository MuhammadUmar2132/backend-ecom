import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { product } from './product.entity';
import * as fs from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(product) private productRepository: Repository<product>,
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
        throw new Error("Product with this id doesn't exist.");
    }

    return product;
}


  // Create a new product with an image upload
  async createproduct(
    Name: string,
    description: string,
    price: number,
    date: Date,
    store: string,
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    console.log('File:', file); // Log to inspect file details
    if (!file.buffer || file.buffer.length === 0) {
      throw new Error('File buffer is empty or undefined');
    }
    // Resolve uploads directory in the project root folder
    const projectRoot = process.cwd(); // Gets the root directory of the project
    const uploadsDir = join(projectRoot, 'products'); // Save images in the "products" folder

    console.log('Uploads Directory:', uploadsDir); // Debugging the directory

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Use UUID for a unique filename
    const uniqueFilename = `${uuidv4()}_${file.originalname}`;
    const targetPath = join(uploadsDir, uniqueFilename);

    try {
      // Write the file to the file system
      fs.writeFileSync(targetPath, file.buffer);
      console.log('File successfully saved at:', targetPath); // Log success
    } catch (error) {
      console.error('Error saving file:', error);
      throw new Error('Error saving file');
    }

    const imagePath = `/products/${uniqueFilename}`; // URL to access the image

    // Save product in DB
    const newProduct = this.productRepository.create({
      productname: Name,
      productdescription: description,
      product_price: price,
      storename: store,
      date: date,
      productimage: imagePath, // Store relative path in DB
    });

    return await this.productRepository.save(newProduct);
  }

  // Update product details
  async updateName(
    id: number,
    name: string,
    price: number,
    productdescription: string,
  ) {
    await this.productRepository.update(
      { id },
      {
        productname: name,
        product_price: price,
        productdescription: productdescription,
      },
    );
  }

  // Delete a product
  async deleteProduct(id:number) {
    try {
      const result = await this.productRepository.delete({ id });
      if (result.affected === 0) {
        throw new Error('No product found with the provided id.');
      }
      return 'Product deleted successfully';
    } catch (error) {
      throw new Error(`Could not delete product: ${error.message}`);
    }
  }
}
