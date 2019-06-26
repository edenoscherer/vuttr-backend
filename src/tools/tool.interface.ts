import * as mongoose from 'mongoose';
import { ObjectID } from "bson";

export interface ITool extends mongoose.Document {
    id?: ObjectID;
    title: string;
    description?: string;
    link?: string;
    tags?: string[];
}