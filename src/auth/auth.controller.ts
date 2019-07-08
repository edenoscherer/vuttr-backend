import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from '../users/user.interface';
import { UserCredentiaisDto } from './userCredentiais.dto';
import { UserDto } from './../users/user.dto';

@Controller('auth')
export class AuthController {
  private readonly authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }
  @Post('login')
  async login(@Body() userCredentiaisDto: UserCredentiaisDto): Promise<{ token: string }> {
    return await this.authService.login(userCredentiaisDto);
  }

  @Post('register')
  async register(@Body() playload: UserDto): Promise<IUser> {
    return await this.authService.register(playload);
  }
}
