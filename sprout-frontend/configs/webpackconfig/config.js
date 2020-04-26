require('dotenv').config()
const path = require('path');
const devServer = require('./devServ');
const rules = require('./rules');
const plugins = require('./plugins');
const serverPaths = require('../../server');

module.exports = async () => {
    return {
        entry: path.join(__dirname, '../../src/templates', 'index.js'),
        output: {
            filename: 'index.js',
            publicPath: "/",
            path: serverPaths.useBuildspath.build,
        },
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: await devServer,
        module: {
            rules
        },
        plugins,
        resolve: {
            alias: {
                src: path.resolve(__dirname, '../../src'),
                Components: path.resolve(__dirname, '../../src/Components'),
                RouteComponents: path.resolve(__dirname, '../../src/RouteComponents'),
            }
        },
    }
}