require('dotenv').config()
const path = require('path');
const serverPaths = require(process.env.PROJECT_ROOT_FOR_WEBPACK + '/server');

const npmBuild = {
    entry: path.join(process.env.PROJECT_ROOT_FOR_WEBPACK, 'src/templates', 'index.js'),
    output: {
        filename: 'index.js',
        publicPath: undefined,
        path: serverPaths.useBuildspath.build,
    },
    mode: 'production',
    devtool: undefined,
    devServer: undefined,
};

module.exports = npmBuild;
