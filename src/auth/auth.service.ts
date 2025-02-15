import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'; // JWT service to generate tokens

@Injectable()
export class AuthService {
  // constructor(
  //   private readonly usersService: UserService,
  //   private readonly jwtService: JwtService,   ) {}
  // // Sign-in method to validate user and return JWT
  // async signin(email: string, password: string) {
  //   // Retrieve the user using the UserService
  //   const user = await this.usersService.findone(email, password); // Ensure correct method name
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid email or password'); // User not found
  //   }
  //   // Compare plain-text passwords
  //   if ( password!==user.token ) {
  //     throw new UnauthorizedException('Invalid email or password'); // Incorrect password
  //   }
  //   const { token: _, ...userWithoutPassword } = user; // Exclude password from the response
  //   // Generate JWT token
  //   const payload = { email: user.Email, sub: user.id }; // Include email and user ID in the payload
  //   const token = this.jwtService.sign(payload); // Sign the JWT token
  //   // Return user data along with the JWT token
  //   return { ...userWithoutPassword, token };
  }

