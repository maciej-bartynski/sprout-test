import { Schema } from 'mongoose';
import { name as categorySchemaName } from 'database/models/Category/name';
import { name as userSchemaName } from 'database/models/User/name';
import { name as tagSchemaName } from 'database/models/Tag/name';
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
        maxlength: 10000
    },
    category: {
        type: ObjectId,
        ref: categorySchemaName,
        required: true
    },
    author: {
        type: ObjectId,
        ref: userSchemaName,
        required: true
    },
    tags: [
        {
            type: ObjectId,
            ref: tagSchemaName
        }
    ]
});
