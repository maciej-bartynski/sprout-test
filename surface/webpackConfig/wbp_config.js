require('dotenv').config()
const path = require('path');
const devServer = require('./web_devServ');
const modules = require('./webp_module');
const plugins = require('./webp_plugins');

module.exports = async () => {
    return {
        entry: path.join(__dirname, '../index.js'),
        output: {
            filename: 'index.js',
            publicPath: "/",
        },
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: await devServer,
        module: modules,
        plugins,
    }
}
