import User from './User';
import Test from './Test';

const { model } = require('mongoose');

const schemas = {
    ...User,
    ...Test
};

const models = {}

for (const key in schemas) {
    models[key] = model(key, schemas[key])
}

export default {
    ...models
}