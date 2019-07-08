import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from '../users/user.interface';
import { UserCredentiaisDto } from './userCredentiais.dto';
import { UserDto } from './../users/user.dto';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TokenResponse } from './ResponseTypes/TokenResponse';
import { ValidationErrorOptions } from '../shared/ValidadionErrosResponse';

@ApiUseTags('Vuttr')
@Controller('auth')
export class AuthController {
  private readonly authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('login')
  @ApiOperation({ title: 'Login na API' })
  @ApiResponse({
    status: 201,
    description: 'Acesso liberado',
    type: TokenResponse,
  })
  @ApiResponse(ValidationErrorOptions)
  async login(@Body() userCredentiaisDto: UserCredentiaisDto): Promise<{ token: string }> {
    return await this.authService.login(userCredentiaisDto);
  }

  @Post('register')
  @ApiOperation({ title: 'Cadastrar novo usuário' })
  @ApiResponse(ValidationErrorOptions)
  @ApiResponse({
    status: 201,
    description: 'Usuário cadastrado',
    type: UserDto,
  })
  async register(@Body() playload: UserDto): Promise<IUser> {
    return await this.authService.register(playload);
  }
}
