import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/upload/upload.config';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
@Get()
async finadAll(){
    const finduser= this.userService.findAll()
    if(finduser)
    {
    return finduser;  }  
      return"no found"
}

@Post()
@UseInterceptors(FileInterceptor('image',
  {storage: MulterConfigService.memoryStorageConfig()},))  
async createUser(
  @Body() body: any, // Capture other form data
  @UploadedFile() file: Express.Multer.File, // Capture the uploaded image
) {
  console.log(file);  // Log the file object to check its structure

  if (!file || !file.buffer) {
    throw new Error('File buffer is undefined');
  }
  const { name, email, phone, dob, password } = body;
  return this.userService.createuser(
    name,
    email,
    phone,
    dob,
    password,
    file, // Pass the uploaded image
  );
}
@Post('login') // Use a specific route for login
async loginuser(@Body() body: any) {
  const { email, password } = body;
  const user = await this.userService.findone(email, password);
  if (!user ) {
    throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
  }
  return user;
}
@Put(":id")
async updatedata(@Param('id')
id:number,
@Body() body: any, )
{
  const { name, email, phone, } = body;
return this.userService.updatename(id,name,phone,email)
}
@Delete(":Email")
async deleteuser(@Param('Email')email:string){
return this.userService.deleteuser(email)
}

}
