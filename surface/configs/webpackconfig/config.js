require('dotenv').config()
const path = require('path');
const devServer = require('./devServ');
const rules = require('./rules');
const plugins = require('./plugins');

module.exports = async () => {
    return {
        entry: path.join(__dirname, '../../src/templates', 'index.js'),
        context: path.resolve(__dirname, '../../src'),
        output: {
            filename: 'index.js',
            publicPath: "/",
            path: path.join(__dirname, '../..', 'build'),
        },
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: await devServer,
        module: { 
            rules
        },
        plugins,
    }
}
