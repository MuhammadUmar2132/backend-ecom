import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './user.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user) private userRepository: Repository<user>, 
    private readonly jwtService: JwtService,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findone(Email: string, password: string) {
    const user = await this.userRepository.findOneBy({ Email: Email ,password:password });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password'); // User not found
    }
    if (password !== user.password) {
      throw new UnauthorizedException('Invalid email or password'); // Incorrect password
    }
    const { password: _, ...userWithoutPassword }= user; // Exclude password from the response
    // Generate JWT token
    const payload = { email: user.Email }; // Include email and user ID in the payload
    const token = this.jwtService.sign(payload); // Corrected to use sign() method
    return { ...userWithoutPassword, token };
  }
  async createuser(
    name: string,
    email: string,
    phone: number,
    dob: Date,
    password: string,
    file: Express.Multer.File, // Correct file type for uploaded image
  ) {
    // Ensure the file exists and save the image to a local path
    if (!file) {
      throw new Error('No file uploaded');
    }

    console.log('File:', file);  // Log to inspect file details

    if (!file.buffer || file.buffer.length === 0) {
      throw new Error('File buffer is empty or undefined');
    }
 const projectRoot = process.cwd();
    const uploadsDir = join(projectRoot, 'uploads');
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
    const imagePath = `/uploads/${uniqueFilename}`;
    // Create the user record
    const newUser = this.userRepository.create({
      name,
      Email: email,
      contact: phone,
      date: dob,
      password: password,
      image: imagePath,
    });
    return await this.userRepository.save(newUser);
  }
  async updatename(id: number, name: string, email: string, phone: number, ) {
    await this.userRepository.update({ id }, { name:name, Email: email, contact: phone});
  }
  async deleteuser(Email: string) {
    try {
      const result = await this.userRepository.delete({ Email });
      if (result.affected === 0) {
        throw new Error('No user found with the provided email.');
      }
      return 'User deleted successfully';
    } catch (error) {
      throw new Error(`Could not delete user: ${error.message}`);
    }
  }
}
