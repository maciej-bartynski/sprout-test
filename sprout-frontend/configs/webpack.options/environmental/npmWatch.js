
require('dotenv').config()
const _path = require('path');
const rootDir = _path.join(__dirname, "../../..");
const contract = require(rootDir + '/contract');
const { useWebpackOutput } = contract;
const { js, input } = useWebpackOutput

const npmWatch = {
    entry: input + "/" + js.filename,
    output: {
        filename: js.filename,
        publicPath: undefined,
        path: _path.join(rootDir, '/watch'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: undefined,
};

module.exports = npmWatch;
