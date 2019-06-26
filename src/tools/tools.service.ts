import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectID } from 'bson';
import { ITool } from './tool.interface';

@Injectable()
export class ToolsService {
    private readonly toolSchema: Model<ITool>;

    constructor(@InjectModel('Tool') toolSchema: Model<ITool>) {
        this.toolSchema = toolSchema;
    }

    public async findAll(): Promise<ITool[]> {
        try {
            return await this.toolSchema.find();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    public async create(tool: ITool): Promise<ITool> {
        try {
            return await this.toolSchema.create(tool);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    public async update(tool: ITool): Promise<ITool> {
        try {
            return await this.toolSchema.findByIdAndUpdate({ _id: tool.id }, tool, {
                new: true,
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    public async delete(toolId: ObjectID): Promise<ITool> {
        try {
            return await this.toolSchema.findByIdAndDelete({ _id: toolId });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
