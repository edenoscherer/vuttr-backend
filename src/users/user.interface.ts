import * as mongoose from 'mongoose';
import { ObjectID } from 'bson';

export interface IUser extends mongoose.Document {
  readonly id?: string;
  fullname: string;
  email: string;
  password: string;
}
