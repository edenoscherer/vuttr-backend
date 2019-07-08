import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectID } from 'bson';
import { ITool } from './tool.interface';
import { ToolDto } from './tool.dto';

@Injectable()
export class ToolsService {
  private readonly toolSchema: Model<ITool>;

  constructor(@InjectModel('Tool') toolSchema: Model<ITool>) {
    this.toolSchema = toolSchema;
  }

  public async findAll(userId: string): Promise<ITool[]> {
    try {
      return await this.toolSchema.find({ user: userId }).populate('user');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async create(tool: ToolDto): Promise<ITool> {
    try {
      return await (await this.toolSchema.create(tool)).populate('user');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(tool: ToolDto): Promise<ITool> {
    try {
      return await (await this.toolSchema.findByIdAndUpdate(
        { _id: tool.id },
        tool,
        {
          new: true,
        },
      )).populate('user');
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
