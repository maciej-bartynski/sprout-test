import { Schema } from 'mongoose';
import { name as articleSchemaName } from 'database/models/Article/name';
const { ObjectId } = Schema;

export const creator = Object.freeze({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
        unique: true
    },
    content: {
        type: String,
        trim: true,
        required: true,
        maxlength: 1000
    },
    article: {
        type: ObjectId,
        ref: articleSchemaName,
        required: true
    }
});
