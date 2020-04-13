const { model } = require('mongoose');

const schemas = {
    ...require('./User'),
    ...require('./Test')
};

const models = {}

for (const key in schemas) {
    models[key] = model(key, schemas[key])
}

module.exports = {
    ...models
}