import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { get } from 'mongoose';
import { async } from 'rxjs/internal/scheduler/async';
import { IUser } from './user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    private readonly usersService: UsersService;

    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    @Get()
    async index(@Query() params: {email: string}){
        return await this.usersService.findByEmail(params.email);
    }

    @Post()
    async create(@Body() user: IUser) {
        return this.usersService.store(user);
    }
}
