import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/core/guards/local-auth.guard';

import { UserLoginOutput } from './interface/LoginOutputInterface';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { UserLoginDto } from './dto/UserLoginDto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // login
  @UseGuards(LocalAuthGuard) //for authenticating for login(//email|userName,password)
  @Post('login')
  async login(@Body() body: UserLoginDto): Promise<UserLoginOutput> {
    return this.authService.login(body);
  }

  // local register
  @Post('signup')
  async register(@Body() userRegisterDto: UserRegisterDto): Promise<string> {
    console.log(
      'AuthController -> constructor -> createUserDto',
      userRegisterDto,
    );
    return this.authService.register(userRegisterDto);
  }
}
