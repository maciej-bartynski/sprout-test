require('dotenv').config()
const path = require('path');
const environmental = require('./environmental');
const loaders = require('./loaders');
const plugins = require('./plugins');

const rootDir = path.join(__dirname, "../..");

module.exports = {
    ...environmental,
    module: {
        rules: loaders
    },
    plugins,
    resolve: {
        alias: {
            src: path.resolve(rootDir, 'src'),
            Components: path.resolve(rootDir, 'src/Components'),
            RouteComponents: path.resolve(rootDir, 'src/RouteComponents'),
        }
    },
}
