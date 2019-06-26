import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
    private readonly userSchema: Model<IUser>;

    constructor(@InjectModel('User') userSchema: Model<IUser>) {
        this.userSchema = userSchema;
    }

    async store(user: IUser): Promise<IUser> {
        try {
            const createdUser = await this.userSchema.create(user);
            createdUser.password = undefined;
            return createdUser;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findByEmail(email: string, showPassword = false): Promise<IUser> {
        try {
            return await this.userSchema.findOne({ email });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
