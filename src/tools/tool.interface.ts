import * as mongoose from 'mongoose';
import { ObjectID } from 'bson';
import { IUser } from '../users/user.interface';

export interface ITool extends mongoose.Document {
  readonly id?: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  user: IUser;
}
