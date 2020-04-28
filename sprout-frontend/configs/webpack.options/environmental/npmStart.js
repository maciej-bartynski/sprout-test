require('dotenv').config()
const path = require('path');
const devServer = require('../devServer');

const npmStart = {
    entry: path.join(process.env.PROJECT_ROOT_FOR_WEBPACK, 'src/templates', 'index.js'),
    output: {
        filename: 'index.js',
        publicPath: "/",
        path: '/start',
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer,
}

module.exports = npmStart;