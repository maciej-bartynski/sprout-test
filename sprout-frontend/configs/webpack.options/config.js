require('dotenv').config()
const path = require('path');
const environmental = require('./environmental');
const loaders = require('./loaders');
const plugins = require('./plugins');

module.exports = {
    ...environmental,
    module: {
        rules: loaders
    },
    plugins,
    resolve: {
        alias: {
            src: path.resolve(process.env.PROJECT_ROOT_FOR_WEBPACK, 'src'),
            Components: path.resolve(process.env.PROJECT_ROOT_FOR_WEBPACK, 'src/Components'),
            RouteComponents: path.resolve(process.env.PROJECT_ROOT_FOR_WEBPACK, 'src/RouteComponents'),
        }
    },
}
