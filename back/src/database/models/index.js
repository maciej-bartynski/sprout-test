import User from './User';
import Category from './Category';
import Article from './Article';
import Tag from './Tag';
import Comment from './Comment';
import { model } from 'mongoose';

const schemas = {
    ...User,
    ...Category,
    ...Article,
    ...Comment,
    ...Tag
};

const models = {};

for (const key in schemas) {
    models[key] = model(key, schemas[key]);
}

export default {
    ...models
};
