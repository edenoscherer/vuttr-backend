import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitQuery, ApiBearerAuth, ApiImplicitParam } from '@nestjs/swagger';
import { ITool } from './tool.interface';
import { ToolsService } from './tools.service';
import { User } from '../users/user.decorator';
import { IUser } from '../users/user.interface';
import { ToolDto } from './tool.dto';
import { ValidationErrorOptions } from '../shared/ValidadionErrosResponse';

@ApiUseTags('Vuttr')
@Controller('tools')
export class ToolsController {
  private readonly toolsService: ToolsService;

  constructor(toolsService: ToolsService) {
    this.toolsService = toolsService;
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ title: 'Lista de ferramentas.' })
  @ApiResponse({
    status: 200,
    type: [ToolDto],
  })
  async index(@Query('tag') tag: string, @User() user: IUser): Promise<ITool[]> {
    return await this.toolsService.findAll(user.id, tag);
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ title: 'Criar nova ferramenta.' })
  @ApiResponse({
    status: 200,
    type: [ToolDto],
  })
  @ApiResponse(ValidationErrorOptions)
  @ApiImplicitQuery({
    name: 'tag',
    type: String,
    required: false,
  })
  async create(@Body() tool: ToolDto, @User() user: IUser): Promise<ITool> {
    tool.user = user._id;
    return await this.toolsService.create(tool);
  }

  @Put()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ title: 'Atualizar ferramenta.' })
  @ApiResponse({
    status: 200,
    type: [ToolDto],
  })
  @ApiResponse(ValidationErrorOptions)
  async update(@Body() tool: ToolDto, @User() user: IUser): Promise<ITool> {
    tool.user = user;
    return await this.toolsService.update(tool);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ title: 'Remover ferramenta.' })
  @ApiImplicitParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    type: [ToolDto],
  })
  async delete(@Param() params, @User() user: IUser): Promise<ITool> {
    return await this.toolsService.delete(params.id, user.id);
  }
}
