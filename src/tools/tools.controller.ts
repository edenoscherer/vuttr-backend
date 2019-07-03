import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ITool } from './tool.interface';
import { ToolsService } from './tools.service';
import { User } from '../users/user.decorator';
import { IUser } from '../users/user.interface';

@Controller('tools')
export class ToolsController {
  private readonly toolsService: ToolsService;

  constructor(toolsService: ToolsService) {
    this.toolsService = toolsService;
  }

  @Get()
  @UseGuards(AuthGuard())
  async index(@User() user: IUser): Promise<ITool[]> {
    return await this.toolsService.findAll(user.id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() tool: ITool, @User() user: IUser): Promise<ITool> {
    tool.user = user;
    return await this.toolsService.create(tool);
  }

  @Put()
  @UseGuards(AuthGuard())
  async update(@Body() tool: ITool, @User() user: IUser): Promise<ITool> {
    tool.user = user;
    return await this.toolsService.update(tool);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async delete(@Param() params): Promise<ITool> {
    return await this.toolsService.delete(params.id);
  }
}
