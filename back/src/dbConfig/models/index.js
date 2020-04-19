import User from './User';
import Test from './Test';
import { model } from 'mongoose';

const schemas = {
    ...User,
    ...Test
};

const models = {};

for (const key in schemas) {
    models[key] = model(key, schemas[key]);
}

export default {
    ...models
};
