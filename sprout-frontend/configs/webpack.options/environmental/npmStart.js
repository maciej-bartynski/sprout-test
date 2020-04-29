require('dotenv').config();
const devServer = require('../devServer');
const _path = require('path');
const rootDir = _path.join(__dirname, "../../..");
const contract = require(rootDir + '/contract');
const { useWebpackOutput } = contract;
const { js, input, output } = useWebpackOutput

const npmStart = {
    entry: input + "/" + js.filename,
    output: {
        filename: js.filename,
        publicPath: "/",
        path: _path.join(rootDir, '/start'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer,
}

module.exports = npmStart;