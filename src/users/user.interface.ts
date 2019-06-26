import * as mongoose from 'mongoose';
import { ObjectID } from 'bson';

export interface IUser extends mongoose.Document {
    id?: ObjectID;
    fullname?: string;
    email?: string;
    password?: string;
}
