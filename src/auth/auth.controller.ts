import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from '../users/user.interface';

@Controller('auth')
export class AuthController {
  private readonly authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }
  @Post('login')
  async login(@Body() playload: IUser): Promise<{ token: string }> {
    return await this.authService.login(playload);
  }

  @Post('register')
  async register(@Body() playload: IUser): Promise<IUser> {
    return await this.authService.register(playload);
  }
}
