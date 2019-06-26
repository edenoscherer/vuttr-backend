import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { ITool } from './tool.interface';
import { ToolsService } from './tools.service';

@Controller('tools')
export class ToolsController {
    private readonly toolsService: ToolsService;

    constructor(toolsService: ToolsService) {
        this.toolsService = toolsService;
    }

    @Get()
    async index(): Promise<ITool[]> {
        return await this.toolsService.findAll();
    }

    @Post()
    async create(@Body() tool: ITool): Promise<ITool> {
        return await this.toolsService.create(tool);
    }

    @Put()
    async update(@Body() tool: ITool): Promise<ITool> {
        return await this.toolsService.update(tool);
    }

    @Delete(':id')
    async delete(@Param() params): Promise<ITool> {
        return await this.toolsService.delete(params.id);
    }
}
