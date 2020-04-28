
require('dotenv').config()
const path = require('path');

const npmWatch = {
    entry: path.join(process.env.PROJECT_ROOT_FOR_WEBPACK, 'src/templates', 'index.js'),
    output: {
        filename: 'index.js',
        publicPath: undefined,
        path: '/watch',
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: undefined,
};

module.exports = npmWatch;
