import * as mongoose from 'mongoose';

export const ToolSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    link: {
        type: String,
        required: false,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    tags: [{
        type: String,
        required: false,
        trim: true,
        lowercase: true,
    }],
}, { timestamps: true });
