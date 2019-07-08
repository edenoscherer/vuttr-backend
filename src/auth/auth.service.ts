import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { IUser } from 'src/users/user.interface';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserCredentiaisDto } from './userCredentiais.dto';
import { UserDto } from '../users/user.dto';

@Injectable()
export class AuthService {
  private readonly usersService: UsersService;
  private readonly jwtService: JwtService;

  constructor(usersService: UsersService, jwtService: JwtService) {
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  async login(credentiais: UserCredentiaisDto): Promise<{ token: string }> {
    const user = await this.usersService.findByEmail(credentiais.email);

    if (!user) {
      throw new UnauthorizedException();
    }
    const comparePassword = await bcrypt.compare(credentiais.password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      fulname: user.fullname,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  async register(credentiais: UserDto): Promise<IUser> {
    try {
      return await this.usersService.store(credentiais);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async validateUser(user: IUser): Promise<IUser> {
    try {
      return await this.usersService.findByEmail(user.email);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
